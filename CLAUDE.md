# iPhone-Hilfe

Anleitungs-Web-App (PWA) für die Großeltern: wie Dinge auf dem iPhone gehen. Reines HTML/CSS/JS, kein Build, läuft auf GitHub Pages, offline per Service Worker.

## Dateien
- `anleitungen.js`: alle Anleitungen (einzige Datei zum Erweitern, Format oben in der Datei erklärt)
- `app.js`: iPhone-Auswahl (Serien → Gruppe home/kerbe/insel), Startseite, Anleitungsansicht
- `style.css`: Farben Creme #FBF7F0 / Salbei #DCE8E0 / Blau #1F5FD1, immer hell, Schrift ≥ 22px
- `sw.js`: Cache (stale-while-revalidate). Neue feste Dateien in `DATEIEN` eintragen, bei großen Änderungen `VERSION` hochzählen
- `icons/`: Kachel-Bilder. PDFs umwandeln: `python werkzeuge/bilder_umwandeln.py icons`
- `app-icon/`: Homescreen-Icon (aus icon.svg, gerendert mit headless Edge, da PyMuPDF Verläufe nicht kann)

## Starten / testen
`python -m http.server 8765` und http://localhost:8765 öffnen, Viewport 375x667 (iPhone SE).

## Stand
- Fertig: Auswahl, Startseite, 4 Anleitungen (WhatsApp-Chat, Kontakt, E-Mail mit Apple Mail, Zurück zum Start), Platzhalter-Symbole
- Offen: Inhalte vom Nutzer prüfen lassen; Kachel-Bilder aus /icons; GitHub-Pages-Deploy; Test auf echtem iPhone
- iPhone Duo (Falt-iPhone) bewusst weggelassen
