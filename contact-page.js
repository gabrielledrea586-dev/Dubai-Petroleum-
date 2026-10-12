const enquiryForm = document.querySelector('#enquiryForm');
const formStatus = document.querySelector('#formStatus');
const contactEmail = 'info@dubaipetroleums.com';

enquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.className = 'form-status';
  if (!enquiryForm.checkValidity()) {
    enquiryForm.reportValidity();
    formStatus.textContent = 'Please complete all required fields.';
    formStatus.classList.add('error');
    return;
  }

  const formData = new FormData(enquiryForm);
  const subject = encodeURIComponent(`Dubai Petroleum ${formData.get('enquiryType') || 'Enquiry'}`);
  const body = encodeURIComponent([
    `Name: ${formData.get('name') || ''}`,
    `Telephone: ${formData.get('telephone') || ''}`,
    `Email: ${formData.get('email') || ''}`,
    `Enquiry Type: ${formData.get('enquiryType') || ''}`,
    '',
    formData.get('message') || ''
  ].join('\n'));

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Opening your email app to send this enquiry.';
  formStatus.classList.add('success');
});
