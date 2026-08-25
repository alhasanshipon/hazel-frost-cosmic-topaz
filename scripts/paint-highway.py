#!/usr/bin/env python3
"""Cinematic Bangladeshi highway stills for বাসওয়ালা."""
from __future__ import annotations

import math
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

OUT = Path("/workspace/public")
W, H = 1920, 1080
HORIZON = 0.52


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp_rgb(c1: tuple[int, int, int], c2: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    return (
        int(lerp(c1[0], c2[0], t)),
        int(lerp(c1[1], c2[1], t)),
        int(lerp(c1[2], c2[2], t)),
    )


def vertical_sky(stops: list[tuple[float, tuple[int, int, int]]]) -> Image.Image:
    arr = np.zeros((H, W, 3), dtype=np.uint8)
    ys = np.linspace(0, 1, H)
    for y, t in enumerate(ys):
        for i in range(len(stops) - 1):
            t0, c0 = stops[i]
            t1, c1 = stops[i + 1]
            if t0 <= t <= t1:
                u = 0 if t1 == t0 else (t - t0) / (t1 - t0)
                arr[y, :] = lerp_rgb(c0, c1, u)
                break
        else:
            arr[y, :] = stops[-1][1]
    return Image.fromarray(arr, "RGB")


def add_glow(base: Image.Image, cx: float, cy: float, radius: float, color: tuple[int, int, int], strength: float) -> None:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    steps = 14
    for i in range(steps, 0, -1):
        t = i / steps
        r = radius * t
        a = int(255 * strength * (1 - t) ** 1.6)
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(*color, a))
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=max(2, radius * 0.18)))
    base.alpha_composite(overlay)


def grain(img: Image.Image, amount: float = 0.045) -> Image.Image:
    arr = np.asarray(img).astype(np.float32)
    noise = np.random.default_rng(7).normal(0, 255 * amount, arr.shape[:2])
    for c in range(3):
        arr[:, :, c] = np.clip(arr[:, :, c] + noise, 0, 255)
    return Image.fromarray(arr.astype(np.uint8), "RGB")


def vignette(img: Image.Image, strength: float = 0.55) -> Image.Image:
    y, x = np.ogrid[:H, :W]
    cx, cy = W / 2, H * 0.48
    nx = (x - cx) / (W * 0.72)
    ny = (y - cy) / (H * 0.72)
    r = np.sqrt(nx * nx + ny * ny)
    shade = 1 - np.clip((r - 0.35) * strength, 0, 0.78)
    arr = np.asarray(img).astype(np.float32)
    arr *= shade[..., None]
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def draw_stars(img: Image.Image, n: int, seed: int) -> None:
    rng = random.Random(seed)
    px = img.load()
    for _ in range(n):
        x = rng.randint(0, W - 1)
        y = rng.randint(0, int(H * HORIZON) - 8)
        b = rng.randint(160, 255)
        a = rng.random()
        if a > 0.85:
            for dx, dy in ((0, 0), (1, 0), (0, 1), (-1, 0), (0, -1)):
                xx, yy = x + dx, y + dy
                if 0 <= xx < W and 0 <= yy < H:
                    px[xx, yy] = (b, b, min(255, b + 20))
        else:
            px[x, y] = (b, b, min(255, b + 30))


def draw_fields(draw: ImageDraw.ImageDraw, dusk: bool) -> None:
    hy = int(H * HORIZON)
    # far paddies
    far = (18, 42, 28) if dusk else (8, 22, 16)
    near = (28, 72, 38) if dusk else (10, 32, 20)
    draw.rectangle((0, hy, W, H), fill=far)
    for i in range(18):
        t = i / 18
        y0 = int(lerp(hy, H, t * t))
        y1 = int(lerp(hy, H, ((i + 1) / 18) ** 2))
        c = lerp_rgb(far, near, t)
        draw.rectangle((0, y0, W, y1), fill=c)
        # paddy ridges
        ridge = lerp_rgb(c, (40, 90, 50) if dusk else (16, 40, 26), 0.35)
        draw.line((0, y0, W, y0), fill=ridge, width=max(1, int(2 * t + 1)))


def draw_highway(draw: ImageDraw.ImageDraw, dusk: bool) -> tuple[int, int, int, int]:
    hy = int(H * HORIZON)
    # vanishing point
    vx, vy = int(W * 0.52), hy + 8
    road_col = (28, 30, 32) if dusk else (18, 20, 22)
    edge_col = (62, 58, 48) if dusk else (40, 38, 34)
    # trapezoid road
    bottom_left = int(W * -0.08)
    bottom_right = int(W * 1.08)
    draw.polygon(
        [(vx - 18, vy), (vx + 18, vy), (bottom_right, H), (bottom_left, H)],
        fill=road_col,
    )
    # shoulders
    draw.polygon(
        [(vx - 22, vy), (vx - 18, vy), (bottom_left, H), (bottom_left - 80, H)],
        fill=edge_col,
    )
    draw.polygon(
        [(vx + 18, vy), (vx + 22, vy), (bottom_right + 80, H), (bottom_right, H)],
        fill=edge_col,
    )
    # dashed center line
    line = (212, 176, 72) if dusk else (196, 150, 48)
    for i in range(16):
        t0 = (i / 16) ** 1.6
        t1 = ((i + 0.45) / 16) ** 1.6
        y0 = int(lerp(vy, H, t0))
        y1 = int(lerp(vy, H, t1))
        w0 = max(1, int(lerp(2, 16, t0)))
        w1 = max(1, int(lerp(2, 16, t1)))
        x0 = int(lerp(vx, W * 0.5, t0))
        x1 = int(lerp(vx, W * 0.5, t1))
        draw.polygon(
            [(x0 - w0, y0), (x0 + w0, y0), (x1 + w1, y1), (x1 - w1, y1)],
            fill=line,
        )
    return vx, vy, bottom_left, bottom_right


def draw_trees(draw: ImageDraw.ImageDraw, dusk: bool) -> None:
    hy = int(H * HORIZON)
    rng = random.Random(21)
    col = (8, 22, 14) if dusk else (4, 12, 8)
    for side in (-1, 1):
        for i in range(22):
            t = (i / 22) ** 1.35
            y = int(lerp(hy + 6, H * 0.92, t))
            x = int(W * 0.52 + side * lerp(28, W * 0.62, t))
            h = int(lerp(10, 160, t * t))
            w = int(lerp(4, 48, t * t))
            draw.ellipse((x - w, y - h, x + w, y + h * 0.15), fill=col)
            trunk = (20, 16, 10) if dusk else (12, 10, 8)
            draw.rectangle((x - max(1, w * 0.08), y - h * 0.2, x + max(1, w * 0.08), y + 8), fill=trunk)
            if rng.random() > 0.7:
                draw.ellipse((x - w * 0.7, y - h * 1.15, x + w * 0.9, y - h * 0.3), fill=col)


def draw_power_lines(draw: ImageDraw.ImageDraw) -> None:
    hy = int(H * HORIZON)
    pole = (30, 28, 24)
    for side, sign in ((0.18, -1), (0.82, 1)):
        pts = []
        for i in range(9):
            t = (i / 8) ** 1.5
            y = int(lerp(hy + 4, H * 0.95, t))
            x = int(lerp(W * 0.52 + sign * 30, W * side + sign * 200, t))
            h = int(lerp(8, 90, t))
            draw.line((x, y - h, x, y + 6), fill=pole, width=max(1, int(1 + 3 * t)))
            pts.append((x, y - h + 4))
        if len(pts) > 1:
            draw.line(pts, fill=(20, 20, 18), width=1)


def draw_bus(img: Image.Image, dusk: bool, facing: str) -> None:
    """facing: 'away' (rear 3/4) or 'toward' (front 3/4)."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    # placement — keep sky clear for the wordmark
    if facing == "away":
        bx, by, s = 1080, 620, 1.0
    else:
        bx, by, s = 760, 640, 1.12

    def p(x: float, y: float) -> tuple[float, float]:
        return (bx + x * s, by + y * s)

    body = (18, 92, 58) if dusk else (12, 70, 46)
    body_dk = (10, 52, 34)
    gold = (214, 168, 52)
    cream = (236, 228, 204)
    # shadow
    d.ellipse((p(-210, 168)[0], p(-210, 168)[1], p(230, 210)[0], p(210, 210)[1]), fill=(0, 0, 0, 90))

    if facing == "away":
        # body
        d.rounded_rectangle((p(-200, -40), p(210, 170)), radius=28 * s, fill=(*body, 255))
        d.rounded_rectangle((p(-188, -28), p(198, 28)), radius=16 * s, fill=(*body_dk, 255))
        # gold stripe
        d.rectangle((p(-200, 78), p(210, 96)), fill=(*gold, 255))
        d.rectangle((p(-200, 96), p(210, 102)), fill=(180, 40, 36, 255))
        # rear window
        d.rounded_rectangle((p(-70, -8), p(78, 70)), radius=10 * s, fill=(18, 28, 36, 255))
        # cabin glow
        d.rounded_rectangle((p(-58, 4), p(66, 58)), radius=6 * s, fill=(255, 196, 90, 70))
        # roof AC
        d.rounded_rectangle((p(-90, -62), p(90, -28)), radius=10 * s, fill=(30, 48, 42, 255))
        # taillights
        for lx in (-168, 148):
            d.rounded_rectangle((p(lx, 108), p(lx + 38, 148)), radius=6 * s, fill=(220, 32, 28, 255))
        # wheels
        for wx in (-130, 110):
            d.ellipse((p(wx, 148), p(wx + 64, 212)), fill=(18, 18, 18, 255))
            d.ellipse((p(wx + 16, 164), p(wx + 48, 196)), fill=(70, 70, 72, 255))
        # plate
        d.rounded_rectangle((p(-36, 118), p(44, 142)), radius=3 * s, fill=(*cream, 255))
        # roof marker lights
        for lx in range(-160, 170, 40):
            d.ellipse((p(lx, -36), p(lx + 10, -26)), fill=(255, 210, 80, 255))
    else:
        d.rounded_rectangle((p(-220, -50), p(200, 168)), radius=32 * s, fill=(*body, 255))
        d.rounded_rectangle((p(-200, -36), p(180, 20)), radius=14 * s, fill=(20, 36, 40, 255))
        d.rectangle((p(-220, 72), p(200, 90)), fill=(*gold, 255))
        # windshield
        d.polygon(
            [p(-170, -28), p(150, -28), p(168, 48), p(-188, 48)],
            fill=(24, 40, 52, 255),
        )
        d.polygon(
            [p(-150, -16), p(130, -16), p(142, 36), p(-162, 36)],
            fill=(255, 186, 70, 50),
        )
        # headlights
        for lx in (-176, 118):
            d.rounded_rectangle((p(lx, 96), p(lx + 54, 132)), radius=8 * s, fill=(255, 244, 210, 255))
        for wx in (-140, 90):
            d.ellipse((p(wx, 146), p(wx + 70, 214)), fill=(18, 18, 18, 255))
            d.ellipse((p(wx + 18, 162), p(wx + 52, 196)), fill=(80, 80, 82, 255))
        d.rounded_rectangle((p(-80, -72), p(70, -36)), radius=10 * s, fill=(28, 44, 40, 255))

    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=0.6))
    img.alpha_composite(overlay)

    # light blooms
    if facing == "away":
        add_glow(img, p(-149, 128)[0], p(-149, 128)[1], 70 * s, (255, 40, 30), 0.55)
        add_glow(img, p(167, 128)[0], p(167, 128)[1], 70 * s, (255, 40, 30), 0.55)
        add_glow(img, p(4, 28)[0], p(4, 28)[1], 90 * s, (255, 170, 60), 0.18)
    else:
        add_glow(img, p(-149, 114)[0], p(-149, 114)[1], 160 * s, (255, 230, 160), 0.5)
        add_glow(img, p(145, 114)[0], p(145, 114)[1], 160 * s, (255, 230, 160), 0.5)
        # headlight cones
        cone = Image.new("RGBA", img.size, (0, 0, 0, 0))
        cd = ImageDraw.Draw(cone)
        for lx in (-149, 145):
            cx, cy = p(lx, 114)
            cd.polygon(
                [(cx - 20, cy), (cx + 20, cy), (cx + 280, H), (cx - 220, H)],
                fill=(255, 220, 140, 28),
            )
        cone = cone.filter(ImageFilter.GaussianBlur(40))
        img.alpha_composite(cone)


def draw_horizon_glow(img: Image.Image, dusk: bool) -> None:
    hy = int(H * HORIZON)
    if dusk:
        add_glow(img, W * 0.62, hy - 20, 420, (255, 140, 60), 0.35)
        add_glow(img, W * 0.38, hy + 10, 260, (255, 90, 40), 0.18)
    else:
        add_glow(img, W * 0.52, hy + 6, 380, (40, 90, 80), 0.22)
        add_glow(img, W * 0.7, hy - 8, 180, (80, 140, 120), 0.12)


def draw_moon(img: Image.Image) -> None:
    add_glow(img, 1540, 160, 90, (220, 230, 240), 0.35)
    d = ImageDraw.Draw(img)
    d.ellipse((1518, 138, 1568, 188), fill=(236, 240, 232, 255))


def compose(dusk: bool) -> Image.Image:
    if dusk:
        sky = vertical_sky(
            [
                (0.0, (18, 28, 48)),
                (0.28, (48, 42, 72)),
                (0.48, (196, 92, 48)),
                (0.56, (232, 150, 70)),
                (1.0, (22, 48, 36)),
            ]
        )
    else:
        sky = vertical_sky(
            [
                (0.0, (4, 10, 16)),
                (0.35, (8, 28, 36)),
                (0.52, (12, 40, 42)),
                (1.0, (6, 16, 14)),
            ]
        )
    img = sky.convert("RGBA")
    if not dusk:
        draw_stars(img.convert("RGB"), 220, 3)
        # redraw stars on RGBA
        rng = random.Random(3)
        px = img.load()
        for _ in range(240):
            x = rng.randint(0, W - 1)
            y = rng.randint(0, int(H * HORIZON) - 10)
            b = rng.randint(170, 255)
            px[x, y] = (b, b, min(255, b + 25), 255)

    draw = ImageDraw.Draw(img)
    draw_fields(draw, dusk)
    draw_highway(draw, dusk)
    draw_trees(draw, dusk)
    draw_power_lines(draw)
    draw_horizon_glow(img, dusk)
    if not dusk:
        draw_moon(img)
    draw_bus(img, dusk, "toward" if dusk else "away")

    rgb = img.convert("RGB")
    rgb = ImageEnhance.Color(rgb).enhance(1.08)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    rgb = vignette(rgb, 0.62 if dusk else 0.7)
    rgb = grain(rgb, 0.035)
    # slight warmth
    arr = np.asarray(rgb).astype(np.float32)
    if dusk:
        arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.04, 0, 255)
        arr[:, :, 2] = np.clip(arr[:, :, 2] * 0.96, 0, 255)
    else:
        arr[:, :, 1] = np.clip(arr[:, :, 1] * 1.04, 0, 255)
        arr[:, :, 2] = np.clip(arr[:, :, 2] * 0.97, 0, 255)
    rgb = Image.fromarray(arr.astype(np.uint8), "RGB")
    rgb = rgb.filter(ImageFilter.GaussianBlur(radius=0.4))
    return rgb


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    dusk = compose(True)
    night = compose(False)
    dusk.save(OUT / "bg-1.jpg", quality=88, optimize=True)
    night.save(OUT / "bg-2.jpg", quality=88, optimize=True)
    dusk.save(OUT / "bg-1.webp", quality=82, method=6)
    night.save(OUT / "bg-2.webp", quality=82, method=6)
    print("wrote", OUT / "bg-1.jpg", dusk.size, (OUT / "bg-1.jpg").stat().st_size)
    print("wrote", OUT / "bg-2.jpg", night.size, (OUT / "bg-2.jpg").stat().st_size)


if __name__ == "__main__":
    main()
