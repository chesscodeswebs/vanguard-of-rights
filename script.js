(() => {
  "use strict";

  const content = window.VANGUARD_CONTENT;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const root = document.querySelector("#site");

  if (!content || !root) return;

  const escapeHTML = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const renderSectionHeader = (section) => `
    <header class="section-header" data-reveal>
      <p class="eyebrow">${escapeHTML(section.eyebrow)}</p>
      <h2 class="display-title">${escapeHTML(section.title)}</h2>
      ${section.intro ? `<p class="section-intro">${escapeHTML(section.intro)}</p>` : ""}
    </header>`;

  const renderSite = () => {
    const floatingButtons = content.points
      .map(
        (point, index) => `
          <button class="floating-btn magnetic floating-btn--${point.id}" type="button" data-point-id="${point.id}" aria-label="View deep knowledge for ${escapeHTML(point.title)}">
            <span class="floating-btn__box">
              <img class="floating-btn__icon" src="${escapeHTML(point.icon)}" alt="" width="32" height="32" />
              <span class="floating-btn__label">${escapeHTML(point.title)}</span>
            </span>
          </button>`,
      )
      .join("");

    const briefCards = content.points
      .map(
        (point, index) => `
          <article class="point-card" id="point-${point.id}" data-reveal>
            <div class="point-card__header">
              <div class="point-card__icon-wrap">
                <img class="point-card__icon" src="${escapeHTML(point.icon)}" alt="" width="36" height="36" />
                <span class="point-card__num">0${index + 1}</span>
              </div>
              <h3 class="point-card__title">${escapeHTML(point.title)}</h3>
            </div>
            <p class="point-card__brief">${escapeHTML(point.brief)}</p>
            <div class="point-card__footer">
              <div class="point-pill">
                <span class="point-pill__tag">FLAGSHIP</span>
                <span class="point-pill__name">${escapeHTML(point.flagship)}</span>
              </div>
              <button class="deep-trigger-btn" type="button" data-point-id="${point.id}">
                Deep Knowledge <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </article>`,
      )
      .join("");

    const lineCards = content.line.cards
      .map(
        (card) => `
          <article class="line-card" data-reveal>
            <h3>${escapeHTML(card.title)}</h3>
            <p>${escapeHTML(card.body)}</p>
          </article>`,
      )
      .join("");

    const navLinks = content.navigation
      .map(
        (link) =>
          `<a class="nav-pill" href="${escapeHTML(link.href)}">${escapeHTML(link.label)}</a>`,
      )
      .join("");

    const heroActions = content.hero.actions
      .map(
        (action) => `
          <a class="cta magnetic ${action.primary ? "cta--primary" : ""}" href="${escapeHTML(action.href)}">
            ${escapeHTML(action.label)}
          </a>`,
      )
      .join("");

    const rallyCall = content.rally
      .map((line) => `<span>${escapeHTML(line)}</span>`)
      .join("");

    root.innerHTML = `
      <header class="pill-nav-container">
        <nav class="pill-nav" aria-label="Main Navigation">
          ${navLinks}
        </nav>
      </header>

      <main id="main">
        <section class="hero-stage" data-beacon aria-labelledby="hero-name">
          <div class="hero-stage__backdrop" aria-hidden="true">
            <img class="hero-stage__portrait" src="assets/the-most-sigma-ligma.png" alt="" />
          </div>

          <div class="hero-stage__content">
            <p class="eyebrow">${escapeHTML(content.hero.eyebrow)}</p>
            <h1 class="hero-name" id="hero-name">${escapeHTML(content.brandName)}</h1>
            <p class="hero-slogan">${escapeHTML(content.hero.slogan)}</p>
            <p class="hero-definition">${escapeHTML(content.hero.definition)}</p>
            <div class="hero-actions">${heroActions}</div>
          </div>

          <div class="floating-cluster" aria-label="Six Key Points Quick Actions">
            ${floatingButtons}
          </div>

          <div class="hero-bridge" aria-hidden="true"><span></span></div>
        </section>

        <section class="section" id="points" data-nav-section data-beacon>
          <header class="section-header" data-reveal>
            <p class="eyebrow">OUR 6 KEY POINTS</p>
            <h2 class="display-title">What We Fight For</h2>
            <p class="section-intro">Click any point for deeper knowledge on our policy roadmap and community impact.</p>
          </header>
          <div class="point-grid">${briefCards}</div>
        </section>

        <section class="section" id="standard" data-nav-section data-beacon>
          <header class="section-header" data-reveal>
            <p class="eyebrow">${escapeHTML(content.standard.eyebrow)}</p>
          </header>
          <div class="standard-layout">
            <div class="standard-copy" data-reveal>
              <h2 class="standard-title">${escapeHTML(content.standard.title)}</h2>
              <p>${escapeHTML(content.standard.body)}</p>
              <p class="standard-caption">${escapeHTML(content.standard.caption)}</p>
            </div>
          </div>
        </section>

        <section class="section" id="line" data-nav-section data-beacon>
          ${renderSectionHeader(content.line)}
          <div class="line-grid">${lineCards}</div>
        </section>

        <section class="section" id="ledger" data-nav-section>
          ${renderSectionHeader(content.ledger)}
          <article class="ledger-panel" data-reveal>
            <p class="ledger-question">${escapeHTML(content.ledger.question)}</p>
            <p>${escapeHTML(content.ledger.body)}</p>
          </article>
        </section>

        <section class="section" id="contact" data-nav-section>
          ${renderSectionHeader(content.contact)}
          <div class="contact-box" data-reveal>
            <p class="contact-text">${escapeHTML(content.contact.body)}</p>
            <a class="cta cta--primary magnetic" href="mailto:${escapeHTML(content.contact.email)}">
              ${escapeHTML(content.contact.email)}
            </a>
          </div>
        </section>

        <section class="section" id="subscribe" data-nav-section>
          ${renderSectionHeader(content.subscribe)}
          <div class="subscribe-box" data-reveal>
            <p class="subscribe-text">${escapeHTML(content.subscribe.body)}</p>
            <form class="subscribe-form" id="subscribe-form" action="#" method="POST">
              <input class="subscribe-input" type="email" placeholder="Enter your email address" required aria-label="Email address for subscription" />
              <button class="cta cta--primary magnetic" type="submit">Join Vanguard</button>
            </form>
            <p class="subscribe-feedback" id="subscribe-feedback" aria-live="polite"></p>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <img class="footer-logo" src="assets/v-mark.png" alt="${escapeHTML(content.logoAlt)}" data-reveal />
        <p class="footer-name" data-reveal>${escapeHTML(content.brandName)}</p>
        <div class="rally-call" data-reveal>${rallyCall}</div>
        <p class="footer-vibe" data-reveal>${escapeHTML(content.vibe)}</p>
      </footer>

      <!-- Deeper Knowledge Modal -->
      <div class="deep-modal-backdrop" id="deep-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="deep-modal-card">
          <button class="deep-modal-close" id="modal-close" type="button" aria-label="Close details">&times;</button>
          <div class="deep-modal-header">
            <img class="deep-modal-icon" id="modal-icon" src="" alt="" width="48" height="48" />
            <div>
              <p class="deep-modal-tag" id="modal-tag">FLAGSHIP ACT</p>
              <h3 class="deep-modal-title" id="modal-title"></h3>
            </div>
          </div>
          <p class="deep-modal-brief" id="modal-brief"></p>
          <div class="deep-modal-body">
            <h4>Policy Breakdown & Implementation:</h4>
            <ul class="deep-modal-list" id="modal-list"></ul>
          </div>
          <div class="deep-modal-footer">
            <button class="cta cta--primary" id="modal-action-close" type="button">Understood</button>
          </div>
        </div>
      </div>`;
  };

  const initMagneticControls = () => {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".magnetic").forEach((control) => {
      control.addEventListener("pointermove", (event) => {
        const bounds = control.getBoundingClientRect();
        const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.18;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.22;
        control.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      control.addEventListener("pointerleave", () => {
        control.style.transform = "translate3d(0, 0, 0)";
      });
    });
  };

  const initScrollSpy = () => {
    const navLinks = [...document.querySelectorAll(".nav-pill")];
    const sections = [...document.querySelectorAll("[data-nav-section]")];
    const linkFor = (id) =>
      navLinks.find((link) => link.getAttribute("href") === `#${id}`);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => link.classList.remove("is-active"));
        linkFor(visible.target.id)?.classList.add("is-active");
      },
      { rootMargin: "-20% 0px -50%", threshold: [0.05, 0.35, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
  };

  const initDeepKnowledgeModal = (lenis) => {
    const modal = document.querySelector("#deep-modal");
    const closeBtn = document.querySelector("#modal-close");
    const actionClose = document.querySelector("#modal-action-close");
    const modalIcon = document.querySelector("#modal-icon");
    const modalTitle = document.querySelector("#modal-title");
    const modalTag = document.querySelector("#modal-tag");
    const modalBrief = document.querySelector("#modal-brief");
    const modalList = document.querySelector("#modal-list");

    if (!modal) return;

    const openPoint = (pointId) => {
      const point = content.points.find((p) => p.id === pointId);
      if (!point) return;

      modalIcon.src = point.icon;
      modalTitle.textContent = point.title;
      modalTag.textContent = `FLAGSHIP: ${point.flagship.toUpperCase()}`;
      modalBrief.textContent = point.brief;
      modalList.innerHTML = point.details
        .map((item) => `<li>${escapeHTML(item)}</li>`)
        .join("");

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    closeBtn?.addEventListener("click", closeModal);
    actionClose?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });

    // Wire up hero floating buttons -> open deep knowledge directly
    document.querySelectorAll(".floating-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.pointId;
        openPoint(id);
      });
    });

    // Wire up brief cards "Deep Knowledge" button -> open deep knowledge
    document.querySelectorAll(".deep-trigger-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.pointId;
        openPoint(id);
      });
    });
  };

  const initForms = () => {
    const form = document.querySelector("#subscribe-form");
    const feedback = document.querySelector("#subscribe-feedback");
    if (!form || !feedback) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      feedback.textContent =
        "Thank you for joining the Vanguard of Rights. You are on the Line.";
      feedback.classList.add("is-success");
      form.reset();
    });
  };

  const initLenis = () => {
    if (reduceMotion || !window.Lenis) return null;
    const lenis = new window.Lenis({
      duration: 1.15,
      easing: (value) => 1 - Math.pow(1 - value, 4),
      smoothWheel: true,
    });
    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else frame = requestAnimationFrame(raf);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          lenis.scrollTo(target, { offset: -70 });
        }
      });
    });

    return lenis;
  };

  const initMotion = (lenis) => {
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("motion-ready");

    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    gsap.from(".pill-nav-container", {
      y: -28,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(".hero-stage__content > *", {
      y: 24,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.12,
    });
    gsap.from(".floating-btn", {
      scale: 0.85,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: "back.out(1.4)",
      delay: 0.35,
    });

    gsap.utils.toArray("[data-reveal]").forEach((element) => {
      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 86%", once: true },
      });
    });
  };

  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const initStarfield = () => {
    const canvas = document.querySelector("#starfield");
    const gl = canvas?.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!canvas || !gl) return;

    const vertex = createShader(
      gl,
      gl.VERTEX_SHADER,
      `attribute vec2 a_position;
       attribute float a_size;
       attribute float a_phase;
       uniform float u_time;
       uniform vec2 u_pointer;
       varying float v_alpha;
       void main() {
         float pulse = 0.58 + 0.42 * sin(u_time * 0.0013 + a_phase);
         vec2 drift = vec2(sin(u_time * 0.00013 + a_phase), cos(u_time * 0.00016 + a_phase)) * 0.003;
         vec2 position = a_position + drift + u_pointer * (0.006 + a_size * 0.00055);
         gl_Position = vec4(position, 0.0, 1.0);
         gl_PointSize = a_size * pulse;
         v_alpha = 0.2 + pulse * 0.54;
       }`,
    );
    const fragment = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      `precision mediump float;
       varying float v_alpha;
       void main() {
         float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
         float alpha = (1.0 - smoothstep(0.05, 0.52, distanceFromCenter)) * v_alpha;
         gl_FragColor = vec4(0.55, 0.92, 1.0, alpha);
       }`,
    );
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const attributes = {
      position: gl.getAttribLocation(program, "a_position"),
      size: gl.getAttribLocation(program, "a_size"),
      phase: gl.getAttribLocation(program, "a_phase"),
    };
    const uniforms = {
      time: gl.getUniformLocation(program, "u_time"),
      pointer: gl.getUniformLocation(program, "u_pointer"),
    };
    const buffers = [gl.createBuffer(), gl.createBuffer(), gl.createBuffer()];
    let count = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let visible = !document.hidden;

    const setupBuffer = (buffer, values, location, size) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      count = window.innerWidth < 700 ? 68 : 148;
      const positions = new Float32Array(count * 2);
      const sizes = new Float32Array(count);
      const phases = new Float32Array(count);
      for (let index = 0; index < count; index += 1) {
        positions[index * 2] = Math.random() * 2 - 1;
        positions[index * 2 + 1] = Math.random() * 2 - 1;
        sizes[index] = 1.2 + Math.random() * 3.2;
        phases[index] = Math.random() * Math.PI * 2;
      }
      setupBuffer(buffers[0], positions, attributes.position, 2);
      setupBuffer(buffers[1], sizes, attributes.size, 1);
      setupBuffer(buffers[2], phases, attributes.phase, 1);
    };

    const draw = (time) => {
      if (!visible) return;
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uniforms.time, time);
      gl.uniform2f(uniforms.pointer, pointerX, pointerY);
      gl.drawArrays(gl.POINTS, 0, count);
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    if (finePointer && !reduceMotion) {
      window.addEventListener(
        "pointermove",
        (event) => {
          targetX = (event.clientX / window.innerWidth - 0.5) * 2;
          targetY = -(event.clientY / window.innerHeight - 0.5) * 2;
        },
        { passive: true },
      );
    }
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      visible = !document.hidden;
      if (visible && !reduceMotion) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    });

    resize();
    draw(0);
  };

  renderSite();
  initMagneticControls();
  initScrollSpy();
  const lenis = initLenis();
  initDeepKnowledgeModal(lenis);
  initForms();
  initMotion(lenis);
  initStarfield();
})();
