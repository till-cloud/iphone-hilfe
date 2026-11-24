"use strict";

/* ---------- iPhone-Modelle ----------
   gruppe: home  = Home-Taste
           kerbe = Face ID mit Kerbe (Notch)
           insel = Face ID mit Dynamic Island
   Eine Serie mit "varianten" fragt im zweiten Schritt nach. */
const SERIEN = [
  { id: "se",  name: "iPhone SE",  klein: "2020 oder 2022", gruppe: "home" },
  { id: "11",  name: "iPhone 11",  klein: "auch Pro, Pro Max", gruppe: "kerbe" },
  { id: "12",  name: "iPhone 12",  klein: "auch mini, Pro, Pro Max", gruppe: "kerbe" },
  { id: "13",  name: "iPhone 13",  klein: "auch mini, Pro, Pro Max", gruppe: "kerbe" },
  { id: "14",  name: "iPhone 14",  klein: "auch Plus, Pro, Pro Max", gruppe: "kerbe",
    varianten: [
      { id: "14",     name: "iPhone 14 oder 14 Plus",        klein: "2 Kameras hinten", gruppe: "kerbe" },
      { id: "14-pro", name: "iPhone 14 Pro oder 14 Pro Max", klein: "3 Kameras hinten", gruppe: "insel" },
    ] },
  { id: "15",  name: "iPhone 15",  klein: "auch Plus, Pro, Pro Max", gruppe: "insel" },
  { id: "16",  name: "iPhone 16",  klein: "auch Plus, Pro, Pro Max", gruppe: "insel" },
  { id: "16e", name: "iPhone 16e", klein: "", gruppe: "kerbe" },
  { id: "17",  name: "iPhone 17",  klein: "auch Pro, Pro Max", gruppe: "insel" },
  { id: "17e", name: "iPhone 17e", klein: "", gruppe: "kerbe" },
  { id: "air", name: "iPhone Air", klein: "", gruppe: "insel" },
  { id: "18",  name: "iPhone 18 Pro", klein: "auch Pro Max", gruppe: "insel" },
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
function handySvg(gruppe) {
  let oben = "", unten = "", bildschirm;
  if (gruppe === "home") {
    bildschirm = '<rect x="7" y="18" width="50" height="76" rx="2" fill="#DCE8E0"/>';
    oben = '<rect x="26" y="9" width="12" height="3" rx="1.5" fill="#55555c"/>';
    unten = '<circle cx="32" cy="103" r="5.5" fill="none" stroke="#9a9aa2" stroke-width="2"/>';
  } else {
    bildschirm = '<rect x="5" y="5" width="54" height="102" rx="10" fill="#DCE8E0"/>';
    oben = gruppe === "kerbe"
      ? '<path d="M20 5h24v3a5 5 0 0 1-5 5H25a5 5 0 0 1-5-5z" fill="#1c1c1e"/>'
      : '<rect x="23" y="10" width="18" height="6" rx="3" fill="#1c1c1e"/>';
    unten = '<rect x="22" y="100" width="20" height="2.5" rx="1.25" fill="#1c1c1e" opacity=".55"/>';
  }
  return '<svg class="handy" viewBox="0 0 64 112" aria-hidden="true">' +
    '<rect x="1" y="1" width="62" height="110" rx="' + (gruppe === "home" ? 9 : 13) + '" fill="#fff" stroke="#1c1c1e" stroke-width="2"/>' +
    bildschirm + oben + unten + "</svg>";
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
  const kacheln = SERIEN.map((s) =>
    el("li", {},
      el("button", { class: "kachel", onclick: () => waehleSerie(s) },
        el("span", { html: handySvg(s.gruppe) }),
        el("span", { class: "kachel-text" }, s.name),
        s.klein ? el("span", { class: "kachel-klein" }, s.klein) : null)));

  zeige(
    modell ? zurueckKnopf(zeigeStart) : null,
    el("h1", {}, "Welches iPhone haben Sie?"),
    el("p", { class: "unterzeile" }, "Tippen Sie auf Ihr Modell."),
    el("ul", { class: "raster" }, kacheln),
    el("div", { class: "unten" },
      el("button", { class: "knopf zweit", onclick: zeigeHilfeModell }, "Welches iPhone habe ich?")),
  );
}

function waehleSerie(s) {
  if (s.varianten) return zeigeVarianten(s);
  setzeModell({ serie: s.id, name: s.name, gruppe: s.gruppe });
}

function zeigeVarianten(s) {
  const kacheln = s.varianten.map((v) =>
    el("li", {},
      el("button", { class: "kachel", onclick: () => setzeModell({ serie: v.id, name: v.name, gruppe: v.gruppe }) },
        el("span", { html: handySvg(v.gruppe) }),
        el("span", { class: "kachel-text" }, v.name),
        el("span", { class: "kachel-klein" }, v.klein))));

  zeige(
    zurueckKnopf(zeigeAuswahl),
    el("h1", {}, "Welches " + s.name + "?"),
    el("p", { class: "unterzeile" }, "Schauen Sie auf die Rückseite: Wie viele Kameras hat Ihr iPhone?"),
    el("ul", { class: "raster" }, kacheln),
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
      el("p", {}, "Ihr iPhone hat eine runde Taste unter dem Bildschirm? Dann ist es ein iPhone SE.")),
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
