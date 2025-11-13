const PRODUCTS = [
  {
    id: 'tajine-pro',
    name: 'طاجين حراري تقليدي',
    price: '349 درهم',
    description: 'طاجين طين طبيعي كيتوزع الحرارة بالتساوي ومثالي للعائلة.',
    image: 'https://placehold.co/320x220/fff7ed/0f172a?text=Tajine',
    variants: [
      { type: 'الحجم', options: ['متوسط', 'كبير'] },
      { type: 'اللون', options: ['طوبي', 'كحل'] }
    ]
  },
  {
    id: 'argan-gold',
    name: 'زيت أركان ذهبية',
    price: '189 درهم',
    description: 'زيت أركان معصور على البارد، طبيعي 100% للشعر والبشرة.',
    image: 'https://placehold.co/320x220/fef3c7/0f172a?text=Argan',
    variants: [
      { type: 'الحجم', options: ['100 مل', '250 مل'] }
    ]
  },
  {
    id: 'smart-watch',
    name: 'ساعة سمارت ديال النشاط',
    price: '299 درهم',
    description: 'ساعة ذكية بالمكالمات، قياس نبضات، وتنبيهات فورية.',
    image: 'https://placehold.co/320x220/e0f2fe/0f172a?text=Watch',
    variants: [
      { type: 'اللون', options: ['كحل', 'فضي', 'وردي'] }
    ]
  }
];

const VOICE_MESSAGE = {
  title: 'رسالة صوتية من سلمى',
  duration: '0:13',
  src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_f15b3f7f89.mp3?filename=notification-113724.mp3',
  transcript: 'سلام ومرحبا بيك فشات المتجر! أنا سلمى مساعدة الخدمة. أي طلب ولا سؤال على التوصيل ولا الدفع عند التسليم غير قولي ليا.'
};

const CITIES = [
  'الدار البيضاء',
  'الرباط',
  'سلا',
  'طنجة',
  'مراكش',
  'فاس',
  'أكادير',
  'وجدة',
  'الجديدة',
  'تمارة',
  'بني ملال',
  'مكناس',
  'الناظور',
  'العيون'
];

const chatLog = document.getElementById('chatLog');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const cartButton = document.getElementById('cartButton');
const cartCountEl = document.getElementById('cartCount');
const themeToggle = document.getElementById('themeToggle');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const policyDialog = document.getElementById('policyDialog');
const policyTitle = document.getElementById('policyTitle');
const policyBody = document.getElementById('policyBody');
const closePolicy = document.getElementById('closePolicy');
const policyLinks = document.querySelectorAll('[data-policy]');

const state = {
  cart: [],
  currentProduct: null,
  currentOrder: {},
  theme: localStorage.getItem('chat-theme') || 'light',
  soundsReady: false,
  clickSynth: null,
  pingSynth: null
};

function initTheme() {
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = state.theme === 'dark' ? 'sun' : 'moon';
  const iconEl = themeToggle.querySelector('i');
  iconEl.setAttribute('data-lucide', icon);
  if (window.lucide) {
    window.lucide.createIcons({ nodes: [iconEl] });
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.toggle('dark', state.theme === 'dark');
  localStorage.setItem('chat-theme', state.theme);
  updateThemeIcon();
}

function initAudio() {
  if (state.soundsReady || typeof Tone === 'undefined') return;
  Tone.start();
  state.clickSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
  }).toDestination();
  state.pingSynth = new Tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 8,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.2 }
  }).toDestination();
  state.soundsReady = true;
}

document.body.addEventListener('click', initAudio, { once: true });
document.body.addEventListener('touchstart', initAudio, { once: true });

function playClick() {
  if (state.soundsReady && state.clickSynth) {
    state.clickSynth.triggerAttackRelease('E5', '16n');
  }
}

function playPing() {
  if (state.soundsReady && state.pingSynth) {
    state.pingSynth.triggerAttackRelease('C4', '16n', '+0.1');
  }
}

function addBubble(content, type = 'bot', extraClass = '') {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type} ${extraClass}`.trim();
  if (type === 'user') {
    bubble.textContent = content;
  } else {
    bubble.innerHTML = content;
  }
  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
  if (type === 'bot') playPing();
  if (window.lucide) {
    window.lucide.createIcons({ nodes: [bubble] });
  }
  return bubble;
}

function addTypingIndicator() {
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble bot';
  bubble.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
  return bubble;
}

function addVoiceBubble({ title, duration, src, transcript }) {
  const content = `
    <div class="voice-msg">
      <div class="voice-msg__header">
        <span><i data-lucide="mic"></i> ${title}</span>
        <span>${duration}</span>
      </div>
      <audio controls preload="none">
        <source src="${src}" type="audio/mpeg">
        المتصفح ديالك ما كيدعمش الصوت.
      </audio>
      <p class="voice-msg__transcript">${transcript}</p>
    </div>
  `;
  return addBubble(content, 'bot');
}

function showMainMenu() {
  const options = [
    { label: '1. شنو كاين ف الكاتالوج', action: 'show_products', icon: 'shopping-bag' },
    { label: '2. معلومات على التوصيل والدفع', action: 'delivery_info', icon: 'truck' },
    { label: '3. بغيتي تسمع صوت آخر', action: 'play_voice', icon: 'mic' },
    { label: '4. الطلبات ديالي', action: 'my_orders', icon: 'history' }
  ];
  const html = `
    <div class="telegram-options">
      ${options.map(opt => `
        <button data-action="${opt.action}">
          <span>${opt.label}</span>
          <i data-lucide="${opt.icon}"></i>
        </button>
      `).join('')}
    </div>
  `;
  addBubble(html, 'bot');
}

function renderProductCarousel(filter = '', replaceExisting = false) {
  if (replaceExisting) {
    chatLog.querySelectorAll('.product-carousel-wrapper').forEach((node) => node.remove());
  }
  const filtered = PRODUCTS.filter((product) => {
    const needle = filter.trim();
    if (!needle) return true;
    const hay = `${product.name} ${product.description}`;
    return hay.includes(needle);
  });

  if (filtered.length === 0) {
    addBubble('ما لقيناش منتوج مطابق للبحث ديالك دابا، جرب كلمة أخرى.', 'bot');
    return;
  }

  const html = `
    <div class="product-carousel">
      ${filtered.map((product) => `
        <article class="product-card" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-card__body">
            <h4>${product.name}</h4>
            <p>${product.price}</p>
          </div>
        </article>
      `).join('')}
    </div>
  `;
  addBubble(html, 'bot', 'product-carousel-wrapper');
}

function showProductSelection(product) {
  state.currentProduct = product;
  state.currentOrder = { productId: product.id, name: product.name, price: product.price };
  addBubble(`
    <div class="selection-card">
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${product.description}</p>
      <p style="color: var(--accent); font-weight: 700;">${product.price}</p>
    </div>
  `, 'bot');

  if (product.variants && product.variants.length > 0) {
    renderVariantStep(product.variants[0], 0);
  } else {
    showOrderChoices();
  }
}

function renderVariantStep(variant, index) {
  const html = `
    <div class="telegram-options">
      <p style="margin:0 0 10px; color: var(--text-soft);">اختار ${variant.type}:</p>
      ${variant.options.map((option, idx) => `
        <button data-action="select_variant" data-variant-index="${index}" data-value="${option}">
          <span>${idx + 1}. ${option}</span>
          <i data-lucide="chevron-left"></i>
        </button>
      `).join('')}
    </div>
  `;
  addBubble(html, 'bot');
}

function showOrderChoices() {
  const product = state.currentProduct;
  if (!product) return;
  const variantInfo = Object.entries(state.currentOrder)
    .filter(([key]) => key !== 'productId' && key !== 'name' && key !== 'price')
    .map(([, value]) => value)
    .join(' • ');
  const html = `
    <div class="telegram-options">
      <button data-action="start_order"><span>1. بغيت نكمل الطلب (${product.price}${variantInfo ? ` — ${variantInfo}` : ''})</span><i data-lucide="check-circle"></i></button>
      <button data-action="ask_about"><span>2. سولني على ${product.name}</span><i data-lucide="message-circle"></i></button>
      <button data-action="back_to_products"><span>3. رجع للمنتجات</span><i data-lucide="undo"></i></button>
    </div>
  `;
  addBubble(html, 'bot');
}

function renderOrderForm() {
  const product = state.currentProduct;
  if (!product) return;
  const citiesOptions = ['<option value="">اختار المدينة</option>', ...CITIES.map(city => `<option value="${city}">${city}</option>`)].join('');
  const html = `
    <form class="order-form" data-action="submit_order">
      <h4 style="margin-top:0">تأكيد الطلب: ${product.name}</h4>
      <p style="margin: 0 0 12px; color: var(--text-soft);">التوصيل فكازا مجاني، باقي المدن +30 درهم.</p>
      <label for="fullName">الإسم الكامل</label>
      <input id="fullName" name="fullName" required placeholder="مثال: آمنة بن يوسف">
      <label for="phone">رقم الهاتف</label>
      <input id="phone" name="phone" inputmode="tel" required placeholder="06XXXXXXXX">
      <label for="city">المدينة</label>
      <select id="city" name="city" required>${citiesOptions}</select>
      <label class="consent-label" style="display:flex;align-items:center;gap:8px; font-size:0.95rem; color: var(--text-soft);">
        <input type="checkbox" name="consent" required> كنوافق على شروط الخدمة ديال المتجر
      </label>
      <button type="submit">أكد الطلب</button>
      <p class="form-error" aria-live="polite"></p>
    </form>
  `;
  addBubble(html, 'bot', 'form-bubble');
}

function validateForm(form) {
  const name = form.fullName.value.trim();
  const phone = form.phone.value.replace(/\D/g, '').slice(0, 10);
  form.phone.value = phone;
  const city = form.city.value;
  const consent = form.consent.checked;
  const errorEl = form.querySelector('.form-error');
  errorEl.style.display = 'none';

  if (!name || !phone || !city) {
    errorEl.textContent = 'ضروري تعمر الإسم، التليفون، والمدينة.';
    errorEl.style.display = 'block';
    return false;
  }
  if (!/^0[5-7]\d{8}$/.test(phone)) {
    errorEl.textContent = 'دخل رقم مغربي صحيح من 10 أرقام.';
    errorEl.style.display = 'block';
    return false;
  }
  if (!consent) {
    errorEl.textContent = 'خاصك توافق على الشروط قبل ما نكملو.';
    errorEl.style.display = 'block';
    return false;
  }
  return { name, phone, city };
}

function summarizeOrder(formValues) {
  const product = state.currentProduct;
  if (!product) return;
  const totalBase = Number(product.price.replace(/[^\d]/g, '')) || 0;
  const deliveryFee = formValues.city === 'الدار البيضاء' ? 0 : 30;
  const total = totalBase + deliveryFee;
  const orderId = 'MA' + Math.random().toString(36).slice(2, 7).toUpperCase();
  const extras = Object.entries(state.currentOrder)
    .filter(([key]) => !['productId', 'name', 'price'].includes(key))
    .map(([, value]) => value)
    .join(' • ');

  addBubble(`
    <div style="text-align:center">
      <h4 style="margin:0 0 10px">✅ طلبك تسجل بنجاح</h4>
      <p style="color: var(--text-soft); margin:0 0 16px;">رقم الطلب: <strong>${orderId}</strong></p>
      <div style="text-align:right; margin:0 auto; max-width:360px; line-height:1.7;">
        <div><strong>المنتج:</strong> ${product.name}${extras ? ` (${extras})` : ''}</div>
        <div><strong>الثمن:</strong> ${product.price}</div>
        <div><strong>التوصيل:</strong> ${deliveryFee === 0 ? 'مجاني فكازا' : '30 درهم'}</div>
        <div><strong>المجموع:</strong> ${total} درهم</div>
        <div><strong>الإسم:</strong> ${formValues.name}</div>
        <div><strong>التليفون:</strong> ${formValues.phone}</div>
        <div><strong>المدينة:</strong> ${formValues.city}</div>
      </div>
      <a class="btn" style="margin-top:14px; text-decoration:none;" target="_blank" rel="noopener" href="https://wa.me/212612345678?text=سلام،%20بغيت%20نتبع%20الطلب%20${orderId}">تواصل معنا فالواتساب</a>
    </div>
  `, 'bot');

  state.cart.push({
    id: orderId,
    product: extras ? `${product.name} (${extras})` : product.name,
    city: formValues.city,
    phone: formValues.phone,
    total: `${total} درهم`
  });
  updateCartCount();
  showMainMenu();
}

function updateCartCount() {
  const count = state.cart.length;
  cartCountEl.textContent = count;
  cartCountEl.classList.toggle('active', count > 0);
}

function showCart() {
  if (state.cart.length === 0) {
    addBubble('السلة خاوية دابا. اختار شي منتج وكمّل الطلب.', 'bot');
    return;
  }
  const list = state.cart.map((item, index) => `
    <div style="margin-bottom:10px;">
      <strong>${index + 1}. ${item.product}</strong>
      <div style="color: var(--text-soft); font-size:0.95rem;">المجموع: ${item.total} — ${item.city}</div>
    </div>
  `).join('');
  addBubble(`<div>${list}</div>`, 'bot');
}

function handleUserMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  playClick();
  addBubble(text, 'user');
  chatInput.value = '';
  sendButton.disabled = true;

  const typing = addTypingIndicator();
  setTimeout(() => {
    typing.remove();
    const reply = generateBotReply(text);
    addBubble(reply, 'bot');
    showMainMenu();
    sendButton.disabled = false;
  }, 550);
}

function generateBotReply(text) {
  const lower = text.toLowerCase();
  if (/[\u0621-\u064a]/.test(text)) {
    if (text.includes('ثمن') || text.includes('ثمنها') || text.includes('بشحال')) {
      return 'الأسعار كيبانو تحت كل منتج، وخاصك غير تختار اللي عجبك ونكملو الطلب فاللحظة.';
    }
    if (text.includes('توصيل') || text.includes('دليفري') || text.includes('delivery')) {
      return 'التوصيل فكازا والرباط من 24 حتى 48 ساعة، باقي المدن 48-72 ساعة مع زيادة ديال 30 درهم فقط.';
    }
    if (text.includes('سلام') || text.includes('مرحبا') || text.includes('صباح')) {
      return 'مرحبا و1000 مرحبا! قول ليا على شنو مهتم باش نعطيك التفاصيل.';
    }
  }
  if (lower.includes('price') || lower.includes('how much')) {
    return 'كل منتج عندو الثمن ديالو موضح فالبطاقة. اختار اللي بغيتي وندوزو مباشرة للتأكيد.';
  }
  return 'مزيان! عندنا طاجين، زيت أركان، وساعة سمارت. بغيت نشد لك طلب على شي واحد منهم؟';
}

function handleSearchOpen() {
  playClick();
  searchBar.classList.add('open');
  searchInput.focus();
}

function handleSearchClose() {
  searchBar.classList.remove('open');
  searchInput.value = '';
}

function showDeliveryInfo() {
  addBubble(`
    <strong>كيفاش خدام التوصيل والدفع:</strong><br>
    • كازا والرباط: التوصيل من 24 حتى 48 ساعة وبلا مصاريف إضافية.<br>
    • باقي المدن: 48 حتى 72 ساعة، التوصيل 30 درهم كيضاف للمجموع.<br>
    • الدفع كيكون عند الباب، كتعاين المنتج قبل ما تخلص.<br>
    • الاسترجاع ممكن خلال 7 أيام إلا ما عجبكش أو فيه عيب.
  `, 'bot');
}

function showOrdersHistory() {
  if (state.cart.length === 0) {
    addBubble('مازال ما كاين حتى طلب مسجل باسمك. جرب تطلب شي منتج وهنّينا.', 'bot');
    return;
  }
  const items = state.cart.map((item) => `• ${item.product} — ${item.total} (${item.city})`).join('<br>');
  addBubble(`ها الطلبات اللي سجلنا ليك:<br>${items}`, 'bot');
}

function showAnotherVoice() {
  addBubble('ها واحد الصوت خفيف باش تبقا على تواصل معانا 👇', 'bot');
  addVoiceBubble(VOICE_MESSAGE);
}

function showPolicies(type) {
  const map = {
    privacy: {
      title: 'سياسة الخصوصية',
      body: 'المعلومات اللي كتشارك معانا كنستعملوها غير باش نكملو الطلب ونتابعو التوصيل. ما كنعطيوها لحتى جهة أخرى.'
    },
    returns: {
      title: 'سياسة الإرجاع',
      body: 'عندك 7 أيام من بعد التسليم تراجعنا إلا كان شي مشكل فالمنتج. الشرط هو يبقى فحال ما وصل عندك.'
    },
    contact: {
      title: 'تواصل معانا',
      body: 'واتساب أو تليفون: 0612345678 — البريد: support@shop.ma. متواجدين طيلة أيام الأسبوع.'
    }
  };
  const data = map[type];
  if (!data) return;
  policyTitle.textContent = data.title;
  policyBody.textContent = data.body;
  if (typeof policyDialog.showModal === 'function') {
    policyDialog.showModal();
  }
}

function handleChatClick(event) {
  const button = event.target.closest('button[data-action]');
  const productCard = event.target.closest('.product-card');
  if (!button && !productCard) return;
  playClick();

  if (button) {
    const action = button.dataset.action;
    if (button.closest('.telegram-options')) {
      button.closest('.telegram-options').querySelectorAll('button').forEach((btn) => btn.disabled = true);
    }
    switch (action) {
      case 'show_products':
        renderProductCarousel();
        break;
      case 'delivery_info':
        showDeliveryInfo();
        break;
      case 'play_voice':
        showAnotherVoice();
        break;
      case 'my_orders':
        showOrdersHistory();
        break;
      case 'select_variant': {
        const index = Number(button.dataset.variantIndex);
        const value = button.dataset.value;
        const product = state.currentProduct;
        if (product) {
          const variant = product.variants[index];
          if (variant) {
            state.currentOrder[variant.type] = value;
            addBubble(value, 'user');
            const nextVariant = product.variants[index + 1];
            if (nextVariant) {
              renderVariantStep(nextVariant, index + 1);
            } else {
              showOrderChoices();
            }
          }
        }
        break;
      }
      case 'start_order':
        renderOrderForm();
        break;
      case 'ask_about':
        addBubble(`شنو بغيتي تعرف على ${state.currentProduct?.name || 'المنتج'}؟ كتب سؤالك ونجاوبك.`,'bot');
        break;
      case 'back_to_products':
        renderProductCarousel();
        break;
      default:
        break;
    }
  }

  if (productCard) {
    const productId = productCard.dataset.productId;
    const product = PRODUCTS.find((item) => item.id === productId);
    if (product) {
      addBubble(product.name, 'user');
      showProductSelection(product);
      addVoiceBubble({
        title: 'معاينة صوتية للمنتج',
        duration: '0:09',
        src: VOICE_MESSAGE.src,
        transcript: `هذا تسجيل قصير كيشرح مميزات ${product.name} وطريقة التوصيل. سمعو وغادي يعجبك.`
      });
    }
  }
}

function handleFormSubmit(event) {
  const form = event.target.closest('form[data-action="submit_order"]');
  if (!form) return;
  event.preventDefault();
  playClick();
  const values = validateForm(form);
  if (!values) return;
  form.querySelector('button[type="submit"]').disabled = true;
  setTimeout(() => {
    summarizeOrder(values);
    form.parentElement.remove();
  }, 500);
}

function initPolicies() {
  policyLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const type = link.dataset.policy;
      showPolicies(type);
    });
  });
  closePolicy.addEventListener('click', () => policyDialog.close());
}

function initSearch() {
  searchToggle.addEventListener('click', handleSearchOpen);
  closeSearch.addEventListener('click', handleSearchClose);
  searchInput.addEventListener('input', (event) => {
    const value = event.target.value;
    renderProductCarousel(value, true);
  });
}

function initEvents() {
  sendButton.addEventListener('click', handleUserMessage);
  chatInput.addEventListener('input', () => {
    sendButton.disabled = chatInput.value.trim().length === 0;
  });
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!sendButton.disabled) handleUserMessage();
    }
  });
  cartButton.addEventListener('click', showCart);
  themeToggle.addEventListener('click', () => {
    toggleTheme();
  });
  chatLog.addEventListener('click', handleChatClick);
  chatLog.addEventListener('submit', handleFormSubmit, true);
}

function welcomeSequence() {
  addBubble('مرحبا بيك فشات المتجر الذكي! أنا سلمى، شنو بغيت تشري اليوم؟', 'bot');
  addVoiceBubble(VOICE_MESSAGE);
  setTimeout(() => {
    addBubble('اختار من هاد اللائحة باش نعاونك:', 'bot');
    showMainMenu();
  }, 600);
  setTimeout(() => {
    renderProductCarousel();
  }, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initPolicies();
  initSearch();
  initEvents();
  welcomeSequence();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
