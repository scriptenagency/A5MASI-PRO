// Replace with your Apps Script web app URL
const API_URL = "YOUR_APPS_SCRIPT_URL_HERE"; // e.g. https://script.google.com/macros/s/.../exec

function getSessionId() {
  let sid = localStorage.getItem("a5masi_session_id");
  if (!sid) {
    sid = "sess_" + Math.random().toString(36).slice(2);
    localStorage.setItem("a5masi_session_id", sid);
  }
  return sid;
}

const state = {
  currentProductId: null,
  currentStep: 0,
  totalSteps: 4
};

const dom = {};

function initDom() {
  dom.productsSection = document.getElementById("productsSection");
  dom.ctaViewProducts = document.getElementById("ctaViewProducts");

  dom.assistantBackdrop = document.getElementById("assistantBackdrop");
  dom.assistantOverlay = document.getElementById("assistantOverlay");
  dom.assistantProductTitle = document.getElementById("assistantProductTitle");
  dom.assistantStatus = document.getElementById("assistantStatus");

  dom.prevStepBtn = document.getElementById("prevStepBtn");
  dom.nextStepBtn = document.getElementById("nextStepBtn");
  dom.assistantCloseBtn = document.getElementById("assistantCloseBtn");

  dom.formSteps = Array.from(
    document.querySelectorAll(".form-step")
  );
  dom.stepDots = Array.from(
    document.querySelectorAll(".step-dot")
  );

  dom.fieldName = document.getElementById("fieldName");
  dom.fieldPhone = document.getElementById("fieldPhone");
  dom.fieldCity = document.getElementById("fieldCity");
  dom.fieldAddress = document.getElementById("fieldAddress");
  dom.fieldNote = document.getElementById("fieldNote");
  dom.summaryPreview = document.getElementById("summaryPreview");

  dom.audioTitle = document.getElementById("audioTitle");
  dom.audioSubtitle = document.getElementById("audioSubtitle");
  dom.audioToggleBtn = document.getElementById("audioToggleBtn");
}

function bindEvents() {
  if (dom.ctaViewProducts && dom.productsSection) {
    dom.ctaViewProducts.addEventListener("click", () => {
      dom.productsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // product cards
  document.querySelectorAll(".product-open-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      if (!card) return;
      const productId = card.getAttribute("data-product-id");
      const title = card.querySelector(".product-title")?.textContent || "";
      openAssistant(productId, title);
    });
  });

  // overlay controls
  dom.assistantCloseBtn.addEventListener("click", closeAssistant);
  dom.assistantBackdrop.addEventListener("click", closeAssistant);

  dom.prevStepBtn.addEventListener("click", () => changeStep(-1));
  dom.nextStepBtn.addEventListener("click", onNextStepClick);

  dom.fieldNote.addEventListener("input", updateSummaryPreview);

  dom.audioToggleBtn.addEventListener("click", () => {
    // placeholder for audio control
    dom.assistantStatus.textContent =
      "Plus tard, ce bouton contrôlera un fichier audio pour cette étape.";
    setTimeout(() => {
      dom.assistantStatus.textContent = "";
    }, 2500);
  });
}

function openAssistant(productId, productTitle) {
  state.currentProductId = productId;
  state.currentStep = 0;
  dom.assistantProductTitle.textContent = productTitle;
  dom.assistantStatus.textContent = "";

  dom.assistantBackdrop.hidden = false;
  dom.assistantOverlay.setAttribute("aria-hidden", "false");

  updateStepUI();
}

function closeAssistant() {
  dom.assistantBackdrop.hidden = true;
  dom.assistantOverlay.setAttribute("aria-hidden", "true");
}

function updateStepUI() {
  dom.formSteps.forEach((stepEl, index) => {
    stepEl.classList.toggle("is-active", index === state.currentStep);
  });

  dom.stepDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index <= state.currentStep);
  });

  if (state.currentStep === 0) {
    dom.prevStepBtn.disabled = true;
    dom.prevStepBtn.classList.add("is-disabled");
  } else {
    dom.prevStepBtn.disabled = false;
    dom.prevStepBtn.classList.remove("is-disabled");
  }

  dom.nextStepBtn.textContent =
    state.currentStep === state.totalSteps - 1 ? "Confirmer" : "Suivant";

  updateSummaryPreview();
  updateAudioLabels();
}

function updateSummaryPreview() {
  const name = dom.fieldName.value.trim();
  const phone = dom.fieldPhone.value.trim();
  const city = dom.fieldCity.value.trim();
  const address = dom.fieldAddress.value.trim();
  const note = dom.fieldNote.value.trim();

  const lines = [];
  if (name) lines.push("Nom: " + name);
  if (phone) lines.push("Téléphone: " + phone);
  if (city) lines.push("Ville: " + city);
  if (address) lines.push("Adresse: " + address);
  if (note) lines.push("Note: " + note);

  dom.summaryPreview.textContent =
    lines.length > 0
      ? lines.join(" • ")
      : "Le récapitulatif sera affiché ici avant l’envoi de ta commande.";
}

function updateAudioLabels() {
  const titles = [
    "Étape 1 — Nom complet",
    "Étape 2 — Téléphone",
    "Étape 3 — Ville et adresse",
    "Étape 4 — Note et résumé"
  ];
  const subs = [
    "Plus tard: audio expliquant comment écrire le nom.",
    "Plus tard: audio expliquant quel numéro donner.",
    "Plus tard: audio expliquant quoi mettre pour ville/adresse.",
    "Plus tard: audio expliquant comment vérifier les infos."
  ];

  dom.audioTitle.textContent = titles[state.currentStep] || "Étape";
  dom.audioSubtitle.textContent =
    subs[state.currentStep] ||
    "Cette zone sera reliée à un fichier audio pour cette étape.";
}

function changeStep(delta) {
  const next = state.currentStep + delta;
  if (next < 0 || next >= state.totalSteps) return;
  state.currentStep = next;
  dom.assistantStatus.textContent = "";
  updateStepUI();
}

function onNextStepClick() {
  if (state.currentStep < state.totalSteps - 1) {
    if (!validateCurrentStep()) return;
    changeStep(1);
  } else {
    if (!validateAll()) return;
    submitOrder();
  }
}

function validateCurrentStep() {
  dom.assistantStatus.textContent = "";

  if (state.currentStep === 0) {
    if (!dom.fieldName.value.trim()) {
      dom.assistantStatus.textContent = "Merci d’indiquer ton nom complet.";
      return false;
    }
  }
  if (state.currentStep === 1) {
    if (!dom.fieldPhone.value.trim()) {
      dom.assistantStatus.textContent = "Merci d’indiquer ton téléphone.";
      return false;
    }
  }
  if (state.currentStep === 2) {
    if (!dom.fieldCity.value.trim()) {
      dom.assistantStatus.textContent = "Merci d’indiquer ta ville.";
      return false;
    }
  }
  return true;
}

function validateAll() {
  if (!dom.fieldName.value.trim()) {
    dom.assistantStatus.textContent = "Le nom est obligatoire.";
    state.currentStep = 0;
    updateStepUI();
    return false;
  }
  if (!dom.fieldPhone.value.trim()) {
    dom.assistantStatus.textContent = "Le téléphone est obligatoire.";
    state.currentStep = 1;
    updateStepUI();
    return false;
  }
  if (!dom.fieldCity.value.trim()) {
    dom.assistantStatus.textContent = "La ville est obligatoire.";
    state.currentStep = 2;
    updateStepUI();
    return false;
  }
  return true;
}

async function submitOrder() {
  const payload = {
    sessionId: getSessionId(),
    productId: state.currentProductId,
    productName: dom.assistantProductTitle.textContent,
    formData: {
      name: dom.fieldName.value.trim(),
      phone: dom.fieldPhone.value.trim(),
      city: dom.fieldCity.value.trim(),
      address: dom.fieldAddress.value.trim(),
      note: dom.fieldNote.value.trim()
    },
    clientMeta: {
      screen: window.innerWidth <= 768 ? "mobile" : "desktop",
      language: navigator.language,
      userAgent: navigator.userAgent
    },
    createdAt: new Date().toISOString()
  };

  dom.assistantStatus.textContent = "Envoi de ta commande…";

  try {
    await fetch(API_URL + "?path=order", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    dom.assistantStatus.textContent =
      "Commande envoyée. Tu seras contacté pour confirmation.";
    dom.nextStepBtn.disabled = true;

    setTimeout(() => {
      closeAssistant();
    }, 2200);
  } catch (err) {
    console.error(err);
    dom.assistantStatus.textContent =
      "Problème de connexion. Réessaie plus tard.";
  }
}

// Init

document.addEventListener("DOMContentLoaded", () => {
  initDom();
  bindEvents();
  updateStepUI();
});
