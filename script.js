const localNav = [
  { label: 'About us', href: 'chairman-message.html', tone: 'red', links: [['chairman-message.html','Chairman’s message'],['our-journey.html','Our journey'],['dpe-corporate-video.html','DPE media'],['oil-and-gas-assets.html','Oil and gas assets']] },
  { label: 'Governance', href: 'cyber-security.html', tone: 'green', links: [['cyber-security.html','Cyber security']] },
  { label: 'Innovation & Technology', href: 'technology-strategy.html', tone: 'red', links: [['technology-strategy.html','Technology strategy'],['technology-now.html','Technology now'],['overcoming-technology-challenges.html','Overcoming technology challenges']] },
  { label: 'Sustainability', href: 'responsible-operations.html', tone: 'green', links: [['responsible-operations.html','Responsible operations'],['emergency-response.html','Emergency response']] },
  { label: 'Careers', href: 'careers.html', tone: 'green', links: [['life-at-dpe.html','Life at DPE'],['uae-national-careers.html','UAE national careers'],['current-vacancies.html','Current vacancies'],['new-to-dubai.html','New to Dubai'],['career-opportunities-development.html','Career opportunities and development'],['starting-with-dpe.html','Starting with Dubai Petroleum Establishment'],['leadership-competencies.html','Leadership competencies']] }
];

const sectionPages = {
  'About us': ['chairman-message.html','our-journey.html','dpe-corporate-video.html','oil-and-gas-assets.html','fateh-field.html','south-west-fateh-field.html','rashid-field.html','falah-field.html','jalilah-field.html'],
  Governance: ['governance.html','cyber-security.html'],
  'Innovation & Technology': ['innovation-technology.html','technology-strategy.html','technology-now.html','eor-enhanced-oil-recovery.html','unconventional-oil.html','matrix-acid-stimulation.html','acid-fracturing.html','hydraulic-fracturing.html','gas-lift.html','waterflood.html','drilling-wells.html','drill-well-simulator-training.html','overcoming-technology-challenges.html','advanced-inspection-techniques.html','advanced-design-engineering.html','laser-surveying-3d-models.html'],
  Sustainability: ['responsible-operations.html','health.html','safety.html','environment.html','green-initiatives.html','emergency-response.html'],
  Careers: ['careers.html','life-at-dpe.html','uae-national-careers.html','current-vacancies.html','new-to-dubai.html','career-opportunities-development.html','starting-with-dpe.html','leadership-competencies.html']
};

function disableExternalInvoicingLink() {
  document.querySelectorAll('.invoice-link').forEach((invoiceLink) => {
    invoiceLink.removeAttribute('href');
    invoiceLink.removeAttribute('target');
    invoiceLink.removeAttribute('rel');
    invoiceLink.setAttribute('aria-disabled', 'true');
    invoiceLink.setAttribute('title', 'E-INVOICING');
  });
}

function normalizePrimaryNavigation() {
  const navList = document.querySelector('.nav-list');
  if (!navList) return;
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const existingItems = [...navList.children];
  localNav.forEach((section) => {
    let item = existingItems.find((candidate) => candidate.querySelector(':scope > a')?.textContent.trim() === section.label);
    if (!item) {
      item = document.createElement('li');
      navList.append(item);
    }
    item.className = `nav-item ${section.tone} has-dropdown${sectionPages[section.label]?.includes(currentFile) ? ' current' : ''}`;
    item.innerHTML = `<a href="${section.href}">${section.label}</a><button class="dropdown-toggle" type="button" aria-label="Open ${section.label} menu" aria-expanded="false">+</button><ul class="dropdown">${section.links.map(([href,label]) => `<li><a href="${href}"${href === currentFile ? ' class="active" aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul>`;
  });
  let contact = [...navList.children].find((candidate) => candidate.querySelector(':scope > a')?.textContent.trim() === 'Contact us');
  if (!contact) {
    contact = document.createElement('li');
    navList.append(contact);
  }
  const contactIsCurrent = currentFile === 'contact-details.html';
  contact.className = `nav-item red has-dropdown${contactIsCurrent ? ' current' : ''}`;
  contact.innerHTML = `<a href="contact-details.html">Contact us</a><button class="dropdown-toggle" type="button" aria-label="Open Contact us menu" aria-expanded="false">+</button><ul class="dropdown"><li><a href="contact-details.html"${contactIsCurrent ? ' class="active" aria-current="page"' : ''}>Contact details</a></li></ul>`;
  document.querySelectorAll('a').forEach((link) => {
    if (link.textContent.trim() === 'Contact details') link.href = 'contact-details.html';
  });
  if (!document.querySelector('.nav-scrim')) {
    const scrim = document.createElement('button');
    scrim.className = 'nav-scrim';
    scrim.type = 'button';
    scrim.setAttribute('aria-label', 'Close navigation');
    document.body.append(scrim);
  }
}

normalizePrimaryNavigation();
disableExternalInvoicingLink();

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.slider-dots button')];
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => {
    const active = i === currentSlide;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-selected', String(active));
  });
}

function restartSlider() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), 6500);
}

if (slides.length) {
  document.querySelector('.slider-arrow.prev')?.addEventListener('click', () => { showSlide(currentSlide - 1); restartSlider(); });
  document.querySelector('.slider-arrow.next')?.addEventListener('click', () => { showSlide(currentSlide + 1); restartSlider(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); restartSlider(); }));
  restartSlider();
}

const menuButton = document.querySelector('.menu-toggle');
menuButton?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.dropdown-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.nav-item');
    document.querySelectorAll('.nav-item.expanded').forEach((expanded) => {
      if (expanded !== item) {
        expanded.classList.remove('expanded');
        expanded.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      }
    });
    const open = item.classList.toggle('expanded');
    button.setAttribute('aria-expanded', String(open));
  });
});

document.querySelectorAll('.nav-panel a').forEach((link) => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('.nav-scrim')?.addEventListener('click', () => menuButton?.click());

const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#siteSearch');
const searchButton = searchForm?.querySelector('button[type="submit"]');
const openSearch = () => {
  searchForm?.classList.add('open');
  searchButton?.setAttribute('aria-expanded', 'true');
  searchButton?.setAttribute('aria-label', 'Submit search');
  searchInput?.focus();
};
const closeSearch = (force = false) => {
  if (!force && searchInput?.value.trim()) return;
  searchForm?.classList.remove('open');
  searchButton?.setAttribute('aria-expanded', 'false');
  searchButton?.setAttribute('aria-label', 'Open search');
};

searchButton?.setAttribute('aria-expanded', 'false');
searchButton?.setAttribute('aria-label', 'Open search');
const initialSearch = new URLSearchParams(window.location.search).get('q');
if (initialSearch && searchInput) {
  searchInput.value = initialSearch;
  openSearch();
}
searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!searchForm.classList.contains('open') || !searchInput.value.trim()) {
    openSearch();
    return;
  }
  const query = encodeURIComponent(searchInput.value.trim());
  window.location.href = `search-results.html?q=${query}`;
});
document.addEventListener('pointerdown', (event) => {
  if (searchForm && !searchForm.contains(event.target)) closeSearch();
});

const cookieBar = document.querySelector('#cookieBar');
if (cookieBar && localStorage.getItem('dpe-cookie-accepted') === '1') cookieBar.classList.add('hidden');
document.querySelector('#cookieOkay')?.addEventListener('click', () => {
  localStorage.setItem('dpe-cookie-accepted', '1');
  cookieBar.classList.add('hidden');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) menuButton.click();
  if (event.key === 'Escape') {
    closeSearch(true);
    searchInput?.blur();
    document.querySelectorAll('.nav-item.expanded').forEach((item) => {
      item.classList.remove('expanded');
      item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  }
});

document.querySelector('#printPage')?.addEventListener('click', (event) => {
  event.preventDefault();
  window.print();
});

document.querySelector('#sidebarToggle')?.addEventListener('click', (event) => {
  event.preventDefault();
  const sideNav = document.querySelector('#aboutSideNav');
  const open = sideNav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});

if (!document.querySelector('.whatsapp-widget')) {
  const whatsappWidget = document.createElement('div');
  whatsappWidget.className = 'whatsapp-widget';
  whatsappWidget.innerHTML = `<section class="whatsapp-panel" id="whatsappPanel" aria-label="Dubai Petroleum WhatsApp contact" aria-hidden="true">
    <div class="whatsapp-panel-head">
      <img src="assets/contact-header.jpg" alt="Dubai Petroleum offshore operations">
      <button class="whatsapp-panel-close" type="button" aria-label="Close WhatsApp contact card">×</button>
    </div>
    <div class="whatsapp-panel-body">
      <p class="whatsapp-business-name">Dubai Petroleum Establishment</p>
      <h2>How can we help?</h2>
      <div class="whatsapp-business-message">
        <p>Welcome to Dubai Petroleum.</p>
        <p>Thank you for getting in touch. Our team is available to assist with your enquiry and will respond as soon as possible.</p>
      </div>
      <a class="whatsapp-start" href="https://wa.me/12252532928" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27.3 4.7A15.8 15.8 0 0 0 2.4 23.8L.2 32l8.4-2.2A15.8 15.8 0 0 0 32 15.9c0-4.2-1.7-8.2-4.7-11.2ZM16.1 29.3c-2.5 0-5-.7-7.1-2l-.5-.3-5 1.3 1.3-4.9-.3-.5A13.1 13.1 0 1 1 16.1 29.3Zm7.2-9.8c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-2.3-1.1-3.8-2-5.3-4.6-.4-.7.4-.7 1.1-2.2.1-.3.1-.6 0-.8-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.8.1-1.2.6-.4.4-1.6 1.6-1.6 3.9s1.7 4.5 1.9 4.8c.2.3 3.3 5.1 8.1 7.1 3 1.3 4.2 1.4 5.8 1.2.9-.1 2.3-.9 2.6-1.9.3-.9.3-1.8.2-1.9-.1-.2-.5-.3-.9-.5Z"/></svg><span>Start WhatsApp Chat</span></a>
      <p class="whatsapp-number">+12252532928</p>
    </div>
  </section>
  <button class="whatsapp-float" type="button" aria-label="Open WhatsApp contact card" aria-controls="whatsappPanel" aria-expanded="false"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27.3 4.7A15.8 15.8 0 0 0 2.4 23.8L.2 32l8.4-2.2A15.8 15.8 0 0 0 32 15.9c0-4.2-1.7-8.2-4.7-11.2ZM16.1 29.3c-2.5 0-5-.7-7.1-2l-.5-.3-5 1.3 1.3-4.9-.3-.5A13.1 13.1 0 1 1 16.1 29.3Zm7.2-9.8c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-2.3-1.1-3.8-2-5.3-4.6-.4-.7.4-.7 1.1-2.2.1-.3.1-.6 0-.8-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.8.1-1.2.6-.4.4-1.6 1.6-1.6 3.9s1.7 4.5 1.9 4.8c.2.3 3.3 5.1 8.1 7.1 3 1.3 4.2 1.4 5.8 1.2.9-.1 2.3-.9 2.6-1.9.3-.9.3-1.8.2-1.9-.1-.2-.5-.3-.9-.5Z"/></svg></button>`;
  document.body.append(whatsappWidget);

  const whatsappToggle = whatsappWidget.querySelector('.whatsapp-float');
  const whatsappPanel = whatsappWidget.querySelector('.whatsapp-panel');
  const whatsappClose = whatsappWidget.querySelector('.whatsapp-panel-close');
  const setWhatsappOpen = (open) => {
    whatsappWidget.classList.toggle('open', open);
    whatsappToggle.setAttribute('aria-expanded', String(open));
    whatsappToggle.setAttribute('aria-label', open ? 'Close WhatsApp contact card' : 'Open WhatsApp contact card');
    whatsappPanel.setAttribute('aria-hidden', String(!open));
  };
  whatsappToggle.addEventListener('click', () => setWhatsappOpen(!whatsappWidget.classList.contains('open')));
  whatsappClose.addEventListener('click', () => {
    setWhatsappOpen(false);
    whatsappToggle.focus();
  });
  document.addEventListener('pointerdown', (event) => {
    if (!whatsappWidget.contains(event.target)) setWhatsappOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && whatsappWidget.classList.contains('open')) {
      setWhatsappOpen(false);
      whatsappToggle.focus();
    }
  });
}