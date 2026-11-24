/*
  ALLE ANLEITUNGEN DER APP
  ========================
  Hier tragen Sie neue Anleitungen ein. Den restlichen Code müssen Sie nicht anfassen.

  So sieht eine Anleitung aus:

  {
    id: "kontakt-speichern",          // eindeutiger Name, nur Kleinbuchstaben und Bindestriche
    titel: "Kontakt speichern",       // 2 bis 3 Wörter, steht auf der Kachel
    bild: "icons/kontakt.png",        // Kachel-Bild (optional; fehlt es, gibt es einen Platzhalter)
    symbol: "person",                 // Symbol für den Platzhalter (optional):
                                      // chat, person, brief, haus, telefon, foto, kamera, uhr, buch
    schritte: [
      { text: "Öffnen Sie die App „Telefon“." },
      { text: "Standardtext für alle iPhones.",
        home:  "Text nur für iPhones mit Home-Taste.",     // optional
        kerbe: "Text nur für iPhones mit Kerbe (Notch).",  // optional
        insel: "Text nur für iPhones mit Dynamic Island.", // optional
        bild:  "bilder/schritt.png"                        // optional
      },
    ]
  }

  Die drei iPhone-Gruppen heißen:
    home  = mit Home-Taste (iPhone SE)
    kerbe = Face ID mit Kerbe oben (iPhone 11 bis 14, 14 Plus, 16e, 17e)
    insel = Face ID mit Dynamic Island (iPhone 14 Pro und neuer)

  Fehlt bei einem Schritt die Variante für eine Gruppe, wird "text" gezeigt.
  Eine Variante darf auch ein eigenes Bild haben:
        home: { text: "Drücken Sie die Home-Taste.", bild: "bilder/home-taste.svg" }

  Soll ein Schritt nur bei bestimmten Gruppen erscheinen:
        nur: ["kerbe", "insel"]

  Die Schritte werden automatisch nummeriert.
  Wichtig: Nach jeder Anleitung (außer der letzten) ein Komma.
*/

const ANLEITUNGEN = [
  {
    id: "whatsapp-chat",
    titel: "WhatsApp-Chat finden",
    bild: "",
    symbol: "chat",
    schritte: [
      { text: "Öffnen Sie WhatsApp. Das ist das grüne Bild mit dem Telefonhörer." },
      { text: "Tippen Sie unten auf „Chats“." },
      { text: "Ganz oben ist ein Suchfeld. Tippen Sie darauf." },
      { text: "Sie sehen kein Suchfeld? Schieben Sie die Liste mit dem Finger etwas nach unten." },
      { text: "Schreiben Sie den Namen der Person. Zum Beispiel: Anna." },
      { text: "Tippen Sie in der Liste auf den Namen. Jetzt ist der Chat offen." },
      { text: "Sie möchten zurück zur Liste? Tippen Sie oben links auf den Pfeil." },
    ],
  },
  {
    id: "kontakt-speichern",
    titel: "Kontakt speichern",
    bild: "",
    symbol: "person",
    schritte: [
      { text: "Öffnen Sie die App „Telefon“. Das ist das grüne Bild mit dem Telefonhörer." },
      { text: "Tippen Sie unten auf „Kontakte“." },
      { text: "Tippen Sie oben rechts auf das Plus-Zeichen „+“." },
      { text: "Tippen Sie auf „Vorname“. Schreiben Sie den Vornamen." },
      { text: "Tippen Sie auf „Nachname“. Schreiben Sie den Nachnamen." },
      { text: "Schieben Sie etwas nach unten. Tippen Sie auf „Telefon hinzufügen“." },
      { text: "Tippen Sie die Telefonnummer ein." },
      { text: "Tippen Sie oben rechts auf „Fertig“ oder auf das Häkchen ✓. Jetzt ist der Kontakt gespeichert." },
    ],
  },
  {
    id: "email-schreiben",
    titel: "E-Mail schreiben",
    bild: "",
    symbol: "brief",
    schritte: [
      { text: "Öffnen Sie die App „Mail“. Das ist das blaue Bild mit dem weißen Briefumschlag." },
      { text: "Tippen Sie unten rechts auf das Zeichen mit Blatt und Stift." },
      { text: "Neben „An:“ schreiben Sie den Namen oder die E-Mail-Adresse." },
      { text: "Darunter erscheinen Vorschläge. Tippen Sie auf die richtige Person." },
      { text: "Tippen Sie auf „Betreff“. Schreiben Sie kurz, worum es geht. Zum Beispiel: Liebe Grüße." },
      { text: "Tippen Sie in das große weiße Feld darunter. Schreiben Sie Ihre Nachricht." },
      { text: "Tippen Sie oben rechts auf den blauen Pfeil nach oben. Jetzt wird die E-Mail gesendet." },
    ],
  },
  {
    id: "home-bildschirm",
    titel: "Zurück zum Start",
    bild: "", // noch kein Bild -> Platzhalter
    symbol: "haus",
    schritte: [
      {
        text: "Sie sind in einer App und möchten zurück zu allen Apps.",
      },
      {
        nur: ["home"],
        text: "Drücken Sie einmal kurz auf die runde Taste unter dem Bildschirm. Das ist die Home-Taste.",
        bild: "bilder/home-taste.svg",
      },
      {
        nur: ["kerbe", "insel"],
        text: "Legen Sie einen Finger ganz unten auf den Bildschirm. Dort ist ein kleiner Strich.",
        bild: "bilder/wischen-hoch.svg",
      },
      {
        nur: ["kerbe", "insel"],
        text: "Schieben Sie den Finger zügig nach oben. Dann lassen Sie los.",
      },
      {
        text: "Fertig! Jetzt sehen Sie wieder alle Ihre Apps.",
      },
      {
        text: "Sie sehen nicht die richtigen Apps? Wischen Sie nach links oder rechts. Dann kommt die nächste Seite.",
      },
      {
        text: "Der Bildschirm ist schwarz? Drücken Sie kurz die Taste rechts an der Seite.",
        home: "Der Bildschirm ist schwarz? Drücken Sie kurz die Home-Taste.",
      },
    ],
  },
];
