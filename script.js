// Pon aquí el correo de la agencia cuando exista: las postales se abrirán dirigidas a él.
const CONTACT_EMAIL = '';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ORDER = ['tenerife', 'gran-canaria', 'lanzarote', 'fuerteventura', 'la-palma', 'la-gomera', 'el-hierro', 'la-graciosa'];

const fredOlsen = { operator: 'Fred. Olsen Express', url: 'https://www.fredolsen.es/es/comprar/rutas' };
const balearia = { operator: 'Baleària Canarias', url: 'https://www.balearia.com/es/web/baleariacanarias/rutas-horarios' };

const islands = {
  tenerife: {
    name: 'Tenerife', airports: [{ name: 'Tenerife Norte', code: 'TFN' }, { name: 'Tenerife Sur', code: 'TFS' }],
    ferry: [
      { origin: 'Desde Gran Canaria, La Gomera, La Palma o El Hierro', ports: 'Santa Cruz y Los Cristianos', via: [fredOlsen] },
      { origin: 'Desde Gran Canaria, La Gomera o La Palma', ports: 'Santa Cruz y Los Cristianos', via: [balearia] }
    ],
    booking: 'Tenerife, Islas Canarias, España', airbnb: 'Tenerife--Canary-Islands--Spain',
    notes: {
      cuando: 'Todo el año. En invierno la cumbre puede amanecer nevada.',
      moverte: 'Coche si quieres subir al Teide y bajar a Anaga. Entre Santa Cruz y La Laguna hay tranvía.',
      llevar: 'Capas. Arriba hace frío aunque abajo vayas en camiseta.',
      ojo: 'Para subir a pie al pico hace falta permiso del Parque Nacional. Pídelo con tiempo.'
    }
  },
  'gran-canaria': {
    name: 'Gran Canaria', airports: [{ name: 'Gran Canaria', code: 'LPA' }],
    ferry: [{ origin: 'Desde Tenerife, Lanzarote o Fuerteventura', ports: 'Las Palmas y Agaete', via: [fredOlsen, balearia] }],
    booking: 'Gran Canaria, Islas Canarias, España', airbnb: 'Gran-Canaria--Canary-Islands--Spain',
    notes: {
      cuando: 'Todo el año. A finales de invierno, los almendros florecen en Tejeda.',
      moverte: 'Coche para la cumbre. Las guaguas conectan bien Las Palmas y la costa.',
      llevar: 'Bañador y chaqueta en la misma mochila.',
      ojo: 'El aparcamiento del Roque Nublo se llena. Madruga.'
    }
  },
  lanzarote: {
    name: 'Lanzarote', airports: [{ name: 'César Manrique-Lanzarote', code: 'ACE' }],
    ferry: [{ origin: 'Desde Fuerteventura, Gran Canaria o Tenerife', ports: 'Arrecife y Playa Blanca', via: [fredOlsen, balearia] }],
    booking: 'Lanzarote, Islas Canarias, España', airbnb: 'Lanzarote--Canary-Islands--Spain',
    notes: {
      cuando: 'Todo el año. En verano sopla más el alisio.',
      moverte: 'Coche. Dentro de Timanfaya se recorre la ruta en la guagua del parque.',
      llevar: 'Cortavientos y calzado cerrado: la lava corta.',
      ojo: 'Reserva los centros de Manrique en temporada alta.'
    }
  },
  fuerteventura: {
    name: 'Fuerteventura', airports: [{ name: 'Fuerteventura', code: 'FUE' }],
    ferry: [{ origin: 'Desde Lanzarote, Gran Canaria o Tenerife', ports: 'Corralejo, Puerto del Rosario y Morro Jable', via: [fredOlsen, balearia] }],
    booking: 'Fuerteventura, Islas Canarias, España', airbnb: 'Fuerteventura--Canary-Islands--Spain',
    notes: {
      cuando: 'Todo el año. El viento fuerte de verano hace feliz a quien hace kite.',
      moverte: 'Coche. Hasta Cofete se llega por pista de tierra: revisa las condiciones del alquiler.',
      llevar: 'Crema, gafas y algo que pare el viento.',
      ojo: 'Para visitar el islote de Lobos hay que pedir autorización previa.'
    }
  },
  'la-palma': {
    name: 'La Palma', airports: [{ name: 'La Palma', code: 'SPC' }],
    ferry: [{ origin: 'Desde Tenerife', ports: 'Santa Cruz de La Palma', via: [fredOlsen, balearia] }],
    booking: 'La Palma, Islas Canarias, España', airbnb: 'La-Palma--Canary-Islands--Spain',
    notes: {
      cuando: 'Primavera para caminar. Noches sin luna para mirar arriba.',
      moverte: 'Coche y paciencia: las curvas alargan cualquier distancia.',
      llevar: 'Botas y chaqueta. El tiempo cambia de una vertiente a otra.',
      ojo: 'Consulta el estado de los senderos antes de salir: algunos cierran tras las lluvias.'
    }
  },
  'la-gomera': {
    name: 'La Gomera', airports: [{ name: 'La Gomera', code: 'GMZ' }],
    ferry: [{ origin: 'Desde Tenerife, por Los Cristianos', ports: 'San Sebastián de La Gomera', via: [fredOlsen, balearia] }],
    booking: 'La Gomera, Islas Canarias, España', airbnb: 'La-Gomera--Canary-Islands--Spain',
    notes: {
      cuando: 'Primavera y otoño, con el bosque en su mejor momento.',
      moverte: 'Ferry desde Tenerife y coche. La isla es pequeña, sus carreteras no.',
      llevar: 'Impermeable fino: la niebla del bosque también moja.',
      ojo: 'Cuenta el doble de tiempo que marque el mapa.'
    }
  },
  'el-hierro': {
    name: 'El Hierro', airports: [{ name: 'El Hierro', code: 'VDE' }],
    ferry: [{ origin: 'Desde Tenerife, por Los Cristianos', ports: 'Puerto de La Estaca', via: [fredOlsen] }],
    booking: 'El Hierro, Islas Canarias, España', airbnb: 'El-Hierro--Canary-Islands--Spain',
    notes: {
      cuando: 'A finales de verano y en otoño el mar de Las Calmas hace honor al nombre.',
      moverte: 'Coche, sin discusión. De una punta a otra hay más curvas que kilómetros.',
      llevar: 'Escarpines para las piscinas naturales y algo de abrigo para la cumbre.',
      ojo: 'Reserva el buceo en La Restinga antes de ir: es reserva marina.'
    }
  },
  'la-graciosa': {
    name: 'La Graciosa', noAirport: true, airports: [{ name: 'Lanzarote, y luego ferry desde Órzola', code: 'ACE' }],
    ferry: [{ origin: 'Desde Lanzarote, por Órzola', ports: 'Caleta de Sebo', via: [{ operator: 'Líneas Romero', url: 'https://www.lineasromero.com/es/destinations/la-graciosa' }, { operator: 'Biosfera Express', url: 'https://www.biosferaexpress.com/' }] }],
    booking: 'La Graciosa, Islas Canarias, España', airbnb: 'La-Graciosa--Spain',
    notes: {
      cuando: 'Fuera de agosto, si quieres las playas para ti.',
      moverte: 'Ferry desde Órzola y después a pie o en bici. Las calles son de arena.',
      llevar: 'Agua y sombra: las playas del norte no tienen servicios.',
      ojo: 'Mira la hora del último barco antes de alejarte de Caleta de Sebo.'
    }
  }
};

/* Menú */
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-nav');
const setMenu = (open) => {
  menu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    setMenu(false);
    menuButton.focus();
  }
});

/* Texto que se va encendiendo y titulares letra a letra */
const wordSpans = [];
document.querySelectorAll('[data-words]').forEach((node) => {
  const words = node.textContent.trim().split(/\s+/);
  node.textContent = '';
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'w';
    span.textContent = word;
    node.append(span, index < words.length - 1 ? ' ' : '');
    wordSpans.push(span);
  });
});

document.querySelectorAll('[data-letters]').forEach((node) => {
  const text = node.textContent;
  node.setAttribute('aria-label', text);
  node.textContent = '';
  [...text].forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.setAttribute('aria-hidden', 'true');
    span.style.setProperty('--o', (index + 1) / text.length);
    node.append(span);
  });
});

/* Scroll: un único bucle reparte el progreso de cada sección */
const scrollers = [...document.querySelectorAll('[data-scroll]')];
const stages = scrollers.filter((el) => el.classList.contains('stage'));
const stacked = matchMedia('(min-width: 1000px) and (min-height: 640px)');
const tenerife = document.querySelector('#tenerife');
const altimeter = document.querySelector('[data-alti]');
const railLinks = new Map([...document.querySelectorAll('[data-rail]')].map((link) => [link.dataset.rail, link]));
const rail = document.querySelector('.rail');
const islandsSection = document.querySelector('#islas');
const manifesto = document.querySelector('.manifesto');
const leanTarget = document.querySelector('[data-lean]');
let lastY = scrollY;
let velocity = 0;
let ticking = false;

const formatMeters = (value) => String(value).replace(/\B(?=(\d{3})+$)/g, '.');

const onScroll = () => {
  ticking = false;
  const vh = innerHeight;
  let current = null;

  scrollers.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (stages.includes(el) && rect.top <= vh * .5) current = el.dataset.isle;
    if (rect.bottom < -vh || rect.top > vh * 1.5) return;
    const travel = stages.includes(el) && stacked.matches ? vh * 1.35 : vh + rect.height;
    el.style.setProperty('--p', clamp((vh - rect.top) / travel).toFixed(3));
  });

  railLinks.forEach((link, id) => {
    if (id === current) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  const islandsRect = islandsSection.getBoundingClientRect();
  rail.classList.toggle('show', islandsRect.top < vh * .4 && islandsRect.bottom > vh * .6);

  altimeter.textContent = formatMeters(Math.round(Number(tenerife.style.getPropertyValue('--p') || 0) * 3715));

  if (wordSpans.length) {
    const rect = manifesto.getBoundingClientRect();
    const lit = clamp((vh * .85 - rect.top) / (vh * .75)) * wordSpans.length;
    wordSpans.forEach((span, index) => span.classList.toggle('on', index < lit));
  }

  if (!reduceMotion) {
    velocity += (scrollY - lastY - velocity) * .2;
    lastY = scrollY;
    leanTarget?.style.setProperty('--gust', clamp(velocity / 60, -1, 1).toFixed(3));
    document.documentElement.style.setProperty('--tick', `${(scrollY * -.25).toFixed(1)}px`);
  }
};

const requestScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(onScroll);
};
addEventListener('scroll', requestScroll, { passive: true });
addEventListener('resize', requestScroll);
onScroll();

/* Lanzarote: el color está debajo de la lupa */
const lensStage = document.querySelector('[data-lens]');
if (lensStage) {
  const poster = lensStage.querySelector('.poster');
  let lastMove = 0;
  poster.addEventListener('pointermove', (event) => {
    const rect = poster.getBoundingClientRect();
    poster.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    poster.style.setProperty('--my', `${event.clientY - rect.top}px`);
    lastMove = performance.now();
  });
  if (!reduceMotion) {
    const drift = (time) => {
      const rect = poster.getBoundingClientRect();
      if (time - lastMove > 2500 && rect.bottom > 0 && rect.top < innerHeight) {
        poster.style.setProperty('--mx', `${rect.width * (.6 + .28 * Math.sin(time / 2600))}px`);
        poster.style.setProperty('--my', `${rect.height * (.5 + .26 * Math.cos(time / 1900))}px`);
      }
      requestAnimationFrame(drift);
    };
    requestAnimationFrame(drift);
  }
}

/* Fuerteventura: el viento empuja el titular */
const windStage = document.querySelector('[data-wind]');
if (windStage && !reduceMotion) {
  const poster = windStage.querySelector('.poster');
  let target = 0;
  let wind = 0;
  let running = false;
  const blow = () => {
    wind += (target - wind) * .06;
    poster.style.setProperty('--w', wind.toFixed(3));
    if (Math.abs(target - wind) > .002) requestAnimationFrame(blow);
    else running = false;
  };
  poster.addEventListener('pointermove', (event) => {
    const rect = poster.getBoundingClientRect();
    target = (event.clientX - rect.left) / rect.width * 2 - 1;
    if (!running) {
      running = true;
      requestAnimationFrame(blow);
    }
  });
}

/* La Palma: estrellas y apagón */
const stars = document.querySelector('.stars');
if (stars) {
  const svgNS = 'http://www.w3.org/2000/svg';
  stars.setAttribute('viewBox', '0 0 1000 700');
  stars.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  let seed = 28;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let index = 0; index < 190; index += 1) {
    const star = document.createElementNS(svgNS, 'circle');
    star.setAttribute('cx', (random() * 1000).toFixed(1));
    star.setAttribute('cy', (random() * 700).toFixed(1));
    star.setAttribute('r', (random() ** 3 * 2.4 + .5).toFixed(2));
    if (index % 7 === 0) star.classList.add('twinkle');
    star.style.animationDelay = `${(random() * 4).toFixed(2)}s`;
    stars.append(star);
  }
}
const nightButton = document.querySelector('[data-night]');
nightButton?.addEventListener('click', () => {
  const night = nightButton.getAttribute('aria-pressed') !== 'true';
  nightButton.setAttribute('aria-pressed', String(night));
  nightButton.textContent = night ? 'Enciende la luz' : 'Apaga la luz';
  nightButton.closest('.poster').classList.toggle('night', night);
});

/* La Gomera: un silbido sintetizado, y su dibujo */
const whistleButton = document.querySelector('[data-whistle]');
const whistlePath = document.querySelector('.whistle path');
const whistleTune = [[0, 1500], [.18, 2300], [.32, 2300], [.5, 1400], [.62, 1400], [.8, 2600], [.95, 2100], [1.1, 2500], [1.4, 1300]];
if (whistlePath) {
  whistlePath.setAttribute('d', whistleTune.map(([time, hz], index) => `${index ? 'L' : 'M'}${(time / 1.4 * 400).toFixed(1)} ${(55 - (hz - 1300) / 1300 * 50).toFixed(1)}`).join(''));
  whistlePath.setAttribute('pathLength', '1');
}
let audioContext;
whistleButton?.addEventListener('click', async () => {
  audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
  await audioContext.resume();
  const now = audioContext.currentTime + .03;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(whistleTune[0][1], now);
  whistleTune.slice(1).forEach(([time, hz]) => oscillator.frequency.linearRampToValueAtTime(hz, now + time));
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(.18, now + .05);
  gain.gain.setValueAtTime(.18, now + 1.3);
  gain.gain.linearRampToValueAtTime(0, now + 1.4);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 1.45);
  const svg = whistlePath.closest('svg');
  svg.classList.remove('play');
  svg.getBoundingClientRect();
  svg.classList.add('play');
});

/* Pestañas con flechas de teclado, compartido por el pasaje y la libreta */
const arrowTabs = (tabs, event) => {
  const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
  if (!step) return;
  event.preventDefault();
  const next = tabs[(tabs.indexOf(event.currentTarget) + step + tabs.length) % tabs.length];
  next.focus();
  next.click();
};

/* Pasaje: cómo llegar y dónde dormir */
const ticket = document.querySelector('#ticket');
const flightRoutes = document.querySelector('#flight-routes');
const ferryRoutes = document.querySelector('#ferry-routes');
const stayCards = document.querySelector('#stay-cards');
const ticketTabs = [...ticket.querySelectorAll('.ticket-tab')];

const externalRow = (href, label, title, detail, action) => {
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.className = 'row';
  link.setAttribute('aria-label', label);
  const text = document.createElement('span');
  const strong = document.createElement('b');
  strong.textContent = title;
  const small = document.createElement('small');
  small.textContent = detail;
  text.append(strong, small);
  const tag = document.createElement('strong');
  tag.textContent = action;
  link.append(text, tag);
  return link;
};

const fillTicket = (id) => {
  const island = islands[id];
  ticket.dataset.isle = id;
  document.querySelector('#ticket-title').textContent = island.name;
  document.querySelector('#ticket-shape').setAttribute('href', `#i-${id}`);
  document.querySelector('#ticket-intro').textContent = island.noAirport
    ? 'La Graciosa no tiene aeropuerto: se llega en avión a Lanzarote y después en ferry desde Órzola.'
    : `Compara vuelos y ferries hasta ${island.name}, y busca dónde dormir para tus fechas.`;

  flightRoutes.replaceChildren(...island.airports.map((airport) => externalRow(
    `https://www.google.com/travel/flights?q=${encodeURIComponent(`flights to ${airport.code}`)}`,
    `Buscar vuelos a ${airport.name}`, airport.code, airport.name, 'Ver vuelos'
  )));

  ferryRoutes.replaceChildren(...island.ferry.flatMap((route) => route.via.map((company) => externalRow(
    company.url, `Consultar ${company.operator}: ${route.origin}`, company.operator, `${route.origin}. Llega a ${route.ports}.`, 'Ver rutas'
  ))));

  stayCards.replaceChildren(
    externalRow(`https://www.booking.com/searchresults.es.html?ss=${encodeURIComponent(island.booking)}`,
      `Buscar alojamiento en ${island.name} en Booking.com`, 'Booking.com', 'Hoteles, apartamentos y casas.', 'Elegir fechas'),
    externalRow(`https://www.airbnb.es/s/${island.airbnb}/homes`,
      `Buscar alojamiento en ${island.name} en Airbnb`, 'Airbnb', 'Casas y apartamentos.', 'Elegir fechas')
  );
};

const selectTicketTab = (tab) => {
  ticketTabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.querySelector(`#${item.getAttribute('aria-controls')}`).hidden = !selected;
  });
};

ticketTabs.forEach((tab) => {
  tab.addEventListener('click', () => selectTicketTab(tab));
  tab.addEventListener('keydown', (event) => arrowTabs(ticketTabs, event));
});

const openTicket = (id) => {
  fillTicket(id);
  selectTicketTab(ticketTabs[0]);
  ticket.showModal();
};

document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-open]');
  if (opener) openTicket(opener.dataset.open);
});
ticket.querySelector('.ticket-close').addEventListener('click', () => ticket.close());
ticket.addEventListener('click', (event) => {
  if (event.target === ticket) ticket.close();
});

/* Libreta */
const notebookTabs = document.querySelector('.nb-tabs');
const notebookPage = document.querySelector('.nb-page');
const NOTE_LABELS = { cuando: 'Cuándo', moverte: 'Cómo moverte', llevar: 'Qué llevar', ojo: 'Ojo con esto' };

const showNotes = (id) => {
  const island = islands[id];
  notebookTabs.querySelectorAll('[role="tab"]').forEach((tab) => {
    const selected = tab.dataset.tab === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected) notebookPage.setAttribute('aria-labelledby', tab.id);
  });
  notebookPage.dataset.isle = id;

  const heading = document.createElement('div');
  heading.className = 'nb-head';
  const title = document.createElement('h3');
  title.textContent = island.name;
  const shape = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  shape.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#i-${id}`);
  shape.append(use);
  heading.append(title, shape);

  const list = document.createElement('dl');
  Object.entries(NOTE_LABELS).forEach(([key, label]) => {
    const term = document.createElement('dt');
    term.textContent = label;
    const value = document.createElement('dd');
    value.textContent = island.notes[key];
    list.append(term, value);
  });

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'go';
  button.dataset.open = id;
  button.innerHTML = 'Preparar este viaje <svg aria-hidden="true"><use href="#arrow" /></svg>';
  notebookPage.replaceChildren(heading, list, button);
};

const makeNotebookTabs = () => {
  const tabs = ORDER.map((id) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.id = `nb-${id}`;
    tab.setAttribute('role', 'tab');
    tab.dataset.tab = id;
    tab.dataset.isle = id;
    tab.textContent = islands[id].name;
    tab.addEventListener('click', () => showNotes(id));
    return tab;
  });
  tabs.forEach((tab) => tab.addEventListener('keydown', (event) => arrowTabs(tabs, event)));
  notebookTabs.replaceChildren(...tabs);
};
makeNotebookTabs();
showNotes(ORDER[0]);

/* Postal */
const postcard = document.querySelector('#postcard');
const stamp = postcard.querySelector('[data-stamp]');
postcard.addEventListener('change', (event) => {
  if (event.target.name !== 'isla') return;
  postcard.dataset.isle = event.target.value;
  stamp.setAttribute('href', `#i-${event.target.value}`);
});
postcard.addEventListener('submit', (event) => {
  event.preventDefault();
  const island = islands[new FormData(postcard).get('isla')];
  const message = postcard.querySelector('textarea').value.trim();
  const subject = encodeURIComponent(`Un camino que me gustaría andar: ${island.name}`);
  const body = encodeURIComponent(`Rumbo a ${island.name}.\n\n${message}`);
  location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
