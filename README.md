# Birthday Surprise — Immersive V3

This version is intentionally more like an interactive short film than a normal birthday page.

## New interactions

- Welcome halo and flower reveal
- Promise card with burst
- Animated birthday reveal
- Photo/Polaroid carousel with shine and movement
- Interactive flower garden: tap different flowers to reveal secrets
- Press-and-hold heart: fill it with courage
- Interactive envelope + seal opening for the confession
- Microphone candle blowing + tap fallback
- Candle smoke and cake celebration
- Floating balloons and confetti
- Animated gift box
- Final particle burst
- Floating petals
- Desktop cursor glow
- Music control

The design uses lightweight CSS/JS rather than loading a large 3D engine. That is deliberate: the goal is a beautiful phone experience that stays responsive.

## Local preview

No npm required.

Recommended:
1. Open this folder in VS Code.
2. Install Live Server.
3. Right-click `index.html`.
4. Open with Live Server.

For microphone access, use localhost rather than `file://`.

## Personalization

Edit `config.js`.

You can keep photos out of GitHub. For local testing, put them in `photos/` and reference them like:

`photos/memory-01.jpg`

Later replace those paths with Vercel Blob URLs.

## Music

Put a permitted-to-use song at:

`assets/birthday.mp3`

## Why this approach

Current creative-web examples commonly use purposeful scroll/input feedback, particles, cinematic transitions and smooth motion rather than animating everything at once. GSAP is a strong choice for timeline/scroll choreography, while Three.js/WebGL is appropriate when a genuinely 3D scene adds value. For this personal birthday site, CSS/DOM interactions are enough to get the premium feel without making the phone experience unnecessarily heavy.
