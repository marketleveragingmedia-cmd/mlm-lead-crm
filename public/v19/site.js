/* V19 frontend-only form adapter. NO previous application scripts imported. */
(function(){
  'use strict';
  const form=document.getElementById('foundation-form');
  if(!form)return;
  const status=document.getElementById('form-status');
  form.addEventListener('submit',async function(event){
    event.preventDefault();
    if(!form.reportValidity())return;
    if(typeof window.NLCRegistrationHandler!=='function'){
      status.hidden=false;
      status.textContent='Registration is not connected in this standalone visual build. Use the deployed staging website once the NLC Lead CRM integration has been verified.';
      return;
    }
    const submit=form.querySelector('button[type="submit"]');
    const wasDisabled=submit.disabled;
    submit.disabled=true;
    status.hidden=false;
    status.textContent='Submitting your registration...';
    try{
      const result=await window.NLCRegistrationHandler({
        firstName:form.elements['firstName'].value.trim(),
        lastName:form.elements['lastName'].value.trim(),
        email:form.elements['email'].value.trim(),
        mobile:form.elements['mobile'].value.trim(),
        source:'foundation-for-success-experience'
      });
      if(!result || result.success!==true || typeof result.redirectUrl!=='string' || !result.redirectUrl.startsWith('https://')){
        throw new Error('Registration was not confirmed by the CRM handler.');
      }
      status.textContent='Registration received. Continuing to the NLC Community...';
      window.location.assign(result.redirectUrl);
    }catch(err){
      status.textContent='Registration could not be completed. Please try again.';
    }finally{submit.disabled=wasDisabled;}
  });
})();
