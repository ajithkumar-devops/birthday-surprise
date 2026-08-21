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


## V5 compact version
This version has 5 scenes: opening, 3-memory carousel, confession envelope, candle wish, and final gift. It intentionally removes the extra promise, flower garden, hold-heart, birthday intro, and separate celebration screens.


## V6
Added back the short interactive 'Touch the petals to reveal them' scene. It reveals four short messages and then leads directly to the confession.


## V7 birthday details
The opening now uses 22 • 08 • 2004 and the next scene introduces her 22nd birthday subtly rather than repeating the birth year throughout the site.


## V8 final memory adjustment
Only the second memory photo uses a taller 2:3 aspect ratio. The first and third memories retain the normal layout.


## V8 photo carousel fix
Fixed the memory carousel rendering so previous/next and dot controls reliably replace the displayed image. The second image remains taller without breaking the carousel.


## Final photo setup
- Theju and Ajith are configured.
- Five supplied Blob image URLs are configured.
- All memory photos use the taller 2:3 portrait frame.
- The memory carousel remains fully navigable.
