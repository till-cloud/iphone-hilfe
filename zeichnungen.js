"use strict";
/*
  GEZEICHNETE iPHONE-BILDSCHIRME
  ==============================
  In anleitungen.js gibt man bei einem Schritt an:   zeichnung: "name"   oder   zeichnung: "name:zusatz"
  Der iPhone-Rahmen (Home-Taste, Kerbe, Dynamic Island) passt sich automatisch an.

  Verfügbare Zeichnungen (Name : mögliche Zusätze):
    homescreen            : whatsapp, telefon, mail, einstellungen, fotos, kamera, ... (App zum Antippen)
    homescreen-halten     : App, die gedrückt gehalten wird (z. B. spiel)
    homescreen-seiten
    app-menue, app-loeschen-dialog, app-loeschen-bestaetigen
    wa-chats              : tab, suche, ziehen
    wa-suche-tippen, wa-ergebnis
    wa-chat               : zurueck, plus, strich, wisch, hometaste
    wa-menue, fotoauswahl, wa-foto-senden
    tel-kontakte          : tab, plus
    kontakt-neu           : vorname, nachname, telefon, nummer, fertig
    tel-anrufe            : tab, liste, name, info
    anruf-info
    mail-eingang
    mail-neu              : an, vorschlag, betreff, text, senden
    einstellungen, anzeige, textgroesse
    kz-oeffnen, kontrollzentrum (hell, laut), kz-schliessen
    seitentasten, lautstaerke-anzeige
    schwarz               : seite, home
*/
const ZEICHNUNG = (() => {
  const W = 200;
  const BLAU = "#007AFF";
  const MARKE = "#C2410C";
  const ROT = "#FF3B30";
  const GRAU = "#8E8E93";
  const SCHRIFT = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif";
  let zaehler = 0;

  /* ---------- Grundformen ---------- */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const R = (x, y, w, h, r, fill, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
  const C = (x, y, r, fill, extra = "") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
  const T = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" font-family="${SCHRIFT}" font-size="${o.size || 10}" font-weight="${o.weight || 400}" fill="${o.fill || "#1C1C1E"}" text-anchor="${o.anchor || "start"}">${esc(s)}</text>`;
  const L = (x1, y1, x2, y2, farbe = "#E5E5EA", b = 0.6) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${farbe}" stroke-width="${b}"/>`;

  /* ---------- Markierungen (Overlay) ---------- */
  const tipp = (x, y) =>
    `<g class="z-tipp"><circle class="z-puls" cx="${x}" cy="${y}" r="15" fill="none" stroke="${MARKE}" stroke-width="3"/>` +
    C(x, y, 15, MARKE, `fill-opacity=".25" stroke="#fff" stroke-width="2"`) +
    C(x, y, 15, "none", `stroke="${MARKE}" stroke-width="2.5"`) + C(x, y, 5, MARKE) + "</g>";

  const halten = (x, y) =>
    C(x, y, 24, "none", `stroke="${MARKE}" stroke-width="2.5" stroke-dasharray="4 4"`) + tipp(x, y) +
    R(x - 34, y - 46, 68, 17, 8.5, MARKE) + T(x, y - 34, "gedrückt halten", { size: 8, weight: 700, fill: "#fff", anchor: "middle" });

  function wisch(x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy) || 1;
    const ux = dx / l, uy = dy / l, nx = -uy, ny = ux;
    const bx = x2 - ux * 14, by = y2 - uy * 14;
    const kopf = `M${x2} ${y2} L${bx + nx * 10} ${by + ny * 10} L${bx - nx * 10} ${by - ny * 10} Z`;
    return `<g class="z-wisch">` +
      `<path d="M${x1} ${y1} L${bx} ${by}" stroke="#fff" stroke-width="10" stroke-linecap="round"/>` +
      `<path d="M${x1} ${y1} L${bx} ${by}" stroke="${MARKE}" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="${kopf}" fill="${MARKE}" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>` +
      C(x1, y1, 9, MARKE, `stroke="#fff" stroke-width="2.5"`) + "</g>";
  }

  const markierung = (x, y, w, h, r = 8) =>
    R(x, y, w, h, r, "none", `stroke="${MARKE}" stroke-width="2.5" stroke-dasharray="5 4"`);

  /* ---------- App-Symbole ---------- */
  const BLUETEN = ["#FF9500", "#FFCC00", "#34C759", "#30B0C7", "#007AFF", "#AF52DE", "#FF2D55", "#FF3B30"];
  const APPS = {
    whatsapp: { bg: "#25D366", name: "WhatsApp", g: '<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.5z" stroke-width="2.2"/>' },
    telefon: { bg: "#34C759", name: "Telefon", g: '<path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6 6l1.3-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" fill="#fff" stroke="none"/>' },
    mail: { bg: "#1A8CFF", name: "Mail", g: '<rect x="3" y="6" width="18" height="12" rx="2" fill="#fff" stroke="none"/><path d="m3.5 7 8.5 6 8.5-6" stroke="#1A8CFF" stroke-width="1.6"/>' },
    einstellungen: { bg: "#8E8E93", name: "Einstellungen", g: '<circle cx="12" cy="12" r="7.5" stroke="#E5E5EA" stroke-width="4" stroke-dasharray="2.6 2.9"/><circle cx="12" cy="12" r="5" stroke="#E5E5EA" stroke-width="2"/>' },
    fotos: { bg: "#FFFFFF", name: "Fotos", g: BLUETEN.map((f, i) => `<ellipse cx="12" cy="7" rx="2.8" ry="5" fill="${f}" opacity=".85" stroke="none" transform="rotate(${i * 45} 12 12)"/>`).join("") },
    kamera: { bg: "#3A3A3C", name: "Kamera", g: '<path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z" fill="#C7C7CC" stroke="none"/><circle cx="12" cy="13" r="3.5" fill="#3A3A3C" stroke="none"/>' },
    nachrichten: { bg: "#34C759", name: "Nachrichten", g: '<path d="M12 4c5 0 9 3.1 9 7s-4 7-9 7c-1 0-2-.1-2.9-.4L5 20l1-3.6C4.2 15.1 3 13.2 3 11c0-3.9 4-7 9-7z" fill="#fff" stroke="none"/>' },
    safari: { bg: "#1A8CFF", name: "Safari", g: '<circle cx="12" cy="12" r="9" stroke-width="1.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="#FF3B30" stroke="none"/>' },
    kalender: { bg: "#FFFFFF", name: "Kalender", g: "" },
    uhr: { bg: "#1C1C1E", name: "Uhr", g: '<circle cx="12" cy="12" r="9" fill="#fff" stroke="none"/><path d="M12 7v5l3.5 2" stroke="#1C1C1E" stroke-width="1.8"/>' },
    wetter: { bg: "#3F8CE8", name: "Wetter", g: '<circle cx="9" cy="9" r="4" fill="#FFD60A" stroke="none"/><path d="M7 18h10a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6 1.5A3 3 0 0 0 7 18z" fill="#fff" stroke="none"/>' },
    karten: { bg: "#6CC570", name: "Karten", g: '<path d="M12 21s-6-6-6-10.5a6 6 0 0 1 12 0C18 15 12 21 12 21z" fill="#FF3B30" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="10.5" r="2" fill="#fff" stroke="none"/>' },
    notizen: { bg: "#FFFFFF", name: "Notizen", g: '<rect x="2" y="2" width="20" height="5" rx="1.5" fill="#FFD60A" stroke="none"/><path d="M4 11h16M4 15h16M4 19h11" stroke="#C7C7CC" stroke-width="1.4"/>' },
    rechner: { bg: "#1C1C1E", name: "Rechner", g: [[7, 7, "#A5A5A5"], [17, 7, "#FF9F0A"], [7, 17, "#505050"], [17, 17, "#FF9F0A"]].map(([x, y, f]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="${f}" stroke="none"/>`).join("") },
    musik: { bg: "#FF375F", name: "Musik", g: '<path d="M9 18V6l10-2v12" stroke-width="2.2"/><circle cx="7" cy="18" r="2.5" fill="#fff" stroke="none"/><circle cx="17" cy="16" r="2.5" fill="#fff" stroke="none"/>' },
    spiel: { bg: "#7D5CFF", name: "Spiel", g: '<rect x="3" y="7" width="18" height="11" rx="5.5" fill="#fff" stroke="none"/><path d="M8 10.5v4M6 12.5h4" stroke="#7D5CFF" stroke-width="1.8"/><circle cx="15.5" cy="11.5" r="1.3" fill="#7D5CFF" stroke="none"/><circle cx="17.5" cy="14" r="1.3" fill="#7D5CFF" stroke="none"/>' },
  };

  function appSymbol(x, y, s, name, mitName = true) {
    const a = APPS[name];
    let out = R(x, y, s, s, s * 0.24, a.bg, a.bg === "#FFFFFF" ? 'stroke="#E5E5EA" stroke-width=".5"' : "");
    if (name === "kalender") {
      out += T(x + s / 2, y + s * 0.32, "DI", { size: s * 0.2, weight: 700, fill: ROT, anchor: "middle" }) +
        T(x + s / 2, y + s * 0.82, "24", { size: s * 0.48, weight: 300, anchor: "middle" });
    } else {
      out += `<g transform="translate(${x + s * 0.18} ${y + s * 0.18}) scale(${(s * 0.64) / 24})" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${a.g}</g>`;
    }
    if (mitName) out += T(x + s / 2, y + s + 8, a.name, { size: 6.2, fill: "#fff", anchor: "middle", weight: 500 });
    return out;
  }

  /* ---------- Home-Bildschirm ---------- */
  const RASTER = [["kalender", "fotos", "kamera", "uhr"], ["wetter", "karten", "notizen", "rechner"], ["whatsapp", "einstellungen", "musik", "spiel"]];
  const DOCK = ["telefon", "safari", "nachrichten", "mail"];
  const S = 34;
  const spalteX = (i) => 16 + i * 46;
  const dockY = (c) => c.H - (c.home ? 52 : 64);

  function appPos(c, name) {
    for (let r = 0; r < RASTER.length; r++) {
      const i = RASTER[r].indexOf(name);
      if (i >= 0) return { x: spalteX(i), y: c.top + 12 + r * 56, dock: false };
    }
    const i = DOCK.indexOf(name);
    if (i >= 0) return { x: spalteX(i), y: dockY(c), dock: true };
    return null;
  }

  function hintergrund(c) {
    return `<defs><linearGradient id="${c.id}w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8EC5FC"/><stop offset=".55" stop-color="#B9B4F5"/><stop offset="1" stop-color="#F3C4D9"/></linearGradient></defs>` +
      R(0, 0, W, c.H, 0, `url(#${c.id}w)`) + C(40, c.H * 0.7, 70, "#fff", 'opacity=".12"') + C(170, c.H * 0.25, 60, "#fff", 'opacity=".1"');
  }

  function homescreen(c, { ohne = [] } = {}) {
    let out = hintergrund(c) + statusleiste(c, "#fff");
    RASTER.forEach((reihe, r) => reihe.forEach((app, i) => {
      if (!ohne.includes(app)) out += appSymbol(spalteX(i), c.top + 12 + r * 56, S, app);
    }));
    const dy = dockY(c);
    out += C(94, dy - 18, 2.5, "#fff") + C(106, dy - 18, 2.5, "#fff", 'opacity=".5"');
    out += R(8, dy - 8, 184, 50, 22, "#fff", 'fill-opacity=".3" stroke="#fff" stroke-opacity=".5" stroke-width=".6"');
    DOCK.forEach((app, i) => { out += appSymbol(spalteX(i), dy, S, app, false); });
    return out;
  }

  /* ---------- Bausteine für App-Bildschirme ---------- */
  function statusleiste(c, farbe = "#1C1C1E") {
    const y = c.home ? 13 : 23, x = c.home ? 10 : 30, bx = c.home ? 172 : 160;
    return T(x, y, "9:41", { size: 10, weight: 600, fill: farbe }) +
      R(bx, y - 8, 18, 9, 2.5, "none", `stroke="${farbe}" stroke-opacity=".5" stroke-width="1"`) + R(bx + 2, y - 6, 12, 5, 1.2, farbe);
  }

  function titelGross(c, titel, { links = "", rechts = "", plus = false } = {}) {
    const y = c.top;
    let out = links ? T(12, y + 12, links, { fill: BLAU }) : "";
    if (rechts) out += T(W - 12, y + 12, rechts, { fill: BLAU, anchor: "end" });
    if (plus) out += `<path d="M183 ${y + 1} v14 M176 ${y + 8} h14" stroke="${BLAU}" stroke-width="2.2" stroke-linecap="round"/>`;
    return out + T(12, y + 42, titel, { size: 21, weight: 700 });
  }

  function titelKlein(c, titel, { links = "", rechts = "", rechtsFett = false, rechtsGrau = false } = {}) {
    const y = c.top + 14;
    let out = T(100, y, titel, { size: 10.5, weight: 600, anchor: "middle" });
    if (links) out += T(10, y, links, { fill: BLAU, size: 9.5 });
    if (rechts) out += T(W - 10, y, rechts, { fill: rechtsGrau ? "#C7C7CC" : BLAU, size: 9.5, weight: rechtsFett ? 700 : 400, anchor: "end" });
    return out;
  }

  function suchfeld(y, text = "Suchen", { aktiv = false } = {}) {
    return R(12, y, 176, 22, 8, "#EDEDF0") + C(25, y + 10, 4, "none", `stroke="${GRAU}" stroke-width="1.4"`) +
      L(28, y + 13, 31, y + 16, GRAU, 1.4) + T(36, y + 15, text, { size: 9.5, fill: aktiv ? "#1C1C1E" : GRAU }) +
      (aktiv ? R(36 + text.length * 5.4, y + 5, 1.3, 12, 0.6, BLAU) : "");
  }

  const tabY = (c) => c.H - (c.home ? 46 : 56);
  const tabX = (n, i) => 8 + (184 / n) * (i + 0.5);
  function tabLeiste(c, namen, aktiv, farbe = BLAU) {
    const y = tabY(c);
    let out = R(8, y, 184, 40, 20, "#fff", 'fill-opacity=".95" stroke="#D1D1D6" stroke-width=".6"');
    namen.forEach((n, i) => {
      const x = tabX(namen.length, i), an = i === aktiv;
      if (an) out += R(x - 18, y + 3, 36, 34, 17, "#EDEDF0");
      out += C(x, y + 15, 5.5, an ? farbe : "none", `stroke="${an ? farbe : GRAU}" stroke-width="1.5"`) +
        T(x, y + 32, n, { size: 6, anchor: "middle", fill: an ? farbe : GRAU, weight: an ? 600 : 400 });
    });
    return out;
  }

  function tastatur(c, { ziffern = false } = {}) {
    const h = c.home ? 128 : 150, y0 = c.H - h;
    let out = R(0, y0, W, h, 0, "#D1D3D9");
    if (ziffern) {
      const z = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];
      z.forEach((t, i) => {
        const x = 6 + (i % 3) * 63, y = y0 + 6 + Math.floor(i / 3) * 27;
        if (t) out += R(x, y, 60, 23, 5, i === 11 ? "#D1D3D9" : "#fff") + T(x + 30, y + 16, t, { size: 13, anchor: "middle" });
      });
      return out;
    }
    [10, 9, 7].forEach((n, r) => {
      const kw = 17, gap = 2.6, breite = n * kw + (n - 1) * gap, x0 = (W - breite) / 2;
      for (let i = 0; i < n; i++) out += R(x0 + i * (kw + gap), y0 + 8 + r * 30, kw, 24, 4, "#fff");
    });
    out += R(52, y0 + 98, 96, 24, 4, "#fff") + R(152, y0 + 98, 42, 24, 4, BLAU) + R(6, y0 + 98, 42, 24, 4, "#ABB0BA");
    return out;
  }

  function avatar(x, y, r, farbe, buchstabe) {
    return C(x, y, r, farbe) + T(x, y + r * 0.38, buchstabe, { size: r * 1.05, weight: 600, fill: "#fff", anchor: "middle" });
  }

  function foto(x, y, s, n) {
    const himmel = ["#9BD1F7", "#F6C79A", "#BFE3C6", "#F4B6C2", "#C9D6F7", "#FBE3A1"][n % 6];
    const berg = ["#5C9E6E", "#C5835A", "#4F8F6A", "#B0657A", "#6077B8", "#C99A3B"][n % 6];
    return R(x, y, s, s, 2, himmel) + C(x + s * 0.72, y + s * 0.3, s * 0.1, "#fff", 'opacity=".8"') +
      `<path d="M${x} ${y + s} L${x + s * 0.35} ${y + s * 0.5} L${x + s * 0.6} ${y + s * 0.78} L${x + s * 0.78} ${y + s * 0.62} L${x + s} ${y + s} Z" fill="${berg}"/>`;
  }

  /* ---------- WhatsApp ---------- */
  const CHATS = [
    ["Anna", "Bis morgen!", "10:24", "#F4A261"],
    ["Familie", "Peter: Fotos vom Sonntag", "09:12", "#2A9D8F"],
    ["Maria", "Danke dir!", "gestern", "#E76F51"],
    ["Klaus", "Ruf mich mal an", "gestern", "#457B9D"],
    ["Ute Nachbarin", "Paket ist angekommen", "Mo.", "#8D6E63"],
    ["Peter", "Gute Nacht", "So.", "#6D597A"],
  ];
  const WA_TABS = ["Aktuelles", "Anrufe", "Communitys", "Chats", "Einstellungen"];

  function chatZeile(y, [name, text, zeit, farbe]) {
    return avatar(30, y + 20, 15, farbe, name[0]) + T(54, y + 16, name, { size: 10.5, weight: 600 }) +
      T(54, y + 30, text, { size: 8.5, fill: GRAU }) + T(188, y + 16, zeit, { size: 7.5, fill: GRAU, anchor: "end" }) + L(54, y + 40, 200, y + 40);
  }

  function waChatListe(c) {
    let out = R(0, 0, W, c.H, 0, "#fff") + statusleiste(c);
    out += C(20, c.top + 7, 8, "#EDEDF0") + T(20, c.top + 10, "···", { size: 9, anchor: "middle", weight: 700 });
    out += C(181, c.top + 7, 8, "#25D366") + `<path d="M181 ${c.top + 3}v8M177 ${c.top + 7}h8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`;
    out += T(12, c.top + 40, "Chats", { size: 21, weight: 700 });
    out += suchfeld(c.top + 50, "Suchen");
    ["Alle", "Ungelesen", "Favoriten", "Gruppen"].forEach((t, i) => {
      const x = [12, 40, 90, 140][i], w = [24, 46, 46, 42][i];
      out += R(x, c.top + 80, w, 16, 8, i === 0 ? "#D9FDD3" : "#F2F2F7") + T(x + w / 2, c.top + 91, t, { size: 7.5, anchor: "middle", fill: i === 0 ? "#0B6E2F" : "#3C3C43" });
    });
    const ende = tabY(c) - 4;
    CHATS.forEach((ch, i) => { const y = c.top + 102 + i * 42; if (y + 40 < ende + 30) out += chatZeile(y, ch); });
    return out + tabLeiste(c, WA_TABS, 3, "#1C1C1E");
  }

  function waEingabeY(c) { return c.H - (c.home ? 38 : 52); }

  function waChat(c) {
    let out = R(0, 0, W, c.H, 0, "#EFE7DD");
    for (let i = 0; i < 9; i++) out += C(20 + (i * 53) % 190, 70 + ((i * 97) % 260), 6, "#E2D7C8", 'opacity=".7"');
    out += R(0, 0, W, c.top + 30, 0, "#F7F7F7") + L(0, c.top + 30, W, c.top + 30, "#D1D1D6") + statusleiste(c);
    const y = c.top + 14;
    out += `<path d="M16 ${y - 7} l-7 7 7 7" fill="none" stroke="${BLAU}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    out += avatar(36, y, 10, "#F4A261", "A") + T(52, y - 1, "Anna", { size: 10.5, weight: 600 }) + T(52, y + 10, "online", { size: 7.5, fill: GRAU });
    out += R(148, y - 5, 13, 10, 2.5, "none", `stroke="${BLAU}" stroke-width="1.5"`) + `<path d="M161 ${y - 1} l4 -3 v8 l-4 -3" fill="none" stroke="${BLAU}" stroke-width="1.5"/>`;
    out += `<path d="M178 ${y - 6} h3 l1.5 3.5 -1.8 1.2 a8 8 0 0 0 4 4 l1.2 -1.8 3.5 1.5 v3 a1.5 1.5 0 0 1 -1.5 1.5 a12 12 0 0 1 -11.5 -11.5 a1.5 1.5 0 0 1 1.5 -1.5z" fill="none" stroke="${BLAU}" stroke-width="1.4"/>`;
    const b = c.top + 48;
    out += R(10, b, 118, 26, 8, "#fff") + T(18, b + 16, "Hallo! Wie geht es dir?", { size: 8.5 });
    out += R(72, b + 36, 118, 26, 8, "#D9FDD3") + T(80, b + 52, "Gut, danke! Und dir?", { size: 8.5 });
    out += R(10, b + 72, 96, 26, 8, "#fff") + T(18, b + 88, "Bis morgen!", { size: 8.5 });
    const ey = waEingabeY(c);
    out += R(0, ey, W, c.H - ey, 0, "#F7F7F7") + L(0, ey, W, ey, "#D1D1D6");
    out += `<path d="M16 ${ey + 9} v14 M9 ${ey + 16} h14" stroke="#1C1C1E" stroke-width="2" stroke-linecap="round"/>`;
    out += R(30, ey + 6, 122, 20, 10, "#fff", 'stroke="#D1D1D6" stroke-width=".6"');
    out += R(160, ey + 11, 13, 10, 2.5, "none", 'stroke="#1C1C1E" stroke-width="1.4"') + C(166.5, ey + 16, 2.5, "none", 'stroke="#1C1C1E" stroke-width="1.2"');
    out += R(183, ey + 8, 6, 11, 3, "none", 'stroke="#1C1C1E" stroke-width="1.4"') + `<path d="M180 ${ey + 15} a6 6 0 0 0 12 0 M186 ${ey + 21} v3" fill="none" stroke="#1C1C1E" stroke-width="1.4"/>`;
    return out;
  }

  /* ---------- Telefon-App ---------- */
  const TEL_TABS = ["Favoriten", "Anrufliste", "Kontakte", "Ziffernblock", "Voicemail"];
  const ANRUFE = [
    ["Anna Müller", "Mobil", "10:24", true],
    ["+49 170 1234567", "Deutschland", "09:51", true],
    ["Klaus", "Mobil", "gestern", false],
    ["Praxis Dr. Weber", "Arbeit", "Montag", false],
    ["Maria", "Privat", "Sonntag", false],
  ];
  const anrufY = (c, i) => c.top + 66 + i * 34;

  function telAnrufe(c) {
    let out = R(0, 0, W, c.H, 0, "#fff") + statusleiste(c);
    out += R(62, c.top + 2, 76, 18, 9, "#EDEDF0") + R(64, c.top + 4, 37, 14, 7, "#fff") +
      T(82.5, c.top + 14, "Alle", { size: 8, anchor: "middle", weight: 600 }) + T(119.5, c.top + 14, "Verpasst", { size: 8, anchor: "middle" });
    out += T(W - 12, c.top + 14, "Bearbeiten", { fill: BLAU, size: 9.5, anchor: "end" });
    out += T(12, c.top + 50, "Anrufliste", { size: 21, weight: 700 });
    ANRUFE.forEach(([name, art, zeit, verpasst], i) => {
      const y = anrufY(c, i);
      if (y + 30 > tabY(c)) return;
      out += T(16, y + 14, name, { size: 10.5, weight: 600, fill: verpasst ? ROT : "#1C1C1E" }) +
        T(16, y + 26, art, { size: 8, fill: GRAU }) + T(166, y + 18, zeit, { size: 8, fill: GRAU, anchor: "end" }) +
        C(182, y + 16, 7, "none", `stroke="${BLAU}" stroke-width="1.3"`) + T(182, y + 19.5, "i", { size: 9, weight: 700, fill: BLAU, anchor: "middle" }) +
        L(16, y + 33, 200, y + 33);
    });
    return out + tabLeiste(c, TEL_TABS, 1);
  }

  function telKontakte(c) {
    let out = R(0, 0, W, c.H, 0, "#fff") + statusleiste(c) + titelGross(c, "Kontakte", { plus: true });
    out += suchfeld(c.top + 50);
    let y = c.top + 82;
    out += avatar(28, y + 14, 12, "#AEAEB2", "I") + T(46, y + 12, "Ihre Karte", { size: 10.5, weight: 600 }) + T(46, y + 23, "Mein Kontakt", { size: 8, fill: GRAU });
    y += 34;
    const gruppen = [["A", ["Anna Müller", "Andreas Klein"]], ["B", ["Bernd Schulz", "Brigitte Ott"]], ["D", ["Doris Lang", "Dieter Paul"]]];
    for (const [b, namen] of gruppen) {
      if (y > tabY(c) - 20) break;
      out += R(0, y, W, 14, 0, "#F2F2F7") + T(14, y + 10.5, b, { size: 8, weight: 700, fill: GRAU });
      y += 14;
      for (const n of namen) {
        if (y > tabY(c) - 20) break;
        out += T(16, y + 17, n, { size: 10.5 }) + L(16, y + 25, 200, y + 25);
        y += 25;
      }
    }
    return out + tabLeiste(c, TEL_TABS, 2);
  }

  function kontaktNeu(c, p) {
    const stufe = ["vorname", "nachname", "telefon", "nummer", "fertig"].indexOf(p);
    let out = R(0, 0, W, c.H, 0, "#F2F2F7") + statusleiste(c);
    out += titelKlein(c, "Neuer Kontakt", { links: "Abbrechen", rechts: "Fertig", rechtsFett: true, rechtsGrau: stufe < 1 });
    out += C(100, c.top + 52, 25, "#C7C7CC") + C(100, c.top + 46, 9, "#fff") + `<path d="M84 ${c.top + 70} a16 13 0 0 1 32 0" fill="#fff"/>`;
    out += T(100, c.top + 92, "Foto hinzufügen", { size: 8.5, fill: BLAU, anchor: "middle" });
    const ky = c.top + 102;
    out += R(12, ky, 176, 78, 10, "#fff");
    const werte = [stufe >= 1 ? "Anna" : "", stufe >= 2 ? "Müller" : "", ""];
    ["Vorname", "Nachname", "Firma"].forEach((n, i) => {
      const y = ky + i * 26;
      out += T(22, y + 17, werte[i] || n, { size: 10, fill: werte[i] ? "#1C1C1E" : "#C7C7CC" });
      if (i < 2) out += L(22, y + 26, 188, y + 26);
    });
    if (p === "vorname") out += R(22, ky + 7, 1.3, 13, 0.6, BLAU);
    if (p === "nachname") out += R(22, ky + 33, 1.3, 13, 0.6, BLAU);
    const ty = c.top + 190;
    if (stufe >= 3) {
      out += R(12, ty, 176, 52, 10, "#fff") + C(26, ty + 13, 6.5, ROT) + L(23, ty + 13, 29, ty + 13, "#fff", 1.6) +
        T(38, ty + 17, "mobil ›", { size: 9, fill: BLAU }) + T(82, ty + 17, "0170 1234567", { size: 10 }) + L(38, ty + 26, 188, ty + 26) +
        C(26, ty + 39, 6.5, "#34C759") + `<path d="M26 ${ty + 35.5}v7M22.5 ${ty + 39}h7" stroke="#fff" stroke-width="1.6"/>` + T(38, ty + 43, "Telefon hinzufügen", { size: 10 });
    } else {
      out += R(12, ty, 176, 26, 10, "#fff") + C(26, ty + 13, 6.5, "#34C759") +
        `<path d="M26 ${ty + 9.5}v7M22.5 ${ty + 13}h7" stroke="#fff" stroke-width="1.6"/>` + T(38, ty + 17, "Telefon hinzufügen", { size: 10 });
    }
    if (p === "nummer") out += tastatur(c, { ziffern: true });
    return out;
  }

  function anrufInfo(c) {
    let out = R(0, 0, W, c.H, 0, "#F2F2F7") + statusleiste(c) + titelKlein(c, "", { links: "‹ Anrufliste" });
    out += C(100, c.top + 44, 22, "#AEAEB2") + C(100, c.top + 39, 8, "#fff") + `<path d="M86 ${c.top + 60} a14 11 0 0 1 28 0" fill="#fff"/>`;
    out += T(100, c.top + 86, "+49 170 1234567", { size: 14, weight: 600, anchor: "middle" });
    const y = c.top + 100;
    out += R(12, y, 176, 78, 10, "#fff");
    [["Neuen Kontakt erstellen", BLAU], ["Zu Kontakt hinzufügen", BLAU], ["Anrufer blockieren", ROT]].forEach(([t, f], i) => {
      out += T(22, y + i * 26 + 17, t, { size: 10, fill: f });
      if (i < 2) out += L(22, y + i * 26 + 26, 188, y + i * 26 + 26);
    });
    return out;
  }

  /* ---------- Mail ---------- */
  function mailEingang(c) {
    let out = R(0, 0, W, c.H, 0, "#fff") + statusleiste(c) + titelGross(c, "Eingang", { links: "‹ Postfächer", rechts: "Bearbeiten" });
    const mails = [["Anna Müller", "Fotos vom Wochenende", "Hier sind die Bilder …", "10:24", true],
      ["Apotheke", "Ihre Bestellung", "Ihre Bestellung liegt …", "gestern", false],
      ["Klaus", "Geburtstag", "Kommt ihr am Samstag …", "Mo.", false],
      ["Stadtwerke", "Ihre Rechnung", "Sehr geehrte Damen …", "So.", false],
      ["Maria", "Rezept", "Wie versprochen …", "Fr.", false]];
    mails.forEach(([von, betreff, vorschau, zeit, neu], i) => {
      const y = c.top + 54 + i * 46;
      if (y + 44 > c.H - 40) return;
      if (neu) out += C(10, y + 12, 3.5, BLAU);
      out += T(18, y + 14, von, { size: 10.5, weight: 600 }) + T(188, y + 14, zeit, { size: 8, fill: GRAU, anchor: "end" }) +
        T(18, y + 26, betreff, { size: 9 }) + T(18, y + 38, vorschau, { size: 8.5, fill: GRAU }) + L(18, y + 45, 200, y + 45);
    });
    const by = c.H - (c.home ? 26 : 40);
    out += R(0, by - 10, W, c.H - by + 10, 0, "#F7F7F7") + L(0, by - 10, W, by - 10, "#D1D1D6");
    out += T(100, by + 4, "Gerade aktualisiert", { size: 7.5, anchor: "middle", fill: GRAU });
    out += `<path d="M175 ${by - 3} v11 h11 v-5 M180 ${by + 3} l8 -8 2.2 2.2 -8 8 h-2.2z" fill="none" stroke="${BLAU}" stroke-width="1.5" stroke-linejoin="round"/>`;
    return out;
  }
  const mailNeuY = (c) => c.top + 52;

  function mailNeu(c, p) {
    const stufe = ["an", "vorschlag", "betreff", "text", "senden"].indexOf(p);
    let out = R(0, 0, W, c.H, 0, "#fff") + statusleiste(c);
    out += T(12, c.top + 14, "Abbrechen", { fill: BLAU, size: 9.5 });
    out += C(182, c.top + 10, 10, stufe >= 2 ? BLAU : "#C7C7CC") + `<path d="M182 ${c.top + 15} v-10 M177.5 ${c.top + 9.5} l4.5 -4.5 4.5 4.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
    out += T(12, c.top + 40, "Neue E-Mail", { size: 17, weight: 700 });
    const y = mailNeuY(c);
    out += T(14, y + 17, "An:", { size: 10, fill: GRAU });
    if (stufe === 1) out += T(34, y + 17, "Anna", { size: 10 }) + R(57, y + 7, 1.3, 13, 0.6, BLAU);
    if (stufe >= 2) out += R(32, y + 6, 66, 16, 8, "#E5F0FF") + T(65, y + 17, "Anna Müller", { size: 8.5, fill: BLAU, anchor: "middle" });
    out += L(14, y + 26, 200, y + 26) + T(14, y + 43, "Kopie/Blindkopie, Von:", { size: 10, fill: GRAU }) + L(14, y + 52, 200, y + 52);
    out += T(14, y + 69, "Betreff:", { size: 10, fill: GRAU }) + (stufe >= 3 ? T(56, y + 69, "Liebe Grüße", { size: 10 }) : "") + L(14, y + 78, 200, y + 78);
    if (stufe >= 4) {
      ["Hallo Anna,", "", "wie geht es dir? Wir denken", "an dich.", "", "Liebe Grüße"].forEach((t, i) => { out += T(14, y + 98 + i * 13, t, { size: 9.5 }); });
    }
    if (stufe === 1) {
      out += R(0, y + 27, W, 58, 0, "#fff", 'stroke="#D1D1D6" stroke-width=".6"');
      out += T(14, y + 42, "Anna Müller", { size: 10, weight: 600 }) + T(14, y + 53, "anna.mueller@beispiel.de", { size: 8, fill: GRAU }) + L(14, y + 57, 200, y + 57);
      out += T(14, y + 72, "Anna Schmidt", { size: 10, weight: 600 }) + T(14, y + 82, "anna.schmidt@beispiel.de", { size: 8, fill: GRAU });
    }
    return out;
  }

  /* ---------- Fotos / Teilen ---------- */
  function fotoauswahl(c) {
    let out = R(0, 0, W, c.H, 0, "#fff") + statusleiste(c) + titelKlein(c, "Fotos", { links: "Abbrechen" });
    for (let i = 0; i < 15; i++) out += foto(2 + (i % 3) * 66, c.top + 30 + Math.floor(i / 3) * 66, 64, i);
    return out;
  }

  function waFotoSenden(c) {
    let out = R(0, 0, W, c.H, 0, "#000") + statusleiste(c, "#fff");
    out += T(14, c.top + 16, "✕", { size: 13, fill: "#fff" });
    out += foto(0, c.top + 50, 200, 1);
    const y = c.H - (c.home ? 40 : 56);
    out += R(10, y, 146, 26, 13, "#2C2C2E") + T(22, y + 17, "Bildunterschrift hinzufügen", { size: 8.5, fill: "#AEAEB2" });
    out += C(176, y + 13, 14, "#25D366") + `<path d="M176 ${y + 19} v-12 M170.5 ${y + 12.5} l5.5 -5.5 5.5 5.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    return out;
  }
  const waSendenY = (c) => c.H - (c.home ? 40 : 56) + 13;

  function waMenue(c) {
    let out = waChat(c) + R(0, 0, W, c.H, 0, "#000", 'opacity=".3"');
    const y0 = c.H - (c.home ? 200 : 222);
    out += R(0, y0, W, c.H - y0 + 20, 18, "#fff") + R(85, y0 + 6, 30, 4, 2, "#C7C7CC");
    [["Kamera", "#3A3A3C"], ["Fotos", "#007AFF"], ["Dokument", "#5856D6"], ["Standort", "#34C759"], ["Kontakt", "#8E8E93"], ["Umfrage", "#FFCC00"]].forEach(([t, f], i) => {
      const y = y0 + 16 + i * 30;
      out += R(16, y + 4, 20, 20, 6, f) + T(46, y + 18, t, { size: 10.5 }) + (i < 5 ? L(46, y + 29, 200, y + 29) : "");
    });
    return out;
  }
  const waMenueFotosY = (c) => c.H - (c.home ? 200 : 222) + 16 + 30 + 14;

  /* ---------- Einstellungen ---------- */
  const EINST = [["Allgemein", "#8E8E93"], ["Bedienungshilfen", "#0A84FF"], ["Kamera", "#8E8E93"], ["Anzeige & Helligkeit", "#0A84FF"], ["Hintergrundbild", "#30B0C7"], ["Mitteilungen", "#FF3B30"], ["Töne & Haptik", "#FF2D55"], ["Fokus", "#5856D6"]];
  function einstellungen(c) {
    let out = R(0, 0, W, c.H, 0, "#F2F2F7") + statusleiste(c) + T(12, c.top + 30, "Einstellungen", { size: 21, weight: 700 });
    const y0 = c.top + 44;
    out += R(12, y0, 176, EINST.length * 26, 10, "#fff");
    EINST.forEach(([n, f], i) => {
      const y = y0 + i * 26;
      out += R(20, y + 5, 16, 16, 4, f) + T(44, y + 17, n, { size: 10 }) + T(182, y + 17, "›", { size: 12, fill: "#C7C7CC", anchor: "end" });
      if (i < EINST.length - 1) out += L(44, y + 26, 188, y + 26);
    });
    return out;
  }

  function anzeige(c) {
    let out = R(0, 0, W, c.H, 0, "#F2F2F7") + statusleiste(c) + titelKlein(c, "Anzeige & Helligkeit", { links: "‹" });
    out += T(20, c.top + 40, "HELLIGKEIT", { size: 7.5, fill: GRAU });
    out += R(12, c.top + 45, 176, 30, 10, "#fff") + R(40, c.top + 59, 120, 3, 1.5, "#C7C7CC") + R(40, c.top + 59, 80, 3, 1.5, BLAU) +
      C(120, c.top + 60.5, 8, "#fff", 'stroke="#D1D1D6" stroke-width=".8"') + C(26, c.top + 60, 3, GRAU) + C(174, c.top + 60, 4.5, GRAU);
    const y = c.top + 86;
    out += R(12, y, 176, 52, 10, "#fff") + T(22, y + 17, "Textgröße", { size: 10 }) + T(182, y + 17, "›", { size: 12, fill: "#C7C7CC", anchor: "end" }) +
      L(22, y + 26, 188, y + 26) + T(22, y + 43, "Fettschrift", { size: 10 }) + R(156, y + 33, 28, 16, 8, "#E5E5EA") + C(164, y + 41, 7, "#fff");
    return out;
  }

  const textReglerY = (c) => c.H - (c.home ? 76 : 96);
  function textgroesse(c) {
    let out = R(0, 0, W, c.H, 0, "#F2F2F7") + statusleiste(c) + titelKlein(c, "Textgröße", { links: "‹ Zurück" });
    ["Apps, die dynamische Schrift", "unterstützen, passen sich an die", "gewählte Größe an."].forEach((t, i) => { out += T(100, c.top + 52 + i * 14, t, { size: 9.5, anchor: "middle", fill: "#3C3C43" }); });
    const y = textReglerY(c);
    out += R(12, y, 176, 40, 12, "#fff") + T(24, y + 25, "A", { size: 9 }) + T(180, y + 28, "A", { size: 18, anchor: "end" });
    out += R(40, y + 19, 120, 3, 1.5, "#C7C7CC");
    for (let i = 0; i < 7; i++) out += R(40 + i * 20, y + 15, 1.2, 11, 0.6, "#C7C7CC");
    out += C(80, y + 20.5, 9, "#fff", 'stroke="#C7C7CC" stroke-width=".8"');
    return out;
  }

  /* ---------- Kontrollzentrum ---------- */
  const kzY = (c) => c.top + 6;
  function kontrollzentrum(c) {
    const y = kzY(c), glas = 'fill-opacity=".22" stroke="#fff" stroke-opacity=".35" stroke-width=".6"';
    let out = hintergrund(c) + R(0, 0, W, c.H, 0, "#141420", 'opacity=".6"') + statusleiste(c, "#fff");
    out += R(14, y, 82, 70, 20, "#fff", glas);
    [["#FF9500", 0, 0], ["#34C759", 1, 0], ["#007AFF", 0, 1], ["#007AFF", 1, 1]].forEach(([f, i, j]) => { out += C(38 + i * 34, y + 19 + j * 32, 12, f); });
    out += R(104, y, 82, 70, 20, "#fff", glas) + T(145, y + 32, "Nicht", { size: 8.5, fill: "#fff", anchor: "middle" }) + T(145, y + 44, "abgespielt", { size: 8.5, fill: "#fff", anchor: "middle" });
    out += R(14, y + 80, 38, 38, 19, "#fff", glas) + R(58, y + 80, 38, 38, 19, "#fff", glas) + R(14, y + 124, 82, 26, 13, "#fff", glas);
    out += R(104, y + 80, 36, 70, 18, "#fff", glas) + `<path d="M104 ${y + 110} h36 v22 a18 18 0 0 1 -18 18 a18 18 0 0 1 -18 -18z" fill="#fff"/>`;
    out += C(122, y + 138, 4, "#FFB000") + R(150, y + 80, 36, 70, 18, "#fff", glas) + `<path d="M150 ${y + 120} h36 v12 a18 18 0 0 1 -18 18 a18 18 0 0 1 -18 -18z" fill="#fff"/>`;
    out += `<path d="M163 ${y + 136} h3 l4 -3.5 v9 l-4 -3.5 h-3z" fill="#1C1C1E"/>`;
    [33, 79, 125, 171].forEach((x) => { out += C(x, y + 176, 15, "#fff", glas); });
    return out;
  }

  /* ---------- Szenen ---------- */
  const SZENEN = {
    "homescreen": (c, p) => {
      const pos = p && appPos(c, p);
      return { inhalt: homescreen(c), overlay: pos ? tipp(pos.x + S / 2, pos.y + S / 2) : "", ausschnitt: pos ? (pos.dock ? "unten" : "oben") : "ganz" };
    },
    "homescreen-halten": (c, p = "spiel") => {
      const pos = appPos(c, p);
      return { inhalt: homescreen(c), overlay: halten(pos.x + S / 2, pos.y + S / 2), ausschnitt: "oben" };
    },
    "homescreen-seiten": (c) => ({ inhalt: homescreen(c), overlay: wisch(165, 150, 40, 150), ausschnitt: "oben" }),
    "app-menue": (c) => {
      const pos = appPos(c, "spiel");
      let inhalt = hintergrund(c) + R(0, 0, W, c.H, 0, "#fff", 'opacity=".45"') + appSymbol(pos.x, pos.y, S, "spiel", false);
      const my = pos.y + S + 10;
      inhalt += R(56, my, 136, 78, 12, "#fff", 'fill-opacity=".97"');
      [["Teilen", "#1C1C1E"], ["Home-Bildschirm bearbeiten", "#1C1C1E"], ["App entfernen", ROT]].forEach(([t, f], i) => {
        inhalt += T(66, my + i * 26 + 17, t, { size: 9, fill: f }) + (i < 2 ? L(56, my + i * 26 + 26, 192, my + i * 26 + 26) : "");
      });
      return { inhalt, overlay: tipp(124, my + 65), ausschnitt: "ganz" };
    },
    "app-loeschen-dialog": (c) => {
      const y = c.H / 2 - 70;
      let inhalt = homescreen(c) + R(0, 0, W, c.H, 0, "#000", 'opacity=".35"') + R(24, y, 152, 140, 14, "#F2F2F7");
      inhalt += T(100, y + 22, "„Spiel“ entfernen?", { size: 10.5, weight: 700, anchor: "middle" }) +
        T(100, y + 36, "Sie können die App löschen oder", { size: 7.5, anchor: "middle", fill: "#3C3C43" }) +
        T(100, y + 46, "nur vom Bildschirm nehmen.", { size: 7.5, anchor: "middle", fill: "#3C3C43" });
      [["App löschen", ROT], ["Vom Home-Bildschirm entfernen", BLAU], ["Abbrechen", BLAU]].forEach(([t, f], i) => {
        const yy = y + 56 + i * 28;
        inhalt += L(24, yy, 176, yy, "#D1D1D6") + T(100, yy + 18, t, { size: 9.5, fill: f, anchor: "middle", weight: i === 2 ? 600 : 400 });
      });
      return { inhalt, overlay: tipp(100, y + 70), ausschnitt: "ganz" };
    },
    "app-loeschen-bestaetigen": (c) => {
      const y = c.H / 2 - 50;
      let inhalt = homescreen(c) + R(0, 0, W, c.H, 0, "#000", 'opacity=".35"') + R(24, y, 152, 96, 14, "#F2F2F7");
      inhalt += T(100, y + 22, "„Spiel“ löschen?", { size: 10.5, weight: 700, anchor: "middle" }) +
        T(100, y + 37, "Die App und ihre Daten", { size: 7.5, anchor: "middle", fill: "#3C3C43" }) +
        T(100, y + 47, "werden gelöscht.", { size: 7.5, anchor: "middle", fill: "#3C3C43" }) +
        L(24, y + 62, 176, y + 62, "#D1D1D6") + L(100, y + 62, 100, y + 96, "#D1D1D6") +
        T(62, y + 83, "Abbrechen", { size: 9.5, fill: BLAU, anchor: "middle" }) + T(138, y + 83, "Löschen", { size: 9.5, fill: ROT, anchor: "middle", weight: 600 });
      return { inhalt, overlay: tipp(138, y + 79), ausschnitt: "ganz" };
    },

    "wa-chats": (c, p) => {
      const ov = { tab: tipp(tabX(5, 3), tabY(c) + 18), suche: tipp(100, c.top + 61), ziehen: wisch(100, c.top + 110, 100, c.top + 200) }[p] || "";
      return { inhalt: waChatListe(c), overlay: ov, ausschnitt: p === "tab" ? "unten" : p ? "oben" : "ganz" };
    },
    "wa-suche-tippen": (c) => {
      let inhalt = R(0, 0, W, c.H, 0, "#fff") + statusleiste(c) + suchfeld(c.top + 6, "Anna", { aktiv: true }) +
        T(W - 10, c.top + 21, "", { size: 9 }) + T(14, c.top + 46, "CHATS", { size: 7.5, fill: GRAU, weight: 600 }) + chatZeile(c.top + 52, CHATS[0]);
      inhalt += tastatur(c);
      return { inhalt, overlay: markierung(10, c.top + 3, 180, 28), ausschnitt: "ganz" };
    },
    "wa-ergebnis": (c) => {
      const inhalt = R(0, 0, W, c.H, 0, "#fff") + statusleiste(c) + suchfeld(c.top + 6, "Anna", { aktiv: true }) +
        T(14, c.top + 46, "CHATS", { size: 7.5, fill: GRAU, weight: 600 }) + chatZeile(c.top + 52, CHATS[0]) + tastatur(c);
      return { inhalt, overlay: tipp(70, c.top + 72), ausschnitt: "oben" };
    },
    "wa-chat": (c, p) => {
      const ey = waEingabeY(c);
      const daten = {
        zurueck: [tipp(13, c.top + 14), "oben"],
        plus: [tipp(16, ey + 16), "unten"],
        strich: [c.home ? "" : tipp(100, c.H - 6), "unten"],
        wisch: [c.home ? "" : wisch(100, c.H - 6, 100, c.H - 150), "unten"],
        hometaste: [c.home ? tipp(100, c.H + 31) : "", "unten"],
      }[p] || ["", "ganz"];
      return { inhalt: waChat(c), overlay: daten[0], ausschnitt: daten[1] };
    },
    "wa-menue": (c) => ({ inhalt: waMenue(c), overlay: tipp(64, waMenueFotosY(c)), ausschnitt: "unten" }),
    "fotoauswahl": (c) => ({ inhalt: fotoauswahl(c), overlay: tipp(100, c.top + 128), ausschnitt: "oben" }),
    "wa-foto-senden": (c) => ({ inhalt: waFotoSenden(c), overlay: tipp(176, waSendenY(c)), ausschnitt: "unten", dunkel: true }),

    "tel-kontakte": (c, p) => ({
      inhalt: telKontakte(c),
      overlay: p === "tab" ? tipp(tabX(5, 2), tabY(c) + 18) : p === "plus" ? tipp(183, c.top + 8) : "",
      ausschnitt: p === "tab" ? "unten" : "oben",
    }),
    "kontakt-neu": (c, p = "vorname") => {
      const ov = {
        vorname: tipp(100, c.top + 115), nachname: tipp(100, c.top + 141), telefon: tipp(80, c.top + 203),
        nummer: markierung(76, c.top + 193, 108, 20), fertig: tipp(W - 22, c.top + 11),
      }[p] || "";
      return { inhalt: kontaktNeu(c, p), overlay: ov, ausschnitt: p === "nummer" ? "ganz" : p === "telefon" ? "mitte" : "oben" };
    },
    "tel-anrufe": (c, p) => {
      const ov = {
        tab: tipp(tabX(5, 1), tabY(c) + 18), liste: markierung(8, anrufY(c, 0) + 1, 184, 31),
        name: tipp(60, anrufY(c, 0) + 17), info: tipp(182, anrufY(c, 1) + 16),
      }[p] || "";
      return { inhalt: telAnrufe(c), overlay: ov, ausschnitt: p === "tab" ? "unten" : "oben" };
    },
    "anruf-info": (c) => ({ inhalt: anrufInfo(c), overlay: tipp(80, c.top + 113), ausschnitt: "oben" }),

    "mail-eingang": (c) => ({ inhalt: mailEingang(c), overlay: tipp(182, c.H - (c.home ? 26 : 40) + 2), ausschnitt: "unten" }),
    "mail-neu": (c, p = "an") => {
      const y = mailNeuY(c);
      const ov = { an: tipp(100, y + 13), vorschlag: tipp(80, y + 46), betreff: tipp(110, y + 65), text: tipp(100, y + 110), senden: tipp(182, c.top + 10) }[p] || "";
      return { inhalt: mailNeu(c, p), overlay: ov, ausschnitt: "oben" };
    },

    "einstellungen": (c) => ({ inhalt: einstellungen(c), overlay: tipp(100, c.top + 44 + 3 * 26 + 13), ausschnitt: "oben" }),
    "anzeige": (c) => ({ inhalt: anzeige(c), overlay: tipp(90, c.top + 99), ausschnitt: "oben" }),
    "textgroesse": (c) => {
      const y = textReglerY(c);
      return { inhalt: textgroesse(c), overlay: wisch(80, y + 20, 150, y + 20), ausschnitt: "unten" };
    },

    "kz-oeffnen": (c) => c.home
      ? { inhalt: homescreen(c), overlay: wisch(100, c.H - 2, 100, c.H - 140), ausschnitt: "unten" }
      : { inhalt: homescreen(c), overlay: wisch(182, 6, 182, 130), ausschnitt: "oben" },
    "kontrollzentrum": (c, p = "hell") => {
      const y = kzY(c), x = p === "laut" ? 168 : 122;
      return { inhalt: kontrollzentrum(c), overlay: markierung(x - 22, y + 76, 44, 78, 20) + wisch(x, y + 140, x, y + 92), ausschnitt: "oben", dunkel: true };
    },
    "kz-schliessen": (c) => ({ inhalt: kontrollzentrum(c), overlay: tipp(100, c.H - 60), ausschnitt: "ganz", dunkel: true }),

    "seitentasten": (c) => {
      const k = c.knopf;
      const marke = (b, zeichen) =>
        R(b.x - 3, b.y - 3, 9, b.h + 6, 4.5, "none", `stroke="${MARKE}" stroke-width="2.5"`) +
        C(b.x - 20, b.y + b.h / 2, 10, MARKE) + T(b.x - 20, b.y + b.h / 2 + 4.5, zeichen, { size: 13, weight: 700, fill: "#fff", anchor: "middle" });
      return { inhalt: homescreen(c), overlay: marke(k.lauter, "+") + marke(k.leiser, "–"), ausschnitt: "oben" };
    },
    "lautstaerke-anzeige": (c) => {
      const y = c.home ? 14 : 96;
      const inhalt = homescreen(c) + R(6, y, 14, 64, 7, "#fff", 'fill-opacity=".55"') +
        `<path d="M6 ${y + 26} h14 v31 a7 7 0 0 1 -7 7 a7 7 0 0 1 -7 -7z" fill="#fff"/>` +
        `<path d="M10 ${y + 55} h2 l3 -2.5 v7 l-3 -2.5 h-2z" fill="#1C1C1E"/>`;
      return { inhalt, overlay: markierung(2, y - 4, 22, 72, 10), ausschnitt: "oben" };
    },
    "schwarz": (c, p = "seite") => {
      const k = c.knopf.seite;
      if (p === "home" && c.home) return { inhalt: R(0, 0, W, c.H, 0, "#000"), overlay: tipp(100, c.H + 31), ausschnitt: "unten", dunkel: true };
      return {
        inhalt: R(0, 0, W, c.H, 0, "#000"),
        overlay: R(k.x - 3, k.y - 3, 9, k.h + 6, 4.5, "none", `stroke="${MARKE}" stroke-width="2.5"`) + tipp(k.x + 16, k.y + k.h / 2),
        ausschnitt: "oben", dunkel: true,
      };
    },
  };

  /* ---------- iPhone-Rahmen ---------- */
  function render(angabe, gruppe) {
    const [name, zusatz] = String(angabe).split(":");
    const szene = SZENEN[name];
    if (!szene) { console.warn("Unbekannte Zeichnung:", angabe); return ""; }
    const home = gruppe === "home";
    const H = home ? 356 : 420;
    const id = "z" + (++zaehler);
    const fx = home ? -10 : -9, fy = home ? -58 : -9, fw = home ? 220 : 218, fh = home ? H + 120 : H + 18;
    const c = {
      gruppe, home, H, id, top: home ? 20 : 42,
      knopf: home
        ? { lauter: { x: fx - 3, y: 10, h: 28 }, leiser: { x: fx - 3, y: 46, h: 28 }, seite: { x: fx + fw, y: 10, h: 34 } }
        : { lauter: { x: fx - 3, y: 105, h: 34 }, leiser: { x: fx - 3, y: 147, h: 34 }, seite: { x: fx + fw, y: 112, h: 52 } },
    };
    const s = szene(c, zusatz);

    const k = c.knopf;
    let rahmen = "";
    rahmen += [k.lauter, k.leiser].map((b) => R(b.x, b.y, 3.5, b.h, 1.5, "#48484A")).join("");
    rahmen += R(fx - 3, home ? -22 : 72, 3.5, home ? 14 : 20, 1.5, "#48484A");
    rahmen += R(k.seite.x - 0.5, k.seite.y, 3.5, k.seite.h, 1.5, "#48484A");
    rahmen += R(fx, fy, fw, fh, home ? 30 : 40, "#1C1C1E", 'stroke="#3A3A3C" stroke-width="1.5"');

    let oben = "";
    if (home) {
      oben = R(85, -33, 30, 4, 2, "#3A3A3C") + C(70, -31, 3, "#2C2C2E") +
        C(100, H + 31, 20, "#1C1C1E", 'stroke="#48484A" stroke-width="2.5"');
    } else if (gruppe === "kerbe") {
      oben = `<path d="M58 0 h84 v4 a14 14 0 0 1 -14 14 h-56 a14 14 0 0 1 -14 -14z" fill="#000"/>`;
    } else {
      oben = R(70, 9, 60, 18, 9, "#000");
    }
    const strich = home ? "" : R(68, H - 8, 64, 4, 2, s.dunkel ? "#fff" : "#1C1C1E", 'opacity=".8"');

    const links = 40, rechts = 36;
    const vx = fx - links, vw = fw + links + rechts;
    let vy = fy - 10, vh = fh + 20;
    if (s.ausschnitt === "oben") vh = fh * 0.52 + 10;
    if (s.ausschnitt === "unten") { vy = fy + fh * 0.48; vh = fh * 0.52 + 10; }
    if (s.ausschnitt === "mitte") { vy = fy + fh * 0.24; vh = fh * 0.52; }

    return `<svg class="z-svg z-${s.ausschnitt}" viewBox="${vx} ${vy} ${vw} ${vh}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
      `<defs><clipPath id="${id}c"><rect x="0" y="0" width="${W}" height="${H}" rx="${home ? 2 : 31}"/></clipPath></defs>` +
      rahmen +
      `<g clip-path="url(#${id}c)">${s.inhalt}${strich}${home ? "" : oben}</g>` +
      (home ? oben : "") + (s.overlay || "") + "</svg>";
  }

  return { render, namen: Object.keys(SZENEN) };
})();
