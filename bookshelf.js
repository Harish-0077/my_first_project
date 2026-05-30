/* ==========================================================================
   ANNIYAPPA PUBLICATIONS & SB INSTITUTE WEB PORTAL
   Bookshelf JavaScript Controller - bookshelf.js
   ========================================================================== */

// 1. Core Textbook Data Array
const BOOK_DATABASE = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence & Expert Systems",
    author: "Dr. C.V. Suresh Babu",
    category: "Artificial Intelligence",
    isbn: "978-93-80627-44-1",
    publisher: "Anniyappa Publications",
    desc: "A comprehensive introductory guide to fundamental AI theory, fuzzy logic systems, state space searches, neural architectures, and industrial expert system implementations.",
    themeGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    themeLogoColor: "#fbbf24",
    year: 2024
  },
  {
    id: 2,
    title: "Web Technology Essentials: HTML5, CSS3, ES6 & Backend Node",
    author: "Dr. C.V. Suresh Babu",
    category: "Web Technology",
    isbn: "978-93-82563-12-8",
    publisher: "Anniyappa Publications",
    desc: "An end-to-end curriculum manual detailing responsive layouts, flexbox, CSS Grid, custom components, Javascript classes, HTTP structures, Express servers, and MongoDB.",
    themeGradient: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
    themeLogoColor: "#6ee7b7",
    year: 2025
  },
  {
    id: 3,
    title: "Cloud Computing & Serverless Infrastructures with AWS",
    author: "SB Institute Collaboration Team",
    category: "Cloud Computing",
    isbn: "978-93-83214-77-9",
    publisher: "Anniyappa Publications",
    desc: "Detailed architectural guide covering cloud service models, virtualization, AWS EC2, S3 buckets, Lambda functions, IAM security roles, and cloud billing structures.",
    themeGradient: "linear-gradient(135deg, #0369a1 0%, #0284c7 100%)",
    themeLogoColor: "#bae6fd",
    year: 2024
  },
  {
    id: 4,
    title: "Data Science with Python: Analysis, Modeling & Visualization",
    author: "Dr. C.V. Suresh Babu",
    category: "Data Science",
    isbn: "978-93-80129-88-0",
    publisher: "Anniyappa Publications",
    desc: "A rigorous mathematical and programming textbook. Explains NumPy calculations, Pandas frames, Scikit-learn regressions, Matplotlib structures, and data preprocessing pipelines.",
    themeGradient: "linear-gradient(135deg, #3730a3 0%, #4338ca 100%)",
    themeLogoColor: "#c7d2fe",
    year: 2025
  },
  {
    id: 5,
    title: "Core Computer Science Principles & Algorithms",
    author: "Dr. C.V. Suresh Babu",
    category: "Computer Science",
    isbn: "978-93-80112-04-2",
    publisher: "Anniyappa Publications",
    desc: "Undergraduate curriculum textbook detailing search trees, graph theory, time-complexity analysis, dynamic algorithms, compilers, and hardware CPU architectures.",
    themeGradient: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
    themeLogoColor: "#9ca3af",
    year: 2023
  },
  {
    id: 6,
    title: "Internet of Things (IoT) Systems: Sensors, Protocols & Nodes",
    author: "Dr. C.V. Suresh Babu",
    category: "IoT",
    isbn: "978-93-85514-66-3",
    publisher: "Anniyappa Publications",
    desc: "Hands-on engineering textbook focusing on Raspberry Pi, Arduino controls, MQTT pathways, CoAP protocols, wireless sensor nodes, and smart home structures.",
    themeGradient: "linear-gradient(135deg, #701a75 0%, #86198f 100%)",
    themeLogoColor: "#f5d0fe",
    year: 2024
  },
  {
    id: 7,
    title: "Blockchain Foundations: Smart Contracts & Ethereum Web3",
    author: "SB Institute Collaboration Team",
    category: "Blockchain",
    isbn: "978-93-82559-09-1",
    publisher: "Anniyappa Publications",
    desc: "Explains consensus mechanisms, cryptography, peer-to-peer hashing, Solidity programming syntax, EVM nodes, Truffle compilations, and dApp front-end connections.",
    themeGradient: "linear-gradient(135deg, #9f1239 0%, #be123c 100%)",
    themeLogoColor: "#fecdd3",
    year: 2025
  },
  {
    id: 8,
    title: "Summer Internship Manual: Full-Stack Project Portfolios",
    author: "SB Institute Advisory Panel",
    category: "Internship Learning Materials",
    isbn: "978-93-81204-11-2",
    publisher: "Anniyappa Publications",
    desc: "Comprehensive workbook detailing software engineering workflows, Git version systems, agile task alignments, project document preparations, and viva preparation guidelines.",
    themeGradient: "linear-gradient(135deg, #854d0e 0%, #a16207 100%)",
    themeLogoColor: "#fef08a",
    year: 2026
  },
  {
    id: 9,
    title: "Deep Learning Foundations: Convolutional & Recurrent Nets",
    author: "Dr. C.V. Suresh Babu",
    category: "Artificial Intelligence",
    isbn: "978-93-80627-77-9",
    publisher: "Anniyappa Publications",
    desc: "A advanced mathematical expansion textbook detailing gradient descent derivations, matrix calculations, CNN filter mechanics, RNN gates, and PyTorch training pipelines.",
    themeGradient: "linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%)",
    themeLogoColor: "#ddd6fe",
    year: 2025
  },
  {
    id: 10,
    title: "Cloud DevOps Engineering & Automation Pipelines",
    author: "SB Institute Collaboration Team",
    category: "Cloud Computing",
    isbn: "978-93-83214-99-1",
    publisher: "Anniyappa Publications",
    desc: "Focuses on Linux automation scripting, Ansible playbooks, Docker cluster nodes, Kubernetes deployments, and unified Jenkins pipeline integrations.",
    themeGradient: "linear-gradient(135deg, #155e75 0%, #0e7490 100%)",
    themeLogoColor: "#a5f3fc",
    year: 2026
  }
];

// 2. DOM Elements & Initializer
document.addEventListener('DOMContentLoaded', () => {
  const bookGrid = document.getElementById('bookshelf-grid');
  const filterContainer = document.getElementById('bookshelf-filters');
  if (!bookGrid) return;

  // Initialize books rendering
  renderBooks(BOOK_DATABASE, bookGrid);

  // Initialize interactive category filters
  initFilters(bookGrid, filterContainer);
});

/**
 * Iterates through book datasets and injects formatted HTML cards into the DOM.
 */
function renderBooks(booksList, container) {
  container.innerHTML = '';
  
  if (booksList.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-folder-x fs-1 text-muted"></i>
        <h4 class="mt-3 text-primary">No textbooks found</h4>
        <p class="text-muted">Try selecting a different filter category.</p>
      </div>
    `;
    return;
  }

  booksList.forEach(book => {
    const cardCol = document.createElement('div');
    cardCol.className = 'col animate__animated animate__fadeIn';
    cardCol.style.animationDuration = '0.5s';
    
    // Construct HTML template cleanly
    cardCol.innerHTML = `
      <div class="book-card">
        <!-- Visual Cover -->
        <div class="book-cover-container" style="background: ${book.themeGradient};">
          <div class="book-cover-overlay-mesh"></div>
          <div class="book-cover-mock" style="background: ${book.themeGradient};">
            <div class="book-cover-logo" style="color: ${book.themeLogoColor};">AP - SB Institute</div>
            <div class="book-cover-title">${book.title}</div>
            <div class="book-cover-author">${book.author}</div>
          </div>
        </div>
        <!-- Card Details -->
        <div class="book-card-body">
          <span class="book-category-tag">${book.category}</span>
          <h4 class="book-title" title="${book.title}">${book.title}</h4>
          <p class="book-author">By <strong>${book.author}</strong> | ${book.publisher}</p>
          <p class="book-desc">${book.desc}</p>
          
          <div class="book-meta">
            <span>ISBN: <strong>${book.isbn}</strong></span>
            <span>Ed: <strong>${book.year}</strong></span>
          </div>

          <div class="book-action-buttons">
            <button class="btn btn-custom btn-custom-outline-primary" onclick="triggerSampleModal('${escapeHtml(book.title)}', '${book.isbn}')">
              <i class="bi bi-file-earmark-pdf"></i> Sample
            </button>
            <a href="https://wa.me/919962283935?text=Hello%20Anniyappa%20Publications%2C%20I%20am%20interested%20in%20inquiring%20about%20the%20textbook%3A%20${encodeURIComponent(book.title)}%20%28ISBN%3A%20${book.isbn}%29." 
               target="_blank" rel="noopener noreferrer" class="btn btn-custom btn-custom-secondary text-white">
              <i class="bi bi-chat-dots-fill"></i> Inquire
            </a>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(cardCol);
  });
}

/**
 * Initializes and wires click events to filter category pills dynamically.
 */
function initFilters(gridContainer, filterWrapper) {
  if (!filterWrapper) return;
  
  const filterButtons = filterWrapper.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Toggle active states
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterCategory = btn.getAttribute('data-filter');
      
      if (filterCategory === 'All') {
        renderBooks(BOOK_DATABASE, gridContainer);
      } else {
        const filtered = BOOK_DATABASE.filter(book => book.category === filterCategory);
        renderBooks(filtered, gridContainer);
      }
    });
  });
}

/**
 * Triggers an interactive Bootstrap Modal mockup displaying standard table of contents.
 */
function triggerSampleModal(title, isbn) {
  // Check if modal container already exists in DOM, else create it
  let modalDiv = document.getElementById('book-sample-modal');
  if (!modalDiv) {
    modalDiv = document.createElement('div');
    modalDiv.id = 'book-sample-modal';
    modalDiv.className = 'modal fade';
    modalDiv.tabIndex = -1;
    modalDiv.ariaHidden = 'true';
    document.body.appendChild(modalDiv);
  }

  modalDiv.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0" style="border-radius:16px; overflow:hidden;">
        <div class="modal-header text-white bg-primary p-4">
          <h5 class="modal-title font-heading fw-bold" id="sampleModalLabel">Sample Chapter Download</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4 text-center">
          <div class="mb-3 text-warning">
            <i class="bi bi-file-earmark-pdf-fill" style="font-size: 3.5rem;"></i>
          </div>
          <h5 class="text-primary fw-bold font-heading">${title}</h5>
          <p class="text-muted small mb-4">ISBN: ${isbn} | Publisher: Anniyappa Publications</p>
          
          <div class="text-start bg-light p-3 rounded-3 mb-4" style="font-size:0.85rem;">
            <p class="fw-bold mb-2 font-heading text-dark">Sample Contents Available:</p>
            <ul class="mb-0 text-muted list-unstyled">
              <li><i class="bi bi-check-short text-success"></i> Chapter 1: Introduction and Scope (Full PDF)</li>
              <li><i class="bi bi-check-short text-success"></i> Chapter 2: Core Analytical Paradigms (Full PDF)</li>
              <li><i class="bi bi-check-short text-success"></i> Appendix A: Code Sandboxing Guide (Full PDF)</li>
            </ul>
          </div>

          <p class="small text-muted mb-4">Click below to download the sample textbook chapter file (PDF).</p>
          
          <div class="d-flex gap-3 justify-content-center">
            <a href="https://raw.githubusercontent.com/sureshbabu-cv/sureshbabu-cv/main/placeholder_syllabus.pdf" 
               target="_blank" class="btn btn-custom btn-custom-secondary px-4">
              <i class="bi bi-download"></i> Download Sample PDF
            </a>
            <button type="button" class="btn btn-custom btn-custom-outline-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Trigger modal instance
  const bsModal = new bootstrap.Modal(modalDiv);
  bsModal.show();
}

/**
 * Escapes HTML structures to avoid XSS issues.
 */
function escapeHtml(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
