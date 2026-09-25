"""
Gera 5 cópias da IMAGEM APROVADA DA V3 (hero-core.webp), cada uma com uma
legenda diferente sobreposta em um selo (badge) bem visível — sem gerar
nenhum pixel novo do Core em si, só o selo de texto por cima. Usado para
montar o efeito de "giro" (carrossel/flip) no Hero sem re-renderizar nada.

"Core" é a legenda de destaque (selo maior, borda mais brilhante).
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

SRC = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/src/assets/hero-core.webp"
OUT_DIR = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/src/assets/core-captions"
os.makedirs(OUT_DIR, exist_ok=True)

FONT_PATH = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

# (slug, texto, destaque)
captions = [
    ("kordena", "Kordena", False),
    ("gerente-ia", "Gerente IA", False),
    ("fm-tecnologia", "FM Tecnologia", False),
    ("total-controle", "Total controle", False),
    ("core", "CORE", True),
]

base = Image.open(SRC).convert("RGBA")
W, H = base.size


def rounded_pill(size, radius, fill, outline, outline_width):
    w, h = size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, fill=fill, outline=outline, width=outline_width)
    return layer


for slug, text, featured in captions:
    img = base.copy()

    font_size = 108 if featured else 78
    font = ImageFont.truetype(FONT_PATH, font_size)

    tmp_draw = ImageDraw.Draw(img)
    bbox = tmp_draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    pad_x, pad_y = (64, 34) if featured else (48, 26)
    pill_w = int(text_w + pad_x * 2)
    pill_h = int(text_h + pad_y * 2)
    pill_x = int((W - pill_w) / 2)
    pill_y = H - 300 - pill_h // 2

    # glow atrás do selo inteiro
    glow_color = (79, 176, 255, 235) if featured else (79, 176, 255, 150)
    glow = rounded_pill((pill_w, pill_h), pill_h // 2, glow_color, None, 0)
    glow = glow.filter(ImageFilter.GaussianBlur(22 if featured else 14))
    glow_canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_canvas.paste(glow, (pill_x, pill_y), glow)
    img = Image.alpha_composite(img, glow_canvas)

    # selo (pill) sólido
    fill_color = (10, 22, 38, 235) if featured else (8, 16, 28, 210)
    outline_color = (143, 211, 255, 255) if featured else (79, 176, 255, 180)
    pill = rounded_pill((pill_w, pill_h), pill_h // 2, fill_color, outline_color, 3 if featured else 2)
    pill_canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pill_canvas.paste(pill, (pill_x, pill_y), pill)
    img = Image.alpha_composite(img, pill_canvas)

    # texto centralizado dentro do selo
    text_canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    td = ImageDraw.Draw(text_canvas)
    tx = pill_x + pad_x - bbox[0]
    ty = pill_y + pad_y - bbox[1]
    text_color = (191, 230, 255, 255) if featured else (255, 255, 255, 255)
    td.text((tx, ty), text, font=font, fill=text_color)
    img = Image.alpha_composite(img, text_canvas)

    out = img.convert("RGB")
    out_path = os.path.join(OUT_DIR, f"core-{slug}.webp")
    out.save(out_path, quality=92)
    print(f"saved {out_path} (pill {pill_w}x{pill_h})")

print("done")
