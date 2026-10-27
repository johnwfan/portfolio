# Cloud map for the home glow (SiteShell): alpha = where the sharper fog shows.
# 400 x 250 covers 200vw x 200vh; its centre sits on the menu item's spot.
#
#   python3 scripts/glowmap.py public/fog/glow-map-N.png preview.png SEED
#
# Seeds in use: 1 → 11, 2 → 22, 3 → 100, 4 → 44, 5 → 55.
import sys
import numpy as np
from PIL import Image, ImageFilter

W, H = 400, 250
rng = np.random.default_rng(int(sys.argv[3]))

def octave(cells_x):
    cells_y = max(2, round(cells_x * H / W))
    g = rng.random((cells_y, cells_x)).astype(np.float32)
    im = Image.fromarray((g * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)
    return np.asarray(im, np.float32) / 255

fbm = sum(octave(c) * a for c, a in [(6, 1), (12, 0.6), (24, 0.3), (48, 0.15)])
fbm = (fbm - fbm.min()) / (fbm.max() - fbm.min())

y, x = np.mgrid[0:H, 0:W].astype(np.float32)
# broad emphasis around the centre (the selected spot), clouds elsewhere fade
d = ((x - W / 2) / (W * 0.24)) ** 2 + ((y - H / 2) / (H * 0.26)) ** 2
emph = np.exp(-d / 2)

v = fbm * 0.85 + emph * 0.3
t = np.clip((v - 0.5) / 0.45, 0, 1)
a = t * t * (3 - 2 * t)  # smoothstep
a = np.asarray(Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3)), np.float32) / 255

out = np.zeros((H, W, 4), np.uint8)
out[..., 3] = (a * 255).astype(np.uint8)
Image.fromarray(out, "RGBA").save(sys.argv[1], optimize=True)
prev = Image.fromarray((a * 255).astype(np.uint8))
prev.save(sys.argv[2])
