// ── Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll reveal (generic)
function initReveal({ selector = '.reveal', staggerMs = 80, threshold = 0.1 } = {}) {
  const targets = Array.from(document.querySelectorAll(selector));
  if (targets.length === 0) return { observe: () => {} };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add('visible'), i * staggerMs);
        io.unobserve(entry.target);
      });
    },
    { threshold }
  );

  targets.forEach((el) => io.observe(el));

  return {
    observe(root = document) {
      root.querySelectorAll(selector).forEach((el) => io.observe(el));
    },
  };
}

const reveal = initReveal();

// ── Content (loaded from JSON)
const CONTENT_URL = './data/content.json';

async function loadContent() {
  const res = await fetch(CONTENT_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load content.json (${res.status})`);
  return await res.json();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value ?? '';
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = html ?? '';
}

function renderNavLinks(links) {
  const el = document.getElementById('nav-links');
  if (!el) return;
  const items = Array.isArray(links) ? links : [];
  el.innerHTML = items
    .map((l) => `<li><a href="${l.href ?? '#'}">${l.label ?? ''}</a></li>`)
    .join('');
}

function renderHeroActions(actions) {
  const el = document.getElementById('hero-actions');
  if (!el) return;
  const items = Array.isArray(actions) ? actions : [];
  el.innerHTML = items
    .map((a) => {
      const variant = a.variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
      return `<a class="${variant}" href="${a.href ?? '#'}">${a.label ?? ''}</a>`;
    })
    .join('');
}

function renderHeroStats(stats) {
  const el = document.getElementById('hero-stats');
  if (!el) return;
  const items = Array.isArray(stats) ? stats : [];
  el.innerHTML = items
    .map((s) => {
      const style = s.valueStyle ? ` style="${s.valueStyle}"` : '';
      return `
        <div class="stat-card">
          <span class="stat-label">${s.label ?? ''}</span>
          <span class="stat-value"${style}>${s.value ?? ''}</span>
        </div>
      `;
    })
    .join('');
}

function renderAboutParagraphs(paragraphsHtml) {
  const el = document.getElementById('about-text');
  if (!el) return;
  const items = Array.isArray(paragraphsHtml) ? paragraphsHtml : [];
  el.innerHTML = items.map((p) => `<p>${p}</p>`).join('');
}

function renderSkills(skills) {
  const el = document.getElementById('skills-grid');
  if (!el) return;
  const items = Array.isArray(skills) ? skills : [];
  el.innerHTML = items
    .map(
      (s) => `
      <div class="skill-item">
        <div class="skill-dot"></div>
        <span class="skill-name">${s}</span>
      </div>
    `
    )
    .join('');
}

function renderContactLinks(links) {
  const el = document.getElementById('contact-links');
  if (!el) return;
  const items = Array.isArray(links) ? links : [];
  el.innerHTML = items
    .map((l) => {
      const target = String(l.href ?? '').startsWith('http') ? ' target="_blank"' : '';
      return `
        <a class="contact-link-item" href="${l.href ?? '#'}"${target}>
          <span class="contact-link-label">${l.label ?? ''}</span>
          <span class="contact-link-val">${l.value ?? ''}</span>
          <span class="contact-link-arrow">↗</span>
        </a>
      `;
    })
    .join('');
}

async function initContent() {
  const c = await loadContent();

  if (c?.meta?.title) document.title = c.meta.title;

  setText('nav-logo', c?.nav?.logo);
  renderNavLinks(c?.nav?.links);

  setText('hero-tag', c?.hero?.tag);
  setHtml('hero-headline', c?.hero?.headlineHtml);
  setText('hero-desc', c?.hero?.desc);
  renderHeroActions(c?.hero?.actions);
  renderHeroStats(c?.hero?.stats);

  setText('about-num', c?.about?.sectionNum);
  setText('about-title', c?.about?.title);
  renderAboutParagraphs(c?.about?.paragraphsHtml);
  renderSkills(c?.about?.skills);

  setText('projects-num', c?.projects?.sectionNum);
  setText('projects-title', c?.projects?.title);

  setText('contact-num', c?.contact?.sectionNum);
  setHtml('contact-title', c?.contact?.headlineHtml);
  setText('contact-desc', c?.contact?.desc);
  renderContactLinks(c?.contact?.links);

  setText('footer-left', c?.footer?.left);
  setText('footer-right', c?.footer?.right);

  // content was injected after initReveal() => observe newly created elements
  reveal.observe(document);
}

// ── Projects (loaded from JSON)
const PROJECTS_URL = './data/projects.json';
let projectsById = {};

async function loadProjects() {
  const res = await fetch(PROJECTS_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load projects.json (${res.status})`);
  const items = await res.json();
  if (!Array.isArray(items)) throw new Error('projects.json must be an array');
  return items;
}

function indexProjects(items) {
  const byId = {};
  items.forEach((p) => {
    if (!p || !p.id) return;
    byId[p.id] = p;
  });
  return byId;
}

function renderProjectRow(p) {
  const tags = Array.isArray(p.tags) ? p.tags.slice(0, 4) : [];
  const tagsHtml = tags.map((t) => `<span class="tag">${t}</span>`).join('');

  return `
    <div class="project-row" data-project="${p.id}">
      <span class="project-row-num">${p.num ?? ''}</span>
      <span class="project-row-name">${p.title ?? ''}</span>
      <div class="project-row-tags">${tagsHtml}</div>
      <span class="project-row-arrow">→</span>
    </div>
  `;
}

async function initProjects() {
  const listEl = document.getElementById('projects-list');
  if (!listEl) return;

  const items = await loadProjects();
  projectsById = indexProjects(items);

  listEl.innerHTML = items.map(renderProjectRow).join('');

  listEl.querySelectorAll('.project-row').forEach((row) => {
    row.addEventListener('click', () => openModal(row.dataset.project));
  });

  // projects were injected after initReveal() => observe new reveal targets
  reveal.observe(listEl);
}

// ── Modal view helpers
function renderTags(tags) {
  return tags.map((t) => `<span class="modal-tag">${t}</span>`).join('');
}

function renderFeatures(features) {
  return features.map((f) => `<div class="modal-feature">${f}</div>`).join('');
}

function renderActions({ github, demo }) {
  const githubBtn = `<a href="${github}" target="_blank" class="modal-btn modal-btn-ghost">GitHub ↗</a>`;
  if (!demo) return githubBtn;
  return `<a href="${demo}" target="_blank" class="modal-btn modal-btn-primary">Ver demo →</a>${githubBtn}`;
}

// ── Modal control
const overlay = document.getElementById('modal-overlay');
const modalNum = document.getElementById('modal-num');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTags = document.getElementById('modal-tags');
const modalFeatures = document.getElementById('modal-features');
const modalActions = document.getElementById('modal-actions');
const modalClose = document.getElementById('modal-close');

function openModal(key) {
  const p = projectsById[key];
  if (!p) return;

  modalNum.textContent = p.num;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;

  modalTags.innerHTML = renderTags(p.tags);
  modalFeatures.innerHTML = renderFeatures(p.features);
  modalActions.innerHTML = renderActions(p);

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Init dynamic projects
Promise.resolve()
  .then(() => initContent())
  .then(() => initProjects())
  .catch((err) => {
    // Keep the rest of the page functional
    console.error(err);
  });

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

