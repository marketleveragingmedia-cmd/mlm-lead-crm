(function() {
  const form = document.getElementById('masterclass-registration-form');
  if (!form) return;

  const registrationCard = form.closest('.registration-card');
  if (!registrationCard) return;

  let submitting = false;

  function showState(state, data) {
    const cardInner = registrationCard.querySelector('.card-inner');
    if (!cardInner) return;

    let html = '';

    if (state === 'registered') {
      // STATE A: Existing Premium Member - Registration Complete
      const webinarDate = data.webinarDate ? new Date(data.webinarDate) : null;
      const dateStr = webinarDate ? webinarDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Thursday, October 8, 2026";
      const timeStr = webinarDate ? webinarDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" }) + " Eastern Time" : "11:00 AM Eastern Time";

      html = '<div style="text-align:center; padding:60px 40px;">' +
        '<div style="font-size:3rem; margin-bottom:20px;">&#10003;</div>' +
        '<h3 style="font-size:1.5rem; color:var(--green); margin:0 0 10px 0;">You&apos;re Registered.</h3>' +
        '<h4 style="font-size:1.2rem; color:var(--green-deep); margin:0 0 30px 0; font-weight:600;">' + (data.webinarTitle || "Cash Flow Injection Strategy Masterclass") + '</h4>' +
        '<p style="font-size:1.1rem; margin:0 0 5px 0; color:#666;">' + dateStr + '</p>' +
        '<p style="font-size:1.1rem; margin:0 0 40px 0; color:#666;">' + timeStr + '</p>' +
        '<p style="font-size:1rem; line-height:1.6; color:#333; max-width:500px; margin:0 auto;">Your Masterclass Registration Has Been Completed.</p>' +
        '<p style="font-size:1rem; line-height:1.6; color:#333; max-width:500px; margin:20px auto 0;">Watch Your Email For Your WebinarJam Confirmation And Event Access Information.</p>' +
        '</div>';
    } else if (state === 'already_registered') {
      // STATE B: Already Registered
      const webinarDate = data.webinarDate ? new Date(data.webinarDate) : null;
      const dateStr = webinarDate ? webinarDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Thursday, October 8, 2026";
      const timeStr = webinarDate ? webinarDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" }) + " Eastern Time" : "11:00 AM Eastern Time";

      html = '<div style="text-align:center; padding:60px 40px;">' +
        '<div style="font-size:3rem; margin-bottom:20px;">&#10003;</div>' +
        '<h3 style="font-size:1.5rem; color:var(--green); margin:0 0 10px 0;">You&apos;re Already Registered.</h3>' +
        '<h4 style="font-size:1.2rem; color:var(--green-deep); margin:0 0 30px 0; font-weight:600;">' + (data.webinarTitle || "Cash Flow Injection Strategy Masterclass") + '</h4>' +
        '<p style="font-size:1.1rem; margin:0 0 5px 0; color:#666;">' + dateStr + '</p>' +
        '<p style="font-size:1.1rem; margin:0 0 40px 0; color:#666;">' + timeStr + '</p>' +
        '<p style="font-size:1rem; line-height:1.6; color:#333; max-width:500px; margin:0 auto;">Your Registration Is Already Confirmed.</p>' +
        '<p style="font-size:1rem; line-height:1.6; color:#333; max-width:500px; margin:20px auto 0;">Watch Your Email For Your WebinarJam Event Information.</p>' +
        '</div>';
    } else if (state === 'premium_pending') {
      // STATE C: Premium Not Yet Confirmed
      html = '<div style="text-align:center; padding:60px 40px;">' +
        '<h3 style="font-size:1.8rem; color:var(--green-deep); margin:0 0 20px 0;">One More Step</h3>' +
        '<p style="font-size:1.1rem; line-height:1.6; color:#333; max-width:520px; margin:0 auto 30px;">Your Masterclass Seat Is Included With Premium SKOOL Membership.</p>' +
        '<div style="background:#f8f9fa; border-radius:8px; padding:30px; max-width:500px; margin:0 auto 30px;">' +
        '<h4 style="font-size:1.3rem; color:var(--green); margin:0 0 15px 0;">Premium SKOOL Membership</h4>' +
        '<p style="font-size:2rem; font-weight:700; color:var(--green-deep); margin:0 0 5px 0;">$50 Per Year</p>' +
        '<p style="font-size:0.95rem; color:#666; margin:0 0 20px 0;">Includes:</p>' +
        '<ul style="text-align:left; margin:0; padding:0 0 0 20px; list-style:disc; color:#333;">' +
        '<li style="margin-bottom:8px;">The Live Cash Flow Injection Strategy Masterclass</li>' +
        '<li style="margin-bottom:8px;">One Year Of Premium SKOOL Access</li>' +
        '<li>Official Cash Flow Visionary Status</li>' +
        '</ul>' +
        '</div>' +
        '<a href="' + data.skoolPlansUrl + '" class="btn" style="display:inline-block; text-decoration:none; margin-bottom:30px; min-width:280px;">Continue To Premium Membership</a>' +
        '<div style="font-size:0.9rem; line-height:1.6; color:#666; max-width:540px; margin:0 auto;">' +
        '<p style="margin:0 0 10px 0;">After Your Premium Membership Is Confirmed, Your Masterclass Registration Will Be Completed Automatically.</p>' +
        '<p style="margin:0 0 10px 0;">Membership Verification May Take Up To Approximately Two Hours To Sync.</p>' +
        '<p style="margin:0;">Do Not Resubmit The Masterclass Registration Form While Your Membership Is Syncing.</p>' +
        '</div>' +
        '</div>';
    } else if (state === 'error') {
      // STATE D: Temporary Failure
      html = '<div style="text-align:center; padding:60px 40px;">' +
        '<div style="font-size:3rem; margin-bottom:20px; color:#d9534f;">&#9888;</div>' +
        '<h3 style="font-size:1.5rem; color:#d9534f; margin:0 0 20px 0;">We Couldn&apos;t Complete That Step Yet.</h3>' +
        '<p style="font-size:1rem; line-height:1.6; color:#333; max-width:500px; margin:0 auto 30px;">Please Review Your Information And Try Again.</p>' +
        '<button onclick="location.reload()" class="btn" style="cursor:pointer;">Try Again</button>' +
        '</div>';
    }

    cardInner.innerHTML = html;
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (submitting) return;
    submitting = true;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';
    }

    // Get form data
    const formData = {
      firstName: form.querySelector('#firstName').value.trim(),
      lastName: form.querySelector('#lastName').value.trim(),
      email: form.querySelector('#email').value.trim(),
      phone: form.querySelector('#phone').value.trim() || undefined,
      source: 'Masterclass Registration Page',
      sourcePage: window.location.href
    };

    try {
      const response = await fetch('/api/webinar/register/CFI-2026-10-08', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Registration failed');
      }

      // SUCCESS BRANCH
      if (data.success) {
        if (data.alreadyPremium && data.alreadyRegistered) {
          // STATE B: Already Registered
          showState('already_registered', data);
        } else if (data.alreadyPremium) {
          // STATE A: Existing Premium - Newly Registered
          showState('registered', data);
        } else if (data.requiresPremium && data.skoolPlansUrl) {
          // STATE C: Premium Pending
          showState('premium_pending', data);
        } else {
          // Fallback success
          showState('registered', data);
        }
      }
      
    } catch (error) {
      // STATE D: Error
      console.error('Registration error:', error);
      showState('error', { message: error.message });
    } finally {
      submitting = false;
      if (submitBtn && form.querySelector('button[type="submit"]')) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });
})();
