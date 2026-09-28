const searchCatalog = [
  ['index.html','Dubai Petroleum','Home','Dubai Petroleum operations, certifications, careers, sustainability and contact information.','company about contact certification'],
  ['chairman-message.html','Chairman’s message','About us','A message from the Chairman of Dubai Petroleum Establishment.','chairman leadership about'],
  ['our-journey.html','Our journey','About us','Explore the history and milestones of Dubai Petroleum.','history timeline milestones journey'],
  ['dpe-corporate-video.html','DPE corporate video','DPE media','Watch the Dubai Petroleum Establishment corporate video.','media film video corporate'],
  ['oil-and-gas-assets.html','Oil and gas assets','About us','Discover Dubai Petroleum offshore oil and gas fields and assets.','fields offshore assets oil gas'],
  ['fateh-field.html','Fateh field','Oil and gas assets','Information about the Fateh offshore field.','field production offshore'],
  ['south-west-fateh-field.html','South West Fateh field','Oil and gas assets','Information about the South West Fateh field.','field production offshore'],
  ['rashid-field.html','Rashid field','Oil and gas assets','Information about the Rashid offshore field.','field production offshore'],
  ['falah-field.html','Falah field','Oil and gas assets','Information about the Falah offshore field.','field production offshore'],
  ['jalilah-field.html','Jalilah field','Oil and gas assets','Information about the Jalilah offshore field.','field production offshore'],
  ['cyber-security.html','Cyber security','Governance','Cyber security guidance and governance at Dubai Petroleum.','security governance cyber'],
  ['technology-strategy.html','Technology strategy','Innovation & Technology','Dubai Petroleum technology strategy and approach to innovation.','innovation digital strategy technology'],
  ['technology-now.html','Technology now','Innovation & Technology','Technologies currently supporting Dubai Petroleum operations.','innovation operations technology'],
  ['eor-enhanced-oil-recovery.html','EOR – Enhanced Oil Recovery','Technology now','Enhanced oil recovery technology and field applications.','eor recovery reservoir'],
  ['unconventional-oil.html','Unconventional oil','Technology now','Technology used for unconventional oil resources.','unconventional oil'],
  ['matrix-acid-stimulation.html','Matrix acid stimulation','Technology now','Matrix acid stimulation technology.','acid stimulation wells'],
  ['acid-fracturing.html','Acid fracturing','Technology now','Acid fracturing technology for oil and gas wells.','acid fracturing wells'],
  ['hydraulic-fracturing.html','Hydraulic fracturing','Technology now','Hydraulic fracturing technology and operations.','hydraulic fracturing wells'],
  ['gas-lift.html','Gas lift','Technology now','Gas lift systems used in field production.','gas lift production'],
  ['waterflood.html','Waterflood','Technology now','Waterflood technology for reservoir management.','water flood reservoir'],
  ['drilling-wells.html','Drilling wells','Technology now','Well drilling technology and operations.','drill drilling wells'],
  ['drill-well-simulator-training.html','Drill well simulator training','Technology now','Simulator-based well drilling training.','drill simulator training wells'],
  ['overcoming-technology-challenges.html','Overcoming technology challenges','Innovation & Technology','How Dubai Petroleum responds to complex technical challenges.','innovation challenge inspection engineering surveying'],
  ['advanced-inspection-techniques.html','Advanced inspection techniques','Technology challenges','Advanced techniques used to inspect offshore assets.','inspection assets advanced'],
  ['advanced-design-engineering.html','Advanced design engineering','Technology challenges','Advanced engineering and design solutions.','design engineering advanced'],
  ['laser-surveying-3d-models.html','Laser surveying and 3D models','Technology challenges','Laser surveying and three-dimensional modelling.','laser survey 3d model'],
  ['responsible-operations.html','Responsible operations','Sustainability','Dubai Petroleum’s approach to responsible operations.','sustainability responsible operations hse'],
  ['health.html','Health','Sustainability','Occupational health practices at Dubai Petroleum.','health wellbeing hse'],
  ['safety.html','Safety','Sustainability','Operational and workplace safety at Dubai Petroleum.','safety workplace hse'],
  ['environment.html','Environment','Sustainability','Environmental protection and performance.','environment sustainability hse'],
  ['green-initiatives.html','Green initiatives','Sustainability','Environmental and green initiatives at Dubai Petroleum.','green environment initiative sustainability'],
  ['emergency-response.html','Emergency response','Sustainability','Dubai Petroleum emergency preparedness and response.','emergency response safety'],
  ['careers.html','Careers','Careers','Career paths and employment at Dubai Petroleum Establishment.','jobs employment vacancies talent'],
  ['life-at-dpe.html','Life at Dubai Petroleum Establishment','Careers','People, diversity, behaviours and working life at DPE.','people culture diversity office'],
  ['uae-national-careers.html','United Arab Emirates National Careers','Careers','Employment and development programmes for UAE Nationals.','uae national intillaq graduate part time'],
  ['current-vacancies.html','Current vacancies','Careers','Current employment vacancies at Dubai Petroleum.','jobs apply employment vacancies'],
  ['new-to-dubai.html','New to Dubai','Careers','Information about currency, homes and schools for people moving to Dubai.','dubai currency exchange home schools relocation'],
  ['career-opportunities-development.html','Career opportunities and development','Careers','Career development, competence assurance and performance management.','career training coaching performance development'],
  ['starting-with-dpe.html','Starting with Dubai Petroleum Establishment','Careers','The employee induction process at Dubai Petroleum.','starting induction employee handbook'],
  ['leadership-competencies.html','Leadership competencies','Careers','Managing the business, managing people and managing self.','leadership strategic performance communication decisiveness'],
  ['contact-details.html','Contact details','Contact us','Dubai Petroleum address, enquiry form and location map.','contact address enquiry map location']
];

const escapeSearchText = (value) => value.replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const searchParams = new URLSearchParams(window.location.search);
const searchQuery = (searchParams.get('q') || '').trim();
const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);

const rankedResults = searchCatalog.map(([url,title,section,description,keywords]) => {
  const titleText = title.toLowerCase();
  const searchable = `${title} ${section} ${description} ${keywords}`.toLowerCase();
  if (!searchTerms.every((term) => searchable.includes(term))) return null;
  let score = titleText.includes(searchQuery.toLowerCase()) ? 20 : 0;
  searchTerms.forEach((term) => {
    if (titleText.includes(term)) score += 8;
    if (section.toLowerCase().includes(term)) score += 3;
    if (keywords.includes(term)) score += 2;
  });
  return {url,title,section,description,score};
}).filter(Boolean).sort((a,b) => b.score - a.score || a.title.localeCompare(b.title));

const safeQuery = escapeSearchText(searchQuery);
const resultMarkup = searchQuery && rankedResults.length
  ? rankedResults.map((result) => `<article class="search-result"><p class="search-result-meta">${escapeSearchText(result.section)}</p><h2><a href="${result.url}">${escapeSearchText(result.title)}</a></h2><p>${escapeSearchText(result.description)}</p></article>`).join('')
  : `<p class="search-empty">${searchQuery ? `No results were found for “${safeQuery}”. Try a broader search term.` : 'Enter a word or phrase using the search button above.'}</p>`;

document.title = searchQuery ? `Search results for ${searchQuery} | Dubai Petroleum` : 'Search | Dubai Petroleum';
document.body.innerHTML = `${careersHeader}<main class="search-results-shell" id="main"><h1>Search</h1><p class="search-summary">${searchQuery ? `<strong>${rankedResults.length}</strong> result${rankedResults.length === 1 ? '' : 's'} for “<strong>${safeQuery}</strong>”` : 'Search the Dubai Petroleum website'}</p><div aria-live="polite">${resultMarkup}</div></main>${careersFooter}`;
