"""Wandelt Bilder für die App um.

  python werkzeuge/bilder_umwandeln.py icons      -> jedes PDF in icons/ wird zu einem quadratischen PNG (512x512)
  python werkzeuge/bilder_umwandeln.py appicon <datei.svg>  -> App-Icon in app-icon/ (180, 192, 512)

Braucht: python -m pip install --user pymupdf pillow
"""
import io
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

WURZEL = Path(__file__).resolve().parent.parent
HINTERGRUND = (255, 255, 255)  # weiße Kachelfläche
GROESSE = 512
RAND = 0.10  # 10 % Luft rundherum


def seite_als_bild(pfad: Path, breite: int) -> Image.Image:
    doc = fitz.open(pfad)
    seite = doc[0]
    zoom = breite / max(seite.rect.width, seite.rect.height)
    pix = seite.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=True)
    return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGBA")


def zuschneiden(bild: Image.Image) -> Image.Image:
    """Schneidet leeren (transparenten oder weißen) Rand weg."""
    alpha_box = bild.getchannel("A").getbbox()
    if alpha_box and alpha_box != (0, 0, *bild.size):
        return bild.crop(alpha_box)
    grau = Image.eval(bild.convert("L"), lambda v: 255 - v)
    box = grau.point(lambda v: 255 if v > 12 else 0).getbbox()
    return bild.crop(box) if box else bild


def quadratisch(bild: Image.Image) -> Image.Image:
    innen = int(GROESSE * (1 - 2 * RAND))
    bild = zuschneiden(bild)
    bild.thumbnail((innen, innen), Image.LANCZOS)
    flaeche = Image.new("RGB", (GROESSE, GROESSE), HINTERGRUND)
    x = (GROESSE - bild.width) // 2
    y = (GROESSE - bild.height) // 2
    flaeche.paste(bild, (x, y), bild)
    return flaeche


def icons():
    ordner = WURZEL / "icons"
    pdfs = sorted(ordner.glob("*.pdf"))
    if not pdfs:
        print("Keine PDFs in", ordner)
    for pdf in pdfs:
        ziel = pdf.with_suffix(".png")
        quadratisch(seite_als_bild(pdf, GROESSE * 3)).save(ziel, optimize=True)
        print("fertig:", ziel.relative_to(WURZEL))


def appicon(svg: Path):
    ziel = WURZEL / "app-icon"
    ziel.mkdir(exist_ok=True)
    # PNG bevorzugen: PyMuPDF kann SVGs mit Verläufen/Masken nicht sauber zeichnen.
    if svg.suffix.lower() == ".png":
        gross = Image.open(svg).convert("RGB")
    else:
        gross = seite_als_bild(svg, 1024).convert("RGB")
    for g in (180, 192, 512):
        gross.resize((g, g), Image.LANCZOS).save(ziel / f"icon-{g}.png", optimize=True)
        print("fertig:", f"app-icon/icon-{g}.png")


if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "icons":
        icons()
    elif len(sys.argv) >= 3 and sys.argv[1] == "appicon":
        appicon(Path(sys.argv[2]))
    else:
        print(__doc__)
