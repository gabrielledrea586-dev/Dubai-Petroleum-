const enquiryForm = document.querySelector('#enquiryForm');
const formStatus = document.querySelector('#formStatus');

enquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.className = 'form-status';
  if (!enquiryForm.checkValidity()) {
    enquiryForm.reportValidity();
    formStatus.textContent = 'Please complete all required fields.';
    formStatus.classList.add('error');
    return;
  }
  formStatus.textContent = 'Thank you. Your enquiry has been prepared successfully.';
  formStatus.classList.add('success');
  enquiryForm.reset();
});
