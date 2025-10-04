// Basic router
const links = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
links.forEach(a => a.addEventListener('click', () => {
  links.forEach(x => x.classList.remove('active'));
  a.classList.add('active');
  const p = a.dataset.page;
  pages.forEach(pg => pg.classList.toggle('active', pg.id === p));
}));

// Particles (larger particles as requested)
const canv = document.getElementById('particles');
const ctx = canv.getContext('2d');
function resize() { canv.width = innerWidth; canv.height = innerHeight; }
addEventListener('resize', resize); resize();

let particles = [];
for (let i = 0; i < 140; i++) {
  particles.push({
    x: Math.random() * canv.width,
    y: Math.random() * canv.height,
    r: 2 + Math.random() * 5, // bigger
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canv.width, canv.height);
  for (const p of particles) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canv.width;
    if (p.x > canv.width) p.x = 0;
    if (p.y < 0) p.y = canv.height;
    if (p.y > canv.height) p.y = 0;
  }
}
setInterval(drawParticles, 1000 / 30);

// Parallax background response
addEventListener('mousemove', e => {
  const px = (e.clientX - innerWidth / 2) / innerWidth;
  const py = (e.clientY - innerHeight / 2) / innerHeight;
  const bg = document.querySelector('#bgvideo');
  if (bg) bg.style.transform = `translate(${px * 12}px, ${py * 12}px) scale(1.02)`;
  particles.forEach(p => { p.x += px * 0.12; p.y += py * 0.12; });
});

// Fetch media and render gallery + videos
async function loadMedia() {
  try {
    const res = await fetch('/api/media');
    const arr = await res.json();
    const gallery = document.getElementById('gallery-grid');
    const videos = document.getElementById('videos-grid');
    gallery.innerHTML = ''; videos.innerHTML = '';
    arr.forEach(it => {
      const card = document.createElement('div'); card.className = 'card';
      const img = document.createElement('img'); img.src = it.thumbnail; img.alt = it.title; img.loading = 'lazy';
      const h = document.createElement('h4'); h.textContent = it.title;
      card.appendChild(img); card.appendChild(h);
      card.addEventListener('click', () => {
        if (it.type === 'video') window.open(it.url, '_blank');
        else openFullscreenImage(it.url);
      });
      if (it.type === 'video') videos.appendChild(card); else gallery.appendChild(card);
    });
  } catch (e) { console.warn('media load failed', e); }
}

// Fullscreen image modal (ESC to close)
function openFullscreenImage(src) {
  let modal = document.getElementById('fs-modal');
  if (modal) modal.remove();
  modal = document.createElement('div'); modal.id = 'fs-modal'; modal.tabIndex = 0;
  modal.innerHTML = `<img src="${src}" alt="Full image"/><button id="fs-close" aria-label="close">✕</button>`;
  document.body.appendChild(modal);
  document.getElementById('fs-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.remove(); });
  modal.focus();
}

// News
async function loadNews() {
  try {
    const r = await fetch('/api/news');
    const data = await r.json();
    const list = document.getElementById('news-list'); list.innerHTML = '';
    data.forEach(n => {
      const el = document.createElement('div'); el.className = 'card';
      el.innerHTML = `<img src="${n.image}" alt="${n.title}"/><h3>${n.title}</h3><p>${n.summary}</p>`;
      el.addEventListener('click', async () => {
        const detail = await (await fetch(n.url)).json();
        document.getElementById('news-detail').classList.remove('hidden');
        document.getElementById('news-detail').innerHTML = `<h2>${detail.title}</h2><img src="${detail.image}" /><p>${detail.summary}</p>`;
        window.scrollTo({top:0,behavior:'smooth'});
      });
      list.appendChild(el);
    });
  } catch (e) { console.warn('news load failed', e); }
}

// ISS tracker
async function updateIss() {
  try {
    const r = await fetch('/api/iss/now');
    const j = await r.json();
    const pos = j && j.iss_position ? j.iss_position : null;
    if (pos) {
      document.getElementById('iss-lat').textContent = pos.latitude;
      document.getElementById('iss-lon').textContent = pos.longitude;
    }
  } catch (e) { console.warn('ISS fetch failed', e); }
}
setInterval(updateIss, 5000); updateIss();

// Constellations button
document.getElementById('open-constellation').addEventListener('click', () => {
  window.location.href = 'constellations.html';
});

// Initial loads
loadMedia(); loadNews();
