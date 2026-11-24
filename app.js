"use strict";

/* ---------- iPhone-Varianten ----------
   Eine Kachel pro Bedienungs-Art. Neue iPhones einfach bei "modelle" ergänzen.
   gruppe: home  = Home-Taste
           kerbe = Face ID mit Kerbe (Notch)
           insel = Face ID mit Dynamic Island */
const VARIANTEN = [
  { gruppe: "home",  titel: "iPhone SE",           name: "iPhone SE",
    modelle: "2020 und 2022" },
  { gruppe: "kerbe", titel: "iPhone 11 bis 14",    name: "iPhone 11 bis 14",
    modelle: "auch 14 Plus, 16e und 17e (nicht 14 Pro)" },
  { gruppe: "insel", titel: "iPhone 15 und neuer", name: "iPhone 15 und neuer",
    modelle: "auch 14 Pro und 14 Pro Max (nicht 16e, 17e)" },
];

const SPEICHER_SCHLUESSEL = "iphone-hilfe-modell";
const app = document.getElementById("app");

/* ---------- Speichern / Laden ---------- */
function ladeModell() {
  try {
    const roh = localStorage.getItem(SPEICHER_SCHLUESSEL);
    const m = roh && JSON.parse(roh);
    if (m && ["home", "kerbe", "insel"].includes(m.gruppe)) return m;
  } catch (e) { /* privat-Modus o. Ä. */ }
  return null;
}
function speichereModell(m) {
  try { localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(m)); } catch (e) {}
}

let modell = ladeModell();

/* ---------- kleine Helfer ---------- */
function el(tag, attrs = {}, ...kinder) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "onclick") e.addEventListener("click", v);
    else if (k === "html") e.innerHTML = v;
    else e.setAttribute(k, v);
  }
  for (const kind of kinder.flat()) {
    if (kind == null || kind === false) continue;
    e.append(kind.nodeType ? kind : document.createTextNode(kind));
  }
  return e;
}

function zeige(...inhalt) {
  app.replaceChildren(...inhalt.filter(Boolean));
  window.scrollTo(0, 0);
}

const PFEIL_LINKS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4 7 12l8 8"/></svg>';

function zurueckKnopf(aktion) {
  return el("div", { class: "kopf" },
    el("button", { class: "zurueck", onclick: aktion, html: PFEIL_LINKS + "<span>Zurück</span>" }));
}

/* Einfache Zeichnung eines iPhones je Gruppe */
let handyZaehler = 0;
function handySvg(gruppe) {
  const home = gruppe === "home";
  const id = "hd" + (++handyZaehler);
  const knopf = (x, y, h) => `<rect x="${x}" y="${y}" width="2" height="${h}" rx="1" fill="#C7C7CC"/>`;

  // Bildschirm-Fläche (schmaler Rand)
  const s = home ? { x: 7.5, y: 18, w: 57, h: 78, r: 2 } : { x: 7, y: 4, w: 58, h: 108, r: 13 };
  const off = (s.w - 39) / 2;

  // kleine App-Symbole auf dem Bildschirm
  let apps = "";
  const farben = ["#FFFFFF", "#FFD60A", "#34C759", "#FF6B6B", "#5AC8FA", "#FFFFFF", "#AF52DE", "#FF9F0A"];
  const startY = s.y + (home ? 7 : 16);
  for (let r = 0; r < (home ? 3 : 4); r++) {
    for (let c = 0; c < 4; c++) {
      const f = farben[(r * 4 + c) % farben.length];
      apps += `<rect x="${s.x + off + c * 10.5}" y="${startY + r * 12}" width="7.5" height="7.5" rx="2.2" fill="${f}" opacity="${f === "#FFFFFF" ? 0.85 : 0.9}"/>`;
    }
  }
  const dockY = s.y + s.h - (home ? 13 : 16);
  apps += `<rect x="${s.x + 3}" y="${dockY - 2.5}" width="${s.w - 6}" height="12" rx="5" fill="#fff" opacity=".35"/>`;
  for (let c = 0; c < 4; c++) {
    apps += `<rect x="${s.x + off + c * 10.5}" y="${dockY}" width="7.5" height="7.5" rx="2.2" fill="${["#34C759", "#1A8CFF", "#34C759", "#1A8CFF"][c]}"/>`;
  }

  let oben = "", unten = "";
  if (home) {
    oben = '<rect x="29" y="9" width="14" height="2.5" rx="1.25" fill="#3A3A3C"/><circle cx="23" cy="10.2" r="1.6" fill="#2C2C2E"/>';
    unten = '<circle cx="36" cy="105.5" r="6" fill="#1C1C1E" stroke="#6E6E73" stroke-width="1.4"/>';
  } else {
    oben = gruppe === "kerbe"
      ? '<path d="M25 4h22v2.5a4.5 4.5 0 0 1-4.5 4.5h-13A4.5 4.5 0 0 1 25 6.5z" fill="#1C1C1E"/>'
      : '<rect x="27.5" y="7.5" width="17" height="5.5" rx="2.75" fill="#000"/>';
    unten = '<rect x="27" y="107" width="18" height="2" rx="1" fill="#fff" opacity=".9"/>';
  }

  return `<svg class="handy" viewBox="0 0 72 116" aria-hidden="true">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8EC5FC"/><stop offset=".55" stop-color="#B9B4F5"/><stop offset="1" stop-color="#F3C4D9"/></linearGradient>` +
    `<linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>` +
    // Seitentasten
    (home ? knopf(2.5, 27, 9) + knopf(2.5, 39, 9) + knopf(67.5, 26, 11)
          : knopf(2.5, 34, 12) + knopf(2.5, 50, 12) + knopf(67.5, 38, 18)) +
    // Gehäuse mit schmalem Rand und feiner Lichtkante
    `<rect x="4" y="1" width="64" height="114" rx="${home ? 11 : 16}" fill="#1C1C1E"/>` +
    `<rect x="4.6" y="1.6" width="62.8" height="112.8" rx="${home ? 10.5 : 15.5}" fill="none" stroke="#6E6E73" stroke-width=".8"/>` +
    // Bildschirm
    `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="${s.r}" fill="url(#${id})"/>` +
    apps +
    `<path d="M${s.x} ${s.y + s.r} L${s.x + s.w * 0.55} ${s.y} L${s.x + s.w * 0.8} ${s.y} L${s.x} ${s.y + s.h * 0.45} Z" fill="url(#${id}g)"/>` +
    oben + unten + "</svg>";
}

/* Symbole für Kacheln ohne eigenes Bild (Strichzeichnungen, 24x24) */
const SYMBOLE = {
  buch: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M10 8.5a2 2 0 1 1 2.5 1.9c-.5.2-.5.6-.5 1.1"/><circle cx="12" cy="14" r=".6" fill="currentColor"/>',
  chat: '<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  brief: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  haus: '<path d="M3 11 12 3l9 8"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  telefon: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  foto: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5L5 20"/>',
  kamera: '<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4"/>',
  uhr: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  muell: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 14h10l1-14"/><path d="M10 11v6M14 11v6"/>',
  schrift: '<path d="M3 19 8 6l5 13"/><path d="M4.8 14.5h6.4"/><path d="M14 19l3.5-9 3.5 9"/><path d="M15.3 16h4.4"/>',
  lautsprecher: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 9a4 4 0 0 1 0 6"/><path d="M19 6.5a7.5 7.5 0 0 1 0 11"/>',
  sonne: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
};

function symbolSvg(name) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    (SYMBOLE[name] || SYMBOLE.buch) + "</svg>";
}

function kachelBild(pfad, symbol) {
  const platzhalter = () => el("div", { class: "kachel-bild platzhalter", html: symbolSvg(symbol) });
  if (!pfad) return platzhalter();
  const img = el("img", { class: "kachel-bild", src: pfad, alt: "" });
  img.addEventListener("error", () => img.replaceWith(platzhalter()), { once: true });
  return img;
}

/* ---------- Bildschirm: iPhone wählen ---------- */
function zeigeAuswahl() {
  const kacheln = VARIANTEN.map((v) =>
    el("li", {},
      el("button", { class: "kachel quer", onclick: () => setzeModell({ name: v.name, gruppe: v.gruppe }) },
        el("span", { html: handySvg(v.gruppe) }),
        el("span", { class: "quer-text" },
          el("span", { class: "kachel-text" }, v.titel),
          el("span", { class: "kachel-klein" }, v.modelle)))));

  zeige(
    modell ? zurueckKnopf(zeigeStart) : null,
    el("h1", {}, "Welches iPhone haben Sie?"),
    el("p", { class: "unterzeile" }, "Tippen Sie auf Ihr Modell. Oder schauen Sie: Welches Bild passt?"),
    el("ul", { class: "liste" }, kacheln),
    el("div", { class: "unten" },
      el("button", { class: "knopf zweit", onclick: zeigeHilfeModell }, "Welches iPhone habe ich?")),
  );
}

function setzeModell(m) {
  modell = m;
  speichereModell(m);
  zeigeStart();
}

/* ---------- Bildschirm: Hilfe "Welches iPhone habe ich?" ---------- */
function zeigeHilfeModell() {
  zeige(
    zurueckKnopf(zeigeAuswahl),
    el("h1", {}, "Welches iPhone habe ich?"),
    el("div", { class: "info-karte" },
      el("p", {}, "Öffnen Sie die App „Einstellungen“. Tippen Sie dann nacheinander auf:"),
      el("div", { class: "pfad" },
        el("span", {}, "Allgemein"), "›", el("span", {}, "Info")),
      el("p", {}, "Neben „Modellname“ steht Ihr iPhone, zum Beispiel „iPhone 13“.")),
    el("div", { class: "info-karte" },
      el("p", {}, "Unter jedem Bild bei der Auswahl steht, welche iPhones dazugehören. Suchen Sie dort Ihren Modellnamen.")),
    el("div", { class: "unten" },
      el("button", { class: "knopf", onclick: zeigeAuswahl }, "Jetzt iPhone wählen")),
  );
}

/* ---------- Bildschirm: Startseite ---------- */
function zeigeStart() {
  if (!modell) return zeigeAuswahl();

  const kacheln = ANLEITUNGEN.map((a) =>
    el("li", {},
      el("button", { class: "kachel", onclick: () => zeigeAnleitung(a) },
        kachelBild(a.bild, a.symbol),
        el("span", { class: "kachel-text" }, a.titel))));

  zeige(
    el("header", { class: "kopf-start" },
      el("img", { class: "app-logo", src: "app-icon/icon-180.png", alt: "" }),
      el("div", {},
        el("h1", {}, "Was möchten Sie wissen?"),
        el("p", { class: "unterzeile", style: "margin:0" }, "Tippen Sie auf ein Bild."))),
    el("ul", { class: "raster" }, kacheln),
    el("div", { class: "unten" },
      el("div", { class: "mein-iphone" },
        el("span", { html: handySvg(modell.gruppe) }),
        el("div", {},
          el("div", { class: "kachel-klein", style: "margin:0" }, "Ihr iPhone"),
          el("div", { class: "kachel-text" }, modell.name))),
      el("button", { class: "knopf zweit", onclick: zeigeAuswahl }, "Anderes iPhone wählen")),
  );
}

/* ---------- Bildschirm: Anleitung ---------- */
function schrittFuerGruppe(schritt, gruppe) {
  if (Array.isArray(schritt.nur) && !schritt.nur.includes(gruppe)) return null;
  const variante = schritt[gruppe];
  if (variante && typeof variante === "object") {
    return {
      text: variante.text || schritt.text,
      bild: variante.bild || (variante.zeichnung ? null : schritt.bild),
      zeichnung: variante.zeichnung || (variante.bild ? null : schritt.zeichnung),
    };
  }
  return { text: variante || schritt.text, bild: schritt.bild, zeichnung: schritt.zeichnung };
}

function schrittBild(s) {
  if (s.zeichnung && typeof ZEICHNUNG !== "undefined") {
    const svg = ZEICHNUNG.render(s.zeichnung, modell.gruppe);
    if (svg) return el("div", { class: "schritt-bild zeichnung", html: svg });
  }
  if (s.bild) return el("img", { class: "schritt-bild", src: s.bild, alt: "" });
  return null;
}

function zeigeAnleitung(a) {
  const schritte = (a.schritte || [])
    .map((s) => schrittFuerGruppe(s, modell.gruppe))
    .filter((s) => s && s.text);

  const liste = schritte.map((s, i) =>
    el("li", { class: "schritt" },
      el("div", { class: "nummer", "aria-hidden": "true" }, String(i + 1)),
      el("div", { class: "schritt-text" }, el("p", {}, s.text)),
      schrittBild(s)));

  zeige(
    zurueckKnopf(zeigeStart),
    el("h1", {}, a.titel),
    el("ol", { class: "schritte" }, liste),
    el("div", { class: "ende" },
      el("button", { class: "knopf", onclick: zeigeStart }, "Fertig – zurück zur Übersicht")),
  );
}

/* ---------- Start ---------- */
zeigeStart();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
