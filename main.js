// -----------------------------------------
// OSMO PAGE TRANSITION BOILERPLATE
// -----------------------------------------
gsap.registerPlugin(CustomEase, InertiaPlugin, Draggable);
history.scrollRestoration = "manual";
let lenis = null;
let nextPage = document;
let onceFunctionsInitialized = false;
let pageCleanups = [];
const onPageLeave = (fn) => pageCleanups.push(fn);

let radialSliderDraggables = [];
let perspectiveTilesObservers = [];
const hasLenis = typeof window.Lenis !== "undefined";
const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
const rmMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
let reducedMotion = rmMQ.matches;
rmMQ.addEventListener?.("change", e => (reducedMotion = e.matches));
rmMQ.addListener?.(e => (reducedMotion = e.matches));
const has = (s) => !!nextPage.querySelector(s);
let staggerDefault = 0.05;
let durationDefault = 0.6;
CustomEase.create("osmo", "0.625, 0.05, 0, 1");
CustomEase.create("osmo2", "M0,0 C0.625,0.05 0,1 1,1");
CustomEase.create("move", "0.3, 0.075, 0, 1");
CustomEase.create("radial", "0.25, 0.1, 0, 1");

gsap.defaults({ ease: "osmo", duration: durationDefault });
// -----------------------------------------
// FUNCTION REGISTRY
// -----------------------------------------
function initOnceFunctions() {
  initLenis();
  if (onceFunctionsInitialized) return;
  onceFunctionsInitialized = true;
  // Runs once on first load
  // if (has('[data-something]')) initSomething();
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    initCursorMarqueeEffect();
  }
  initTabTitleSwitch();
}

function initBeforeEnterFunctions(next) {
  nextPage = next || document;
  // Runs before the enter animation
  // if (has('[data-something]')) initSomething();
  if (has('[data-3d-tornado-init]')) init3DCardsTornado();
  if (has('[data-cascading-slider-wrap]')) initCascadingSlider();
}

function initAfterEnterFunctions(next) {
  nextPage = next || document;
  // Runs after enter animation completes
  // if (has('[data-something]')) initSomething();
  if (has('[data-underlay-nav-menu]')) initFixedUnderlayNavigation();
  if (has('[data-button-animate-chars]')) initButtonCharacterStagger();
  if (has('[data-radial-text-marquee-init]')) initRadialTextMarquee();
  if (has('[data-shutter-scroll-transition]')) initShutterScrollTransition();
  if (has('[data-odometer-group]')) initNumberOdometer();
  if (has('[data-accordion-css-init]')) initAccordionCSS();
  if (has('[data-sticky-feature-wrap]')) initStickyFeatures();
  if (has('[data-step-timeline-init]')) initStepByStepTimeline();
  if (has('[data-form-validate]')) initAdvancedFormValidation();
  if (has('[data-interactive-collage-init]')) initCollageFocusCardOnHover();
  if (has('[data-momentum-hover-init]')) initMomentumBasedHover();
  if (has('[data-radial-slider-init]')) initRadialCardsSlider();
  if (has('[data-curve-on-scroll]')) initSectionCurveOnScroll();
  if (has('[data-cta-card]')) initCtaCard();
  if (has('[data-perspective-tiles-init]')) init3dPerspectiveTiles();
  if (has('[data-sticky-title="wrap"]')) initStickyTitleScroll();
  if (has('[data-footer-parallax]')) initFooterParallax();
  if (has('[data-hero-wave]')) initHeroWave();
  if (has('[data-wavy-marquee-init]')) initWavyMarquee();
  if (has('[data-logo-testimonials-init]')) initLogoCardTestimonials();
  if (has('[data-drag-gallery]')) initDragGallery();
  if (has('[data-bouncy-tabs-init]')) initBouncyContentTabs();
  if (has('[data-reveal-group]')) initRevealGroups();
  if (has('[data-3d-tornado-init]')) playTornadoIntro();
  if (has('[data-scroll-indicator]')) initScrollIndicator();

  if (hasLenis) {
    lenis.resize();
  }
  if (hasScrollTrigger) {
    ScrollTrigger.refresh();
  }
}
// -----------------------------------------
// PAGE TRANSITIONS
// -----------------------------------------
function runPageOnceAnimation(next) {
  const tl = gsap.timeline();
  tl.call(() => {
    resetPage(next);
  }, null, 0);
  return tl;
}

function runPageLeaveAnimation(current, next) {
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionPanel = transitionWrap.querySelector("[data-transition-panel]");
  const transitionPanelTop = transitionWrap.querySelector("[data-transition-panel-top]");
  const transitionPanelBottom = transitionWrap.querySelector("[data-transition-panel-bottom]");
  const transitionLogo = transitionWrap.querySelector("[data-transition-logo]");
  const transitionLogoPath = transitionWrap.querySelectorAll("path");
  const tl = gsap.timeline({
    onComplete: () => { current.remove() }
  });
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    return tl.set(current, { autoAlpha: 0 });
  }
  tl.set(transitionPanel, {
    autoAlpha: 1
  }, 0);
  tl.set(transitionPanelTop, {
    scaleY: 0,
    height: "15vw"
  }, 0);
  tl.set(transitionPanelBottom, {
    scaleY: 1,
    height: "20vw"
  }, 0);
  tl.set(transitionLogo, {
    autoAlpha: 1
  });
  tl.set(transitionLogoPath, {
    yPercent: 105
  });
  tl.set(next, {
    autoAlpha: 0
  }, 0);
  tl.fromTo(transitionPanel, {
    yPercent: 0
  }, {
    yPercent: -100,
    duration: 1,
  }, 0);
  tl.fromTo(transitionPanelTop, {
    scaleY: 0
  }, {
    scaleY: 1,
    duration: 1,
  }, "<");
  tl.fromTo(transitionLogoPath, {
    yPercent: 105
  }, {
    yPercent: 0,
    duration: 0.8,
    ease: "expo.out",
    stagger: {
      amount: 0.06
    }
  }, "<+=0.4");
  tl.fromTo(current, {
    y: "0vh"
  }, {
    y: "-15dvh",
    duration: 1,
  }, 0);
}

function runPageEnterAnimation(next) {
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionPanel = transitionWrap.querySelector("[data-transition-panel]");
  const transitionPanelTop = transitionWrap.querySelector("[data-transition-panel-top]");
  const transitionPanelBottom = transitionWrap.querySelector("[data-transition-panel-bottom]");
  const transitionLogo = transitionWrap.querySelector("[data-transition-logo]");
  const transitionLogoPath = transitionWrap.querySelectorAll("path");
  const tl = gsap.timeline();
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady")
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }
  tl.add("startEnter", 1.35);
  tl.set(next, {
    autoAlpha: 1,
  }, "startEnter");
  tl.fromTo(transitionPanel, {
    yPercent: -100,
  }, {
    yPercent: -200,
    duration: 1,
    overwrite: "auto",
    immediateRender: false
  }, "startEnter");
  tl.fromTo(transitionPanelBottom, {
    scaleY: 1
  }, {
    scaleY: 0,
    duration: 1,
  }, "<");
  tl.set(transitionPanel, {
    autoAlpha: 0
  }, ">");
  tl.to(transitionLogoPath, {
    yPercent: -130,
    duration: 1.2,
    ease: "expo.inOut",
    stagger: {
      amount: -0.06
    }
  }, "startEnter-=0.4");
  tl.from(next, {
    y: "25dvh",
    duration: 1,
  }, "startEnter");
  tl.add("pageReady");
  tl.set(next, { clearProps: "transform,willChange" },
    "pageReady"); // ← clears the leftover y-transform so position:fixed children stay fixed
  tl.call(resetPage, [next], "pageReady");
  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}
// -----------------------------------------
// BARBA HOOKS + INIT
// -----------------------------------------

barba.hooks.beforeLeave(() => {
  // Stop everything the current page started (tickers, listeners, observers)
  pageCleanups.forEach(fn => fn());
  pageCleanups = [];
});

barba.hooks.beforeEnter(data => {
  // Menu links navigate without calling toggle(), so the open state
  // would otherwise persist on body across the whole session
  document.body.removeAttribute("data-menu-status");

  // Position new container on top
  gsap.set(data.next.container, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  });
  if (lenis && typeof lenis.stop === "function") {
    lenis.stop();
  }
  initBeforeEnterFunctions(data.next.container);
  applyThemeFrom(data.next.container);
});
barba.hooks.afterLeave(() => {
  if (hasScrollTrigger) {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
});
barba.hooks.enter(data => {
  initBarbaNavUpdate(data);
})
barba.hooks.afterEnter(data => {
  // Run page functions
  initAfterEnterFunctions(data.next.container);
  // Settle
  if (hasLenis) {
    lenis.resize();
    lenis.start();
  }
  if (hasScrollTrigger) {
    ScrollTrigger.refresh();
  }
});
barba.init({
  debug: true, // Set to 'false' in production
  timeout: 7000,
  preventRunning: true,
  transitions: [
  {
    name: "default",
    sync: true,
    // First load
    async once(data) {
      initOnceFunctions();
      return runPageOnceAnimation(data.next.container);
    },
    // Current page leaves
    async leave(data) {
      return runPageLeaveAnimation(data.current.container, data.next.container);
    },
    // New page enters
    async enter(data) {
      return runPageEnterAnimation(data.next.container);
    }
  }],
});

// -----------------------------------------
// GENERIC + HELPERS
// -----------------------------------------
const themeConfig = {
  light: {
    nav: "dark",
    transition: "light"
  },
  dark: {
    nav: "light",
    transition: "dark"
  }
};

function applyThemeFrom(container) {
  const pageTheme = container?.dataset?.pageTheme || "light";
  const config = themeConfig[pageTheme] || themeConfig.light;
  document.body.dataset.pageTheme = pageTheme;
  const transitionEl = document.querySelector('[data-theme-transition]');
  if (transitionEl) {
    transitionEl.dataset.themeTransition = config.transition;
  }
  const nav = document.querySelector('[data-theme-nav]');
  if (nav) {
    nav.dataset.themeNav = config.nav;
  }
}

function initLenis() {
  if (lenis) return; // already created
  if (!hasLenis) return;
  lenis = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25,
  });
  if (hasScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
  }
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function resetPage(container) {
  window.scrollTo(0, 0);
  gsap.set(container, { clearProps: "position,top,left,right" });
  if (hasLenis) {
    lenis.resize();
    lenis.start();
  }
}

function debounceOnWidthChange(fn, ms) {
  let last = innerWidth,
    timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (innerWidth !== last) {
        last = innerWidth;
        fn.apply(this, args);
      }
    }, ms);
  };
}

function initBarbaNavUpdate(data) {
  var tpl = document.createElement('template');
  tpl.innerHTML = data.next.html.trim();
  var nextNodes = tpl.content.querySelectorAll('[data-barba-update]');
  var currentNodes = document.querySelectorAll('nav [data-barba-update]');
  currentNodes.forEach(function (curr, index) {
    var next = nextNodes[index];
    if (!next) return;
    // Aria-current sync
    var newStatus = next.getAttribute('aria-current');
    if (newStatus !== null) {
      curr.setAttribute('aria-current', newStatus);
    } else {
      curr.removeAttribute('aria-current');
    }
    // Class list sync
    var newClassList = next.getAttribute('class') || '';
    curr.setAttribute('class', newClassList);
  });
}
// -----------------------------------------
// YOUR FUNCTIONS GO BELOW HERE
// -----------------------------------------
function initButtonCharacterStagger() {
  const offsetIncrement = 0.01; // Transition offset increment in seconds
  const buttons = nextPage.querySelectorAll('[data-button-animate-chars]');
  buttons.forEach(button => {
    const text = button.textContent; // Get the button's text content
    button.innerHTML = ''; // Clear the original content
    button.innerHTML = ''; // Clear the original content
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.transitionDelay = `${index * offsetIncrement}s`;
      // Handle spaces explicitly
      if (char === ' ') {
        span.style.whiteSpace = 'pre'; // Preserve space width
      }
      button.appendChild(span);
    });
  });
}

function initRadialTextMarquee() {
  const wraps = nextPage.querySelectorAll('[data-radial-text-marquee-init]');
  if (!wraps.length) return;
  const ns = 'http://www.w3.org/2000/svg';
  const xns = 'http://www.w3.org/1999/xlink';
  const prm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSafari = (() => {
    const ua = navigator.userAgent;
    return /Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR/i.test(ua);
  })();
  const clamp = (n, a, b) => Math.min(b, Math.max(a, Number(n) || 0));
  const speedMul = () => {
    const w = window.innerWidth || 2000;
    const t = clamp((w - 250) / (2000 - 250), 0, 1);
    return 0.5 + t * (1 - 0.5);
  };
  const lsToPx = (ls, fs) => {
    if (!ls || ls === 'normal') return 0;
    if (ls.endsWith('px')) return parseFloat(ls) || 0;
    if (ls.endsWith('em')) return (parseFloat(ls) || 0) * fs;
    if (ls.endsWith('rem')) {
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return (parseFloat(ls) || 0) * root;
    }
    const n = parseFloat(ls);
    return Number.isFinite(n) ? n : 0;
  };
  const syncType = (fromEl, svgText, svgTextPath) => {
    const s = getComputedStyle(fromEl);
    const fsPx = parseFloat(s.fontSize) || 16;
    const lsPx = lsToPx(s.letterSpacing, fsPx);
    svgText.setAttribute('font-family', s.fontFamily);
    svgText.setAttribute('font-size', s.fontSize);
    svgText.setAttribute('font-weight', s.fontWeight);
    svgText.setAttribute('dominant-baseline', 'alphabetic');
    svgText.setAttribute('text-rendering', 'geometricPrecision');
    svgText.setAttribute('fill', s.color);
    svgText.setAttribute('letter-spacing', `${lsPx}px`);
    svgText.setAttribute('font-kerning', 'none');
    svgText.setAttribute('font-feature-settings', '"kern" 0, "liga" 0, "clig" 0');
    if (svgTextPath) svgTextPath.setAttribute('letter-spacing', `${lsPx}px`);
    return { fsPx, lsPx, ff: s.fontFamily, fw: s.fontWeight, fz: s.fontSize };
  };
  const tspan = (tp, v, fill, lsPx) => {
    const t = document.createElementNS(ns, 'tspan');
    t.textContent = v;
    if (fill) t.setAttribute('fill', fill);
    if (lsPx != null) t.setAttribute('letter-spacing', `${lsPx}px`);
    tp.appendChild(t);
  };
  const buildRun = (tp, text, spacer, spacerColor, pad, reps, lsPx) => {
    tp.textContent = '';
    for (let i = 0; i < reps; i++) {
      tspan(tp, text, null, lsPx);
      tspan(tp, pad, null, lsPx);
      tspan(tp, spacer, spacerColor, lsPx);
      tspan(tp, pad, null, lsPx);
    }
  };
  const circleR = (half, level01) => {
    if (level01 <= 0) return half * 200;
    const inv = 1 - level01;
    return half * (1.01 + inv * inv * 16.99);
  };
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const measureLS = (str, fontCss, lsPx) => {
    if (!ctx) return 0;
    ctx.font = fontCss;
    const txt = (str || '').replace(/\u00A0/g, ' ');
    const w = ctx.measureText(txt).width || 0;
    const glyphs = Array.from(txt).length;
    return w + Math.max(glyphs - 1, 0) * (lsPx || 0);
  };
  const makeSvg = (wrap) => {
    const svg = document.createElementNS(ns, 'svg');
    const defs = document.createElementNS(ns, 'defs');
    const g = document.createElementNS(ns, 'g');
    const path = document.createElementNS(ns, 'path');
    const text = document.createElementNS(ns, 'text');
    const tp = document.createElementNS(ns, 'textPath');
    const id = `rtm-${Math.random().toString(16).slice(2)}`;
    svg.setAttribute('xmlns', ns);
    svg.setAttribute('xmlns:xlink', xns);
    Object.assign(svg.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'visible',
      pointerEvents: 'none',
      display: 'block'
    });
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    path.setAttribute('id', id);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'none');
    tp.setAttributeNS(xns, 'xlink:href', `#${id}`);
    tp.setAttribute('text-anchor', 'start');
    tp.setAttribute('startOffset', '0px');
    text.appendChild(tp);
    defs.appendChild(path);
    svg.appendChild(defs);
    g.appendChild(path);
    g.appendChild(text);
    svg.appendChild(g);
    wrap.appendChild(svg);
    const textEl = wrap.querySelector('[data-radial-text-marquee-text]');
    if (textEl) textEl.style.opacity = '0';
    return { svg, g, path, text, tp };
  };
  wraps.forEach((wrap) => {
    const textEl = wrap.querySelector('[data-radial-text-marquee-text]');
    if (!textEl) return;
    const st = { ...makeSvg(wrap), tw: null, px: { x: 0 }, raf: 0, qs: null };
    const rebuild = () => {
      const baseText = (textEl.textContent || '').trim();
      if (!baseText) return;
      const speed = clamp(wrap.getAttribute('data-radial-text-marquee-speed') || 4, 0.1, 200);
      const speedPx = Math.max(speed * 100 * speedMul(), 1);
      const radiusLevel = clamp(wrap.getAttribute('data-radial-text-marquee-radius') || 10, 0,
        10);
      const level01 = radiusLevel / 10;
      const spacer = wrap.getAttribute('data-radial-text-marquee-spacer') || '•';
      const spacerColor = wrap.getAttribute('data-radial-text-marquee-spacer-color') || null;
      const padCount = clamp(wrap.getAttribute('data-radial-text-marquee-spacer-padding') ||
        1, 0, 20);
      const pad = '\u00A0'.repeat(padCount);
      const typo = syncType(textEl, st.text, st.tp);
      const wrapW = Math.max(wrap.clientWidth || 1, 1);
      const wrapH = Math.max(wrap.clientHeight || textEl.offsetHeight || 1, 1);
      const bleed = typo.fsPx * 2;
      const w = wrapW + bleed * 2;
      const h = wrapH;
      Object.assign(st.svg.style, { width: `${w}px`, height: `${h}px`, left: `${-bleed}px` });
      st.svg.setAttribute('width', w);
      st.svg.setAttribute('height', h);
      st.svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const half = w / 2;
      const r = level01 <= 0.0001 ? half * 200 : Math.max(circleR(half, level01), half +
        0.001);
      const under = Math.max(r * r - half * half, 0);
      const y = Math.max(r - Math.sqrt(under), 0);
      st.path.setAttribute(
        'd',
        level01 <= 0.0001 ? `M 0 ${y} L ${w} ${y}` : `M 0 ${y} A ${r} ${r} 0 0 1 ${w} ${y}`
      );
      st.text.setAttribute('x', '0');
      st.text.setAttribute('y', `${y}`);
      st.g.setAttribute('transform', `translate(0 ${typo.fsPx})`);
      textEl.style.opacity = '0';
      cancelAnimationFrame(st.raf);
      st.raf = requestAnimationFrame(() => {
        const fontCss = `${typo.fw} ${typo.fz} ${typo.ff}`;
        let loopLen =
          measureLS(baseText, fontCss, typo.lsPx) +
          measureLS(pad, fontCss, typo.lsPx) +
          measureLS(spacer, fontCss, typo.lsPx) +
          measureLS(pad, fontCss, typo.lsPx);
        loopLen = Math.max(loopLen || 0, 1);
        const pathLen = st.path.getTotalLength ? st.path.getTotalLength() : wrapW;
        const targetCover = Math.max(pathLen * 4, wrapW * 8);
        const reps = clamp(Math.ceil(targetCover / loopLen) + 6, 6, 600);
        buildRun(st.tp, baseText, spacer, spacerColor, pad, reps, typo.lsPx);
        if (!isSafari) {
          const fullLen = st.tp.getComputedTextLength();
          if (Number.isFinite(fullLen) && fullLen > 0) {
            const perUnit = fullLen / reps;
            if (Number.isFinite(perUnit) && perUnit > 0) loopLen = perUnit;
          }
        }
        loopLen = Math.max(loopLen, 1);
        if (st.tw) st.tw.kill();
        st.tw = null;
        st.qs = gsap && gsap.quickSetter ? gsap.quickSetter(st.tp, 'attr') : null;
        const setOffset = (v) => {
          const val = `${v.toFixed(3)}px`;
          if (st.qs) st.qs({ startOffset: val });
          else st.tp.setAttribute('startOffset', val);
        };
        st.px.x = 0;
        st.tw = gsap.to(st.px, {
          x: loopLen,
          duration: loopLen / speedPx,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            const x = ((st.px.x % loopLen) + loopLen) % loopLen;
            setOffset(-x);
          }
        });
        // Keeps user accessibility preference intact, otherwise runs continuously
        if (prm) st.tw.pause();
      });
    };
    const schedule = (() => {
      let raf = 0;
      return () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(rebuild);
      };
    })();
    rebuild();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule).catch(
      () => {});
    else setTimeout(schedule, 150);
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(schedule);
      ro.observe(wrap);
      ro.observe(textEl);
    } else {
      window.addEventListener('resize', schedule);
    }
  });
}

function initFixedUnderlayNavigation() {
  CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1")
  const toggleBtn = document.querySelector("[data-underlay-nav-toggle]");
  const toggleLabels = document.querySelectorAll(".underlay-nav__toggle-label");
  const toggleBars = document.querySelectorAll(".underlay-nav__toggle-bar");
  const menuEl = document.querySelector("[data-underlay-nav-menu]");
  const largeItems = document.querySelectorAll("[data-reveal-l]");
  const smallItems = document.querySelectorAll("[data-reveal-s]");
  const menuBorder = document.querySelector(".underlay-nav__bottom-border")
  const mainEl = document.querySelector("[data-main]");
  const overlayEl = document.querySelector("[data-underlay-nav-overlay]");
  const darkEl = document.querySelector(".underlay-nav__dark");
  const corners = document.querySelectorAll(".underlay-nav__corner")
  const overlayBorders = document.querySelectorAll(".underlay-nav__border-row")
  if (!toggleBtn || !menuEl || !mainEl || !overlayEl) return;
  let isOpen = false;
  let tl;
  let enterEndTime = 0;
  const getMenuOffset = () => -menuEl.offsetWidth;
  gsap.set(overlayEl, { visibility: "hidden", pointerEvents: "none" });
  gsap.set(darkEl, { autoAlpha: 0 });
  gsap.set(mainEl, { clearProps: "transform" });
  gsap.set(toggleLabels, { yPercent: 0 });
  gsap.set(toggleBars, { y: 0, rotation: 0 });
  gsap.set(menuBorder, { scaleX: 0 });
  gsap.set(overlayBorders[0], { yPercent: -100 })
  gsap.set(overlayBorders[1], { yPercent: 100 })
  gsap.set(corners, { scale: 0 })

  function buildTimeline() {
    tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "energy",
        easeReverse: "power2.inOut"
      },
      // When the menu settles closed (forward-close OR quick reverse-close),
      // strip the transform off [data-main] so position:fixed children
      // (e.g. .contact_hero) anchor to the viewport again instead of to [data-main].
      onComplete: () => gsap.set(mainEl, { clearProps: "transform" }),
      onReverseComplete: () => gsap.set(mainEl, { clearProps: "transform" })
    });
    tl.set(overlayEl, { visibility: "visible", pointerEvents: "auto" }, 0);
    tl.to([mainEl, overlayEl], {
        x: getMenuOffset,
        duration: 0.7,
      }, 0)
      .to(darkEl, {
        autoAlpha: 1,
        duration: 0.5,
      }, 0)
      .to(corners, {
        scale: 1,
        duration: 0.5,
      }, 0)
      .to(overlayBorders, {
        yPercent: 0,
        duration: 0.5,
      }, 0)
      .to(toggleLabels, {
        yPercent: -100,
        duration: 0.4,
      }, 0)
      .to(toggleBtn, {
        duration: 0.4,
      }, 0)
      .to(toggleBars[0], {
        y: "0.25em",
        rotation: 45,
        duration: 0.35,
        ease: "back.out(1.4)",
        easeReverse: "power3.out",
      }, 0.05)
      .to(toggleBars[1], {
        y: "-0.25em",
        rotation: -45,
        duration: 0.35,
        ease: "back.out(1.4)",
        easeReverse: "power3.out",
      }, 0.05)
      .fromTo(largeItems, { autoAlpha: 0, xPercent: 25 },
        {
          autoAlpha: 1,
          xPercent: 0,
          duration: 0.7,
          stagger: 0.05,
        },
        0
      )
      .fromTo(smallItems, { autoAlpha: 0, yPercent: 100 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.out"
        },
        0.3
      )
      .to(menuBorder, {
        scaleX: 1,
        duration: 0.5,
      }, "<")
    enterEndTime = tl.duration();
    tl.addPause();
    tl.to([largeItems, smallItems], {
        autoAlpha: 0,
        duration: 0.3,
      }, "<")
      .to([mainEl, overlayEl], {
        x: 0,
        duration: 0.6,
      }, "<")
      .to(darkEl, {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.inOut",
      }, "<")
      .to(corners, {
        scale: 0,
        duration: 0.5,
      }, "<")
      .to(overlayBorders[0], {
        yPercent: -100,
        duration: 0.5,
      }, "<")
      .to(overlayBorders[1], {
        yPercent: 100,
        duration: 0.5,
      }, "<")
      .to(toggleBtn, {
        duration: 0.25,
      }, "<+=0.1")
      .to(toggleLabels, {
        yPercent: 0,
        duration: 0.25,
        ease: "power3.in",
      }, "<")
      .to(toggleBars, {
        y: 0,
        rotation: 0,
        duration: 0.25,
        ease: "power3.in",
      }, "<")
      .set(overlayEl, {
        visibility: "hidden",
        pointerEvents: "none"
      });
  }

  function toggle() {
    isOpen = !isOpen;
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.setAttribute("aria-label", isOpen ? "close menu" : "open menu");
    document.body.setAttribute("data-menu-status", isOpen ? "open" : "");
    if (isOpen) {
      tl.invalidate();
      if (tl.time() >= enterEndTime) tl.timeScale(1).restart();
      else tl.timeScale(1).play();
    } else {
      if (tl.time() < enterEndTime) tl.timeScale(1).reverse();
      else tl.timeScale(1).play();
    }
  }
  buildTimeline();
  toggleBtn.addEventListener("click", toggle);
  overlayEl.addEventListener("click", () => {
    if (isOpen) toggle();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      toggle();
      toggleBtn.focus();
    }
  });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (isOpen) {
        gsap.set([mainEl, overlayEl], {
          x: getMenuOffset()
        });
      } else {
        tl.invalidate();
      }
    }, 150);
  });
}

function initShutterScrollTransition() {
  // Defaults — edit these to change fallbacks if no data-attribute is added
  const defaultRows = 6;
  const defaultMode = "cover";
  const defaultScrollStart = { cover: "bottom bottom", reveal: "top bottom" };
  const defaultScrollEnd = { cover: "bottom top", reveal: "top center" };
  const defaultScrub = 0.3;
  const defaultShutterDuration = 0.1;
  const defaultStaggerAmount = 0.01;
  // Class names applied to generated elements
  const panelClass = "shutter-scroll-transition__panel";
  const rowClass = "shutter-scroll-transition__row";
  // Breakpoints
  const breakpoints = {
    mobile: "(max-width: 478px)",
    landscape: "(max-width: 767px)",
    tablet: "(max-width: 991px)",
  };
  const instances = [];
  let mm = null;

  function getMode(wrapper) {
    return wrapper.dataset.mode === "reveal" ? "reveal" : defaultMode;
  }

  function getRows(wrapper) {
    const base = parseInt(wrapper.dataset.rows, 10) || defaultRows;
    if (window.matchMedia(breakpoints.mobile).matches) {
      return parseInt(wrapper.dataset.rowsMobile, 10) || base;
    }
    if (window.matchMedia(breakpoints.landscape).matches) {
      return parseInt(wrapper.dataset.rowsLandscape, 10) || base;
    }
    if (window.matchMedia(breakpoints.tablet).matches) {
      return parseInt(wrapper.dataset.rowsTablet, 10) || base;
    }
    return base;
  }

  function getScrollStart(wrapper, mode) {
    return wrapper.dataset.scrollStart || defaultScrollStart[mode];
  }

  function getScrollEnd(wrapper, mode) {
    return wrapper.dataset.scrollEnd || defaultScrollEnd[mode];
  }

  function createRow() {
    const row = document.createElement("div");
    row.classList.add(rowClass);
    row.setAttribute("data-shutter-scroll-row", "");
    return row;
  }

  function buildRows(wrapper, rows) {
    const panel = document.createElement("div");
    panel.classList.add(panelClass);
    panel.setAttribute("data-shutter-scroll-panel", "");
    const fragment = document.createDocumentFragment();
    for (let r = 0; r < rows; r++) {
      fragment.appendChild(createRow());
    }
    panel.appendChild(fragment);
    wrapper.appendChild(panel);
    return { panel };
  }

  function collectRows(panel) {
    return Array.from(panel.children);
  }

  function createAnimation(wrapper, rows, section, mode) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: getScrollStart(wrapper, mode),
        end: getScrollEnd(wrapper, mode),
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      },
    });
    const fromScale = mode === "cover" ? 0 : 1;
    const toScale = mode === "cover" ? 1 : 0;
    const origin = mode === "cover" ? "bottom center" : "top center";
    gsap.set(rows, {
      scaleY: fromScale,
      transformOrigin: origin,
    });
    tl.to(rows, {
      scaleY: toScale,
      duration: defaultShutterDuration,
      stagger: { each: defaultStaggerAmount, from: "end" },
      ease: "none",
    });
    return tl;
  }

  function setupInstance(wrapper) {
    const section = wrapper.closest("section") || wrapper.parentElement;
    const rows = getRows(wrapper);
    const mode = getMode(wrapper);
    const { panel } = buildRows(wrapper, rows);
    const rowList = collectRows(panel);
    const tl = createAnimation(wrapper, rowList, section, mode);
    return { wrapper, tl };
  }

  function destroyInstance(instance) {
    if (instance.tl) {
      instance.tl.scrollTrigger?.kill();
      instance.tl.kill();
    }
    const panel = instance.wrapper.querySelector("[data-shutter-scroll-panel]");
    if (panel) panel.remove();
  }

  function buildAll() {
    const wrappers = document.querySelectorAll("[data-shutter-scroll-transition]");
    wrappers.forEach((wrapper) => {
      instances.push(setupInstance(wrapper));
    });
    ScrollTrigger.refresh();
  }

  function destroyAll() {
    instances.forEach(destroyInstance);
    instances.length = 0;
  }
  const wrappers = document.querySelectorAll("[data-shutter-scroll-transition]");
  if (!wrappers.length) return;
  mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: "(min-width: 992px)",
      isTablet: "(min-width: 768px) and (max-width: 991px)",
      isLandscape: "(min-width: 479px) and (max-width: 767px)",
      isMobile: "(max-width: 478px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions.reduceMotion) return;
      buildAll();
      return () => {
        destroyAll();
      };
    }
  );
}

function init3DCardsTornado() {
  const containers = gsap.utils.toArray('[data-3d-tornado-init]', nextPage);
  const rotationAngle = 30; // rotation angle (spacing)
  const cardYSpacing = 0.3; // vertical card offset
  const edgeOffset = 2; // vertical edge offset
  const orbitDepth = 35; // width/depth of the tornado orbit
  const autoSpeed = 0.00325; // automatic rotation speed
  const scrollSpeed = 0.015; // scroll/drag speed
  const dragMultiplier = 5; // extra sensitivity for drag gestures
  const scrollEase = 0.1; // speed lerp
  const maxSpeed = 0.2; // maximum speed
  const edgeScale = 0.5; // edge scale distance
  const edgeEase = gsap.parseEase("power2.inOut"); // easing for edge scaling
  const minScale = 1; // smallest scale for distant cards
  const backDarkness = 0.75; // darkening applied to cards in back
  const introDuration = 1.6; // page-load intro: each card grows from 0 to full size
  const introStagger = 0.035; // delay per card, counted outward from the center card
  const introEase = "expo.out";

  // Observer targets window and locks the vertical axis, which swallows page
  // scrolling on touch devices — desktop only.
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Blur isn't GPU-composited and is written every frame — too heavy for phones
  const backBlur = canHover ? 0.5 : 0;

  containers.forEach((container) => {
    const list = container.querySelector('[data-3d-tornado-list]');
    if (!list) return;
    const originalCards = gsap.utils.toArray('[data-3d-tornado-item]', list).map((card) => card
      .cloneNode(true));
    if (!originalCards.length) return;
    let inputObserver;
    const state = {
      amount: 0,
      progress: 0,
      velocity: autoSpeed,
      direction: 1,
      cardHeight: 0,
      cardGap: 0,
      em: 16,
      isActive: false,
      cards: []
    };

    function getCardAmount() {
      const containerHalfHeight = container.offsetHeight * 0.5;
      const edgeOffsetDistance = state.cardHeight * edgeOffset;
      const fadeDistance = state.cardHeight * edgeScale;
      const neededDistance = containerHalfHeight + edgeOffsetDistance + fadeDistance;
      const cardsPerSide = Math.ceil(neededDistance / state.cardGap) + 1;
      const neededAmount = cardsPerSide * 2 + 1;
      const batchCount = Math.ceil(neededAmount / originalCards.length);
      return originalCards.length * batchCount;
    }

    function buildCards() {
      list.innerHTML = "";
      const measureCard = originalCards[0].cloneNode(true);
      list.appendChild(measureCard);
      state.cardHeight = measureCard.offsetHeight;
      state.cardGap = state.cardHeight * cardYSpacing;
      state.em = parseFloat(getComputedStyle(measureCard).fontSize);
      state.amount = getCardAmount();
      list.innerHTML = "";
      for (let i = 0; i < state.amount; i++) {
        const card = originalCards[i % originalCards.length].cloneNode(true);
        card.dataset.index = i;
        list.appendChild(card);
      }
      state.cards = gsap.utils.toArray('[data-3d-tornado-item]', list);
    }

    function getEdgeScale(y) {
      const containerHalfHeight = container.offsetHeight * 0.5;
      const edgeOffsetDistance = state.cardHeight * edgeOffset;
      const fadeDistance = state.cardHeight * edgeScale;
      const distanceFromCenter = Math.abs(y);
      const fadeStart = containerHalfHeight + edgeOffsetDistance;
      const progress = gsap.utils.clamp(0, 1, (fadeStart - distanceFromCenter) / fadeDistance);
      return edgeEase(progress);
    }

    // Intro scale per card: starts at 0 and is played by playTornadoIntro() once the
    // page has entered; null means no intro is running (every card at full size).
    let introScales = reducedMotion ? null : [];

    function render() {
      const radius = orbitDepth * state.em;
      state.cards.forEach((card, i) => {
        const startIndex = parseFloat(card.dataset.index);
        const loopIndex = ((startIndex + state.progress) % state.amount + state.amount) %
          state.amount;
        const index = loopIndex > state.amount * 0.5 ? loopIndex - state.amount : loopIndex;
        const angleDeg = index * rotationAngle;
        const angleRad = angleDeg * Math.PI / 180;
        const center = 1 - Math.min(Math.abs(index) / (state.amount * 0.5), 1);
        const y = index * state.cardGap;
        const baseScale = minScale + center * (1 - minScale);
        const intro = introScales ? (introScales[i]?.v ?? 0) : 1;
        const scale = baseScale * getEdgeScale(y) * intro;
        const backAmount = gsap.utils.clamp(0, 1, (1 - Math.cos(angleRad)) * 0.5);
        const brightness = 1 - backAmount * backDarkness;
        const blur = backAmount * backBlur;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: Math.sin(angleRad) * radius,
          y,
          z: (Math.cos(angleRad) - 1) * radius,
          rotateY: angleDeg,
          scale,
          filter: `brightness(${brightness}) blur(${blur}em)`,
          autoAlpha: 1,
          zIndex: Math.round(center * 1000)
        });
      });
    }

    function tick() {
      if (!state.isActive) return;
      const targetVelocity = autoSpeed * state.direction;
      state.velocity = gsap.utils.interpolate(state.velocity, targetVelocity, scrollEase);
      state.progress += state.velocity;
      render();
    }

    function handleInput(self) {
      if (!state.isActive) return;
      const delta = self.event.type === 'wheel' ? self.deltaY : Math.abs(self.deltaX) > Math
        .abs(self.deltaY) ? self.deltaX * dragMultiplier : self.deltaY * dragMultiplier;
      if (!delta) return;
      state.direction = delta > 0 ? 1 : -1;
      state.velocity += delta * scrollSpeed / 100;
      state.velocity = gsap.utils.clamp(-maxSpeed, maxSpeed, state.velocity);
    }

    function setActive(isActive) {
      state.isActive = isActive;
      if (!inputObserver) return;
      if (isActive) {
        inputObserver.enable();
      } else {
        inputObserver.disable();
      }
    }

    function rebuild() {
      buildCards();
      if (introScales) introScales = null; // a resize mid-intro just shows everything
      render();
    }

    rebuild();
    if (!reducedMotion) introScales = state.cards.map(() => ({ v: 0 }));
    render();

    // Cards open up one by one, starting at the center card and moving outward
    let introFallback;
    container._playIntro = () => {
      introFallback?.kill();
      if (!introScales || container._introPlayed) return;
      container._introPlayed = true;
      gsap.to(introScales, {
        v: 1,
        duration: introDuration,
        ease: introEase,
        stagger: (i) => Math.min(i, state.amount - i) * introStagger,
        onUpdate: () => { if (!state.isActive) render(); },
        onComplete: () => {
          introScales = null;
          render();
        },
      });
    };
    // Safety net: never leave the cards invisible if afterEnter doesn't fire
    introFallback = gsap.delayedCall(5, container._playIntro);

    if (canHover) {
      inputObserver = Observer.create({
        target: window,
        type: 'wheel,pointer',
        preventDefault: false,
        lockAxis: true,
        onChange: handleInput,
        onPress: () => {
          container.style.cursor = 'grabbing';
        },
        onRelease: () => {
          container.style.cursor = 'grab';
        },
      });
    }

    // In-view detection with IntersectionObserver instead of ScrollTrigger:
    // the afterLeave hook kills all ScrollTriggers, which used to kill this one
    // right after it was created (this function runs in beforeEnter).
    const inViewObserver = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
    });
    inViewObserver.observe(container);

    gsap.ticker.add(tick);

    // Mobile fires resize when the URL bar hides/shows; rebuilding mid-scroll
    // wipes and re-clones every card. Only rebuild on actual width changes.
    const onResize = debounceOnWidthChange(() => {
      rebuild();
      ScrollTrigger.refresh();
    }, 150);
    window.addEventListener('resize', onResize);

    // Stop everything when leaving the page
    onPageLeave(() => {
      gsap.ticker.remove(tick);
      introFallback?.kill();
      inputObserver?.kill();
      inViewObserver.disconnect();
      window.removeEventListener('resize', onResize);
    });
  });
}

function initCascadingSlider() {
  const duration = 0.65;
  const ease = 'power3.inOut';
  const breakpoints = [
    { maxWidth: 479, activeWidth: 0.70, siblingWidth: 0.11 },
    { maxWidth: 767, activeWidth: 0.70, siblingWidth: 0.10 },
    { maxWidth: 991, activeWidth: 0.60, siblingWidth: 0.10 },
    { maxWidth: Infinity, activeWidth: 0.60, siblingWidth: 0.13 },
  ];
  const wrappers = nextPage.querySelectorAll('[data-cascading-slider-wrap]');
  wrappers.forEach(setupInstance);

  function setupInstance(wrapper) {
    const viewport = wrapper.querySelector('[data-cascading-viewport]');
    const prevButton = wrapper.querySelector('[data-cascading-slider-prev]');
    const nextButton = wrapper.querySelector('[data-cascading-slider-next]');
    const slides = Array.from(viewport.querySelectorAll('[data-cascading-slide]'));
    let totalSlides = slides.length;
    if (totalSlides === 0) return;
    if (totalSlides < 9) {
      const originalSlides = slides.slice();
      while (slides.length < 9) {
        originalSlides.forEach(function (original) {
          const clone = original.cloneNode(true);
          clone.setAttribute('data-clone', '');
          viewport.appendChild(clone);
          slides.push(clone);
        });
      }
      totalSlides = slides.length;
    }
    let activeIndex = 0;
    let isAnimating = false;
    let slideWidth = 0;
    let slotCenters = {};
    let slotWidths = {};

    function readGap() {
      const raw = getComputedStyle(viewport).getPropertyValue('--gap').trim();
      if (!raw) return 0;
      const temp = document.createElement('div');
      temp.style.width = raw;
      temp.style.position = 'absolute';
      temp.style.visibility = 'hidden';
      viewport.appendChild(temp);
      const px = temp.offsetWidth;
      viewport.removeChild(temp);
      return px;
    }

    function getSettings() {
      const windowWidth = window.innerWidth;
      for (let i = 0; i < breakpoints.length; i++) {
        if (windowWidth <= breakpoints[i].maxWidth) return breakpoints[i];
      }
      return breakpoints[breakpoints.length - 1];
    }

    function getOffset(slideIndex, fromIndex) {
      if (fromIndex === undefined) fromIndex = activeIndex;
      let distance = slideIndex - fromIndex;
      const half = totalSlides / 2;
      if (distance > half) distance -= totalSlides;
      if (distance < -half) distance += totalSlides;
      return distance;
    }

    function measure() {
      const settings = getSettings();
      const viewportWidth = viewport.offsetWidth;
      const gap = readGap();
      const activeSlideWidth = viewportWidth * settings.activeWidth;
      const siblingSlideWidth = viewportWidth * settings.siblingWidth;
      const farSlideWidth = Math.max(0, (viewportWidth - activeSlideWidth - 2 * siblingSlideWidth -
        4 * gap) / 2);
      slideWidth = activeSlideWidth;
      const visibleSlots = [
        { slot: -2, width: farSlideWidth },
        { slot: -1, width: siblingSlideWidth },
        { slot: 0, width: activeSlideWidth },
        { slot: 1, width: siblingSlideWidth },
        { slot: 2, width: farSlideWidth },
      ];
      let x = 0;
      visibleSlots.forEach(function (def, i) {
        slotCenters[String(def.slot)] = x + def.width / 2;
        slotWidths[String(def.slot)] = def.width;
        if (i < visibleSlots.length - 1) x += def.width + gap;
      });
      slotCenters['-3'] = slotCenters['-2'] - farSlideWidth / 2 - gap - farSlideWidth / 2;
      slotWidths['-3'] = farSlideWidth;
      slotCenters['3'] = slotCenters['2'] + farSlideWidth / 2 + gap + farSlideWidth / 2;
      slotWidths['3'] = farSlideWidth;
      slides.forEach(function (slide) {
        slide.style.width = slideWidth + 'px';
      });
    }

    function getSlideProps(offset) {
      const clamped = Math.max(-3, Math.min(3, offset));
      const slotWidth = slotWidths[String(clamped)];
      const clipAmount = Math.max(0, (slideWidth - slotWidth) / 2);
      const translateX = slotCenters[String(clamped)] - slideWidth / 2;
      return {
        x: translateX,
        '--clip': clipAmount,
        zIndex: 10 - Math.abs(clamped),
      };
    }

    function layout(animate, previousIndex) {
      slides.forEach(function (slide, index) {
        const offset = getOffset(index);
        if (offset < -3 || offset > 3) {
          if (animate && previousIndex !== undefined) {
            const previousOffset = getOffset(index, previousIndex);
            if (previousOffset >= -2 && previousOffset <= 2) {
              const exitSlot = previousOffset < 0 ? -3 : 3;
              gsap.to(slide, Object.assign({}, getSlideProps(exitSlot), {
                duration: duration,
                ease: ease,
                overwrite: true,
              }));
              return;
            }
          }
          const parkSlot = offset < 0 ? -3 : 3;
          gsap.set(slide, getSlideProps(parkSlot));
          return;
        }
        const props = getSlideProps(offset);
        slide.setAttribute('data-status', offset === 0 ? 'active' : 'inactive');
        if (animate) {
          gsap.to(slide, Object.assign({}, props, {
            duration: duration,
            ease: ease,
            overwrite: true,
          }));
        } else {
          gsap.set(slide, props);
        }
      });
    }

    function goTo(targetIndex) {
      const normalizedTarget = ((targetIndex % totalSlides) + totalSlides) % totalSlides;
      if (isAnimating || normalizedTarget === activeIndex) return;
      isAnimating = true;
      const previousIndex = activeIndex;
      const travelDirection = getOffset(normalizedTarget, previousIndex) > 0 ? 1 : -1;
      slides.forEach(function (slide, index) {
        const currentOffset = getOffset(index, previousIndex);
        const nextOffset = getOffset(index, normalizedTarget);
        const wasInRange = currentOffset >= -3 && currentOffset <= 3;
        const willBeVisible = nextOffset >= -2 && nextOffset <= 2;
        if (!wasInRange && willBeVisible) {
          const entrySlot = travelDirection > 0 ? 3 : -3;
          gsap.set(slide, getSlideProps(entrySlot));
        }
        const wasInvisible = Math.abs(currentOffset) >= 3;
        const willBeStaging = Math.abs(nextOffset) === 3;
        const crossesSides = currentOffset * nextOffset < 0;
        if (wasInvisible && willBeStaging && crossesSides) {
          gsap.set(slide, getSlideProps(nextOffset > 0 ? 3 : -3));
        }
      });
      activeIndex = normalizedTarget;
      layout(true, previousIndex);
      gsap.delayedCall(duration + 0.05, function () { isAnimating = false; });
    }
    if (prevButton) prevButton.addEventListener('click', function () { goTo(activeIndex - 1); });
    if (nextButton) nextButton.addEventListener('click', function () { goTo(activeIndex + 1); });
    slides.forEach(function (slide, index) {
      slide.addEventListener('click', function (event) {
        if (index !== activeIndex) {
          event.preventDefault(); // stop the browser's native link navigation
          event.stopPropagation(); // stop the click reaching Barba's document link handler
          goTo(index);
        }
        // active slide: do nothing — the click bubbles to Barba, which runs the page transition
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (event.key === 'ArrowRight') goTo(activeIndex + 1);
    });
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        measure();
        layout(false);
      }, 100);
    });
    measure();
    layout(false);
  }
}

function initNumberOdometer() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const initFlag = 'data-odometer-initialized'
  const activeTweens = new WeakMap()
  // Configuration
  const defaults = {
    duration: 1,
    ease: 'power3.out',
    elementStagger: 0.1,
    digitStagger: 0.04,
    revealDuration: 1,
    revealEase: 'power2.out',
    triggerStart: 'top 80%',
    staggerOrder: 'left',
    digitCycles: 2
  }
  // Scroll-triggered groups
  nextPage.querySelectorAll('[data-odometer-group]').forEach(group => {
    if (group.hasAttribute(initFlag)) return
    group.setAttribute(initFlag, '')
    const elements = Array.from(group.querySelectorAll('[data-odometer-element]'))
    if (!elements.length || prefersReducedMotion) return
    const staggerOrder = group.getAttribute('data-odometer-stagger-order') || defaults
      .staggerOrder
    const triggerStart = group.getAttribute('data-odometer-trigger-start') || defaults
      .triggerStart
    const elementStagger = parseFloat(group.getAttribute('data-odometer-stagger')) || defaults
      .elementStagger
    const elementData = elements.map(el => {
      const originalText = el.textContent.trim()
      const hasExplicitStart = el.hasAttribute('data-odometer-start')
      const startValue = parseFloat(el.getAttribute('data-odometer-start')) || 0
      const duration = parseFloat(el.getAttribute('data-odometer-duration')) || defaults
        .duration
      const step = getLineHeightRatio(el)
      let segments = parseSegments(originalText)
      segments = mapStartDigits(segments, startValue)
      segments = markHiddenSegments(segments, startValue)
      const grow = shouldGrow(el, hasExplicitStart, startValue, segments)
      const { rollers, revealEls } = buildRollerDOM(el, segments, step, grow)
      const fontSize = parseFloat(getComputedStyle(el).fontSize)
      const revealData = revealEls.map(revealEl => {
        const widthEm = revealEl.offsetWidth / fontSize
        gsap.set(revealEl, { width: 0, overflow: 'hidden' })
        return { el: revealEl, widthEm }
      })
      return { el, rollers, duration, step, revealData, originalText }
    })
    const ordered = applyStaggerOrder(elementData, staggerOrder)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: group,
        start: triggerStart,
        once: true
      },
      onComplete() {
        elementData.forEach(({ el, originalText, step }) => {
          cleanupElement(el, originalText)
        })
      }
    })
    ordered.forEach((data, orderIdx) => {
      const { rollers, duration, step, revealData } = data
      const offset = orderIdx * elementStagger
      revealData.forEach(({ el, widthEm }) => {
        tl.to(el, {
          width: widthEm + 'em',
          opacity: 1,
          duration: defaults.revealDuration,
          ease: defaults.revealEase
        }, offset)
      })
      rollers.forEach(({ roller, targetPos }, digitIdx) => {
        const reversedIdx = rollers.length - 1 - digitIdx
        tl.to(roller, {
          y: -targetPos * step + 'em',
          duration,
          ease: defaults.ease,
          force3D: true
        }, offset + reversedIdx * defaults.digitStagger)
      })
    })
  })
  // Programmatic update (optional add-on)
  return function updateOdometer(el, newText, options = {}) {
    const currentText = el.textContent.trim()
    if (currentText === newText) return
    const duration = options.duration || defaults.duration
    const ease = options.ease || defaults.ease
    const step = getLineHeightRatio(el)
    // Kill any running animation and clear its inline style locks
    const existing = activeTweens.get(el)
    if (existing) {
      existing.kill()
      gsap.set(el, { clearProps: 'width,overflow' })
    }
    // Measure current width before rebuilding (in em for responsive scaling)
    const fontSize = parseFloat(getComputedStyle(el).fontSize)
    const oldWidthEm = el.getBoundingClientRect().width / fontSize
    // Parse current text as start, new text as end
    const startSegments = parseSegments(currentText)
    const startDigitsStr = startSegments
      .filter(s => s.type === 'digit')
      .map(s => s.char)
      .join('')
    const startValue = parseInt(startDigitsStr, 10) || 0
    let segments = parseSegments(newText)
    segments = mapStartDigits(segments, startValue)
    segments = markHiddenSegments(segments, startValue)
    const { rollers, revealEls } = buildRollerDOM(el, segments, step, true)
    // Measure new natural width (in em)
    const newWidthEm = el.getBoundingClientRect().width / fontSize
    const widthChanged = Math.abs(oldWidthEm - newWidthEm) > 0.01
    // Lock to old width for smooth transition
    if (widthChanged) {
      gsap.set(el, { width: oldWidthEm + 'em', overflow: 'hidden' })
    }
    const tl = gsap.timeline({
      onComplete() {
        cleanupElement(el, newText)
        activeTweens.delete(el)
      }
    })
    activeTweens.set(el, tl)
    // Animate element width
    if (widthChanged) {
      tl.to(el, {
        width: newWidthEm + 'em',
        duration: defaults.revealDuration,
        ease: defaults.revealEase
      }, 0)
    }
    // Fade in hidden statics
    revealEls.forEach(revealEl => {
      if (revealEl.getAttribute('data-odometer-part') === 'static') {
        tl.to(revealEl, { opacity: 1, duration: 0.2 }, 0)
      }
    })
    // Roll digits
    rollers.forEach(({ roller, targetPos }, digitIdx) => {
      const reversedIdx = rollers.length - 1 - digitIdx
      tl.to(roller, {
        y: -targetPos * step + 'em',
        duration,
        ease,
        force3D: true
      }, reversedIdx * defaults.digitStagger)
    })
  }
  // Helpers
  function getLineHeightRatio(el) {
    const cs = getComputedStyle(el)
    const lh = cs.lineHeight
    if (lh === 'normal') return 1.2
    return parseFloat(lh) / parseFloat(cs.fontSize)
  }

  function parseSegments(text) {
    return [...text].map(char => ({
      type: /\d/.test(char) ? 'digit' : 'static',
      char
    }))
  }

  function mapStartDigits(segments, startValue) {
    const digitSlots = segments.filter(s => s.type === 'digit')
    const padded = String(Math.floor(Math.abs(startValue)))
      .padStart(digitSlots.length, '0')
      .slice(-digitSlots.length)
    let di = 0
    return segments.map(s =>
      s.type === 'digit' ? { ...s, startDigit: parseInt(padded[di++], 10) } :
      s
    )
  }

  function markHiddenSegments(segments, startValue) {
    const totalDigits = segments.filter(s => s.type === 'digit').length
    const absStart = Math.floor(Math.abs(startValue))
    const startDigitCount = absStart === 0 ? 1 : String(absStart).length
    const leadingZeros = Math.max(0, totalDigits - startDigitCount)
    if (leadingZeros === 0) return segments
    let digitsSeen = 0
    let firstDigitSeen = false
    let prevDigitHidden = false
    return segments.map(seg => {
      if (seg.type === 'digit') {
        firstDigitSeen = true
        const hidden = digitsSeen < leadingZeros
        prevDigitHidden = hidden
        digitsSeen++
        return { ...seg, hidden }
      }
      const hidden = firstDigitSeen && prevDigitHidden
      return { ...seg, hidden }
    })
  }

  function shouldGrow(el, hasExplicitStart, startValue, segments) {
    if (el.hasAttribute('data-odometer-grow')) {
      return el.getAttribute('data-odometer-grow') !== 'false'
    }
    if (!hasExplicitStart) return false
    const absStart = Math.floor(Math.abs(startValue))
    const startDigitCount = absStart === 0 ? 1 : String(absStart).length
    const endDigitCount = segments.filter(s => s.type === 'digit').length
    return startDigitCount < endDigitCount
  }

  function buildRollerDOM(el, segments, step, grow) {
    el.innerHTML = ''
    el.style.height = ''
    const rollers = []
    const revealEls = []
    const totalCells = 10 * defaults.digitCycles
    segments.forEach(seg => {
      if (seg.type === 'static') {
        const span = document.createElement('span')
        span.setAttribute('data-odometer-part', 'static')
        span.style.height = step + 'em'
        span.style.lineHeight = step
        span.textContent = seg.char
        el.appendChild(span)
        if (grow && seg.hidden) {
          gsap.set(span, { opacity: 0 })
          revealEls.push(span)
        }
        return
      }
      const mask = document.createElement('span')
      mask.setAttribute('data-odometer-part', 'mask')
      mask.style.height = step + 'em'
      mask.style.lineHeight = step
      const roller = document.createElement('span')
      roller.setAttribute('data-odometer-part', 'roller')
      roller.style.lineHeight = step
      const digits = []
      for (let d = 0; d < totalCells; d++) {
        digits.push(d % 10)
      }
      roller.textContent = digits.join('\n')
      mask.appendChild(roller)
      el.appendChild(mask)
      const startDigit = seg.startDigit || 0
      const isReveal = grow && seg.hidden
      gsap.set(roller, { y: isReveal ? step + 'em' : -startDigit * step + 'em' })
      const endDigit = parseInt(seg.char, 10)
      const targetPos = endDigit > startDigit ? endDigit : 10 + endDigit
      rollers.push({ roller, targetPos })
      if (isReveal) revealEls.push(mask)
    })
    return { rollers, revealEls }
  }

  function cleanupElement(el, originalText) {
    el.style.overflow = ''
    el.style.height = ''
    // Remove rollers, set final digit, clear inline bloat (but preserve width)
    const digits = [...originalText].filter(c => /\d/.test(c))
    let di = 0
    el.querySelectorAll('[data-odometer-part="mask"]').forEach(mask => {
      const roller = mask.querySelector('[data-odometer-part="roller"]')
      if (roller) roller.remove()
      mask.textContent = digits[di++] || ''
      mask.style.opacity = ''
      mask.style.overflow = ''
    })
    el.querySelectorAll('[data-odometer-part="static"]').forEach(stat => {
      stat.style.opacity = ''
    })
  }

  function recalcOnResize() {
    document.querySelectorAll('[data-odometer-element]').forEach(el => {
      // Force-complete any running programmatic animation
      const running = activeTweens.get(el)
      if (running) {
        running.progress(1)
        activeTweens.delete(el)
      }
      const hasRollers = el.querySelector('[data-odometer-part="roller"]')
      if (hasRollers) {
        // Pre-triggered: recalculate step-based inline styles
        const step = getLineHeightRatio(el)
        el.querySelectorAll('[data-odometer-part="mask"]').forEach(mask => {
          mask.style.height = step + 'em'
          mask.style.lineHeight = step
        })
        el.querySelectorAll('[data-odometer-part="roller"]').forEach(roller => {
          roller.style.lineHeight = step
        })
        el.querySelectorAll('[data-odometer-part="static"]').forEach(stat => {
          stat.style.lineHeight = step
        })
      }
      // Completed elements: width is em-based, scales automatically, don't touch
    })
    ScrollTrigger.refresh()
  }
  let resizeTimer
  let lastWidth = window.innerWidth
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      recalcOnResize()
    }, 250)
  })

  function applyStaggerOrder(items, order) {
    const arr = [...items]
    if (order === 'right') return arr.reverse()
    if (order === 'random') return shuffleArray(arr)
    return arr
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }
}

function initAccordionCSS() {
  nextPage.querySelectorAll('[data-accordion-css-init]').forEach((accordion) => {
    const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';
    accordion.addEventListener('click', (event) => {
      const toggle = event.target.closest('[data-accordion-toggle]');
      if (!toggle) return; // Exit if the clicked element is not a toggle
      const singleAccordion = toggle.closest('[data-accordion-status]');
      if (!singleAccordion) return; // Exit if no accordion container is found
      const isActive = singleAccordion.getAttribute('data-accordion-status') === 'active';
      singleAccordion.setAttribute('data-accordion-status', isActive ? 'not-active' :
        'active');
      // When [data-accordion-close-siblings="true"]
      if (closeSiblings && !isActive) {
        accordion.querySelectorAll('[data-accordion-status="active"]').forEach((
          sibling) => {
          if (sibling !== singleAccordion) sibling.setAttribute('data-accordion-status',
            'not-active');
        });
      }
    });
  });
}

function initCursorMarqueeEffect() {
  const hoverOutDelay = 0.4;
  const followDuration = 0.4;
  const speedMultiplier = 5;
  const cursor = document.querySelector('[data-cursor-marquee-status]');
  if (!cursor) return;
  const targets = cursor.querySelectorAll('[data-cursor-marquee-text-target]');
  const xTo = gsap.quickTo(cursor, 'x', { duration: followDuration, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: followDuration, ease: 'power3' });
  let pauseTimeout = null;
  let activeEl = null;
  let lastX = 0;
  let lastY = 0;

  function playFor(el) {
    if (!el) return;
    if (pauseTimeout) clearTimeout(pauseTimeout);
    const text = el.getAttribute('data-cursor-marquee-text') || '';
    const sec = (text.length || 1) / speedMultiplier;
    targets.forEach(t => {
      t.textContent = text;
      t.style.animationPlayState = 'running';
      t.style.animationDuration = sec + 's';
    });
    cursor.setAttribute('data-cursor-marquee-status', 'active');
    activeEl = el;
  }

  function pauseLater() {
    cursor.setAttribute('data-cursor-marquee-status', 'not-active');
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      targets.forEach(t => {
        t.style.animationPlayState = 'paused';
      });
    }, hoverOutDelay * 1000);
    activeEl = null;
  }

  function checkTarget() {
    const el = document.elementFromPoint(lastX, lastY);
    let hit = el && el.closest('[data-cursor-marquee-text]');
    // Only fire on the active (center) slide: if the marquee target sits inside a slider
    // slide that isn't active, ignore it. Targets without a [data-status] ancestor
    // (i.e. non-slider marquee triggers) still fire normally anywhere.
    if (hit) {
      const slide = hit.closest('[data-status]');
      if (slide && slide.getAttribute('data-status') !== 'active') hit = null;
    }
    if (hit !== activeEl) {
      if (activeEl) pauseLater();
      if (hit) playFor(hit);
    }
  }
  window.addEventListener('pointermove', e => {
    lastX = e.clientX;
    lastY = e.clientY;
    xTo(lastX);
    yTo(lastY);
    checkTarget();
  }, { passive: true });
  window.addEventListener('scroll', () => {
    xTo(lastX);
    yTo(lastY);
    checkTarget();
  }, { passive: true });
  setTimeout(() => {
    cursor.setAttribute('data-cursor-marquee-status', 'not-active');
  }, 500);
}

function initStickyFeatures(root) {
  const wraps = Array.from((root || document).querySelectorAll("[data-sticky-feature-wrap]"));
  if (!wraps.length) return;

  wraps.forEach(w => {
    const visualWraps = Array.from(w.querySelectorAll("[data-sticky-feature-visual-wrap]"));
    const items = Array.from(w.querySelectorAll("[data-sticky-feature-item]"));
    const progressBar = w.querySelector("[data-sticky-feature-progress]");

    if (visualWraps.length !== items.length) {
      console.warn("[initStickyFeatures] visualWraps and items count do not match:", {
        visualWraps: visualWraps.length,
        items: items.length,
        wrap: w
      });
    }

    const count = Math.min(visualWraps.length, items.length);
    if (count < 1) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DURATION = rm ? 0.01 : 0.75; // If user prefers reduced motion, reduce duration
    const EASE = "power4.inOut";
    const SCROLL_AMOUNT = 0.9; // % of scroll used for step transitions

    const getTexts = el => Array.from(el.querySelectorAll("[data-sticky-feature-text]"));

    if (visualWraps[0]) gsap.set(visualWraps[0], { clipPath: "inset(0% round 0.75em)" });
    gsap.set(items[0], { autoAlpha: 1 });

    let currentIndex = 0;

    // Transition Function
    function transition(fromIndex, toIndex) {
      if (fromIndex === toIndex) return;
      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

      if (fromIndex < toIndex) {
        tl.to(visualWraps[toIndex], {
          clipPath: "inset(0% round 0.75em)",
          duration: DURATION,
          ease: EASE
        }, 0);
      } else {
        tl.to(visualWraps[fromIndex], {
          clipPath: "inset(50% round 0.75em)",
          duration: DURATION,
          ease: EASE
        }, 0);
      }
      animateOut(items[fromIndex]);
      animateIn(items[toIndex]);
    }

    // Fade out text content items
    function animateOut(itemEl) {
      const texts = getTexts(itemEl);
      gsap.to(texts, {
        autoAlpha: 0,
        y: -30,
        ease: "power4.out",
        duration: 0.4,
        onComplete: () => gsap.set(itemEl, { autoAlpha: 0 })
      });
    }

    // Reveal incoming text content items
    function animateIn(itemEl) {
      const texts = getTexts(itemEl);
      gsap.set(itemEl, { autoAlpha: 1 });
      gsap.fromTo(texts, {
        autoAlpha: 0,
        y: 30
      }, {
        autoAlpha: 1,
        y: 0,
        ease: "power4.out",
        duration: DURATION,
        stagger: 0.1
      });
    }

    const steps = Math.max(1, count - 1);

    ScrollTrigger.create({
      trigger: w,
      start: "center center",
      end: () => `+=${steps * 100}%`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: self => {
        const p = Math.min(self.progress, SCROLL_AMOUNT) / SCROLL_AMOUNT;
        let idx = Math.floor(p * steps + 1e-6);
        idx = Math.max(0, Math.min(steps, idx));

        gsap.to(progressBar, {
          scaleX: p,
          ease: "none"
        })

        if (idx !== currentIndex) {
          transition(currentIndex, idx);
          currentIndex = idx;
        }
      }
    });
  });
}

function initStepByStepTimeline() {
  const root = document.querySelector("[data-step-timeline-init]");
  if (!root) return;

  const line = root.querySelector("[data-step-timeline-line]");
  const fill = root.querySelector("[data-step-timeline-fill]");
  const items = Array.from(root.querySelectorAll("[data-step-timeline-item]"));
  if (!line || !fill || !items.length) return;

  const anchors = items.map(
    (item) => item.querySelector("[data-step-timeline-marker]") || item
  );

  const activationInput = parseFloat(root.dataset.stepTimelineActivation);
  const activation = Number.isNaN(activationInput) ?
    0.5 :
    Math.min(Math.max(activationInput, 0), 1);
  const activationPercent = activation * 100;
  const lastIndex = items.length - 1;

  let anchorFractions = [0];

  function measureLine() {
    if (items.length < 2) {
      line.style.height = "0px";
      anchorFractions = [0];
      return;
    }
    const base = line.parentElement.getBoundingClientRect().top;
    const centers = anchors.map((anchor) => {
      const box = anchor.getBoundingClientRect();
      return box.top + box.height / 2 - base;
    });
    const firstCenter = centers[0];
    const span = centers[lastIndex] - firstCenter;
    line.style.top = firstCenter + "px";
    line.style.height = span + "px";
    anchorFractions = centers.map((center) =>
      span > 0 ? (center - firstCenter) / span : 0
    );
  }

  let currentIndex = -2;

  function setCurrentIndex(index) {
    if (index === currentIndex) return;
    currentIndex = index;
    items.forEach((item, i) => {
      const status = index >= 0 && i <= index ? "active" : "inactive";
      if (item.getAttribute("data-status") !== status) {
        item.setAttribute("data-status", status);
      }
      item.toggleAttribute("data-current", i === index);
      item.toggleAttribute("data-previous", i === index - 1);
      item.toggleAttribute("data-next", i === index + 1);
    });
  }

  function indexForProgress(reached, progress) {
    if (!reached) return -1;
    let index = 0;
    for (let i = 0; i < anchorFractions.length; i++) {
      if (progress + 0.0001 >= anchorFractions[i]) index = i;
    }
    return index;
  }

  function updateFromScroll(self) {
    const reached = self.isActive || self.progress >= 1;
    setCurrentIndex(indexForProgress(reached, self.progress));
  }

  setCurrentIndex(-1);
  gsap.set(fill, { transformOrigin: "top", scaleY: 0 });

  if (root._stepTimelineMedia) root._stepTimelineMedia.revert();
  const mediaQueries = gsap.matchMedia();
  root._stepTimelineMedia = mediaQueries;

  mediaQueries.add("(prefers-reduced-motion: no-preference)", () => {
    measureLine();
    ScrollTrigger.addEventListener("refreshInit", measureLine);

    if (items.length > 1) {
      gsap.fromTo(
        fill, { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top " + activationPercent + "%",
            end: "bottom " + activationPercent + "%",
            scrub: true,
            onUpdate: updateFromScroll,
            onToggle: updateFromScroll,
            onRefresh: updateFromScroll,
          },
        }
      );
    } else {
      setCurrentIndex(0);
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("load", refresh);
      ScrollTrigger.removeEventListener("refreshInit", measureLine);
    };
  });

  mediaQueries.add("(prefers-reduced-motion: reduce)", () => {
    measureLine();
    gsap.set(fill, { scaleY: 1 });
    setCurrentIndex(lastIndex);
  });
}

function initAdvancedFormValidation() {
  const forms = document.querySelectorAll('[data-form-validate]');

  forms.forEach((formContainer) => {
    const startTime = new Date().getTime();

    const form = formContainer.querySelector('form');
    if (!form) return;

    const validateFields = form.querySelectorAll('[data-validate]');
    const dataSubmit = form.querySelector('[data-submit]');
    if (!dataSubmit) return;

    const realSubmitInput = dataSubmit.querySelector('input[type="submit"]');
    if (!realSubmitInput) return;

    function isSpam() {
      const currentTime = new Date().getTime();
      return currentTime - startTime < 5000;
    }

    // Disable select options with invalid values on page load
    validateFields.forEach(function (fieldGroup) {
      const select = fieldGroup.querySelector('select');
      if (select) {
        const options = select.querySelectorAll('option');
        options.forEach(function (option) {
          if (
            option.value === '' ||
            option.value === 'disabled' ||
            option.value === 'null' ||
            option.value === 'false'
          ) {
            option.setAttribute('disabled', 'disabled');
          }
        });
      }
    });

    function validateAndStartLiveValidationForAll() {
      let allValid = true;
      let firstInvalidField = null;

      validateFields.forEach(function (fieldGroup) {
        const input = fieldGroup.querySelector('input, textarea, select');
        const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
        if (!input && !radioCheckGroup) return;

        if (input) input.__validationStarted = true;
        if (radioCheckGroup) {
          radioCheckGroup.__validationStarted = true;
          const inputs = radioCheckGroup.querySelectorAll(
            'input[type="radio"], input[type="checkbox"]');
          inputs.forEach(function (input) {
            input.__validationStarted = true;
          });
        }

        updateFieldStatus(fieldGroup);

        if (!isValid(fieldGroup)) {
          allValid = false;
          if (!firstInvalidField) {
            firstInvalidField = input || radioCheckGroup.querySelector('input');
          }
        }
      });

      if (!allValid && firstInvalidField) {
        firstInvalidField.focus();
      }

      return allValid;
    }

    function isValid(fieldGroup) {
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
      if (radioCheckGroup) {
        const inputs = radioCheckGroup.querySelectorAll(
          'input[type="radio"], input[type="checkbox"]');
        const checkedInputs = radioCheckGroup.querySelectorAll('input:checked');
        const min = parseInt(radioCheckGroup.getAttribute('min')) || 1;
        const max = parseInt(radioCheckGroup.getAttribute('max')) || inputs.length;
        const checkedCount = checkedInputs.length;

        if (inputs[0].type === 'radio') {
          return checkedCount >= 1;
        } else {
          if (inputs.length === 1) {
            return inputs[0].checked;
          } else {
            return checkedCount >= min && checkedCount <= max;
          }
        }
      } else {
        const input = fieldGroup.querySelector('input, textarea, select');
        if (!input) return false;

        let valid = true;
        const min = parseInt(input.getAttribute('min')) || 0;
        const max = parseInt(input.getAttribute('max')) || Infinity;
        const value = input.value.trim();
        const length = value.length;

        if (input.tagName.toLowerCase() === 'select') {
          if (
            value === '' ||
            value === 'disabled' ||
            value === 'null' ||
            value === 'false'
          ) {
            valid = false;
          }
        } else if (input.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          valid = emailPattern.test(value);
        } else {
          if (input.hasAttribute('min') && length < min) valid = false;
          if (input.hasAttribute('max') && length > max) valid = false;
        }

        return valid;
      }
    }

    function updateFieldStatus(fieldGroup) {
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');
      if (radioCheckGroup) {
        const inputs = radioCheckGroup.querySelectorAll(
          'input[type="radio"], input[type="checkbox"]');
        const checkedInputs = radioCheckGroup.querySelectorAll('input:checked');

        if (checkedInputs.length > 0) {
          fieldGroup.classList.add('is--filled');
        } else {
          fieldGroup.classList.remove('is--filled');
        }

        const valid = isValid(fieldGroup);

        if (valid) {
          fieldGroup.classList.add('is--success');
          fieldGroup.classList.remove('is--error');
        } else {
          fieldGroup.classList.remove('is--success');
          const anyInputValidationStarted = Array.from(inputs).some(input => input
            .__validationStarted);
          if (anyInputValidationStarted) {
            fieldGroup.classList.add('is--error');
          } else {
            fieldGroup.classList.remove('is--error');
          }
        }
      } else {
        const input = fieldGroup.querySelector('input, textarea, select');
        if (!input) return;

        const value = input.value.trim();

        if (value) {
          fieldGroup.classList.add('is--filled');
        } else {
          fieldGroup.classList.remove('is--filled');
        }

        const valid = isValid(fieldGroup);

        if (valid) {
          fieldGroup.classList.add('is--success');
          fieldGroup.classList.remove('is--error');
        } else {
          fieldGroup.classList.remove('is--success');
          if (input.__validationStarted) {
            fieldGroup.classList.add('is--error');
          } else {
            fieldGroup.classList.remove('is--error');
          }
        }
      }
    }

    validateFields.forEach(function (fieldGroup) {
      const input = fieldGroup.querySelector('input, textarea, select');
      const radioCheckGroup = fieldGroup.querySelector('[data-radiocheck-group]');

      if (radioCheckGroup) {
        const inputs = radioCheckGroup.querySelectorAll(
          'input[type="radio"], input[type="checkbox"]');
        inputs.forEach(function (input) {
          input.__validationStarted = false;

          input.addEventListener('change', function () {
            requestAnimationFrame(function () {
              if (!input.__validationStarted) {
                const checkedCount = radioCheckGroup.querySelectorAll(
                  'input:checked').length;
                const min = parseInt(radioCheckGroup.getAttribute('min')) || 1;

                if (checkedCount >= min) {
                  input.__validationStarted = true;
                }
              }

              if (input.__validationStarted) {
                updateFieldStatus(fieldGroup);
              }
            });
          });

          input.addEventListener('blur', function () {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        });
      } else if (input) {
        input.__validationStarted = false;

        if (input.tagName.toLowerCase() === 'select') {
          input.addEventListener('change', function () {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        } else {
          input.addEventListener('input', function () {
            const value = input.value.trim();
            const length = value.length;
            const min = parseInt(input.getAttribute('min')) || 0;
            const max = parseInt(input.getAttribute('max')) || Infinity;

            if (!input.__validationStarted) {
              if (input.type === 'email') {
                if (isValid(fieldGroup)) input.__validationStarted = true;
              } else {
                if (
                  (input.hasAttribute('min') && length >= min) ||
                  (input.hasAttribute('max') && length <= max)
                ) {
                  input.__validationStarted = true;
                }
              }
            }

            if (input.__validationStarted) {
              updateFieldStatus(fieldGroup);
            }
          });

          input.addEventListener('blur', function () {
            input.__validationStarted = true;
            updateFieldStatus(fieldGroup);
          });
        }
      }
    });

    dataSubmit.addEventListener('click', function () {
      if (validateAndStartLiveValidationForAll()) {
        if (isSpam()) {
          alert('Form submitted too quickly. Please try again.');
          return;
        }
        realSubmitInput.click();
      }
    });

    form.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
        if (validateAndStartLiveValidationForAll()) {
          if (isSpam()) {
            alert('Form submitted too quickly. Please try again.');
            return;
          }
          realSubmitInput.click();
        }
      }
    });
  });
}

// function initTabTitleSwitch() {
//   let storedTitle = document.title;
//   let animationTimer = null;

//   // Build the bounce frames: light block sweeps right, then back to the start
//   const width = 6;
//   const frameMs = 180; // speed per frame (lower = faster)
//   function buildFrame(pos) {
//     let s = "";
//     for (let i = 0; i < width; i++) s += i === pos ? "◽" : "◾";
//     return s;
//   }
//   const frames = [];
//   for (let i = 0; i < width; i++) frames.push(buildFrame(i));
//   for (let i = width - 2; i > 0; i--) frames.push(buildFrame(i)); // bounce back

//   function startAnimation() {
//     stopAnimation();
//     let frame = 0;
//     animationTimer = setInterval(() => {
//       document.title = frames[frame];
//       frame = (frame + 1) % frames.length;
//     }, frameMs);
//   }

//   function stopAnimation() {
//     if (animationTimer) clearInterval(animationTimer);
//     animationTimer = null;
//   }

//   window.addEventListener("focus", () => {
//     stopAnimation();
//     document.title = storedTitle;
//   });
//   window.addEventListener("blur", () => {
//     storedTitle = document.title; // re-read so it matches the current page, not the first one
//     startAnimation();
//   });
// }
function initTabTitleSwitch() {
  let storedTitle = document.title;
  let animationTimer = null;

  const word = "echo";
  const width = 7; // track width in characters — lower this if the tab truncates
  const frameMs = 140; // speed per frame (lower = faster)

  // Word slides right-to-left across a track of blocks,
  // eroding at the left edge: echo → cho → ho → o
  function buildFrame(pos) {
    const cells = new Array(width).fill("◾");
    for (let i = 0; i < word.length; i++) {
      const c = pos + i;
      if (c >= 0 && c < width) cells[c] = word[i];
    }
    return cells.join("");
  }

  const frames = [];
  for (let pos = width; pos >= -word.length; pos--) frames.push(buildFrame(pos));

  function startAnimation() {
    if (reducedMotion) return;
    stopAnimation();
    let frame = 0;
    animationTimer = setInterval(() => {
      document.title = frames[frame];
      frame = (frame + 1) % frames.length;
    }, frameMs);
  }

  function stopAnimation() {
    if (animationTimer) clearInterval(animationTimer);
    animationTimer = null;
  }

  window.addEventListener("focus", () => {
    stopAnimation();
    document.title = storedTitle;
  });
  window.addEventListener("blur", () => {
    storedTitle = document.title; // re-read so it matches the current page
    startAnimation();
  });
}

function initCollageFocusCardOnHover() {
  const activeScale = 1.075;
  const inactiveScale = 0.9;
  const gapPercent = 3;
  const secondCardBoost = 1.35;
  const centerPullPercent = 25;
  const duration = 0.8;
  const ease = "move";

  document.querySelectorAll('[data-interactive-collage-init]').forEach(root => {
    root._interactiveCollageAbort?.abort();

    const list = root.querySelector('[data-interactive-collage-list]');
    const items = [...root.querySelectorAll('[data-interactive-collage-item]')];
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!list || !items.length) return;

    const controller = new AbortController();
    const { signal } = controller;
    let activeItem = null;
    const getInner = item => item.querySelector('[data-interactive-collage-item-inner]');

    const getMoveStrength = distance => {
      const strength = 1 / (1 + Math.pow(distance - 1, 1.2) * 0.45);
      return distance === 2 ? strength * secondCardBoost : strength;
    };

    const animateItem = (item, xPercent, yPercent, scale) => {
      gsap.to(getInner(item), {
        xPercent,
        yPercent,
        scale,
        duration,
        ease,
        overwrite: true
      });
    };

    const resetCollage = () => {
      activeItem = null;

      items.forEach(item => {
        item.removeAttribute('data-interactive-collage-focus');
        animateItem(item, 0, 0, 1);
      });
    };

    const focusItem = active => {
      if (activeItem === active) return;

      activeItem = active;

      items.forEach(item => {
        if (item === active) {
          item.setAttribute('data-interactive-collage-focus', '');
        } else {
          item.removeAttribute('data-interactive-collage-focus');
        }
      });

      const listRect = list.getBoundingClientRect();
      const listCenterY = listRect.top + listRect.height / 2;
      const gap = listRect.width * gapPercent / 100;

      const orderedItems = [...items].sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();

        return aRect.left + aRect.width / 2 - (bRect.left + bRect.width / 2);
      });

      const activeIndex = orderedItems.indexOf(active);
      const activeRect = active.getBoundingClientRect();
      const activeCenterX = activeRect.left + activeRect.width / 2;
      const activeLeft = activeCenterX - activeRect.width * activeScale / 2;
      const activeRight = activeCenterX + activeRect.width * activeScale / 2;

      const leftItem = orderedItems[activeIndex - 1];
      const rightItem = orderedItems[activeIndex + 1];

      let leftMove = 0;
      let rightMove = 0;

      if (leftItem) {
        const rect = leftItem.getBoundingClientRect();
        const itemRight = rect.left + rect.width / 2 + rect.width * inactiveScale / 2;

        leftMove = Math.min(0, activeLeft - gap - itemRight);
      }

      if (rightItem) {
        const rect = rightItem.getBoundingClientRect();
        const itemLeft = rect.left + rect.width / 2 - rect.width * inactiveScale / 2;

        rightMove = Math.max(0, activeRight + gap - itemLeft);
      }

      orderedItems.forEach((item, index) => {
        if (item === active) {
          animateItem(item, 0, 0, activeScale);
          return;
        }

        const rect = item.getBoundingClientRect();
        const difference = index - activeIndex;
        const distance = Math.abs(difference);
        const strength = getMoveStrength(distance);
        const itemCenterY = rect.top + rect.height / 2;
        const centerProgress = (listCenterY - itemCenterY) / (listRect.height / 2);
        const moveX = difference < 0 ? leftMove * strength : rightMove * strength;
        const scale = inactiveScale - (1 - strength) * 0.12;

        animateItem(item, moveX / rect.width * 100, centerPullPercent * centerProgress *
          strength, scale);
      });
    };

    const getHoveredItem = event => {
      if (activeItem) {
        const rect = getInner(activeItem).getBoundingClientRect();

        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          return activeItem;
        }
      }

      return document.elementFromPoint(event.clientX, event.clientY)?.closest(
        '[data-interactive-collage-item]') || null;
    };

    if (isTouch) {
      items.forEach(item => {
        item.addEventListener('click', event => {
          event.stopPropagation();
          activeItem === item ? resetCollage() : focusItem(item);
        }, { signal });
      });

      document.addEventListener('click', event => {
        if (!root.contains(event.target)) resetCollage();
      }, { signal });
    } else {
      root.addEventListener('pointermove', event => {
        const item = getHoveredItem(event);
        item ? focusItem(item) : resetCollage();
      }, { signal });

      root.addEventListener('pointerleave', resetCollage, { signal });
    }

    root._interactiveCollageAbort = controller;
  });
}

function initMomentumBasedHover() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (reducedMotion) return;

  // Configuration (tweak these for feel)
  const xyMultiplier = 30; // multiplies pointer velocity for x/y movement
  const rotationMultiplier = 20; // multiplies normalized torque for rotation speed
  const inertiaResistance = 200; // higher = stops sooner

  const clampXY = gsap.utils.clamp(-1080, 1080);
  const clampRot = gsap.utils.clamp(-60, 60);

  nextPage.querySelectorAll('[data-momentum-hover-init]').forEach(root => {
    let prevX = 0,
      prevY = 0;
    let velX = 0,
      velY = 0;
    let rafId = null;
    let hasMoved = false; // first sample has no previous point to measure against

    root.addEventListener('mousemove', e => {
      if (rafId) return;
      const { clientX, clientY } = e; // read now — the event is stale inside RAF
      rafId = requestAnimationFrame(() => {
        if (hasMoved) {
          velX = clientX - prevX;
          velY = clientY - prevY;
        }
        prevX = clientX;
        prevY = clientY;
        hasMoved = true;
        rafId = null;
      });
    });

    root.querySelectorAll('[data-momentum-hover-element]').forEach(el => {
      el.addEventListener('mouseenter', e => {
        const target = el.querySelector('[data-momentum-hover-target]');
        if (!target) return;

        const { left, top, width, height } = target.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        const rawTorque = offsetX * velY - offsetY * velX;
        const leverDist = Math.hypot(offsetX, offsetY) || 1;
        const angularForce = rawTorque / leverDist;

        const velocityX = clampXY(velX * xyMultiplier);
        const velocityY = clampXY(velY * xyMultiplier);
        const rotationVelocity = clampRot(angularForce * rotationMultiplier);

        gsap.to(target, {
          inertia: {
            x: { velocity: velocityX, end: 0 },
            y: { velocity: velocityY, end: 0 },
            rotation: { velocity: rotationVelocity, end: 0 },
            resistance: inertiaResistance
          }
        });
      });
    });
  });
}

function initRadialCardsSlider() {
  if (typeof InertiaPlugin === "undefined" || typeof Draggable === "undefined") return;

  const slideDuration = 1;
  const clickEase = 'radial';

  // Barba removes old containers, so their Draggables can't self-kill via the DOM
  radialSliderDraggables.forEach(d => d.kill());
  radialSliderDraggables = [];

  nextPage.querySelectorAll('[data-radial-slider-init]').forEach(container => {
    if (container._radialSliderProxy) gsap.killTweensOf(container._radialSliderProxy);
    if (container._radialSliderProxyEl) container._radialSliderProxyEl.remove();

    const collection = container.querySelector('[data-radial-slider-collection]');
    const track = container.querySelector('[data-radial-slider-list]');
    if (!collection || !track) return;

    container.querySelectorAll('[data-radial-slider-clone]').forEach(el => el.remove());
    const originalItems = Array.from(container.querySelectorAll(
      '[data-radial-slider-item]:not([data-radial-slider-clone])'));
    if (!originalItems.length) return;

    container.setAttribute('role', 'region');
    container.setAttribute('aria-roledescription', 'carousel');
    container.setAttribute('aria-label', container.getAttribute('aria-label') ||
      'Radial Cards Slider');
    track.setAttribute('role', 'group');
    track.setAttribute('aria-label', 'Slides');

    const dotsWrap = container.querySelector('[data-radial-slider-generate-dots]');
    if (dotsWrap) {
      const dots = Array.from(dotsWrap.querySelectorAll('[data-radial-slider-control]'));
      if (dots.length) {
        const firstDot = dots[0];
        dots.slice(1).forEach(dot => dot.remove());
        firstDot.setAttribute('data-radial-slider-control', '1');
        firstDot.setAttribute('data-radial-slider-control-status', 'not-active');
        for (let i = 2; i <= originalItems.length; i++) {
          const dot = firstDot.cloneNode(true);
          dot.setAttribute('data-radial-slider-control', String(i));
          dot.setAttribute('data-radial-slider-control-status', 'not-active');
          dotsWrap.appendChild(dot);
        }
      }
    }

    const controls = Array.from(container.querySelectorAll('[data-radial-slider-control]'));
    const totalEl = container.querySelector('[data-radial-slider-total-slide]');
    const indicators = Array.from(container.querySelectorAll(
      '[data-radial-slider-active-slide]'));

    originalItems.forEach((item, index) => {
      item.removeAttribute('data-radial-slider-item-status');
      item.removeAttribute('aria-hidden');
      item.setAttribute('role', 'group');
      item.setAttribute('aria-label', `Slide ${index + 1} of ${originalItems.length}`);
    });

    controls.forEach(btn => {
      const value = btn.getAttribute('data-radial-slider-control');
      if (value === 'prev') btn.setAttribute('aria-label', 'Previous slide');
      if (value === 'next') btn.setAttribute('aria-label', 'Next slide');
      if (/^\d+$/.test(value)) {
        btn.setAttribute('aria-label', `Go to slide ${value}`);
        btn.setAttribute('aria-current', 'false');
      }
    });

    track.style.height = '';

    const setNumber = (el, value) => {
      if (!el) return;
      el.textContent = value < 10 ? '0' + value : String(value);
    };
    const mod = (value, total) => ((value % total) + total) % total;

    setNumber(totalEl, originalItems.length);

    const containerStyles = getComputedStyle(container);
    const rotateStep = Math.abs(parseFloat(containerStyles.getPropertyValue(
      '--slider-rotate'))) || 18;
    const maxLoopItems = Math.max(1, Math.floor(360 / rotateStep));
    const firstRect = originalItems[0].getBoundingClientRect();
    const itemWidth = firstRect.width;
    const itemHeight = firstRect.height;
    const originParts = getComputedStyle(originalItems[0]).transformOrigin.split(' ');
    const originY = parseFloat(originParts[1]) || itemHeight * 3.75;
    const wheelRadius = Math.max(0, originY - itemHeight / 2);
    const proxyRadius = wheelRadius + Math.max(itemWidth, itemHeight) * 0.525;

    const getBoundsAtAngle = angle => {
      const rad = angle * Math.PI / 180;
      return {
        x: Math.sin(rad) * wheelRadius,
        y: originY - Math.cos(rad) * wheelRadius,
        halfWidth: Math.abs(Math.cos(rad)) * itemWidth / 2 + Math.abs(Math.sin(rad)) *
          itemHeight / 2,
        halfHeight: Math.abs(Math.sin(rad)) * itemWidth / 2 + Math.abs(Math.cos(rad)) *
          itemHeight / 2
      };
    };

    const isOffsetInsideContainer = offset => {
      const containerRect = container.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const originX = trackRect.left + trackRect.width / 2;
      const originYTop = trackRect.top;
      const leftLimit = containerRect.left - originX;
      const rightLimit = containerRect.right - originX;
      const topLimit = containerRect.top - originYTop;
      const bottomLimit = containerRect.bottom - originYTop;
      const bounds = getBoundsAtAngle(offset * rotateStep);
      const cardLeft = bounds.x - bounds.halfWidth;
      const cardRight = bounds.x + bounds.halfWidth;
      const cardTop = bounds.y - bounds.halfHeight;
      const cardBottom = bounds.y + bounds.halfHeight;
      return cardRight >= leftLimit && cardLeft <= rightLimit && cardBottom >= topLimit &&
        cardTop <= bottomLimit;
    };

    const getVisibleOffsets = () => {
      const offsets = [0];
      const maxSide = Math.ceil(maxLoopItems / 2);
      let leftEdge = 0;
      let rightEdge = 0;
      for (let i = 1; i <= maxSide; i++) {
        if (!isOffsetInsideContainer(i)) break;
        offsets.push(i);
        rightEdge = i;
      }
      for (let i = 1; i <= maxSide; i++) {
        if (!isOffsetInsideContainer(-i)) break;
        offsets.unshift(-i);
        leftEdge = -i;
      }
      const nextLeft = leftEdge - 1;
      const nextRight = rightEdge + 1;
      if (Math.abs(nextLeft) <= maxSide) offsets.unshift(nextLeft);
      if (Math.abs(nextRight) <= maxSide) offsets.push(nextRight);
      return offsets;
    };

    const visibleOffsets = getVisibleOffsets();
    const minItemsNeeded = Math.min(maxLoopItems, Math.max(originalItems.length, visibleOffsets
      .length));
    const neededItems = Math.ceil(minItemsNeeded / originalItems.length) * originalItems.length;
    const currentItems = Array.from(container.querySelectorAll(
      '[data-radial-slider-item]:not([data-radial-slider-clone])'));

    for (let i = currentItems.length; i < neededItems; i++) {
      const clone = currentItems[i % currentItems.length].cloneNode(true);
      clone.setAttribute('data-radial-slider-clone', '');
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }

    const items = Array.from(track.querySelectorAll(':scope > [data-radial-slider-item]'));
    const totalItems = items.length;

    track.style.height = itemHeight + 'px';
    items.forEach(item => item.setAttribute('data-radial-slider-item-status', 'not-active'));
    container.setAttribute('data-radial-slider-drag-status', 'grab');

    const containerRect = container.getBoundingClientRect();
    const collectionRect = collection.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();

    const proxyWrap = document.createElement('div');
    proxyWrap.setAttribute('data-radial-slider-proxy-wrap', '');
    Object.assign(proxyWrap.style, {
      position: 'absolute',
      left: containerRect.left - collectionRect.left + 'px',
      top: containerRect.top - collectionRect.top + 'px',
      width: containerRect.width + 'px',
      height: containerRect.height + 'px',
      overflow: 'hidden',
      pointerEvents: 'none'
    });

    const proxy = document.createElement('div');
    proxy.setAttribute('data-radial-slider-proxy', '');
    Object.assign(proxy.style, {
      position: 'absolute',
      width: proxyRadius * 2 + 'px',
      height: proxyRadius * 2 + 'px',
      left: trackRect.left + trackRect.width / 2 - containerRect.left + 'px',
      top: trackRect.top - containerRect.top + originY - proxyRadius + 'px',
      transform: 'translateX(-50%)',
      borderRadius: '50%',
      pointerEvents: 'auto',
      opacity: '0'
    });

    proxyWrap.appendChild(proxy);
    collection.appendChild(proxyWrap);
    container._radialSliderProxy = proxy;
    container._radialSliderProxyEl = proxyWrap;

    const setRotation = items.map(item => gsap.quickSetter(item, 'rotation', 'deg'));
    gsap.set(proxy, { rotation: 0 });

    const getIndexFromProxy = () => -gsap.getProperty(proxy, 'rotation') / rotateStep;

    const nearestDelta = (index, realIndex, total) => {
      const loop = Math.round((realIndex - index) / total);
      return index - (realIndex - loop * total);
    };

    const nearestDeltaToSlideNumber = (targetNumber, realIndex) => {
      let bestDelta = 0;
      let bestDistance = Infinity;
      items.forEach((item, index) => {
        const slideNumber = index % originalItems.length;
        if (slideNumber !== targetNumber) return;
        const delta = nearestDelta(index, realIndex, totalItems);
        const distance = Math.abs(delta);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestDelta = delta;
        }
      });
      return bestDelta;
    };

    let lastActiveIndex = null;

    const setIndicator = index => {
      const value = index + 1;
      const text = value < 10 ? '0' + value : String(value);
      indicators.forEach(el => { el.textContent = text; });
    };

    const updateControlStatus = activeIndex => {
      controls.forEach(btn => {
        const value = btn.getAttribute('data-radial-slider-control');
        if (!/^\d+$/.test(value)) return;
        const index = Math.max(0, Math.min(originalItems.length - 1, parseInt(value, 10) -
          1));
        const isActive = index === activeIndex;
        btn.setAttribute('data-radial-slider-control-status', isActive ? 'active' :
          'not-active');
        btn.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    };

    const updateActiveUI = activeIndex => {
      if (activeIndex === lastActiveIndex) return;
      setIndicator(activeIndex);
      updateControlStatus(activeIndex);
      lastActiveIndex = activeIndex;
    };

    const render = () => {
      const realIndex = getIndexFromProxy();
      const activeIndex = mod(Math.round(realIndex), totalItems);
      const activeSlideIndex = activeIndex % originalItems.length;
      items.forEach((item, index) => {
        const rotation = nearestDelta(index, realIndex, totalItems) * rotateStep;
        item.setAttribute('data-radial-slider-item-status', index === activeIndex ?
          'active' : 'inview');
        setRotation[index](rotation);
      });
      updateActiveUI(activeSlideIndex);
    };

    controls.forEach(btn => {
      btn.disabled = false;
      const value = btn.getAttribute('data-radial-slider-control');
      if (value === 'next' || value === 'prev') {
        btn.onclick = () => {
          stopAutoplay();
          const currentIndex = getIndexFromProxy();
          const targetIndex = Math.round(currentIndex) + (value === 'next' ? 1 : -1);
          gsap.to(proxy, {
            rotation: -targetIndex * rotateStep,
            duration: slideDuration,
            ease: clickEase,
            onUpdate: render,
            onComplete: queueNext
          });
        };
      }
      if (/^\d+$/.test(value)) {
        const targetSlideNumber = Math.max(0, Math.min(originalItems.length - 1, parseInt(
          value, 10) - 1));
        btn.onclick = () => {
          stopAutoplay();
          const currentIndex = getIndexFromProxy();
          const delta = nearestDeltaToSlideNumber(targetSlideNumber, currentIndex);
          gsap.to(proxy, {
            rotation: -(currentIndex + delta) * rotateStep,
            duration: slideDuration,
            ease: clickEase,
            onUpdate: render,
            onComplete: queueNext
          });
        };
      }
    });

    const draggable = Draggable.create(proxy, {
      type: 'rotation',
      trigger: [proxy, ...items],
      inertia: true,
      throwResistance: 2000,
      dragResistance: 0.05,
      maxDuration: 1,
      minDuration: 0.5,
      edgeResistance: 0.75,
      overshootTolerance: 0,
      snap: value => Math.round(value / rotateStep) * rotateStep,
      onDrag: render,
      onThrowUpdate: render,
      onThrowComplete: () => {
        container.setAttribute('data-radial-slider-drag-status', 'grab');
        render();
      },
      onPress: () => container.setAttribute('data-radial-slider-drag-status', 'grabbing'),
      onDragStart: () => container.setAttribute('data-radial-slider-drag-status',
        'grabbing'),
      onRelease: () => container.setAttribute('data-radial-slider-drag-status', 'grab')
    })[0];

    radialSliderDraggables.push(draggable);
    render();

    // Autoplay — advances one card every 2s, pauses on drag and off-screen
    let autoplayCall = null;
    let isInView = false;

    const advance = () => {
      const targetIndex = Math.round(getIndexFromProxy()) + 1;
      gsap.to(proxy, {
        rotation: -targetIndex * rotateStep,
        duration: slideDuration,
        ease: clickEase,
        onUpdate: render,
        onComplete: queueNext
      });
    };

    function queueNext() {
      if (autoplayCall) autoplayCall.kill();
      autoplayCall = null;
      if (!isInView) return;
      autoplayCall = gsap.delayedCall(2, advance);
    }

    function stopAutoplay() {
      if (autoplayCall) autoplayCall.kill();
      autoplayCall = null;
      gsap.killTweensOf(proxy);
    }

    // Drag interrupts autoplay; it resumes once the throw settles
    draggable.addEventListener("press", stopAutoplay);
    draggable.addEventListener("throwcomplete", queueNext);
    draggable.addEventListener("dragend", () => {
      if (!draggable.isThrowing) queueNext();
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onToggle: self => {
        isInView = self.isActive;
        if (isInView) queueNext();
        else stopAutoplay();
      }
    });

    isInView = ScrollTrigger.isInViewport(container);
    if (isInView) queueNext();
  });

  if (initRadialCardsSlider._resize) {
    window.removeEventListener('resize', initRadialCardsSlider._resize);
  }
  initRadialCardsSlider._resize = debounceOnWidthChange(initRadialCardsSlider, 200);
  window.addEventListener('resize', initRadialCardsSlider._resize);
}

function initSectionCurveOnScroll() {
  if (reducedMotion) return;

  nextPage.querySelectorAll('[data-curve-on-scroll]').forEach(section => {
    const curve = section.querySelector('[data-curve-shape]');
    if (!curve) return;

    gsap.fromTo(curve, { scaleY: 0.2 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=50%',
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });
  });
}

function initCtaCard() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (reducedMotion) return;

  // Feel — tweak here
  const arrowDuration = 1.1;
  const arrowEase = "power3.inOut";
  const boxHoverColor = "#F6642F";
  const imageDuration = 0.8;
  const imageEase = "power2.out";
  const imageScale = 1.05;

  nextPage.querySelectorAll('[data-cta-card]').forEach(card => {
    const tl = gsap.timeline({ paused: true });

    // Arrow: slides out to the right, a copy slides in from the left
    const arrow = card.querySelector('[data-cta-arrow]');
    if (arrow) {
      const box = arrow.parentElement;
      const clone = arrow.cloneNode(true);
      clone.removeAttribute('data-cta-arrow');
      clone.setAttribute('aria-hidden', 'true');
      box.appendChild(clone);

      // Stack both arrows on the same spot inside the box
      gsap.set(box, { display: 'grid', placeItems: 'center', overflow: 'hidden' });
      gsap.set([arrow, clone], { gridArea: '1 / 1' });
      gsap.set(clone, { xPercent: -200 });

      tl.to(arrow, { xPercent: 200, duration: arrowDuration, ease: arrowEase }, 0)
        .to(clone, { xPercent: 0, duration: arrowDuration, ease: arrowEase }, 0)
        .to(box, { backgroundColor: boxHoverColor, duration: 0.4, ease: "power2.out" }, 0);
    }

    // Image: subtle zoom inside its frame
    const image = card.querySelector('[data-cta-image]');
    if (image) {
      tl.to(image, { scale: imageScale, duration: imageDuration, ease: imageEase }, 0);
    }

    // Add more effects for this section here, at position 0 in the timeline

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());
  });
}

//test collective

function init3dPerspectiveTiles() {
  document.querySelectorAll("[data-perspective-tiles-init]").forEach((container) => {
    const collection = container.querySelector("[data-perspective-tiles-collection]");
    const list = container.querySelector("[data-perspective-tiles-list]");
    const tiles = [...container.querySelectorAll("[data-perspective-tiles-item]")];
    const tileCount = tiles.length;
    if (!collection || !list || tileCount < 2) return;

    const gapPercent = 0.45;
    const perspectiveMultiplier = 4;
    const blurMultiplier = 0.005;
    const minOpacity = 1;
    const minDarkness = 0.75;

    const maxTiltX = 8;
    const maxTiltY = 8;
    const tiltMoveDuration = 0.6;

    const moveDuration = 2.5;
    const pauseDuration = 0;
    const staggerAmount = moveDuration * 0.005;

    const tiltEnabled = container.getAttribute("data-perspective-tiles-tilt") === "true";
    const pauseOnHover = container.getAttribute("data-perspective-tiles-pause-hover") ===
      "true";
    const isFlipped = container.getAttribute("data-perspective-tiles-flipped") === "true";
    const direction = isFlipped ? -1 : 1;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const fullCircle = Math.PI * 2;
    const tileStates = tiles.map(() => ({ progress: 0 }));

    let radius = 0;
    let maxBlur = 0;
    let isInView = false;
    let isHoveringActive = false;
    let stepTimeline;
    let delayedCall;
    let activeTileIndex = -1;

    gsap.set(collection, {
      transformStyle: "preserve-3d",
      transformOrigin: "50% 50%"
    });

    gsap.set(list, {
      transformStyle: "preserve-3d"
    });

    function updateMeasurements() {
      const tileWidth = tiles[0].offsetWidth;

      radius =
        tileWidth * (1 + gapPercent) /
        (2 * Math.tan(Math.PI / tileCount));

      maxBlur = tileWidth * blurMultiplier;

      gsap.set(collection, {
        transformPerspective: radius * perspectiveMultiplier
      });
    }

    function getActiveIndex() {
      return tileStates.reduce((closest, state, index) => {
        const current =
          ((index - state.progress) % tileCount + tileCount) % tileCount;

        const previous =
          ((closest - tileStates[closest].progress) % tileCount + tileCount) %
          tileCount;

        const currentDistance = Math.min(current, tileCount - current);
        const previousDistance = Math.min(previous, tileCount - previous);

        return currentDistance < previousDistance ? index : closest;
      }, 0);
    }

    function updateTileStatus() {
      const currentActiveIndex = getActiveIndex();
      if (currentActiveIndex === activeTileIndex) return;

      activeTileIndex = currentActiveIndex;

      tiles.forEach((tile, index) => {
        tile.setAttribute("data-perspective-tiles-item-status", index === activeTileIndex ?
          "active" : "not-active");
      });
    }

    function renderPerspectiveTiles() {
      updateTileStatus();

      tiles.forEach((tile, index) => {
        const angle =
          ((index - tileStates[index].progress) / tileCount) *
          fullCircle *
          direction;

        const depth = (Math.cos(angle) + 1) / 2;
        const depthCurve = depth * depth * (3 - 2 * depth);
        const opacity = gsap.utils.interpolate(minOpacity, 1, depthCurve);
        const blur = gsap.utils.interpolate(maxBlur, 0, depthCurve);
        const brightness = gsap.utils.interpolate(minDarkness, 1, depthCurve);

        gsap.set(tile, {
          x: Math.sin(angle) * radius,
          z: Math.cos(angle) * radius,
          rotateY: angle * 180 / Math.PI,
          opacity,
          filter: `blur(${blur}px) brightness(${brightness})`,
          zIndex: Math.round(depth * 1000)
        });
      });
    }

    function waitForNextTile() {
      delayedCall?.kill();

      if (!isInView || (pauseOnHover && isHoveringActive)) return;

      delayedCall = gsap.delayedCall(pauseDuration, goToNextTile);
    }

    function goToNextTile() {
      if (!isInView || (pauseOnHover && isHoveringActive)) return;

      const activeIndex = getActiveIndex();

      const orderedStates = tileStates
        .map((state, index) => ({
          state,
          offset: (index - activeIndex + tileCount) % tileCount
        }))
        .sort((a, b) => a.offset - b.offset);

      stepTimeline = gsap.timeline({
        paused: true,
        onComplete: waitForNextTile
      });

      orderedStates.forEach(({ state }, index) => {
        stepTimeline.to(state, {
          progress: state.progress + 1,
          duration: moveDuration,
          ease: "osmo",
          onUpdate: renderPerspectiveTiles
        }, index * staggerAmount);
      });

      stepTimeline.play();
    }

    if (pauseOnHover && canHover) {
      tiles.forEach((tile) => {
        tile.addEventListener("pointerenter", () => {
          if (tile.getAttribute("data-perspective-tiles-item-status") !== "active")
            return;

          isHoveringActive = true;
          delayedCall?.kill();
        });

        tile.addEventListener("pointerleave", () => {
          if (!isHoveringActive) return;

          isHoveringActive = false;

          if (!stepTimeline || !stepTimeline.isActive()) {
            waitForNextTile();
          }
        });
      });
    }

    if (tiltEnabled && canHover) {
      const tiltX = gsap.quickTo(collection, "rotationX", {
        duration: tiltMoveDuration,
        ease: "power3.out"
      });

      const tiltY = gsap.quickTo(collection, "rotationY", {
        duration: tiltMoveDuration,
        ease: "power3.out"
      });

      container.addEventListener("pointermove", (event) => {
        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        tiltX(-y * maxTiltY * 2);
        tiltY(x * maxTiltX * 2);
      });

      container.addEventListener("pointerleave", () => {
        if (!pauseOnHover) return;

        isHoveringActive = false;

        if (isInView && (!stepTimeline || !stepTimeline.isActive())) {
          waitForNextTile();
        }
      });
    }

    updateMeasurements();
    renderPerspectiveTiles();

    new ResizeObserver(() => {
      updateMeasurements();
      renderPerspectiveTiles();
    }).observe(container);

    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        isInView = self.isActive;

        if (!isInView) {
          delayedCall?.kill();
          return;
        }

        if (!stepTimeline || !stepTimeline.isActive()) {
          waitForNextTile();
        }
      }
    });
  });
}

function initFooterParallax() {
  if (reducedMotion) return;

  nextPage.querySelectorAll('[data-footer-parallax]').forEach(el => {
    const inner = el.querySelector('[data-footer-parallax-inner]');
    const dark = el.querySelector('[data-footer-parallax-dark]');
    if (!inner && !dark) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'clamp(top bottom)',
        end: 'clamp(top top)',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    if (inner) {
      tl.from(inner, {
        yPercent: -25,
        ease: 'none'
      });
    }

    if (dark) {
      tl.from(dark, {
        opacity: 0.5,
        ease: 'none'
      }, '<');
    }
  });
}

function initStickyTitleScroll() {
  const wraps = nextPage.querySelectorAll('[data-sticky-title="wrap"]');
  if (!wraps.length) return;

  wraps.forEach(wrap => {
    const headings = Array.from(wrap.querySelectorAll('[data-sticky-title="heading"]'));
    if (!headings.length) return;

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 40%",
        end: "bottom bottom",
        scrub: true,
      }
    });

    const revealDuration = 0.7,
      fadeOutDuration = 0.7,
      overlapOffset = 0.15;

    headings.forEach((heading, index) => {
      // Save original heading content for screen readers
      heading.setAttribute("aria-label", heading.textContent);

      const split = new SplitText(heading, { type: "words,chars" });

      // Hide all the separate words from screenreader
      split.words.forEach(word => word.setAttribute("aria-hidden", "true"));

      // Reset visibility on the 'stacked' headings
      gsap.set(heading, { visibility: "visible" });

      const headingTl = gsap.timeline();
      headingTl.from(split.chars, {
        autoAlpha: 0,
        stagger: { amount: revealDuration, from: "start" },
        duration: revealDuration
      });

      // Animate fade-out for every heading except the last one.
      if (index < headings.length - 1) {
        headingTl.to(split.chars, {
          autoAlpha: 0,
          stagger: { amount: fadeOutDuration, from: "end" },
          duration: fadeOutDuration
        });
      }

      // Overlap the start of fade-in of the new heading a little bit
      if (index === 0) {
        masterTl.add(headingTl);
      } else {
        masterTl.add(headingTl, `-=${overlapOffset}`);
      }
    });
  });
}

function initHeroWave() {
  const waves = nextPage.querySelectorAll("[data-hero-wave]");
  if (!waves.length) return;

  const W = 1440; // viewBox breedte
  const H = 120; // viewBox hoogte

  // Basisvorm van de rand (y vanaf boven)
  const BASE = [20, 55, 95, 70, 40];

  function buildPath(points, flip) {
    let d = `M${points[0][0]},${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
      d +=
        ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0]},${p2[1].toFixed(1)}`;
    }
    // Normaal: sluit naar onderen (vult onder de curve)
    // Flip: sluit naar boven (vult boven de curve, golf hangt naar beneden)
    d += flip ? ` L${W},0 L0,0 Z` : ` L${W},${H} L0,${H} Z`;
    return d;
  }

  waves.forEach(wave => {
    if (wave.dataset.heroWaveInit) return; // elke golf maar één keer initten
    wave.dataset.heroWaveInit = "true";

    const path = wave.querySelector("[data-wave-path]");
    if (!path) return;

    const amp = parseFloat(wave.getAttribute("data-wave-amp")) || 10;
    const speed = parseFloat(wave.getAttribute("data-wave-speed")) || 0.35;
    const flip = wave.hasAttribute("data-wave-flip");
    const step = W / (BASE.length - 1);

    const phases = BASE.map((_, i) => i * 1.7);
    const rates = BASE.map((_, i) => 1 + (i % 2 ? 0.23 : -0.17));

    function render(time) {
      const points = BASE.map((y, i) => {
        const baseY = flip ? H - y : y; // spiegel de vorm verticaal
        return [
          Math.round(i * step),
          baseY + Math.sin(time * speed * rates[i] + phases[i]) * amp
        ];
      });
      path.setAttribute("d", buildPath(points, flip));
    }

    render(0);
    if (reducedMotion) return;

    let running = false;
    const start = performance.now();

    function tick() {
      if (!running) return;
      render((performance.now() - start) / 1000);
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Barba verwijdert de oude container: dan observer opruimen
        if (!wave.isConnected) {
          running = false;
          observer.disconnect();
          return;
        }
        if (entry.isIntersecting && !running) {
          running = true;
          requestAnimationFrame(tick);
        } else if (!entry.isIntersecting) {
          running = false;
        }
      });
    });
    observer.observe(wave);
  });
}

function initWavyMarquee() {
  document.querySelectorAll('[data-wavy-marquee-init]').forEach((container) => {
    const autoSpeed = 100;
    const viewport = [
      [992, 1, 1],
      [768, 0.75, 1],
      [480, 0.6, 0.75],
      [0, 0.5, 0.75]
    ];
    const scrollSpeed = 0.0075;
    const dragSpeed = 0.5;
    const maxDragSpeed = 75;
    const dragEase = 0.1;
    const waveY = 0.25;
    const waveBoost = 0.01;
    const itemsPerWave = 10;
    const waveTravel = 0.25;

    const getViewport = () => viewport.find(([min]) => innerWidth >= min).slice(1);

    container._wavyMarqueeObserver?.kill();
    container._wavyMarqueeTrigger?.kill();

    if (container._wavyMarqueeTick) gsap.ticker.remove(container._wavyMarqueeTick);
    if (container._wavyMarqueeResize) window.removeEventListener('resize', container
      ._wavyMarqueeResize);

    const list = container.querySelector('[data-wavy-marquee-list]');
    if (!list) return;

    const originals = [...list.querySelectorAll('[data-wavy-marquee-item]')].map((item) => item
      .cloneNode(true));
    if (!originals.length) return;

    const baseDirection = container.dataset.wavyMarqueeDirection === 'flipped' ? 1 : -1;
    const setX = gsap.quickSetter(list, 'x', 'px');
    const fullCircle = Math.PI * 2;

    let items = [];
    let loopWidth = 0,
      waveLength = 0,
      averageWidth = 1,
      travel = 0,
      pausePadding = 0;
    let speed = 1,
      targetSpeed = 1,
      direction = baseDirection;
    let isActive = false,
      isDragging = false;
    let [speedScale, waveScale] = getViewport();

    function addBatch() {
      const fragment = document.createDocumentFragment();
      originals.forEach((item) => fragment.appendChild(item.cloneNode(true)));
      list.appendChild(fragment);
    }

    function buildLoop() {
      list.innerHTML = '';

      addBatch();
      addBatch();

      const firstItems = [...list.querySelectorAll('[data-wavy-marquee-item]')];
      loopWidth = firstItems[originals.length].offsetLeft - firstItems[0].offsetLeft;

      for (let i = 2; i < Math.max(2, Math.ceil(container.offsetWidth / loopWidth) + 1); i++) {
        addBatch();
      }

      items = [...list.querySelectorAll('[data-wavy-marquee-item]')];

      const originalItems = firstItems.slice(0, originals.length);
      averageWidth = originalItems.reduce((sum, item) => sum + item.offsetWidth, 0) / originals
        .length;
      waveLength = Math.max(container.offsetWidth, averageWidth * itemsPerWave) * waveScale;

      let maxHeight = 0;

      for (const item of items) {
        item._x = item.offsetLeft;
        item._width = item.offsetWidth;
        item._height = item.offsetHeight;
        item._setY = gsap.quickSetter(item, 'y', 'px');
        maxHeight = Math.max(maxHeight, item._height);
      }

      pausePadding = maxHeight * (Math.abs(waveY) + 1);
      render();
    }

    function render() {
      if (!loopWidth || !waveLength) return;

      const x = gsap.utils.wrap(-loopWidth, 0, travel);
      const dynamicWaveY = waveY + (speed - 1) * waveBoost;
      const phaseTravel = travel / waveLength * fullCircle * waveTravel;
      const containerWidth = container.offsetWidth;

      setX(x);

      for (const item of items) {
        const itemX = item._x + x;
        if (itemX + item._width < 0 || itemX > containerWidth) continue;

        const phase = itemX / waveLength * fullCircle + phaseTravel;
        item._setY(Math.sin(phase) * item._height * dynamicWaveY);
      }
    }

    function tick(_, deltaTime) {
      if (!isActive || !loopWidth) return;

      speed += ((targetSpeed !== 1 ? targetSpeed : 1) - speed) * dragEase;
      if (targetSpeed !== 1) targetSpeed += (1 - targetSpeed) * dragEase;

      travel += autoSpeed * speedScale * speed * direction * deltaTime / 1000;
      render();
    }

    container._wavyMarqueeObserver = Observer.create({
      target: container,
      type: 'touch,pointer',
      lockAxis: true,
      onChangeX: (self) => {
        if (!isActive || !self.deltaX) return;

        isDragging = true;
        container.style.cursor = 'grabbing';
        direction = self.deltaX > 0 ? 1 : -1;

        const dragAmount = Math.abs(self.deltaX) / averageWidth * 100 * dragSpeed;
        targetSpeed = Math.min(1 + dragAmount, maxDragSpeed);
      },
      onRelease: () => {
        isDragging = false;
        container.style.cursor = 'grab';
      }
    });

    container._wavyMarqueeTrigger = ScrollTrigger.create({
      trigger: container,
      start: () => `top-=${pausePadding}px bottom`,
      end: () => `bottom+=${pausePadding}px top`,
      invalidateOnRefresh: true,
      onToggle: (self) => isActive = self.isActive,
      onUpdate: (self) => {
        if (isDragging) return;

        direction = self.direction === 1 ? -baseDirection : baseDirection;
        speed = 1 + Math.abs(self.getVelocity()) * scrollSpeed;
      }
    });

    buildLoop();

    isActive = ScrollTrigger.isInViewport(container);
    container._wavyMarqueeTick = tick;
    gsap.ticker.add(tick);

    container._wavyMarqueeResize = debounceOnWidthChange(() => {
      [speedScale, waveScale] = getViewport();
      buildLoop();
      ScrollTrigger.refresh();
    }, 150);

    window.addEventListener('resize', container._wavyMarqueeResize);
  });
}

function debounceOnWidthChange(fn, ms) {
  let last = innerWidth,
    timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (innerWidth !== last) {
        last = innerWidth;
        fn.apply(this, args);
      }
    }, ms);
  };
}

function initLogoCardTestimonials() {
  document.querySelectorAll("[data-logo-testimonials-init]").forEach((root) => {
    const items = Array.from(root.querySelectorAll("[data-logo-testimonials-item]"));
    if (!items.length) return;

    const dotsWrap = root.querySelector("[data-logo-testimonials-dots]");
    const dotTemplate = dotsWrap.querySelector("[data-logo-testimonials-dot]");
    const autoplaySeconds = parseFloat(root.getAttribute("data-logo-testimonials-autoplay")) ||
      0;

    dotTemplate.remove();

    const slides = items.map((item, index) => {
      const dot = dotTemplate.cloneNode(true);
      dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
      dot.addEventListener("click", () => goTo(index));
      dotsWrap.appendChild(dot);

      return {
        item,
        dot,
        fill: dot.querySelector("[data-logo-testimonials-dot-fill]"),
        logo: item.querySelector("[data-logo-testimonials-logo]"),
        splits: Array.from(item.querySelectorAll("[data-logo-testimonials-split]")).map((
            element) =>
          SplitText.create(element, {
            type: "lines",
            autoSplit: true,
          })
        ),
        getLines() {
          return this.splits.flatMap((split) => split.lines);
        },
      };
    });

    let activeIndex = 0;
    let transition = null;
    let timer = null;
    let isInView = false;
    let isHeld = false;
    let reduceMotion = false;

    function setStatus(slide, status) {
      const isActive = status === "active";
      slide.item.setAttribute("data-logo-testimonials-status", status);
      slide.item.setAttribute("aria-hidden", String(!isActive));
      slide.dot.setAttribute("data-logo-testimonials-status", isActive ? "active" : "inactive");
      slide.dot.setAttribute("aria-current", String(isActive));
    }

    function startTimer() {
      if (timer) timer.kill();

      const activeFill = slides[activeIndex].fill;

      gsap.set(slides.map((slide) => slide.fill), {
        scaleX: 0,
      });

      if (!autoplaySeconds) {
        gsap.set(activeFill, {
          scaleX: 1,
        });
        return;
      }

      timer = gsap.fromTo(activeFill, {
        scaleX: 0,
      }, {
        scaleX: 1,
        duration: autoplaySeconds,
        ease: "none",
        onComplete: () => goTo((activeIndex + 1) % slides.length),
      });
      updateTimer();
    }

    function updateTimer() {
      if (!timer) return;
      if (isInView && !isHeld) timer.resume();
      else timer.pause();
    }

    function goTo(nextIndex) {
      if (nextIndex === activeIndex) return;
      if (transition) transition.progress(1);

      const outgoing = slides[activeIndex];
      const incoming = slides[nextIndex];
      const outgoingLines = outgoing.getLines();
      const incomingLines = incoming.getLines();

      setStatus(outgoing, "leaving");
      setStatus(incoming, "active");
      activeIndex = nextIndex;
      startTimer();

      transition = gsap.timeline({
        onComplete: () => {
          setStatus(outgoing, "inactive");
          gsap.set([...outgoingLines, ...incomingLines, outgoing.logo, incoming.logo,
            outgoing.item, incoming.item
          ], {
            clearProps: "transform,opacity",
          });
          transition = null;
        },
      });

      if (reduceMotion) {
        transition
          .to(outgoing.item, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          }, 0)
          .fromTo(incoming.item, {
            opacity: 0,
          }, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }, 0);
        return;
      }

      transition
        .to(outgoingLines, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: {
            amount: 0.1,
          },
        }, 0)
        .fromTo(incomingLines, {
          opacity: 0,
          yPercent: 40,
        }, {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            amount: 0.3,
          },
        }, 0.35)
        .to(outgoing.logo, {
          yPercent: -110,
          duration: 0.6,
          ease: "power4.inOut",
        }, 0)
        .fromTo(incoming.logo, {
          yPercent: 110,
        }, {
          yPercent: 0,
          duration: 0.7,
          ease: "power4.inOut",
        }, 0.15);
    }

    function onHold() {
      isHeld = true;
      updateTimer();
    }

    function onRelease(event) {
      if (event.type === "focusout" && root.contains(event.relatedTarget)) return;
      isHeld = false;
      updateTimer();
    }

    root.addEventListener("pointerenter", onHold);
    root.addEventListener("pointerleave", onRelease);
    root.addEventListener("focusin", onHold);
    root.addEventListener("focusout", onRelease);

    new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      updateTimer();
    }).observe(root);

    gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
      reduceMotion = true;
      return () => {
        reduceMotion = false;
      };
    });

    slides.forEach((slide, index) => setStatus(slide, index === activeIndex ? "active" :
      "inactive"));
    startTimer();
  });
}

function initDragGallery() {
  nextPage.querySelectorAll('[data-drag-gallery]').forEach((gallery) => {
    const track = gallery.querySelector('[data-drag-gallery-track]');
    const items = [...gallery.querySelectorAll('[data-drag-gallery-item]')];
    if (!track || !items.length) return;

    // Feel — tweak here
    const snapDuration = 0.8;
    const snapEase = "expo.out";

    let minX = 0;
    let snapPoints = [0];

    // Collins ratios: landscape photos 3:2, portrait photos 3:4 — same height, width follows
    function setRatios() {
      items.forEach((item) => {
        const img = item.querySelector('img');
        if (!img || !img.naturalWidth) return;
        item.style.aspectRatio = img.naturalWidth >= img.naturalHeight ? '1.5' : '0.75';
      });
    }

    // Drag limits + the positions where a photo lines up with the page column
    function measure() {
      const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      minX = Math.min(0, gallery.clientWidth - track.offsetWidth);
      snapPoints = items.map((item) => gsap.utils.clamp(minX, 0, -(item.offsetLeft - padLeft)));
      snapPoints.push(minX);
      draggable.applyBounds({ minX, maxX: 0 });
    }

    const closestSnap = (x) => gsap.utils.snap(snapPoints, x);

    const draggable = Draggable.create(track, {
      type: 'x',
      trigger: gallery,
      inertia: true,
      edgeResistance: 0.85,
      cursor: 'grab',
      activeCursor: 'grabbing',
      snap: { x: closestSnap },
    })[0];

    // Trackpad: sideways swipes move the gallery, vertical scroll stays with the page
    let wheelTimer;
    gallery.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      gsap.killTweensOf(track);
      const x = gsap.utils.clamp(minX, 0, gsap.getProperty(track, 'x') - e.deltaX);
      gsap.set(track, { x });
      draggable.update();
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        gsap.to(track, {
          x: closestSnap(gsap.getProperty(track, 'x')),
          duration: snapDuration,
          ease: snapEase,
          onUpdate: () => draggable.update(),
        });
      }, 150);
    }, { passive: false });

    // Load photos right away at the right size, re-measure as they arrive
    items.forEach((item) => {
      const img = item.querySelector('img');
      if (!img) return;
      img.sizes =
        '(min-width: 1245px) 820px, 66vw'; // widest slide = landscape, not full screen
      img.loading = 'eager';
      if (!img.complete) {
        img.addEventListener('load', () => {
          setRatios();
          measure();
        }, { once: true });
      }
    });

    setRatios();
    measure();

    const onResize = debounceOnWidthChange(() => {
      measure();
      gsap.set(track, { x: closestSnap(gsap.getProperty(track, 'x')) });
      draggable.update();
    }, 150);
    window.addEventListener('resize', onResize);

    onPageLeave(() => {
      draggable.kill();
      clearTimeout(wheelTimer);
      window.removeEventListener('resize', onResize);
    });
  });
}

function initBouncyContentTabs() {
  const config = {
    travel: 0.35,
    settle: 0.25,
    squashDown: 0.15,
    squashBack: 0.45,
    overshoot: 16,
    cardSquash: 0.2,
    cardInflate: 0.45,
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let instanceCount = 0;

  document.querySelectorAll("[data-bouncy-tabs-init]").forEach((root) => {
    const nav = root.querySelector("[data-bouncy-tabs-nav]");
    const indicator = root.querySelector("[data-bouncy-tabs-indicator]");
    const ghost = root.querySelector("[data-bouncy-tabs-ghost]");
    const buttons = nav ? Array.from(nav.querySelectorAll("[data-bouncy-tabs-button]")) : [];
    if (!nav || !indicator || buttons.length < 2) return;

    const card = root.querySelector("[data-bouncy-tabs-card]");
    const panelsWrap = root.querySelector("[data-bouncy-tabs-panels]");
    const panels = panelsWrap ?
      Array.from(panelsWrap.querySelectorAll("[data-bouncy-tabs-panel]")) : [];
    const hasCard = Boolean(card && panelsWrap && panels.length);

    instanceCount += 1;
    buttons.forEach((button, i) => {
      const panel = panels[i];
      if (!panel) return;
      if (!button.id) button.id = "bouncy-tabs-" + instanceCount + "-tab-" + (i + 1);
      if (!panel.id) panel.id = "bouncy-tabs-" + instanceCount + "-panel-" + (i + 1);
      button.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", button.id);
    });

    let activeIndex = Math.max(0, buttons.findIndex((b) => b.hasAttribute("data-active")));
    const pos = { left: 0, right: 0 };
    let ghostVisible = false;
    const dur = (d) => (reduceMotion.matches ? 0 : d);

    function syncButtonState() {
      buttons.forEach((b, i) => {
        b.toggleAttribute("data-active", i === activeIndex);
        b.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
        b.tabIndex = i === activeIndex ? 0 : -1;
      });
    }

    function rectFor(button) {
      return {
        left: button.offsetLeft,
        right: button.offsetLeft + button.offsetWidth,
        top: button.offsetTop,
        height: button.offsetHeight,
      };
    }

    function render() {
      gsap.set(indicator, { x: pos.left, width: pos.right - pos.left });
    }

    function place(index) {
      const target = rectFor(buttons[index]);
      pos.left = target.left;
      pos.right = target.right;
      gsap.killTweensOf(pos);
      gsap.killTweensOf(indicator);
      gsap.set(indicator, { scaleY: 1, y: target.top, height: target.height });
      render();
    }

    function setPanelsHeight() {
      if (hasCard) gsap.set(panelsWrap, { height: panels[activeIndex].offsetHeight });
    }

    function swapPanelsInstant() {
      if (!hasCard) return;
      panels.forEach((p, i) => {
        gsap.killTweensOf(p);
        gsap.set(p, { autoAlpha: i === activeIndex ? 1 : 0, x: 0 });
        p.toggleAttribute("data-active", i === activeIndex);
      });
      gsap.set(card, { scaleX: 1, scaleY: 1, x: 0 });
      setPanelsHeight();
    }

    function transitionCard(prevIndex, movingRight) {
      if (!hasCard) return;
      const direction = movingRight ? 1 : -1;
      const incoming = panels[activeIndex];
      const outgoing = panels[prevIndex];
      if (!incoming || !outgoing) return;

      panels.forEach((p) => {
        if (p !== incoming && p !== outgoing) {
          gsap.killTweensOf(p);
          gsap.set(p, { autoAlpha: 0, x: 0 });
          p.removeAttribute("data-active");
        }
      });
      incoming.setAttribute("data-active", "");
      outgoing.removeAttribute("data-active");

      gsap.killTweensOf([card, panelsWrap, incoming, outgoing]);
      gsap.set(card, { transformOrigin: "50% 50%" });
      const targetHeight = incoming.offsetHeight;

      gsap.timeline()
        .to(card, {
          scaleX: 0.96,
          scaleY: 1.02,
          x: direction * 10,
          duration: config.cardSquash,
          ease: "power2.out",
        }, 0)
        .to(outgoing, { x: direction * -35, autoAlpha: 0, duration: 0.2, ease: "power2.out" },
          0)
        .to(panelsWrap, { height: targetHeight, duration: 0.3, ease: "power2.inOut" }, 0.1)
        .fromTo(
          incoming, { x: direction * 35, autoAlpha: 0 }, {
            x: 0,
            autoAlpha: 1,
            duration: 0.3,
            ease: "power2.out"
          },
          config.cardSquash
        )
        .to(card, {
          scaleX: 1,
          scaleY: 1,
          x: 0,
          duration: config.cardInflate,
          ease: "back.out(2)",
        }, config.cardSquash)
        .set(outgoing, { x: 0 });
    }

    function goTo(index) {
      if (index === activeIndex) return;
      const prevIndex = activeIndex;
      const movingRight = index > activeIndex;
      activeIndex = index;
      syncButtonState();

      if (reduceMotion.matches) {
        place(index);
        swapPanelsInstant();
        return;
      }

      transitionCard(prevIndex, movingRight);

      const target = rectFor(buttons[index]);
      gsap.killTweensOf(pos);
      gsap.killTweensOf(indicator);

      const hDir = target.left === pos.left ? (movingRight ? 1 : -1) : (target.left > pos.left ?
        1 : -1);
      const distance = Math.abs(target.left - pos.left);
      const maxOvershoot = Math.max(6, config.overshoot);
      let overshoot = gsap.utils.clamp(6, maxOvershoot, distance * 0.08) * hDir;
      if (hDir > 0) {
        overshoot = Math.min(overshoot, nav.clientWidth - target.right);
      } else {
        overshoot = Math.max(overshoot, -target.left);
      }

      gsap.set(indicator, { transformOrigin: "50% 50%" });
      gsap.to(indicator, {
        y: target.top,
        height: target.height,
        duration: config.travel,
        ease: "power3.out",
      });
      gsap.timeline()
        .to(pos, {
          left: target.left + overshoot,
          right: target.right + overshoot,
          duration: config.travel,
          ease: "power3.out",
          onUpdate: render,
        })
        .to(pos, {
          left: target.left,
          right: target.right,
          duration: config.settle,
          ease: "power2.inOut",
          onUpdate: render,
        });
      gsap.timeline()
        .to(indicator, { scaleY: 0.78, duration: config.squashDown, ease: "power2.out" })
        .to(indicator, { scaleY: 1, duration: config.squashBack, ease: "back.out(2.5)" });
    }

    function moveGhost(button) {
      if (!ghost) return;
      const target = rectFor(button);
      if (!ghostVisible) {
        ghostVisible = true;
        gsap.killTweensOf(ghost);
        gsap.set(ghost, {
          x: target.left,
          y: target.top,
          width: target.right - target.left,
          height: target.height,
        });
        gsap.to(ghost, { autoAlpha: 1, duration: dur(0.25), ease: "power2.out" });
      } else {
        gsap.to(ghost, {
          x: target.left,
          y: target.top,
          width: target.right - target.left,
          height: target.height,
          autoAlpha: 1,
          duration: dur(0.3),
          ease: "power3.out",
        });
      }
    }

    function hideGhost() {
      if (!ghost) return;
      ghostVisible = false;
      gsap.to(ghost, { autoAlpha: 0, duration: dur(0.2), ease: "power1.out" });
    }

    function refreshLayout() {
      const rows = new Set(buttons.map((b) => b.offsetTop));
      nav.toggleAttribute("data-wrapped", rows.size > 1);
      place(activeIndex);
      setPanelsHeight();
    }

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => goTo(index));
      button.addEventListener("mouseenter", () => moveGhost(button));
    });

    nav.addEventListener("mouseleave", hideGhost);
    nav.addEventListener("keydown", (event) => {
      let next = null;
      if (event.key === "ArrowRight") next = Math.min(buttons.length - 1, activeIndex + 1);
      if (event.key === "ArrowLeft") next = Math.max(0, activeIndex - 1);
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      if (next === null) return;
      event.preventDefault();
      if (next !== activeIndex) {
        goTo(next);
        buttons[next].focus();
      }
    });

    window.addEventListener("resize", refreshLayout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshLayout);

    if (ghost) gsap.set(ghost, { autoAlpha: 0 });
    panels.forEach((p, i) => gsap.set(p, { autoAlpha: i === activeIndex ? 1 : 0 }));

    syncButtonState();
    refreshLayout();
  });
}

// Reveal groups: images open up, then text lines slide in.
// [data-reveal-group] is hidden by CSS (site head) until this runs, so nothing flashes.
// Children: [data-reveal="image"] and [data-reveal="text"], animated in DOM order.
// Optional data-reveal-delay="1.2" (seconds) waits before the group starts.
function initRevealGroups() {
  // Feel — tweak here
  const imageDuration = 1.4;
  const imageStagger = 0.2;
  const imageEase = "osmo";
  const textDuration = 1;
  const textStagger = 0.08;
  const textEase = "expo.out";
  const textStart = 0.8; // seconds after the first image starts

  nextPage.querySelectorAll('[data-reveal-group]').forEach(group => {
    const images = group.querySelectorAll('[data-reveal="image"]');
    const texts = group.querySelectorAll('[data-reveal="text"]');
    const delay = parseFloat(group.dataset.revealDelay) || 0;
    const textAt = images.length ? textStart : 0; // text-only groups start right away

    if (reducedMotion) {
      gsap.set(group, { visibility: 'visible' });
      return;
    }

    // Split after fonts are loaded so the lines are measured correctly
    document.fonts.ready.then(() => {
      const lines = [...texts].flatMap(el =>
        SplitText.create(el, { type: 'lines', mask: 'lines' }).lines
      );

      const tl = gsap.timeline({ delay });
      tl.set(group, { visibility: 'visible' }, 0)
        .fromTo(images, {
          clipPath: 'inset(100% 0% 0% 0%)',
          scale: 1.15,
        }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: imageDuration,
          ease: imageEase,
          stagger: imageStagger,
        }, 0)
        .fromTo(lines, {
          yPercent: 110,
        }, {
          yPercent: 0,
          duration: textDuration,
          ease: textEase,
          stagger: textStagger,
        }, textAt)
        .set(images, { clearProps: 'clipPath,scale' });
    });
  });
}

// Plays the tornado's page-load intro (built in init3DCardsTornado) once the page has entered
function playTornadoIntro() {
  nextPage.querySelectorAll('[data-3d-tornado-init]').forEach(container => {
    container._playIntro?.();
  });
}

// Scroll hint: fades in after the intro, a dot loops down a thin line,
// hides once the visitor scrolls, and scrolls one screen down on click.
function initScrollIndicator() {
  // Feel — tweak here
  const showDelay = 2.6; // seconds after the page has entered (after the hero text)
  const hideAfter = 40; // px scrolled before the indicator fades out

  nextPage.querySelectorAll('[data-scroll-indicator]').forEach(el => {
    const dot = el.querySelector('[data-scroll-indicator-dot]');

    gsap.set(el, { autoAlpha: 0 });
    gsap.to(el, { autoAlpha: 1, duration: 0.8, ease: 'power2.out', delay: reducedMotion ? 0 : showDelay });

    if (dot && !reducedMotion) {
      gsap.fromTo(dot, { yPercent: -100 }, {
        yPercent: 100,
        duration: 1.6,
        ease: 'osmo',
        repeat: -1,
        repeatDelay: 0.3,
      });
    }

    ScrollTrigger.create({
      start: hideAfter,
      end: 'max',
      onToggle: self => gsap.to(el, { autoAlpha: self.isActive ? 0 : 1, duration: 0.4, overwrite: 'auto' }),
    });

    el.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(window.innerHeight, { duration: 1.4 });
      else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });

    onPageLeave(() => gsap.killTweensOf([el, dot].filter(Boolean)));
  });
}
