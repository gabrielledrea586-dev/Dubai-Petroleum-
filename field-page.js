const fieldPages = {
  fateh: {
    title: 'Fateh Field',
    intro: 'The oldest of the five fields, Fateh began operations in 1969. The field consists of 47 platforms, including 31 satellite wellhead platforms and 16 central complex platforms.',
    stats: [['Operating since', '1969'], ['Platforms', '47'], ['Subsea pipelines', '75']],
    paragraphs: [
      'These central complexes separate oil, gas, and water prior to processing. Once this process is complete the oil is stored offshore in the Khazzans, before it is exported.',
      'The satellite wellhead platforms are connected to the central complex platforms by subsea multiphase, lift gas, and water injection pipelines and subsea cables for electrical power.',
      'Production from all Fateh satellite wellhead platforms and from South West Fateh flow via subsea lines to the Fateh central complex. Once separated the oil is stored in the submerged Khazzans oil storage vessels. The last stage sees the oil pumped into oil tankers offshore.',
      'Processed gas is used as lift and fuel gas and for reinjection as part of an Enhanced Oil Recovery process.',
      'The Fateh Field has its own seawater treatment and injection facilities, that provide treated, high-pressure water to the satellite wellhead platforms through a subsea and surface piping network.',
      'We currently operate a total of 75 subsea pipelines across the Fateh field, including multiple transfer pipelines between the other 4 fields.'
    ]
  },
  southwest: {
    title: 'South West (SW) Fateh Field',
    intro: 'The South West Fateh field was discovered in 1972, production began three years later. The field consists of 23 platforms, including 13 satellite wellhead platforms and 10 bridge linked central complex platforms.',
    stats: [['Discovered', '1972'], ['Platforms', '23'], ['Subsea pipelines', '43']],
    paragraphs: [
      'All satellite well production flows via sub-sea lines to the South West Fateh central complex. It then passes through the South West Fateh separator and finally exported to Fateh field for further separation and storage.',
      'Gas is sent to gas processing and export facilities. Processed gas is used as a lift gas and fuel gas.',
      'The South West Fateh Field’s seawater treatment and injection facilities provide treated, high-pressure water to satellite well platforms through an South West Fateh’s central complex.',
      'We currently operate a total of 43 subsea pipelines across the South West Fateh field, including multiple transfer pipelines between South West Fateh and both Falah and Fatah.'
    ]
  },
  rashid: {
    title: 'Rashid Field',
    intro: 'The Rashid field, made up of three platforms, was discovered in 1973, full production began in 1979.',
    stats: [['Discovered', '1973'], ['Platforms', '3'], ['Subsea pipelines', '6']],
    paragraphs: [
      'Rashid field production is exported to Fateh for processing. Rashid receives water injection, gas lift and fuel gas from Fateh.',
      'The complex contains numerous production wells and has the ability to perform gas/liquid separation, lift gas compression, sea water injection and oil transfer. This field is connected to other platform facilities by subsea lift gas, water injection, and multiphase pipelines.',
      'We currently operate a total of 6 subsea pipelines across the Rashid field, including multiple transfer pipelines between Rashid and Fateh fields.'
    ]
  },
  falah: {
    title: 'Falah Field',
    intro: 'The Falah oil field was discovered in 1972 and began production in 1978. The Falah field consists of four platforms.',
    stats: [['Discovered', '1972'], ['Platforms', '4'], ['Underwater pipelines', '9']],
    paragraphs: [
      'Falah production is exported to South West Fateh for processing where it receives water injection, gas lift, and fuel gas from South West Fateh.',
      'The Falah field is connected to other platforms by subsea lift gas, water injection, multiphase pipelines and is powered by underwater cabling.',
      'The Falah field complex contains multiple production wells and can perform gas and liquid separation, lift gas compression, sea water injection and oil transfer.',
      'We currently operate nine underwater production and utility pipelines, including multiple transfer pipelines between Falah and South West Fateh fields.'
    ]
  },
  jalilah: {
    title: 'Jalilah Field',
    intro: 'The Jalilah oil field is our most recent discovery, the field consists of two platforms.',
    stats: [['Discovered', '2010'], ['Platforms', '2'], ['Subsea pipelines', '3']],
    repeat: 'The Jalilah oil field is our most recent discovery, the field consists of two platforms.',
    paragraphs: [
      'Jalilah production is exported to Fateh for processing. Jalilah receives water injection and gas lift from Fateh.',
      'We currently operate three subsea pipelines in the Jalilah field, including multiple transfer lines to the Fateh field.'
    ]
  }
};

const fieldLinks = [
  ['fateh', 'fateh-field.html', 'Fateh Field'],
  ['southwest', 'south-west-fateh-field.html', 'South West (SW) Fateh Field'],
  ['rashid', 'rashid-field.html', 'Rashid Field'],
  ['falah', 'falah-field.html', 'Falah Field'],
  ['jalilah', 'jalilah-field.html', 'Jalilah Field']
];

const fieldKey = document.body.dataset.field;
const field = fieldPages[fieldKey];
if (field) {
  document.title = `${field.title} | Dubai Petroleum`;
  const sideLinks = fieldLinks.map(([key, href, label]) => `<a class="nested${key === fieldKey ? ' active' : ''}" href="${href}"${key === fieldKey ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const stats = field.stats.map(([label, value]) => `<div class="field-stat"><span>${label}</span><strong>${value}</strong></div>`).join('');
  const details = `${field.repeat ? `<p class="field-repeat">${field.repeat}</p>` : ''}${field.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}`;
  document.body.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" id="top">
      <div class="utility-bar"><form class="search-form" id="searchForm" role="search"><label class="sr-only" for="siteSearch">Search this site</label><input id="siteSearch" type="search" placeholder="Search"><button type="submit" aria-label="Submit search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 5 5"></path></svg></button></form><span class="invoice-link" aria-disabled="true">E-INVOICING</span></div>
      <nav class="main-nav" aria-label="Primary navigation"><a class="brand" href="index.html" aria-label="Dubai Petroleum home"><img src="assets/header-logo.jpg" alt="Dubai Petroleum"></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navMenu" aria-label="Open navigation"><span></span><span></span><span></span></button><div class="nav-panel" id="navMenu"><ul class="nav-list"><li class="nav-item red has-dropdown current"><a href="#">About us</a><button class="dropdown-toggle" aria-label="Open About us menu" aria-expanded="false">+</button><ul class="dropdown"><li><a href="chairman-message.html">Chairman’s message</a></li><li><a href="our-journey.html">Our journey</a></li><li><a href="dpe-corporate-video.html">DPE media</a></li><li><a class="active" href="oil-and-gas-assets.html">Oil and gas assets</a></li></ul></li><li class="nav-item green"><a href="cyber-security.html">Governance</a></li><li class="nav-item red"><a href="technology-strategy.html">Innovation &amp; Technology</a></li><li class="nav-item green has-dropdown"><a href="responsible-operations.html">Sustainability</a><button class="dropdown-toggle" aria-label="Open Sustainability menu" aria-expanded="false">+</button><ul class="dropdown"><li><a href="responsible-operations.html">Responsible operations</a></li><li><a href="emergency-response.html">Emergency response</a></li></ul></li><li class="nav-item green has-dropdown"><a href="careers.html">Careers</a><button class="dropdown-toggle" aria-label="Open Careers menu" aria-expanded="false">+</button><ul class="dropdown"><li><a href="life-at-dpe.html">Life at DPE</a></li><li><a href="uae-national-careers.html">UAE national careers</a></li><li><a href="current-vacancies.html">Current vacancies</a></li><li><a href="new-to-dubai.html">New to Dubai</a></li><li><a href="career-opportunities-development.html">Career opportunities and development</a></li><li><a href="starting-with-dpe.html">Starting with Dubai Petroleum Establishment</a></li><li></li><li><a href="leadership-competencies.html">Leadership competencies</a></li></ul></li><li class="nav-item red"><a href="#">Contact us</a></li></ul></div></nav>
    </header>
    <main class="chairman-layout field-layout" id="main">
      <article class="chairman-content field-content"><a class="section-label" href="oil-and-gas-assets.html">About us</a><h1>${field.title}</h1><div class="print-row"><a id="printPage" href="#"><span aria-hidden="true">▣</span> Print</a></div><p class="field-lead">${field.intro}</p><div class="field-stats">${stats}</div><div class="field-details">${details}</div></article>
      <aside class="about-sidebar" aria-label="About us navigation"><a class="sidebar-title" id="sidebarToggle" href="#" aria-expanded="true">About us</a><nav class="sidebar-menu open" id="aboutSideNav"><a href="chairman-message.html">Chairman’s message</a><a href="our-journey.html">Our journey</a><a href="dpe-corporate-video.html">DPE media</a><a class="nested" href="dpe-corporate-video.html">DPE Corporate Video</a><a class="nested" href="#">DPE News</a><a href="oil-and-gas-assets.html">Oil and gas assets</a>${sideLinks}</nav></aside>
    </main>
    <footer class="chairman-footer"><a class="sitemap-link" href="#footerLinks">Sitemap <span>−</span></a><div class="chairman-footer-grid" id="footerLinks"><div><h3>About us</h3><a href="chairman-message.html">Chairman’s message</a><a href="our-journey.html">Our journey</a><a href="dpe-corporate-video.html">DPE media</a><a href="oil-and-gas-assets.html">Oil and gas assets</a></div><div><h3>Governance</h3><a href="cyber-security.html">Cyber security</a></div><div><h3>Innovation &amp; Technology</h3><a href="technology-strategy.html">Technology strategy</a><a href="technology-now.html">Technology now</a><a href="overcoming-technology-challenges.html">Overcoming technology challenges</a></div><div><h3>Sustainability</h3><a href="responsible-operations.html">Responsible operations</a><a href="emergency-response.html">Emergency response</a></div><div><h3>Careers</h3><a href="life-at-dpe.html">Life at DPE</a><a href="uae-national-careers.html">UAE national careers</a><a href="current-vacancies.html">Current vacancies</a><a href="new-to-dubai.html">New to Dubai</a><a href="career-opportunities-development.html">Career opportunities and development</a><a href="starting-with-dpe.html">Starting with Dubai Petroleum Establishment</a><a href="leadership-competencies.html">Leadership competencies</a></div><div><h3>Contact us</h3><a href="contact-details.html">Contact details</a></div></div><div class="chairman-footer-bottom"><p>© Dubai Petroleum. All rights reserved. | <a href="#">Privacy Policy</a></p><p>Dubai Petroleum is an ISO 14001 certified Company committed to continuously improve our efforts towards protecting the environment.</p></div></footer>
    <div class="cookie-bar" id="cookieBar" role="region" aria-label="Cookie notice"><p>www.dubaipetroleum.ae uses cookies to provide necessary website functionality, improve your experience and analyze our traffic. By using our website, you agree to our Privacy Policy and our Cookies Policy.</p><button id="cookieOkay" type="button">OKAY</button></div>`;
}
