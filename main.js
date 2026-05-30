/* ==========================================================================
   ANNIYAPPA PUBLICATIONS & SB INSTITUTE WEB PORTAL
   Global JavaScript Controller - main.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sticky Glass Navbar Scrolling Behavior
  initNavbarScroll();

  // 2. Set Active Menu Item Dynamically based on current page
  setActiveNavLink();

  // 3. Inject Floating WhatsApp Widget Programmatically
  injectWhatsAppWidget();

  // 4. Update Footer Copyright Year Dynamically
  updateCopyrightYear();

  // 5. Initialize Bootstrap Tooltips & Popovers (if present)
  initBootstrapComponents();

  // 6. Handle Common Form Validations (Newsletter)
  initNewsletterValidation();
});

/**
 * Adds a scroll class to the navbar once user scrolls down.
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  const checkScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  // Run on load and scroll
  checkScroll();
  window.addEventListener('scroll', checkScroll);
}

/**
 * Analyzes the browser pathname and applies the active styling class
 * to the corresponding header nav link automatically.
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  const navItems = document.querySelectorAll('.navbar-custom .nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href === pageName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/**
 * Dynamically injects a customized, animated WhatsApp chat widget into the page,
 * ensuring seamless user engagement on every page without duplicating HTML code.
 */
function injectWhatsAppWidget() {
  // Check if it already exists in HTML
  if (document.querySelector('.whatsapp-float')) return;

  const waFloat = document.createElement('a');
  waFloat.className = 'whatsapp-float';
  waFloat.href = 'https://wa.me/919962283935?text=Hello%20Anniyappa%20Publications%2C%20I%20am%20interested%20in%20your%20books%20and%20internship%20programs.';
  waFloat.target = '_blank';
  waFloat.rel = 'noopener noreferrer';
  waFloat.title = 'Chat with us on WhatsApp';
  waFloat.innerHTML = '<i class="bi bi-whatsapp"></i>';

  document.body.appendChild(waFloat);
}

/**
 * Automates copyright year tracking so that the content is always up-to-date.
 */
function updateCopyrightYear() {
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Initializes generic Bootstrap components.
 */
function initBootstrapComponents() {
  // Tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  if (typeof bootstrap !== 'undefined') {
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}

/**
 * Handles client-side validation and responsive alert for newsletter subscriptions.
 */
function initNewsletterValidation() {
  const newsletterForm = document.querySelector('.footer-newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!email || !validateEmailAddress(email)) {
      showToastAlert('Please enter a valid email address.', 'danger');
      return;
    }

    // Success response mockup
    showToastAlert('Thank you for subscribing to our newsletter!', 'success');
    emailInput.value = '';
  });
}

/**
 * Validates Email structures.
 */
function validateEmailAddress(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Displays a beautiful visual overlay alert/toast dynamically on top of the layout.
 */
function showToastAlert(message, type = 'success') {
  // Check for existing container, if not exist, create it
  let toastContainer = document.getElementById('custom-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'custom-toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '30px';
    toastContainer.style.left = '50%';
    toastContainer.style.transform = 'translateX(-50%)';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.width = '90%';
    toastContainer.style.maxWidth = '400px';
    document.body.appendChild(toastContainer);
  }

  // Create individual toast structure
  const toast = document.createElement('div');
  toast.className = `custom-toast animate__animated animate__fadeInDown`;
  
  // Custom Styles
  const bgTypeColor = type === 'success' ? '#10b981' : '#ef4444';
  toast.style.backgroundColor = bgTypeColor;
  toast.style.color = '#ffffff';
  toast.style.padding = '1rem 1.5rem';
  toast.style.borderRadius = '8px';
  toast.style.marginBottom = '0.75rem';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
  toast.style.fontFamily = "'Outfit', sans-serif";
  toast.style.fontWeight = '600';
  toast.style.fontSize = '0.95rem';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.justifyContent = 'space-between';
  toast.style.gap = '0.5rem';

  const iconName = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
  
  toast.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.75rem;">
      <i class="bi ${iconName}" style="font-size:1.25rem;"></i>
      <span>${message}</span>
    </div>
    <button type="button" style="background:none;border:none;color:#ffffff;font-size:1.2rem;cursor:pointer;padding:0;line-height:1;" onclick="this.parentElement.remove()">
      <i class="bi bi-x"></i>
    </button>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove('animate__fadeInDown');
    toast.classList.add('animate__fadeOutUp');
    toast.style.transition = 'opacity 0.5s ease';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 4000);
}

// Attach alert mechanism to window for general access across pages
window.showToastAlert = showToastAlert;
