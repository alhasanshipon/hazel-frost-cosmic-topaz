#!/usr/bin/env python3
"""Folk-art cinematic share card for বাসওয়ালা — 1200×630."""

from __future__ import annotations

import math
import os
import random

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 2400, 1260  # 2× of 1200×630
OUT_PNG = "/workspace/.grok/card-raw.png"

NIGHT = np.array([6, 20, 16], dtype=np.float32)
FLAG = np.array([0, 106, 78], dtype=np.float32)
CREAM = (244, 239, 228, 255)
RED = np.array([226, 59, 46], dtype=np.float32)
AMBER = np.array([245, 193, 92], dtype=np.float32)
TEAL = np.array([8, 48, 52], dtype=np.float32)


def lerp(a, b, t):
    t = np.clip(t, 0, 1)
    return a * (1 - t) + b * t


def hex_rgb(s):
    s = s.lstrip("#")
    return tuple(int(s[i : i + 2], 16) for i in (0, 2, 4))


def make_sky():
    y = np.linspace(0, 1, H, dtype=np.float32)
    x = np.linspace(0, 1, W, dtype=np.float32)
    yy = y[:, None, None]  # (H,1,1)
    xx = x[None, :, None]  # (1,W,1)
    top = np.array([2.0, 8.0, 10.0]).reshape(1, 1, 3)
    mid = np.array([5.0, 28.0, 30.0]).reshape(1, 1, 3)
    horizon = np.array([10.0, 42.0, 40.0]).reshape(1, 1, 3)
    t = yy ** 1.15
    col = np.where(
        t < 0.55,
        top + (mid - top) * np.clip(t / 0.55, 0, 1),
        mid + (horizon - mid) * np.clip((t - 0.55) / 0.45, 0, 1),
    )
    col = np.broadcast_to(col, (H, W, 3)).copy()
    dist = np.sqrt((xx[..., 0] - 0.50) ** 2 + ((yy[..., 0] - 0.62) * 1.6) ** 2)
    glow = np.clip(1.0 - dist / 0.55, 0, 1) ** 2
    col += glow[..., None] * np.array([40.0, 28.0, 10.0])
    side = np.clip(np.abs(xx[..., 0] - 0.5) * 0.35, 0, 1)
    col += side[..., None] * np.array([0.0, 8.0, 10.0])
    return np.clip(col, 0, 255).astype(np.uint8)


def add_stars(arr, n=90, seed=7):
    rng = np.random.default_rng(seed)
    h, w, _ = arr.shape
    for _ in range(n):
        x = int(rng.integers(0, w))
        y = int(rng.integers(0, int(h * 0.48)))
        b = int(rng.integers(140, 230))
        r = int(rng.choice([1, 1, 1, 2]))
        arr[max(0, y - r) : y + r + 1, max(0, x - r) : x + r + 1] = (
            arr[max(0, y - r) : y + r + 1, max(0, x - r) : x + r + 1] * 0.35
            + np.array([b, b, int(b * 0.9)]) * 0.65
        ).astype(np.uint8)
    return arr


def radial_glow(base, cx, cy, radius, color, strength=1.0, aspect=1.0):
    h, w, _ = base.shape
    yy, xx = np.ogrid[:h, :w]
    dist = np.sqrt((xx - cx) ** 2 + ((yy - cy) * aspect) ** 2)
    g = np.clip(1.0 - dist / radius, 0, 1)
    g = g ** 1.6 * strength
    out = base.astype(np.float32) + g[..., None] * np.array(color, dtype=np.float32)
    return np.clip(out, 0, 255).astype(np.uint8)


def draw_rice_silhouette(draw: ImageDraw.ImageDraw, side: str):
    """Layered paddy mounds + stalk texture along one shoulder."""
    rng = random.Random(11 if side == "left" else 23)
    if side == "left":
        edge = [
            (0, 900),
            (120, 820),
            (280, 790),
            (460, 820),
            (600, 900),
            (700, 1000),
            (780, 1120),
            (820, 1260),
            (0, 1260),
        ]
        layers = [
            ([(0, 980), (180, 900), (360, 930), (540, 1040), (620, 1260), (0, 1260)], (4, 24, 20)),
            ([(0, 1080), (220, 1020), (400, 1080), (520, 1260), (0, 1260)], (3, 16, 13)),
        ]
        stalk_x = range(16, 700, 12)
        horizon_y0 = 900
    else:
        edge = [
            (2400, 900),
            (2280, 820),
            (2120, 790),
            (1940, 820),
            (1800, 900),
            (1700, 1000),
            (1620, 1120),
            (1580, 1260),
            (2400, 1260),
        ]
        layers = [
            ([(2400, 980), (2220, 900), (2040, 930), (1860, 1040), (1780, 1260), (2400, 1260)], (4, 24, 20)),
            ([(2400, 1080), (2180, 1020), (2000, 1080), (1880, 1260), (2400, 1260)], (3, 16, 13)),
        ]
        stalk_x = range(1700, 2388, 12)
        horizon_y0 = 900

    draw.polygon(edge, fill=(5, 30, 24))
    for poly, col in layers:
        draw.polygon(poly, fill=col)

    for x in stalk_x:
        hgt = rng.randint(22, 64)
        y1 = 1260 - rng.randint(30, 240)
        sway = rng.randint(-7, 7)
        draw.line([(x, y1), (x + sway, y1 - hgt)], fill=(8, 42, 32), width=2)
        draw.ellipse(
            [x + sway - 3, y1 - hgt - 5, x + sway + 4, y1 - hgt + 2],
            fill=(12, 50, 36),
        )


def draw_palm(draw, x, y, scale=1.0, flip=False):
    """Simple coconut-palm silhouette."""
    s = scale
    trunk = [
        (x - 8 * s, y),
        (x + 8 * s, y),
        (x + 5 * s, y - 160 * s),
        (x - 5 * s, y - 160 * s),
    ]
    draw.polygon(trunk, fill=(3, 14, 12))
    cx, cy = x, y - 160 * s
    for ang in range(-80, 90, 22):
        a = math.radians(ang if not flip else 180 - ang)
        ex = cx + math.cos(a) * 90 * s
        ey = cy + math.sin(a) * 38 * s + 10 * s
        draw.line([(cx, cy), (ex, ey)], fill=(3, 16, 13), width=max(3, int(5 * s)))
        # frond
        nx, ny = -math.sin(a), math.cos(a)
        for t in (0.3, 0.55, 0.8):
            px = cx + (ex - cx) * t
            py = cy + (ey - cy) * t
            draw.line(
                [(px + nx * 18 * s, py + ny * 18 * s), (px - nx * 18 * s, py - ny * 18 * s)],
                fill=(3, 16, 13),
                width=max(2, int(3 * s)),
            )


def rounded_rect(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_highway(img: Image.Image) -> Image.Image:
    arr = np.array(img).astype(np.float32)
    h, w, _ = arr.shape
    yy, xx = np.ogrid[:h, :w]
    vpx, vpy = 1200.0, 700.0
    t = np.clip((yy - vpy) / (h - vpy), 0, 1)
    half = 28 + t * 860
    on_road = (xx > vpx - half) & (xx < vpx + half) & (yy > vpy)
    road_col = np.array([10, 16, 14], dtype=np.float32)
    wet = np.array([22, 32, 28], dtype=np.float32)
    center = np.exp(-((xx - vpx) / (half * 0.42 + 1)) ** 2)
    col = road_col + center[..., None] * (wet - road_col)
    # distant haze toward VP
    haze = np.clip(1.0 - t, 0, 1) ** 2
    col = col + haze[..., None] * np.array([12, 36, 34], dtype=np.float32)
    arr = np.where(on_road[..., None], lerp(arr, col, 0.94), arr)
    # amber headlight pool far down the road
    far = np.exp(-((xx - vpx) ** 2) / (80 ** 2) - ((yy - (vpy + 40)) ** 2) / (50 ** 2))
    arr = arr + (far * 0.35)[..., None] * np.array([80, 55, 18], dtype=np.float32)
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr)
    draw = ImageDraw.Draw(img, "RGBA")

    for i in range(22):
        if i % 2:
            continue
        u0 = (i / 22) ** 1.25
        u1 = ((i + 0.7) / 22) ** 1.25
        y0 = vpy + (h - vpy) * u0
        y1 = vpy + (h - vpy) * u1
        thick = 2 + 12 * ((y0 - vpy) / (h - vpy))
        draw.line([(vpx, y0), (vpx, y1)], fill=(210, 180, 100, 170), width=max(2, int(thick)))

    for sign in (-1, 1):
        pts = []
        for i in range(14):
            u = (i / 13) ** 1.15
            y = vpy + (h - vpy) * u
            half_y = 28 + ((y - vpy) / (h - vpy)) * 860
            pts.append((vpx + sign * (half_y - 14), y))
        if len(pts) > 1:
            draw.line(pts, fill=(120, 95, 50, 110), width=4)
    return img


def _quad(d, pts, fill):
    d.polygon(pts, fill=fill)


def toward(pt, vp, t):
    return (pt[0] + (vp[0] - pt[0]) * t, pt[1] + (vp[1] - pt[1]) * t)


def draw_bus(base: Image.Image) -> Image.Image:
    """Rear three-quarter of a green Bangladeshi AC coach, receding."""
    vp = (1200.0, 690.0)
    arr = np.array(base)
    arr = radial_glow(arr, 1030, 1000, 120, (226, 50, 40), 1.1, aspect=1.2)
    arr = radial_glow(arr, 1370, 1000, 120, (226, 50, 40), 1.1, aspect=1.2)
    arr = radial_glow(arr, 1200, 960, 210, (245, 180, 70), 0.2, aspect=1.35)
    arr = radial_glow(arr, 1040, 1200, 160, (180, 30, 28), 0.55, aspect=0.3)
    arr = radial_glow(arr, 1360, 1200, 160, (180, 30, 28), 0.55, aspect=0.3)
    img = Image.fromarray(arr).convert("RGBA")

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    d.ellipse([940, 1160, 1460, 1250], fill=(0, 0, 0, 155))
    layer = layer.filter(ImageFilter.GaussianBlur(16))
    img = Image.alpha_composite(img, layer)

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")

    rtl, rtr = (1004, 872), (1396, 872)
    rbl, rbr = (956, 1160), (1444, 1160)
    t_far = 0.34
    ftl, ftr = toward(rtl, vp, t_far), toward(rtr, vp, t_far)
    fbl, fbr = toward(rbl, vp, t_far), toward(rbr, vp, t_far)

    _quad(d, [rtl, rtr, ftr, ftl], (0, 72, 56, 255))
    ac_l = toward((1088, 848), vp, 0.04)
    ac_r = toward((1312, 848), vp, 0.04)
    ac_l2 = toward((1100, 792), vp, 0.18)
    ac_r2 = toward((1300, 792), vp, 0.18)
    _quad(d, [ac_l, ac_r, ac_r2, ac_l2], (0, 58, 46, 255))
    _quad(d, [ftl, rtl, rbl, fbl], (0, 90, 68, 255))
    _quad(d, [rtr, ftr, fbr, rbr], (0, 78, 58, 255))
    _quad(d, [rtl, rtr, rbr, rbl], (0, 106, 78, 255))
    _quad(d, [(972, 1088), (1428, 1088), rbr, rbl], (0, 68, 50, 255))

    _quad(d, [(988, 1036), (1412, 1036), (1420, 1076), (980, 1076)], CREAM)
    _quad(d, [(990, 1026), (1410, 1026), (1412, 1036), (988, 1036)], (245, 193, 92, 235))
    _quad(
        d,
        [toward((988, 1036), vp, 0.2), (988, 1036), (980, 1076), toward((980, 1076), vp, 0.2)],
        (244, 239, 228, 200),
    )

    rounded_rect(d, [1072, 900, 1328, 1016], 14, fill=(6, 16, 14, 255))
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.rounded_rectangle([1084, 912, 1316, 1004], 10, fill=(245, 193, 92, 95))
    glow = glow.filter(ImageFilter.GaussianBlur(8))
    layer = Image.alpha_composite(layer, glow)
    d = ImageDraw.Draw(layer, "RGBA")
    for i, x in enumerate((1096, 1148, 1200, 1252)):
        d.rectangle([x, 924, x + 40, 992], fill=(245, 170, 70, 55 + (i % 2) * 24))
    d.rectangle([1194, 900, 1206, 1016], fill=(0, 88, 66, 255))

    for i, tt in enumerate((0.05, 0.13, 0.21, 0.28)):
        a = toward((1008, 910), vp, tt)
        b = toward((1008, 910), vp, tt + 0.06)
        c = toward((996, 1010), vp, tt + 0.06)
        e = toward((996, 1010), vp, tt)
        _quad(d, [a, b, c, e], (245, 193, 92, 200 - i * 28))

    _quad(d, [(972, 1124), (1428, 1124), (1444, 1164), (956, 1164)], (16, 20, 18, 255))
    rounded_rect(d, [1140, 1132, 1260, 1158], 3, fill=CREAM)

    for cx in (1056, 1344):
        d.ellipse([cx - 56, 1140, cx + 56, 1236], fill=(10, 10, 10, 255))
        d.ellipse([cx - 26, 1166, cx + 26, 1214], fill=(50, 48, 44, 255))
        d.ellipse([cx - 8, 1182, cx + 8, 1198], fill=(120, 100, 55, 255))

    def cluster(cx):
        rounded_rect(d, [cx - 22, 932, cx + 22, 1110], 10, fill=(226, 59, 46, 255))
        for cy, r in ((956, 18), (1006, 20), (1056, 18), (1096, 14)):
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 96, 74, 255))
            d.ellipse(
                [cx - r // 2, cy - r // 2, cx + r // 2, cy + r // 2],
                fill=(255, 220, 190, 245),
            )

    cluster(1024)
    cluster(1376)
    rounded_rect(d, [1116, 860, 1284, 878], 5, fill=(226, 59, 46, 255))
    d.line([rtl, rtr, rbr, rbl, rtl], fill=(3, 12, 10, 200), width=3)

    img = Image.alpha_composite(img, layer)
    return img.convert("RGB")


def shapla_path(cx, cy, r):
    """National water-lily, 8 even petals around a round center."""
    pts_sets = []
    for i in range(8):
        a = math.radians(i * 45 - 90)
        a_l = a - math.radians(16)
        a_r = a + math.radians(16)
        tip = (cx + math.cos(a) * r, cy + math.sin(a) * r)
        left = (cx + math.cos(a_l) * r * 0.38, cy + math.sin(a_l) * r * 0.38)
        right = (cx + math.cos(a_r) * r * 0.38, cy + math.sin(a_r) * r * 0.38)
        pts_sets.append([(cx, cy), left, tip, right])
    return pts_sets


def draw_title(img: Image.Image) -> Image.Image:
    serif_path = "/workspace/.grok/fonts/NotoSerifBengali-vf.ttf"
    title_font = ImageFont.truetype(serif_path, 400, layout_engine=ImageFont.Layout.RAQM)
    title_font.set_variation_by_axes([850, 100])  # ExtraBold-ish, full width
    tag_font = ImageFont.truetype(
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf", 52
    )

    title = "বাসওয়ালা"
    tag = "Horn ok please"

    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    # measure
    tb = d.textbbox((0, 0), title, font=title_font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    kb = d.textbbox((0, 0), tag, font=tag_font)
    kw, kh = kb[2] - kb[0], kb[3] - kb[1]

    gap = 22
    block_h = th + gap + kh
    cx = W / 2
    # Centered lockup, lifted just enough that the coach sits fully under the type
    top = (H - block_h) / 2 - 70
    tx = cx - tw / 2 - tb[0]
    ty = top - tb[1]
    kx = cx - kw / 2 - kb[0]
    ky = top + th + gap - kb[1]

    # shapla above title
    sx, sy, sr = cx, top - 70, 48
    for petal in shapla_path(sx, sy, sr):
        d.polygon(petal, fill=(244, 239, 228, 210))
    d.ellipse([sx - 14, sy - 8, sx + 14, sy + 12], fill=(245, 193, 92, 230))

    # soft dark plate behind lockup so glyphs never vanish
    pad_x, pad_y = 70, 36
    plate = Image.new("RGBA", img.size, (0, 0, 0, 0))
    pd = ImageDraw.Draw(plate)
    pd.rounded_rectangle(
        [cx - tw / 2 - pad_x, top - 110, cx + tw / 2 + pad_x, top + block_h + 36],
        radius=28,
        fill=(6, 20, 16, 90),
    )
    plate = plate.filter(ImageFilter.GaussianBlur(18))
    overlay = Image.alpha_composite(plate, overlay)
    d = ImageDraw.Draw(overlay)

    # amber glow behind title
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.text((tx, ty), title, font=title_font, fill=(245, 193, 92, 160))
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    overlay = Image.alpha_composite(overlay, glow)
    d = ImageDraw.Draw(overlay)

    # title with deep-green stroke
    d.text(
        (tx, ty),
        title,
        font=title_font,
        fill=CREAM,
        stroke_width=10,
        stroke_fill=(6, 20, 16, 255),
    )
    # tagline
    d.text(
        (kx, ky),
        tag,
        font=tag_font,
        fill=(245, 193, 92, 255),
        stroke_width=3,
        stroke_fill=(6, 20, 16, 255),
    )
    # small tracking dots either side of tagline
    d.ellipse([kx - 28, ky + kh / 2 - 4, kx - 16, ky + kh / 2 + 8], fill=(226, 59, 46, 220))
    d.ellipse([kx + kw + 16, ky + kh / 2 - 4, kx + kw + 28, ky + kh / 2 + 8], fill=(226, 59, 46, 220))

    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def vignette_grain(img: Image.Image) -> Image.Image:
    arr = np.array(img).astype(np.float32)
    h, w, _ = arr.shape
    yy, xx = np.ogrid[:h, :w]
    ny = (yy / (h - 1) - 0.5) * 2
    nx = (xx / (w - 1) - 0.5) * 2
    r = np.sqrt(nx ** 2 * 0.85 + ny ** 2)
    vig = np.clip(1.15 - r * 0.55, 0.45, 1.0)
    arr *= vig[..., None]
    rng = np.random.default_rng(19)
    grain = rng.normal(0, 6.5, arr.shape)
    arr = np.clip(arr + grain, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)


def main():
    random.seed(7)
    sky = make_sky()
    sky = add_stars(sky)
    img = Image.fromarray(sky)
    draw = ImageDraw.Draw(img)
    draw_rice_silhouette(draw, "left")
    draw_rice_silhouette(draw, "right")
    draw_palm(draw, 280, 1080, scale=1.15)
    draw_palm(draw, 2100, 1100, scale=0.95, flip=True)
    draw_palm(draw, 420, 1140, scale=0.7)
    img = draw_highway(img)
    img = draw_bus(img)
    img = draw_title(img)
    img = vignette_grain(img)
    # downscale to 1200×630
    img = img.resize((1200, 630), Image.Resampling.LANCZOS)
    img.save(OUT_PNG, "PNG")
    print("wrote", OUT_PNG, img.size)


if __name__ == "__main__":
    main()
