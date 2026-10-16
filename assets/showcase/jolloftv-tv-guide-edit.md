# JollofTV TV showcase image

Prepared 12 October 2026 for Chellrach's product showcase.

- Source: JollofTV repository, `samsung-assets/screenshot-2-kids.jpg`.
- Method: built-in imagegen photographic retouch, followed by WebP export.
- Output: `public/showcase/jolloftv-tv-guide.webp`, 1600 × 900.
- This is a retouched photograph of the TV app, not an untouched device screenshot. Perspective and glare were corrected. It should not be presented as an exact pixel capture for app-store evidence.
- The original website image and source photograph are retained.
- The website supplies the TV bezel and phone overlay; they are not baked into this image.

## Imagegen prompt

Use case: precise-object-edit.
Edit the supplied real photograph of the JollofTV television app for use inside an existing website TV device frame.
The supplied image is the sole edit target. Preserve the actual app interface, all channel logos, all wording, programme titles, numbers, row order, orange selection states, sidebar and broadcast frame. Do not redesign the app or introduce anything new. Do not replace text or add marketing copy.
Make a careful photographic cleanup only: correct the slight perspective so screen edges and grid lines are straight, remove the thin physical television bezel at the top/right, reduce the strong reflected-room glare in the upper-right programme information panel, and gently reduce photographed-screen moire. Keep the original dark UI appearance and orange accents; avoid aggressive sharpening.
Keep every existing content row and the sidebar visible, including the bottom selected Baby Shark TV row. Do not invent offscreen content. The source has a real bright red cartoon playback frame on the top left; preserve it, its subtitle, and the small channel watermark.
Output only a flat, front-on, opaque 16:9 screen image suitable for fitting inside a website's separate CSS TV bezel. No surrounding physical device, room, perspective mockup, extra border, shadow, or phone. Aim for 1920 by 1080 pixels.
