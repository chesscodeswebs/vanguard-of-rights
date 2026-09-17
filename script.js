(() => {
  "use strict";

  const content = window.VANGUARD_CONTENT;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    const policyCards = content.charter.policies
      .map(
        (policy, index) => `
          <article class="policy-card" data-reveal>
            <button class="policy-toggle" type="button" aria-expanded="false" aria-controls="policy-${index}">
              <span class="policy-topline">
                <span class="policy-badge">${escapeHTML(policy.badge)}</span>
                <span class="policy-symbol" aria-hidden="true">+</span>
              </span>
              <span class="policy-title">${escapeHTML(policy.title)}</span>
            </button>
            <div class="policy-details" id="policy-${index}">
              <div>
                <p class="policy-right">${escapeHTML(policy.right)}</p>
                <p class="policy-flagship">${escapeHTML(policy.flagship)}</p>
              </div>
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

    const answerItems = content.answers.items
      .map(
        (item) => `
          <article class="answer-panel" data-reveal>
            <h3 class="answer-question">${escapeHTML(item.question)}</h3>
            <p>${escapeHTML(item.answer)}</p>
          </article>`,
      )
      .join("");

    const navLinks = content.navigation
      .map(
        (link) => `<a class="nav-link" href="${escapeHTML(link.href)}">${escapeHTML(link.label)}</a>`,
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

    const valueList = content.founding.values.map((value) => `<li>${escapeHTML(value)}</li>`).join("");
    const foundingCopy = `<p class="mission-statement">${escapeHTML(content.founding.mission)}</p>${content.founding.paragraphs
      .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
      .join("")}`;
    const reframeCopy = content.founding.reframe.map((line) => `<p>${escapeHTML(line)}</p>`).join("");
    const gatesCopy = content.gates.paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("");
    const rallyCall = content.rally.map((line) => `<span>${escapeHTML(line)}</span>`).join("");

    root.innerHTML = `
      <header class="site-nav" aria-label="${escapeHTML(content.brandName)}">
        <a class="nav-brand" href="#main" aria-label="${escapeHTML(content.brandName)}">
          <img class="nav-logo" src="assets/v-mark.png" alt="${escapeHTML(content.logoAlt)}" />
          <span class="nav-brand__name">${escapeHTML(content.brandName)}</span>
        </a>
        <nav class="nav-links" aria-label="${escapeHTML(content.brandName)}">
          ${navLinks}
        </nav>
      </header>

      <aside class="side-emblem" aria-hidden="true">
        <div class="side-emblem__stage">
          <img class="side-emblem__echo" src="assets/v-mark.png" alt="" />
          <img class="side-emblem__mark" src="assets/v-mark.png" alt="" />
          <span class="side-emblem__orbit"></span>
        </div>
      </aside>

      <main id="main">
        <section class="hero" data-beacon aria-labelledby="hero-name">
          <div class="hero-copy">
            <p class="eyebrow">${escapeHTML(content.hero.eyebrow)}</p>
            <h1 class="hero-name" id="hero-name">${escapeHTML(content.brandName)}</h1>
            <p class="hero-slogan">${escapeHTML(content.hero.slogan)}</p>
            <p class="hero-definition">${escapeHTML(content.hero.definition)}</p>
            <div class="hero-actions">${heroActions}</div>
          </div>
          <figure class="hero-portrait" aria-hidden="true">
            <img src="assets/the-most-sigma-ligma.png" alt="" />
          </figure>
          <div class="hero-bridge" aria-hidden="true"><span></span></div>
        </section>

        <section class="section" id="founding">
          ${renderSectionHeader(content.founding)}
          <div class="founding-grid">
            <div class="prose" data-reveal>${foundingCopy}</div>
            <aside class="reframe-panel" data-reveal>
              <div class="reframe-lines">${reframeCopy}</div>
              <ul class="value-list">${valueList}</ul>
            </aside>
          </div>
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

        <section class="section" id="charter" data-nav-section data-beacon>
          ${renderSectionHeader(content.charter)}
          <div class="policy-grid">${policyCards}</div>
        </section>

        <section class="section" id="gates">
          ${renderSectionHeader(content.gates)}
          <div class="gates-panel" data-reveal>${gatesCopy}</div>
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

        <section class="section" id="answers">
          ${renderSectionHeader(content.answers)}
          <div class="answer-list">${answerItems}</div>
        </section>
      </main>

      <footer class="site-footer">
        <img class="footer-logo" src="assets/v-mark.png" alt="${escapeHTML(content.logoAlt)}" data-reveal />
        <p class="footer-name" data-reveal>${escapeHTML(content.brandName)}</p>
        <div class="rally-call" data-reveal>${rallyCall}</div>
        <p class="footer-vibe" data-reveal>${escapeHTML(content.vibe)}</p>
      </footer>`;
  };

  const initPolicies = () => {
    const cards = [...document.querySelectorAll(".policy-card")];
    cards.forEach((card) => {
      const button = card.querySelector(".policy-toggle");
      button.addEventListener("click", () => {
        const willOpen = !card.classList.contains("is-open");
        cards.forEach((item) => {
          item.classList.remove("is-open");
          item.querySelector(".policy-toggle").setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          card.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  };

  const initMagneticControls = () => {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".magnetic").forEach((control) => {
      control.addEventListener("pointermove", (event) => {
        const bounds = control.getBoundingClientRect();
        const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.12;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.16;
        control.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      control.addEventListener("pointerleave", () => {
        control.style.transform = "translate3d(0, 0, 0)";
      });
    });
  };

  const initScrollSpy = () => {
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("[data-nav-section]")];
    const linkFor = (id) => navLinks.find((link) => link.getAttribute("href") === `#${id}`);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => link.classList.remove("is-active"));
        linkFor(visible.target.id)?.classList.add("is-active");
      },
      { rootMargin: "-30% 0px -56%", threshold: [0.01, 0.45] },
    );
    sections.forEach((section) => observer.observe(section));
  };

  const initSideEmblem = () => {
    const emblem = document.querySelector(".side-emblem");
    const sections = [...document.querySelectorAll("main > section")];
    if (!emblem || !sections.length) return;

    let ticking = false;
    const update = () => {
      const focus = window.innerHeight * 0.48;
      const active = sections.reduce((closest, section) => {
        const rect = section.getBoundingClientRect();
        const distance = focus < rect.top ? rect.top - focus : focus > rect.bottom ? focus - rect.bottom : 0;
        return !closest || distance < closest.distance ? { section, distance } : closest;
      }, null)?.section;

      emblem.classList.add("is-visible");
      emblem.classList.toggle("is-featured", active?.id === "standard");
      emblem.dataset.section = active?.id || "";

      if (!reduceMotion && finePointer) {
      const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const turn = Math.sin(progress * Math.PI * 4) * 24;
        emblem.style.setProperty("--emblem-turn", `${turn.toFixed(1)}deg`);
      }
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
    window.addEventListener("resize", update, { passive: true });
    update();
  };

  const initLenis = () => {
    if (reduceMotion || !window.Lenis) return null;
    const lenis = new window.Lenis({
      duration: 1.15,
      easing: (value) => 1 - Math.pow(1 - value, 4),
      smoothWheel: true,
      anchors: true,
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
    return lenis;
  };

  const initMotion = (lenis) => {
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("motion-ready");

    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    gsap.from(".site-nav", { y: -28, autoAlpha: 0, duration: 0.8, ease: "power3.out" });
    gsap.from(".hero-copy > *", {
      y: 24,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.12,
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

    gsap.utils.toArray("[data-parallax]").forEach((element) => {
      const amount = Number(element.dataset.parallax || 0);
      gsap.to(element, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
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
    const gl = canvas?.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
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
  initPolicies();
  initMagneticControls();
  initScrollSpy();
  initSideEmblem();
  const lenis = initLenis();
  initMotion(lenis);
  initStarfield();
})();
