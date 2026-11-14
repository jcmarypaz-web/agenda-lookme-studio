/* Datos iniciales del sistema · LookMe Studio
   Se cargan UNA sola vez, la primera vez que la secretaria entra al panel con la base vacía.
   Después, todo se edita desde el panel (Horarios, Artistas, Portada y ajustes). */

export const NEGOCIO = {
  nombre: "LookMe Studio",
  instagram: "@lookme__studio",
  whatsapp: "573012927656",
  catalogo: "https://canva.link/catalogo-lookme",
  abono: 20000,
  navidad: true,           // modo temporada: destellos y esferas navideñas
  portada: "img/portada.webp",
  eyebrow: "Agendas navideñas 2026",
  tituloChico: "Esta Navidad",
  tituloGrande: "Tu mirada brilla",
  bienvenida: "Llega a las fiestas con cejas y pestañas impecables. Elige tu semana, tu artista y tu horario, y déjate consentir por nuestro equipo.",
  notaSemanas: "Abrimos la agenda por semanas. ¡Separa tu cita a tiempo!",
  politicas: [
    { t: "Anticipo", p: "Para separar tu cita realizas un abono mínimo de {abono}. Tu cita queda confirmada únicamente por WhatsApp, cuando recibamos tu abono." },
    { t: "Puntualidad", p: "Te recomendamos llegar 5 minutos antes de tu cita. Contamos con tiempos establecidos para garantizarte una atención de calidad." },
    { t: "Cancelaciones y cambios", p: "Si necesitas cancelar o modificar tu cita, avísanos con al menos 24 horas de anticipación para reagendarla. No se hacen devoluciones de abonos." },
    { t: "Acompañantes", p: "Para mantener un ambiente cómodo y tranquilo, agradecemos que asistas sin acompañantes, salvo situaciones previamente autorizadas." }
  ]
};

export const ARTISTAS = [
  { id: "manuela",  nombre: "Manuela",  frase: "Detalle y precisión en cada pelo", foto: "img/artistas/manuela.webp",  estado: "activa", orden: 1 },
  { id: "carolina", nombre: "Carolina", frase: "Una mirada natural y elegante",     foto: "img/artistas/carolina.webp", estado: "activa", orden: 2 }
];

/* =========================================================
   AGENDA INICIAL (16 nov – 31 dic de 2026)
   Horas en formato 24 h ("13:30" = 1:30 p.m.)
   ========================================================= */
const t_ = s => { const [h, m] = s.split(":").map(Number); return h * 60 + (m || 0); };
const L = s => s.trim() ? s.trim().split(/\s+/).map(t_) : [];
const iso = f => f.getFullYear() + "-" + String(f.getMonth() + 1).padStart(2, "0") + "-" + String(f.getDate()).padStart(2, "0");

/* Semana 16 – 21 nov: horas exactas enviadas por cada artista */
const NOVIEMBRE = {
  "2026-11-16": { carolina: "8:30 10:30 13:00 15:00 17:00 19:00" },
  "2026-11-17": { manuela: "14:00 15:30 17:00 18:30", carolina: "8:30 10:30 14:00 17:00 19:00" },
  "2026-11-18": { manuela: "8:00 9:30 11:00 14:00 15:30 17:00 18:30", carolina: "8:30 10:30 14:00 17:00 19:00" },
  "2026-11-19": { manuela: "8:00 9:30 11:00 14:00 15:30 17:00 18:30 19:30", carolina: "8:30 10:30 14:00 17:00 19:00" },
  "2026-11-20": { manuela: "8:00 9:30 11:00 14:00 15:30 17:00 18:30 19:30", carolina: "8:30 10:30 14:00 17:00 19:00" },
  "2026-11-21": { manuela: "8:00 9:30 11:00 14:00 15:30 17:00 18:30 19:30", carolina: "7:00 9:00 13:00 15:00 17:00 19:00" }
};

/* Diciembre: horario de atención por fecha (fecha ausente = no se labora).
   Manuela agenda cada hora y media; Carolina cada dos horas con 1 hora de almuerzo. */
const DICIEMBRE = {
  "2026-12-01": "8:00-19:00", "2026-12-02": "8:00-19:00", "2026-12-03": "7:00-19:00", "2026-12-04": "7:00-19:00",
  "2026-12-05": "7:00-19:00", "2026-12-06": "8:00-14:00", "2026-12-07": "8:00-15:00", "2026-12-08": "8:00-15:00",
  "2026-12-09": "8:00-19:00", "2026-12-10": "7:00-19:00", "2026-12-11": "7:00-19:00", "2026-12-12": "7:00-19:00",
  "2026-12-14": "8:00-19:00", "2026-12-15": "8:00-19:00", "2026-12-16": "8:00-19:00",
  "2026-12-17": "7:00-19:00", "2026-12-18": "7:00-19:00", "2026-12-19": "7:00-19:00", "2026-12-20": "8:00-15:00",
  "2026-12-21": "7:00-19:00", "2026-12-22": "7:00-19:00", "2026-12-23": "7:00-19:00", "2026-12-24": "7:00-12:00",
  "2026-12-26": "7:00-19:00", "2026-12-27": "7:00-12:00", "2026-12-28": "8:00-19:00", "2026-12-29": "8:00-19:00",
  "2026-12-30": "7:00-19:00", "2026-12-31": "7:00-12:00"
};
const NO_LABORA = { manuela: ["2026-12-16"] };
const RITMO = { manuela: { duracion: 90, almuerzo: 0 }, carolina: { duracion: 120, almuerzo: 60 } };

/* Cupos desde la hora de inicio, cada `duracion`, sin pasar del cierre.
   El almuerzo se toma después de la primera cita que termina a las 12:00 o más tarde. */
function cupos(rango, { duracion, almuerzo }) {
  const [ini, fin] = rango.split("-").map(t_), out = [];
  let h = ini, comio = !almuerzo;
  while (h + duracion <= fin) { out.push(h); h += duracion; if (!comio && h >= 12 * 60) { h += almuerzo; comio = true; } }
  return out;
}

function construirDias() {
  const out = {};
  for (const [k, por] of Object.entries(NOVIEMBRE)) {
    const horas = {}; for (const [a, s] of Object.entries(por)) { const h = L(s); if (h.length) horas[a] = h; }
    out[k] = { horas, cerrado: false, pronto: false };
  }
  for (const [k, rango] of Object.entries(DICIEMBRE)) {
    const horas = {};
    for (const [a, r] of Object.entries(RITMO)) if (!(NO_LABORA[a] || []).includes(k)) horas[a] = cupos(rango, r);
    out[k] = { horas, cerrado: false, pronto: false };
  }
  return out;
}
export const DIAS = construirDias();
