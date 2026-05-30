/* ==========================================================================
   ANNIYAPPA PUBLICATIONS & SB INSTITUTE WEB PORTAL
   Gallery JavaScript Controller - gallery.js
   ========================================================================== */

// 1. Core Gallery Database
const GALLERY_DATABASE = [
  {
    id: 1,
    category: "Student Batches",
    title: "AI & Data Science Batch 2026",
    desc: "Group graduation photo of technical students completing deep learning tracks.",
    imgUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    category: "Internship Activities",
    title: "Full-Stack Sandboxing Lab",
    desc: "Interns pair-programming and refactoring Node.js database structures.",
    imgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    category: "Workshops",
    title: "AWS Cloud Workshop",
    desc: "Active presentation on cloud infrastructure mappings and Lambda functions.",
    imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    category: "Seminars",
    title: "Research Methodology Forum",
    desc: "Dr. C.V. Suresh Babu presenting scientific paper writing guidelines to educators.",
    imgUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    category: "Event Highlights",
    title: "National FDP Inauguration",
    desc: "Distinguished academic delegates lighting the symbolic lamp at CIT Nagar.",
    imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    category: "Student Batches",
    title: "Cloud & DevOps Intern Group",
    desc: "Interns celebrating their successful deployment of AWS container networks.",
    imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    category: "Internship Activities",
    title: "Hardware Hackathon Challenge",
    desc: "Students wiring Raspberry Pi boards for high-efficiency IoT networks.",
    imgUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    category: "Workshops",
    title: "Faculty Training Cycle",
    desc: "Lecturers interacting with micro-controllers during their FDP laboratory hours.",
    imgUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    category: "Seminars",
    title: "Emerging Quantum Tech Speech",
    desc: "Industrial guest speaker talking about the transition to quantum computing grids.",
    imgUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80"
  }
];

// 2. Initializer & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('gallery-masonry-grid');
  const filterWrapper = document.getElementById('gallery-category-filters');
  
  if (!galleryGrid) return;

  // Initialize Gallery Render
  renderGallery(GALLERY_DATABASE, galleryGrid);

  // Initialize Filters
  initGalleryFilters(galleryGrid, filterWrapper);

  // Create Lightbox Container in body dynamically
  createLightboxContainer();
});

/**
 * Iterates through images data and outputs responsive masonry structures into the grid.
 */
function renderGallery(galleryItems, container) {
  container.innerHTML = '';

  if (galleryItems.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-images fs-1 text-muted"></i>
        <h4 class="mt-3 text-primary">No images in this category</h4>
        <p class="text-muted">Please select another event highlight category.</p>
      </div>
    `;
    return;
  }

  galleryItems.forEach(item => {
    const galleryCard = document.createElement('div');
    galleryCard.className = 'gallery-item animate__animated animate__fadeIn';
    galleryCard.style.animationDuration = '0.5s';
    
    galleryCard.innerHTML = `
      <div class="gallery-img-container" onclick="openLightbox('${item.imgUrl}', '${escapeHtml(item.title)} - ${escapeHtml(item.desc)}')">
        <img src="${item.imgUrl}" alt="${item.title}" loading="lazy">
        <div class="gallery-img-overlay">
          <div class="gallery-info-text">
            <p class="gallery-info-category">${item.category}</p>
            <h5 class="gallery-info-title">${item.title}</h5>
          </div>
        </div>
      </div>
    `;
    container.appendChild(galleryCard);
  });
}

/**
 * Ties category pill clicks with filtering routines.
 */
function initGalleryFilters(gridContainer, filterWrapper) {
  if (!filterWrapper) return;

  const buttons = filterWrapper.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active States
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      if (filterVal === 'All') {
        renderGallery(GALLERY_DATABASE, gridContainer);
      } else {
        const filtered = GALLERY_DATABASE.filter(item => item.category === filterVal);
        renderGallery(filtered, gridContainer);
      }
    });
  });
}

/**
 * Programmatically builds a lightbox backdrop overlay.
 */
function createLightboxContainer() {
  if (document.getElementById('lightbox-modal-window')) return;

  const lightboxModal = document.createElement('div');
  lightboxModal.id = 'lightbox-modal-window';
  lightboxModal.className = 'lightbox-modal';
  
  lightboxModal.innerHTML = `
    <button type="button" class="lightbox-close-btn" onclick="closeLightbox()">&times;</button>
    <div class="lightbox-content-wrapper">
      <img id="lightbox-main-img" class="lightbox-img animate__animated animate__zoomIn" src="" alt="View Scale">
      <p id="lightbox-image-caption" class="lightbox-caption"></p>
    </div>
  `;

  // Attach keyboard events to close lightbox with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Close lightbox clicking on overlay background
  lightboxModal.addEventListener('click', (e) => {
    if (e.target.className === 'lightbox-modal') {
      closeLightbox();
    }
  });

  document.body.appendChild(lightboxModal);
}

/**
 * Triggers full-screen visual modal highlighting the targeted image.
 */
function openLightbox(url, caption) {
  const modal = document.getElementById('lightbox-modal-window');
  const img = document.getElementById('lightbox-main-img');
  const cap = document.getElementById('lightbox-image-caption');

  if (!modal || !img || !cap) return;

  img.src = url;
  cap.textContent = caption;
  modal.classList.add('show');
}

/**
 * Standard closing sequence for the lightbox window.
 */
function closeLightbox() {
  const modal = document.getElementById('lightbox-modal-window');
  if (modal) {
    modal.classList.remove('show');
  }
}

/**
 * Escapes characters for HTML validation.
 */
function escapeHtml(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
