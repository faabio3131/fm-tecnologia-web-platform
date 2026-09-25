"""
Gera 4 cópias da IMAGEM APROVADA DA V3 (hero-core.webp), cada uma com uma
legenda diferente sobreposta — sem gerar nenhum pixel novo do Core em si,
só texto por cima. Usado para montar o efeito de "giro" (carrossel/flip)
no Hero sem re-renderizar nada.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

SRC = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/src/assets/hero-core.webp"
OUT_DIR = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/src/assets/core-captions"
os.makedirs(OUT_DIR, exist_ok=True)

FONT_PATH = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

captions = [
    ("kordena", "Kordena"),
    ("gerente-ia", "Gerente IA"),
    ("fm-tecnologia", "FM Tecnologia"),
    ("total-controle", "Total controle"),
]

base = Image.open(SRC).convert("RGBA")
W, H = base.size

for slug, text in captions:
    img = base.copy()

    # camada de texto com glow (desenhada em separado, borrada, e composta)
    label_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(label_layer)

    font_size = 92
    font = ImageFont.truetype(FONT_PATH, font_size)

    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (W - text_w) / 2 - bbox[0]
    y = H - 300 - bbox[1]

    # glow: múltiplas passadas borradas em ciano
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    glow_draw.text((x, y), text, font=font, fill=(79, 176, 255, 255))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(14))

    label_layer = Image.alpha_composite(label_layer, glow_layer)
    draw = ImageDraw.Draw(label_layer)
    draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))

    out = Image.alpha_composite(img, label_layer).convert("RGB")
    out_path = os.path.join(OUT_DIR, f"core-{slug}.webp")
    out.save(out_path, quality=92)
    print(f"saved {out_path}")

print("done")
