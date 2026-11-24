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
                                      // chat, person, brief, haus, telefon, foto, kamera, uhr, buch,
                                      // muell, schrift, lautsprecher, sonne
    schritte: [
      { text: "Öffnen Sie die App „Telefon“.", zeichnung: "homescreen:telefon" },
      { text: "Standardtext für alle iPhones.",
        home:  "Text nur für iPhones mit Home-Taste.",     // optional
        kerbe: "Text nur für iPhones mit Kerbe (Notch).",  // optional
        insel: "Text nur für iPhones mit Dynamic Island.", // optional
      },
    ]
  }

  Bilder zu einem Schritt (beides optional):
    zeichnung: "name"         -> gezeichneter iPhone-Bildschirm aus zeichnungen.js
                                 (Liste aller Namen steht oben in zeichnungen.js)
    bild: "bilder/datei.png"  -> eigenes Bild, z. B. ein Screenshot

  Die drei iPhone-Gruppen heißen:
    home  = mit Home-Taste (iPhone SE)
    kerbe = Face ID mit Kerbe oben (iPhone 11 bis 14, 14 Plus, 16e, 17e)
    insel = Face ID mit Dynamic Island (iPhone 14 Pro und neuer)

  Fehlt bei einem Schritt die Variante für eine Gruppe, wird "text" gezeigt.
  Eine Variante darf auch ein eigenes Bild haben:
        home: { text: "Drücken Sie die Home-Taste.", zeichnung: "wa-chat:hometaste" }

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
      { text: "Öffnen Sie WhatsApp. Das ist das grüne Bild mit der Sprechblase.", zeichnung: "homescreen:whatsapp" },
      { text: "Tippen Sie unten auf „Chats“.", zeichnung: "wa-chats:tab" },
      { text: "Ganz oben ist ein Suchfeld. Tippen Sie darauf.", zeichnung: "wa-chats:suche" },
      { text: "Sie sehen kein Suchfeld? Schieben Sie die Liste mit dem Finger etwas nach unten.", zeichnung: "wa-chats:ziehen" },
      { text: "Schreiben Sie den Namen der Person. Zum Beispiel: Anna.", zeichnung: "wa-suche-tippen" },
      { text: "Tippen Sie in der Liste auf den Namen. Jetzt ist der Chat offen.", zeichnung: "wa-ergebnis" },
      { text: "Sie möchten zurück zur Liste? Tippen Sie oben links auf den Pfeil.", zeichnung: "wa-chat:zurueck" },
    ],
  },
  {
    id: "whatsapp-foto",
    titel: "Foto per WhatsApp",
    bild: "",
    symbol: "foto",
    schritte: [
      { text: "Öffnen Sie in WhatsApp den Chat mit der Person. Wie das geht, steht in „WhatsApp-Chat finden“.", zeichnung: "wa-chat" },
      { text: "Tippen Sie unten links auf das Plus-Zeichen „+“.", zeichnung: "wa-chat:plus" },
      { text: "Tippen Sie auf „Fotos“.", zeichnung: "wa-menue" },
      { text: "Jetzt sehen Sie Ihre Fotos. Tippen Sie auf das Foto, das Sie schicken möchten.", zeichnung: "fotoauswahl" },
      { text: "Tippen Sie unten rechts auf den grünen Kreis mit dem Pfeil. Jetzt wird das Foto geschickt.", zeichnung: "wa-foto-senden" },
    ],
  },
  {
    id: "anrufliste",
    titel: "Wer hat angerufen?",
    bild: "",
    symbol: "telefon",
    schritte: [
      { text: "Öffnen Sie die App „Telefon“. Das ist das grüne Bild mit dem Telefonhörer.", zeichnung: "homescreen:telefon" },
      { text: "Tippen Sie unten auf „Anrufliste“. Bei manchen iPhones heißt es „Anrufe“.", zeichnung: "tel-anrufe:tab" },
      { text: "Oben stehen die neuesten Anrufe. Rote Namen sind Anrufe, die Sie verpasst haben.", zeichnung: "tel-anrufe:liste" },
      { text: "Sie möchten zurückrufen? Tippen Sie auf den Namen. Das iPhone ruft sofort an.", zeichnung: "tel-anrufe:name" },
      { text: "Sie möchten erst mehr wissen? Tippen Sie rechts auf das kleine „i“.", zeichnung: "tel-anrufe:info" },
      { text: "Die Nummer ist neu? Tippen Sie auf „Neuen Kontakt erstellen“. So können Sie die Nummer speichern.", zeichnung: "anruf-info" },
    ],
  },
  {
    id: "kontakt-speichern",
    titel: "Kontakt speichern",
    bild: "",
    symbol: "person",
    schritte: [
      { text: "Öffnen Sie die App „Telefon“. Das ist das grüne Bild mit dem Telefonhörer.", zeichnung: "homescreen:telefon" },
      { text: "Tippen Sie unten auf „Kontakte“.", zeichnung: "tel-kontakte:tab" },
      { text: "Tippen Sie oben rechts auf das Plus-Zeichen „+“.", zeichnung: "tel-kontakte:plus" },
      { text: "Tippen Sie auf „Vorname“. Schreiben Sie den Vornamen.", zeichnung: "kontakt-neu:vorname" },
      { text: "Tippen Sie auf „Nachname“. Schreiben Sie den Nachnamen.", zeichnung: "kontakt-neu:nachname" },
      { text: "Tippen Sie auf „Telefon hinzufügen“. Vielleicht müssen Sie dafür etwas nach unten schieben.", zeichnung: "kontakt-neu:telefon" },
      { text: "Tippen Sie die Telefonnummer ein.", zeichnung: "kontakt-neu:nummer" },
      { text: "Tippen Sie oben rechts auf „Fertig“ oder auf das Häkchen ✓. Jetzt ist der Kontakt gespeichert.", zeichnung: "kontakt-neu:fertig" },
    ],
  },
  {
    id: "email-schreiben",
    titel: "E-Mail schreiben",
    bild: "",
    symbol: "brief",
    schritte: [
      { text: "Öffnen Sie die App „Mail“. Das ist das blaue Bild mit dem weißen Briefumschlag.", zeichnung: "homescreen:mail" },
      { text: "Tippen Sie unten rechts auf das Zeichen mit Blatt und Stift.", zeichnung: "mail-eingang" },
      { text: "Tippen Sie neben „An:“. Schreiben Sie den Namen oder die E-Mail-Adresse.", zeichnung: "mail-neu:an" },
      { text: "Darunter erscheinen Vorschläge. Tippen Sie auf die richtige Person.", zeichnung: "mail-neu:vorschlag" },
      { text: "Tippen Sie auf „Betreff“. Schreiben Sie kurz, worum es geht. Zum Beispiel: Liebe Grüße.", zeichnung: "mail-neu:betreff" },
      { text: "Tippen Sie in das große weiße Feld darunter. Schreiben Sie Ihre Nachricht.", zeichnung: "mail-neu:text" },
      { text: "Tippen Sie oben rechts auf den blauen Pfeil nach oben. Jetzt wird die E-Mail gesendet.", zeichnung: "mail-neu:senden" },
    ],
  },
  {
    id: "home-bildschirm",
    titel: "Zurück zum Start",
    bild: "",
    symbol: "haus",
    schritte: [
      { text: "Sie sind in einer App und möchten zurück zu allen Apps.", zeichnung: "wa-chat" },
      {
        nur: ["home"],
        text: "Drücken Sie einmal kurz auf die runde Taste unter dem Bildschirm. Das ist die Home-Taste.",
        zeichnung: "wa-chat:hometaste",
      },
      {
        nur: ["kerbe", "insel"],
        text: "Legen Sie einen Finger ganz unten auf den Bildschirm. Dort ist ein kleiner Strich.",
        zeichnung: "wa-chat:strich",
      },
      {
        nur: ["kerbe", "insel"],
        text: "Schieben Sie den Finger zügig nach oben. Dann lassen Sie los.",
        zeichnung: "wa-chat:wisch",
      },
      { text: "Fertig! Jetzt sehen Sie wieder alle Ihre Apps.", zeichnung: "homescreen" },
      { text: "Sie sehen nicht die richtigen Apps? Wischen Sie nach links oder rechts. Dann kommt die nächste Seite.", zeichnung: "homescreen-seiten" },
      {
        text: "Der Bildschirm ist schwarz? Drücken Sie kurz die Taste rechts an der Seite.",
        zeichnung: "schwarz:seite",
        home: { text: "Der Bildschirm ist schwarz? Drücken Sie kurz die Home-Taste.", zeichnung: "schwarz:home" },
      },
    ],
  },
  {
    id: "app-loeschen",
    titel: "App löschen",
    bild: "",
    symbol: "muell",
    schritte: [
      { text: "Achtung: Eine gelöschte App ist weg, mit allem, was darin war. Löschen Sie nur Apps, die Sie sicher nicht mehr brauchen." },
      { text: "Legen Sie den Finger auf die App, die Sie löschen möchten. Lassen Sie den Finger liegen, bis ein Menü erscheint.", zeichnung: "homescreen-halten:spiel" },
      { text: "Tippen Sie auf das rote „App entfernen“.", zeichnung: "app-menue" },
      { text: "Tippen Sie auf „App löschen“.", zeichnung: "app-loeschen-dialog" },
      { text: "Tippen Sie noch einmal auf „Löschen“. Jetzt ist die App weg.", zeichnung: "app-loeschen-bestaetigen" },
      { text: "Sie haben sich vertippt? Tippen Sie auf „Abbrechen“. Dann passiert nichts." },
    ],
  },
  {
    id: "schrift-groesser",
    titel: "Schrift größer",
    bild: "",
    symbol: "schrift",
    schritte: [
      { text: "Öffnen Sie die App „Einstellungen“. Das ist das graue Bild mit dem Zahnrad.", zeichnung: "homescreen:einstellungen" },
      { text: "Tippen Sie auf „Anzeige & Helligkeit“. Vielleicht müssen Sie dafür etwas nach unten schieben.", zeichnung: "einstellungen" },
      { text: "Tippen Sie auf „Textgröße“.", zeichnung: "anzeige" },
      { text: "Schieben Sie den Punkt nach rechts. Die Schrift wird größer. Nach links wird sie kleiner.", zeichnung: "textgroesse" },
      { text: "Fertig! Die neue Größe gilt in fast allen Apps." },
    ],
  },
  {
    id: "lauter-leiser",
    titel: "Lauter oder leiser",
    bild: "",
    symbol: "lautsprecher",
    schritte: [
      { text: "Links am iPhone sind zwei längliche Tasten. Die obere macht lauter, die untere leiser.", zeichnung: "seitentasten" },
      { text: "Beim Drücken sehen Sie am linken Rand einen Balken. Er zeigt, wie laut es ist.", zeichnung: "lautstaerke-anzeige" },
      {
        text: "Es geht auch auf dem Bildschirm: Wischen Sie von der rechten oberen Ecke nach unten.",
        home: "Es geht auch auf dem Bildschirm: Wischen Sie vom unteren Rand nach oben.",
        zeichnung: "kz-oeffnen",
      },
      { text: "Suchen Sie den Balken mit dem Lautsprecher. Schieben Sie ihn nach oben: lauter. Nach unten: leiser.", zeichnung: "kontrollzentrum:laut" },
      { text: "Tippen Sie auf eine freie Stelle. Dann geht das Fenster wieder zu.", zeichnung: "kz-schliessen" },
    ],
  },
  {
    id: "heller-dunkler",
    titel: "Bildschirm heller",
    bild: "",
    symbol: "sonne",
    schritte: [
      {
        text: "Wischen Sie von der rechten oberen Ecke nach unten.",
        home: "Wischen Sie vom unteren Rand des Bildschirms nach oben.",
        zeichnung: "kz-oeffnen",
      },
      { text: "Suchen Sie den Balken mit der Sonne. Schieben Sie ihn nach oben: heller. Nach unten: dunkler.", zeichnung: "kontrollzentrum:hell" },
      { text: "Tippen Sie auf eine freie Stelle. Dann geht das Fenster wieder zu.", zeichnung: "kz-schliessen" },
    ],
  },

  /* ===== Apple Watch =====
     geraet: "watch" -> erscheint nur, wenn bei der Auswahl „Apple Watch“ gewählt ist.
     Die Uhr hat rechts zwei Bedienteile: oben das Rädchen (Digital Crown), darunter die flache Seitentaste. */
  {
    id: "watch-aufladen",
    geraet: "watch",
    titel: "Uhr aufladen",
    bild: "",
    symbol: "blitz",
    schritte: [
      { text: "Stecken Sie das Ladegerät in die Steckdose. Das ist die kleine weiße runde Scheibe mit Kabel." },
      { text: "Legen Sie die Uhr mit der Rückseite auf die Scheibe. Ein Magnet hält sie fest.", zeichnung: "uhr-ladegeraet" },
      { text: "Auf der Uhr erscheint ein grüner Blitz. Jetzt lädt sie.", zeichnung: "uhr-laden" },
      { text: "Nach etwa ein bis zwei Stunden ist sie voll. Am besten laden Sie die Uhr jeden Tag, zum Beispiel beim Duschen oder abends." },
      { text: "Der Blitz ist gelb? Dann ist der Stromsparmodus an. Das ist nicht schlimm, er geht beim Laden von allein wieder aus." },
    ],
  },
  {
    id: "watch-uhrzeit",
    geraet: "watch",
    titel: "Zurück zur Uhrzeit",
    bild: "",
    symbol: "watch",
    schritte: [
      { text: "Der Bildschirm ist schwarz? Heben Sie das Handgelenk und schauen Sie auf die Uhr. Oder tippen Sie kurz auf den Bildschirm.", zeichnung: "uhr-dunkel:tipp" },
      { text: "Rechts an der Uhr ist ein Rädchen. Es heißt „Digital Crown“. Drücken Sie einmal darauf.", zeichnung: "uhr-apps:krone" },
      { text: "Jetzt sehen Sie wieder die Uhrzeit. Das klappt aus jeder App.", zeichnung: "uhr-zifferblatt" },
      { text: "Drücken Sie noch einmal auf das Rädchen, sehen Sie alle Apps als bunte Kreise.", zeichnung: "uhr-apps" },
      { text: "Drehen Sie am Rädchen, um in einer Liste nach oben oder unten zu blättern.", zeichnung: "uhr-apps:drehen" },
    ],
  },
  {
    id: "watch-anruf",
    geraet: "watch",
    titel: "Anruf auf der Uhr",
    bild: "",
    symbol: "telefon",
    schritte: [
      { text: "Die Uhr summt und Sie sehen einen Namen. Jemand ruft Sie an.", zeichnung: "uhr-anruf" },
      { text: "Tippen Sie auf den grünen Knopf. Jetzt können Sie sprechen. Halten Sie die Uhr dabei ruhig etwas näher an den Mund.", zeichnung: "uhr-anruf:annehmen" },
      { text: "Sie möchten nicht sprechen? Tippen Sie auf den roten Knopf.", zeichnung: "uhr-anruf:ablehnen" },
      { text: "Es klingelt gerade unpassend? Legen Sie die ganze Hand auf die Uhr. Dann ist sie still.", zeichnung: "uhr-anruf:abdecken" },
      { text: "Zu leise? Drehen Sie während des Gesprächs am Rädchen. Dann wird es lauter.", zeichnung: "uhr-gespraech:drehen" },
      { text: "Zum Auflegen tippen Sie auf den roten Knopf.", zeichnung: "uhr-gespraech:auflegen" },
    ],
  },
  {
    id: "watch-notruf",
    geraet: "watch",
    titel: "Notruf rufen",
    bild: "",
    symbol: "notruf",
    schritte: [
      { text: "Rechts an der Uhr, unter dem Rädchen, ist eine flache Taste. Halten Sie diese Taste gedrückt.", zeichnung: "uhr-zifferblatt:seite-halten" },
      { text: "Es erscheinen mehrere Balken. Schieben Sie den unteren roten Balken „Notruf“ mit dem Finger nach rechts. Die Uhr ruft sofort den Notruf an.", zeichnung: "uhr-sos:notruf" },
      { text: "Oder: Halten Sie die Taste einfach weiter gedrückt. Die Uhr piept laut und zählt herunter. Danach ruft sie den Notruf an.", zeichnung: "uhr-countdown:halten" },
      { text: "Sprechen Sie mit der Uhr wie mit einem Telefon. Sagen Sie, wo Sie sind und was passiert ist." },
      { text: "Aus Versehen angerufen? Nicht auflegen! Warten Sie, bis sich jemand meldet, und sagen Sie: „Alles in Ordnung, das war ein Versehen.“" },
    ],
  },
  {
    id: "watch-sturz",
    geraet: "watch",
    titel: "Nach einem Sturz",
    bild: "",
    symbol: "hilfe",
    schritte: [
      { text: "Wenn Sie schwer stürzen, klopft die Uhr an Ihr Handgelenk und piept. Auf dem Bildschirm steht: „Anscheinend bist du gestürzt.“", zeichnung: "uhr-sturz" },
      { text: "Ihnen geht es gut? Tippen Sie auf „Mir geht‘s gut“. Dann passiert nichts weiter.", zeichnung: "uhr-sturz:gut" },
      { text: "Sie brauchen Hilfe? Schieben Sie den roten Balken „Notruf“ nach rechts.", zeichnung: "uhr-sturz:notruf" },
      { text: "Sie können sich nicht bewegen? Dann müssen Sie nichts tun. Nach etwa einer Minute zählt die Uhr herunter und ruft selbst den Notruf an. Ihre Notfallkontakte bekommen danach eine Nachricht." },
      { text: "Die Uhr zählt herunter, aber Ihnen geht es gut? Tippen Sie schnell auf „Abbrechen“.", zeichnung: "uhr-sturz-countdown" },
    ],
  },
  {
    id: "watch-iphone-finden",
    geraet: "watch",
    titel: "iPhone finden",
    bild: "",
    symbol: "iphone",
    schritte: [
      { text: "Sie wissen nicht, wo Ihr iPhone liegt? Drücken Sie einmal kurz auf die flache Taste rechts an der Uhr.", zeichnung: "uhr-zifferblatt:seite" },
      { text: "Suchen Sie den Knopf mit dem kleinen iPhone. Er heißt „iPhone anpingen“.", zeichnung: "uhr-kontrollzentrum" },
      { text: "Tippen Sie darauf. Ihr iPhone macht jetzt einen hellen Ton, auch wenn es leise gestellt ist. Gehen Sie dem Ton nach.", zeichnung: "uhr-kontrollzentrum:iphone" },
      { text: "Gefunden? Drücken Sie noch einmal auf die flache Taste. Dann sehen Sie wieder die Uhrzeit." },
    ],
  },
];
