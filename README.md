# echo-scripts

Site-wide JavaScript for echocreativeagency.nl (Webflow).

- `main.js` — the boilerplate: Barba page transitions, Lenis, and all `init…()` functions.
- Loaded in Webflow via one `<script>` tag in Site settings → Custom code → Footer, below the libraries (GSAP, Barba, Lenis).
- Every push to `main` deploys automatically via Cloudflare Pages.
