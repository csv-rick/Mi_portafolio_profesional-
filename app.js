// ===============================
// Utilidades DOM para la actividad
// ===============================

// DOM: año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// DOM: Toggle de tema (oscuro / aún más oscuro :P)
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  // Alternamos una clase en el body para simular cambio de tema
  document.body.classList.toggle('dim');
  themeBtn.textContent = document.body.classList.contains('dim') ? 'Tema: Dim' : 'Tema';
});

// DOM: Filtro por categoría usando data-attributes
const chips = document.querySelectorAll('.chip');
const grid = document.getElementById('projectsGrid');
const cards = grid.querySelectorAll('.card');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    // Activamos visualmente el chip seleccionado
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter; // 'all' | 'web' | 'data' | 'business'
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      // Mostrar/ocultar sin recargar la página
      card.style.display = match ? '' : 'none';
    });
  });
});

// DOM: Búsqueda por título (textContent)
const search = document.getElementById('searchInput');
search.addEventListener('input', () => {
  const q = search.value.toLowerCase().trim();
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    card.style.display = title.includes(q) ? '' : 'none';
  });
});

// DOM: Cambiar dinámicamente el proyecto destacado (texto + imagen)
const highlightBtn = document.getElementById('highlightRandomizer');
const highlightImg = document.getElementById('highlightImg');
const highlightTitle = document.getElementById('highlightTitle');

const highlights = [
  {
    title: 'Sistema de Inventarios CMIC (Full‑Stack)',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Segmentación de Clientes con K‑Means',
    img: 'https://images.unsplash.com/photo-1551288049-7c52f1e9912f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'PaluGIS: Estratos & Casos Exportables',
    img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'My Atomic Agenda · App Web Progresiva',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'
  }
];

highlightBtn.addEventListener('click', () => {
  const i = Math.floor(Math.random() * highlights.length);
  // Cambiamos contenido del DOM en tiempo real
  highlightTitle.textContent = highlights[i].title;
  highlightImg.src = highlights[i].img;
});

// Tema "dim" (extra oscuro) con CSS variables dinámicas opcionales
const applyDimTheme = () => {
  if (document.body.classList.contains('dim')) {
    document.documentElement.style.setProperty('--bg', '#0a0a0c');
    document.documentElement.style.setProperty('--panel', '#13131a');
  } else {
    document.documentElement.style.setProperty('--bg', '#0f0f13');
    document.documentElement.style.setProperty('--panel', '#16161d');
  }
};
applyDimTheme();
document.body.addEventListener('classchange', applyDimTheme);

// Observa cambios de clase en body (polyfill simple)
const bodyObserver = new MutationObserver(applyDimTheme);
bodyObserver.observe(document.body, {attributes:true, attributeFilter:['class']});
// ===============================
// Envío de formulario a WhatsApp
// ===============================
const WA_NUMBER = '522281474836'; // +52 228 147 4836

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name  = (document.getElementById('nameInput')?.value || '').trim();
    const email = (document.getElementById('emailInput')?.value || '').trim();
    const msg   = (document.getElementById('msgInput')?.value || '').trim();

    // Construir mensaje con saltos de línea
    const text = `Hola, soy ${name}.\nCorreo: ${email}\n\n${msg}`;
    const url  = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    // Abre WhatsApp Web o la app
    const win = window.open(url, '_blank');
    if (!win) window.location.href = url; // Fallback si el popup es bloqueado
  });
}
