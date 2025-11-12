const state = {
  theme: localStorage.getItem('theme') || 'light',
  products: [
    {
      id: 'argan-gold',
      name: 'زيت الأركان الأصلي',
      category: 'beauty',
      price: 189,
      currency: 'MAD',
      image: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'زيت أركان طبيعي 100% معصور على البارد، يرطب البشرة ويقوي الشعر ويحمي الأظافر.',
      tags: ['طبيعي', 'مستخلص على البارد', '100مل'],
      variants: ['100 مل', '250 مل'],
      rating: 4.9,
      reviews: 214,
      delivery: '48 ساعة',
      benefits: ['يغذي البشرة والشعر بعمق', 'مناسب لجميع أنواع البشرة', 'ضمان استرجاع لمدة 7 أيام']
    },
    {
      id: 'tajine-pro',
      name: 'طاجين الفخار الحراري',
      category: 'home',
      price: 349,
      currency: 'MAD',
      image: 'https://images.unsplash.com/photo-1608032361382-87c7ba90d01f?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1568600891621-2b35f5a8b211?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1589308078053-f9a354e4f3be?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'طاجين عصري بغطاء محكم، يحافظ على النكهات التقليدية مع توزيع حراري متوازن.',
      tags: ['مصنوع يدوياً', 'مقاوم للحرارة', 'حجم عائلي'],
      variants: ['حجم متوسط', 'حجم كبير'],
      rating: 4.8,
      reviews: 167,
      delivery: '24 ساعة داخل كازا',
      benefits: ['مناسب للغاز والفرن', 'حافة مضادة للانسكاب', 'ضمان سنة كاملة']
    },
    {
      id: 'smart-watch',
      name: 'ساعة ذكية بتقنية البلوتوث',
      category: 'accessories',
      price: 299,
      currency: 'MAD',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1517430816045-df4b7de1cd0d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'ساعة ذكية تدعم المكالمات، قياس الخطوات، متابعة معدل نبض القلب، ومزامنة مع الهاتف.',
      tags: ['ضمان 12 شهر', 'مقاومة للماء', 'بطارية 5 أيام'],
      variants: ['أسود', 'فضي', 'وردي'],
      rating: 4.7,
      reviews: 398,
      delivery: '48 ساعة',
      benefits: ['دعم اللغتين العربية والفرنسية', 'متوافقة مع أندرويد وآيفون', 'تنبيهات فورية']
    },
    {
      id: 'coffee-dripper',
      name: 'آلة تحضير القهوة اليدوية',
      category: 'home',
      price: 229,
      currency: 'MAD',
      image: 'https://images.unsplash.com/photo-1461988625982-7e46a099bf4f?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'تجربة احترافية لتحضير القهوة المختصة مع فلتر دائم وستاند خشبي أنيق.',
      tags: ['فلتر قابل لإعادة الاستخدام', 'ستاند خشبي', 'تصميم أنيق'],
      variants: ['أسود مطفي', 'خشب طبيعي'],
      rating: 4.9,
      reviews: 142,
      delivery: '72 ساعة',
      benefits: ['فلتر ستانلس يدوم طويلاً', 'تصميم مثالي للهدايا', 'شحن آمن ومضمون']
    }
  ],
  testimonials: [
    {
      name: 'سناء من الرباط',
      title: 'خدمة رائعة ودعم سريع',
      quote: 'سجلت الطلب مساء الإثنين وتواصلوا معي في نفس اللحظة. التوصيل كان في أقل من 24 ساعة والمنتج بنفس الوصف.',
      rating: 5
    },
    {
      name: 'حمزة من الدار البيضاء',
      title: 'أفضل تجربة دفع عند الاستلام',
      quote: 'التتبع بالواتساب كان مفيد جداً. استلمت الطاجين في حالة ممتازة مع فاتورة وضمان.',
      rating: 5
    },
    {
      name: 'مريم من طنجة',
      title: 'احترافية في التعامل',
      quote: 'استفسرت عن منتج قبل الشراء، أجابوني بالتفصيل. خدمة العملاء مهتمة فعلاً بتجربة الزبون.',
      rating: 4.8
    }
  ],
  faqs: [
    {
      question: 'كيف يتم تأكيد الطلب؟',
      answer: 'بعد ملء بياناتك يتواصل معك مستشارنا عبر مكالمة أو رسالة واتساب لتأكيد العنوان والمنتج.'
    },
    {
      question: 'كم تستغرق مدة التوصيل؟',
      answer: 'داخل الدار البيضاء والرباط يتم التوصيل خلال 24 ساعة. باقي المدن بين 48 و72 ساعة حسب المنطقة.'
    },
    {
      question: 'هل يمكن إرجاع المنتج؟',
      answer: 'أكيد! لديك 7 أيام لاستبدال أو استرجاع المنتج إذا لم يكن مطابقاً لتوقعاتك.'
    },
    {
      question: 'هل الخدمة متاحة في كل المدن؟',
      answer: 'نغطي أكثر من 40 مدينة مغربية مع شركاء توصيل معتمدين. إذا كانت مدينتك بعيدة نرتب التوصيل خلال 72 ساعة كأقصى تقدير.'
    }
  ],
  cart: [],
  selectedProduct: null
};

const elements = {
  productGrid: document.getElementById('productGrid'),
  filters: document.querySelectorAll('.filter-btn'),
  testimonialCarousel: document.getElementById('testimonialCarousel'),
  faqAccordion: document.getElementById('faqAccordion'),
  citySelect: document.getElementById('citySelect'),
  deliveryResult: document.getElementById('deliveryResult'),
  year: document.getElementById('year'),
  themeToggle: document.getElementById('themeToggle'),
  siteHeader: document.getElementById('siteHeader'),
  menuToggle: document.getElementById('menuToggle'),
  mainNav: document.getElementById('mainNav'),
  overlay: document.getElementById('overlay'),
  cartToggle: document.getElementById('cartToggle'),
  cartCount: document.getElementById('cartCount'),
  orderDrawer: document.getElementById('orderDrawer'),
  closeDrawer: document.getElementById('closeDrawer'),
  orderContent: document.getElementById('orderContent'),
  orderForm: document.getElementById('orderForm'),
  orderStatus: document.getElementById('orderStatus'),
  openWizard: document.getElementById('openWizard'),
  modal: document.getElementById('modal'),
  modalContent: document.getElementById('modalContent'),
  closeModal: document.getElementById('closeModal'),
  contactForm: document.getElementById('contactForm'),
  contactStatus: document.getElementById('contactStatus')
};

function formatPrice(price, currency = 'MAD') {
  return new Intl.NumberFormat('ar-MA', { style: 'currency', currency }).format(price);
}

function renderProducts(filter = 'all') {
  const filtered = filter === 'all'
    ? state.products
    : state.products.filter((product) => product.category === filter);

  elements.productGrid.innerHTML = filtered.map((product) => `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__img">
        <img src="${product.image}" alt="${product.name}">
        <span class="product-card__badge">COD</span>
      </div>
      <div class="product-card__body">
        <div class="product-card__meta">
          <h3>${product.name}</h3>
          <span>${formatPrice(product.price, product.currency)}</span>
        </div>
        <div class="tag-list">
          ${product.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <p>${product.description.slice(0, 120)}...</p>
        <div class="product-card__meta">
          <span><i data-lucide="star"></i> ${product.rating}</span>
          <small>${product.delivery}</small>
        </div>
        <div class="product-card__actions">
          <button class="btn btn--ghost" data-action="quick-view">نظرة سريعة</button>
          <button class="btn btn--primary" data-action="add-to-cart">أضف للطلب</button>
        </div>
      </div>
    </article>
  `).join('');

  lucide.createIcons();
}

function renderTestimonials() {
  elements.testimonialCarousel.innerHTML = state.testimonials.map((item) => `
    <blockquote class="testimonial-card">
      <h3>${item.title}</h3>
      <p>${item.quote}</p>
      <footer>
        ${'★'.repeat(Math.floor(item.rating))}
        <span> — ${item.name}</span>
      </footer>
    </blockquote>
  `).join('');
}

function renderFAQ() {
  elements.faqAccordion.innerHTML = state.faqs.map((item, index) => `
    <div class="accordion__item${index === 0 ? ' is-open' : ''}" data-index="${index}">
      <button class="accordion__button" type="button">
        <span>${item.question}</span>
        <i data-lucide="chevron-down"></i>
      </button>
      <div class="accordion__panel">${item.answer}</div>
    </div>
  `).join('');
  lucide.createIcons();
}

function updateTheme(theme) {
  state.theme = theme;
  if (theme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
  const icon = theme === 'dark' ? 'sun' : 'moon-star';
  elements.themeToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
  lucide.createIcons();
}

function toggleNav(force) {
  const isOpen = typeof force === 'boolean' ? force : !elements.mainNav.classList.contains('is-open');
  elements.mainNav.classList.toggle('is-open', isOpen);
  if (isOpen) {
    elements.overlay.hidden = false;
    elements.overlay.classList.add('is-visible');
  } else {
    elements.overlay.classList.remove('is-visible');
    setTimeout(() => {
      if (!elements.orderDrawer.classList.contains('is-open') && elements.modal.hidden) {
        elements.overlay.hidden = true;
      }
    }, 250);
  }
}

function openDrawer() {
  elements.orderDrawer.classList.add('is-open');
  elements.overlay.hidden = false;
  requestAnimationFrame(() => elements.overlay.classList.add('is-visible'));
}

function closeDrawer() {
  elements.orderDrawer.classList.remove('is-open');
  elements.overlay.classList.remove('is-visible');
  setTimeout(() => {
    if (!elements.mainNav.classList.contains('is-open')) {
      elements.overlay.hidden = true;
    }
  }, 250);
}

function renderCart() {
  if (state.cart.length === 0) {
    elements.orderContent.innerHTML = `<p>لم تقم بإضافة أي منتج بعد. تصفح منتجاتنا وابدأ الطلب.</p>`;
  } else {
    elements.orderContent.innerHTML = state.cart.map((item) => `
      <div class="order-item">
        <div class="order-item__title">${item.name}</div>
        <div class="order-item__meta">
          <span>${item.variant || 'بدون تحديد'}</span>
          <strong>${formatPrice(item.price)}</strong>
        </div>
      </div>
    `).join('');
  }
  elements.cartCount.textContent = state.cart.length;
}

function addToCart(product) {
  const variant = product.selectedVariant || (Array.isArray(product.variants) ? product.variants[0] : null);
  state.cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    variant
  });
  renderCart();
  openDrawer();
}

function getShippingMessage(cityValue) {
  switch (cityValue) {
    case 'casa':
      return 'التوصيل مجاني داخل الدار البيضاء ويتم خلال أقل من 24 ساعة.';
    case 'rb':
      return 'التوصيل إلى الرباط و سلا في غضون 24-36 ساعة، التكلفة 15 درهم.';
    case 'marrakech':
      return 'التوصيل إلى مراكش خلال 48 ساعة، التكلفة 20 درهم.';
    case 'tanger':
      return 'التوصيل إلى طنجة خلال 48-60 ساعة، التكلفة 25 درهم.';
    case 'other':
      return 'التوصيل إلى باقي المدن يتم خلال 72 ساعة بمتوسط تكلفة 30 درهم.';
    default:
      return 'التوصيل مجاني داخل الدار البيضاء.';
  }
}

function openModal(product) {
  state.selectedProduct = {
    ...product,
    selectedVariant: Array.isArray(product.variants) ? product.variants[0] : null
  };
  elements.modalContent.innerHTML = `
    <header>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
    </header>
    <div class="modal__gallery">
      ${product.gallery.map((img) => `<img src="${img}" alt="${product.name}">`).join('')}
    </div>
    <div>
      <h3>المميزات</h3>
      <ul>
        ${product.benefits.map((benefit) => `<li>• ${benefit}</li>`).join('')}
      </ul>
    </div>
    <div class="product-wizard">
      <div class="product-wizard__steps">
        ${(product.variants || ['بدون اختيار']).map((variant, index) => `
          <div class="product-wizard__step${index === 0 ? ' is-active' : ''}" data-variant="${variant}">
            <span>${variant}</span>
            <small>جاهز للشحن خلال ${product.delivery}</small>
          </div>
        `).join('')}
      </div>
      <div class="product-wizard__options">
        <button class="btn btn--primary" data-action="wizard-order">أضف للطلب (${formatPrice(product.price)})</button>
        <button class="btn btn--ghost" data-action="contact-agent">تواصل مع مستشار</button>
      </div>
    </div>
  `;
  elements.overlay.hidden = false;
  requestAnimationFrame(() => elements.overlay.classList.add('is-visible'));
  elements.modal.hidden = false;
  lucide.createIcons();
}

function closeModal() {
  elements.modal.hidden = true;
  elements.overlay.classList.remove('is-visible');
  setTimeout(() => {
    if (!elements.orderDrawer.classList.contains('is-open') && !elements.mainNav.classList.contains('is-open')) {
      elements.overlay.hidden = true;
    }
  }, 250);
}

function handleOrderFormSubmit(event) {
  event.preventDefault();
  const name = elements.orderForm.orderName.value.trim();
  const phone = elements.orderForm.orderPhone.value.replace(/\D/g, '').slice(0, 10);
  const city = elements.orderForm.orderCity.value.trim();

  const phoneRegex = /^(0[5-7])\d{8}$/;
  if (!name || !phoneRegex.test(phone) || !city) {
    elements.orderStatus.textContent = 'تحقق من الإسم ورقم الهاتف والمدينة.';
    elements.orderStatus.style.color = '#ef4444';
    return;
  }

  elements.orderStatus.style.color = 'var(--color-primary)';
  elements.orderStatus.textContent = 'جارٍ تسجيل طلبك...';

  setTimeout(() => {
    elements.orderStatus.textContent = '✅ تم استلام طلبك! سنتصل بك خلال دقائق للتأكيد.';
    state.cart = [];
    renderCart();
  }, 1200);
}

function handleContactForm(event) {
  event.preventDefault();
  const name = elements.contactForm.contactName.value.trim();
  const phone = elements.contactForm.contactPhone.value.replace(/\D/g, '').slice(0, 10);
  const message = elements.contactForm.contactMessage.value.trim();
  const phoneRegex = /^(0[5-7])\d{8}$/;

  if (!name || !message || !phoneRegex.test(phone)) {
    elements.contactStatus.textContent = 'المرجو التأكد من صحة البيانات قبل الإرسال.';
    elements.contactStatus.style.color = '#ef4444';
    return;
  }

  elements.contactStatus.style.color = 'var(--color-primary)';
  elements.contactStatus.textContent = 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.';
  elements.contactForm.reset();
}

function initListeners() {
  elements.filters.forEach((button) => {
    button.addEventListener('click', () => {
      elements.filters.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      const filter = button.dataset.filter;
      renderProducts(filter);
    });
  });

  elements.productGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.product-card');
    if (!card) return;
    const product = state.products.find((item) => item.id === card.dataset.productId);
    if (!product) return;

    const action = event.target.closest('button')?.dataset.action;
    if (action === 'quick-view') {
      openModal(product);
    }
    if (action === 'add-to-cart') {
      addToCart(product);
    }
  });

  elements.themeToggle.addEventListener('click', () => {
    updateTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  elements.menuToggle.addEventListener('click', () => toggleNav());
  elements.overlay.addEventListener('click', () => {
    toggleNav(false);
    closeDrawer();
    closeModal();
  });

  elements.cartToggle.addEventListener('click', () => {
    if (state.cart.length === 0) {
      elements.orderStatus.textContent = 'سلة الطلب فارغة حالياً.';
      elements.orderStatus.style.color = '#ef4444';
      setTimeout(() => {
        elements.orderStatus.textContent = '';
      }, 2000);
    } else {
      openDrawer();
    }
  });

  elements.closeDrawer.addEventListener('click', closeDrawer);
  elements.orderForm.addEventListener('submit', handleOrderFormSubmit);
  elements.contactForm.addEventListener('submit', handleContactForm);

  elements.citySelect.addEventListener('change', (event) => {
    elements.deliveryResult.textContent = getShippingMessage(event.target.value);
  });

  elements.openWizard.addEventListener('click', () => {
    const firstProduct = state.products[0];
    openModal(firstProduct);
  });

  elements.closeModal.addEventListener('click', closeModal);

  elements.modal.addEventListener('click', (event) => {
    if (event.target === elements.modal) {
      closeModal();
    }
  });

  elements.modalContent.addEventListener('click', (event) => {
    const step = event.target.closest('.product-wizard__step');
    if (step) {
      elements.modalContent.querySelectorAll('.product-wizard__step').forEach((el) => el.classList.remove('is-active'));
      step.classList.add('is-active');
      const variant = step.dataset.variant;
      if (state.selectedProduct) {
        state.selectedProduct.selectedVariant = variant;
      }
    }

    const button = event.target.closest('button');
    if (!button) return;
    const action = button.dataset.action;

    if (action === 'wizard-order') {
      if (state.selectedProduct) {
        addToCart({
          ...state.selectedProduct,
          variants: state.selectedProduct.variants,
          selectedVariant: state.selectedProduct.selectedVariant
        });
        closeModal();
      }
    }

    if (action === 'contact-agent') {
      window.open('https://wa.me/212612345678', '_blank');
    }
  });

  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    elements.siteHeader.classList.toggle('is-scrolled', offset > 20);
  });
}

function init() {
  renderProducts();
  renderTestimonials();
  renderFAQ();
  updateTheme(state.theme);
  renderCart();

  if (elements.year) {
    elements.year.textContent = new Date().getFullYear();
  }

  initListeners();
  lucide.createIcons();
}

init();
