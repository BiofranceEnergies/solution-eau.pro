/* =================================================================
       [[REPERE: VARIABLES]]
       ================================================================= */
      :root {
        --maxw: 1200px;
        --hero-h-desktop: 94vh;
        --hero-h-mobile: 98vh;

        /* Couleurs */
        --ink: #f1f5f9;
        --muted: #cce8ff;
        --border: rgba(255, 255, 255, 0.28);
        --glass: rgba(255, 255, 255, 0.1);
        --glass-head: rgba(15, 23, 42, 0.98);

        /* CTA bleu profond */
        --cta-grad-top: #0b4fbf;
        --cta-grad-bot: #0a2e70;
        --cta-text: #ffffff;

        /* bleu de marque pour la FAQ ; reprend ton CTA */
        --brand: var(--cta-grad-top, #0b4fbf);
        --brand-ink: #0f172a;

        /* largeur harmonisée pour le bloc coût + ses cartes */
        --costw: 880px;
      }
      @media (max-width: 900px){ :root { --costw: 680px; } }
      @media (max-width: 600px){ :root { --costw: min(92vw, 560px); } }

      /* =================================================================
       [[REPERE: RESET + BODY]]
       ================================================================= */
      *{ box-sizing:border-box; margin:0; padding:0; }
      body{
        background:#0b1220; color:var(--ink);
        font:16px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Arial;
        -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
      }

      /* Skipper accessibilité */
      .skip-link{
        position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;
      }
      .skip-link:focus{
        position:fixed; left:16px; top:16px; width:auto; height:auto;
        padding:10px 14px; background:#111827; color:#fff; border-radius:8px; z-index:9999;
      }

      /* =================================================================
       [[REPERE: LOGO]]
       ================================================================= */
      .logo-header{ position:absolute; top:24px; left:24px; z-index:10; display:block; }
      .logo-header img{ height:70px; width:auto; display:block; }
      @media (max-width:900px){
        .logo-header{ top:16px; left:16px; }
        .logo-header img{ height:48px; }
      }

      /* =================================================================
       [[REPERE: HERO]]
       ================================================================= */
      header.hero{
        position:relative; isolation:isolate; overflow:hidden;
        height:var(--hero-h-desktop); min-height:700px; display:flex; align-items:center;
      }
      @media (max-width:900px){
        header.hero{ height:var(--hero-h-mobile); min-height:640px; }
      }
      .hero__img{
        position:absolute; inset:0; z-index:-2; width:100%; height:100%;
        object-fit:cover; object-position:center 50%;
      }
      .hero::before{
        content:""; position:absolute; inset:0; z-index:-1;
        background:linear-gradient(180deg,rgba(14,165,233,.28) 0%,rgba(14,165,233,.18) 40%,rgba(0,0,0,.42) 100%);
        mix-blend-mode:soft-light;
      }
      .hero::after{
        content:""; position:absolute; inset:0; pointer-events:none;
        background:linear-gradient(to bottom,rgba(0,0,0,0) 78%,rgba(0,0,0,.78) 100%);
      }
      .hero__inner{
        width:100%; max-width:var(--maxw); margin:0 auto; padding:0 24px;
        display:grid; grid-template-columns:1fr auto; gap:32px; align-items:center;
      }
      @media (max-width:1100px){ .hero__inner{ gap:24px; } }
      @media (max-width:900px){ .hero__inner{ grid-template-columns:1fr; gap:20px; } }

      .hero__copy{ max-width:680px; position:relative; z-index:1; }
      .hero__intro{
        font-size:clamp(16px,1.6vw,20px); color:#e0f2fe; font-weight:700;
        margin-bottom:16px; text-shadow:0 1px 3px rgba(0,0,0,.45); text-wrap:balance;
      }
      .hero__copy h1{
        font-size:clamp(34px,4vw,52px); line-height:1.15; font-weight:800; margin:12px 0 14px;
        letter-spacing:-.3px; text-wrap:balance; text-shadow:0 2px 8px rgba(0,0,0,.35); max-width:680px; color:#f8fafc;
      }
      .hero__copy h1 em{ font-style:normal; color:var(--cta-grad-top); }
      .hero__copy p{ color:var(--muted); max-width:60ch; }
      .hero__intro, .hero__copy .lead{
        font-size:clamp(17px,1.6vw,20px); line-height:1.5; color:#e2e8f0; font-weight:600;
        text-shadow:0 1px 3px rgba(0,0,0,.35); margin-top:14px;
      }
      .hero__copy::after{
        content:""; position:absolute; left:-8px; right:-8px; top:-8px; height:340px;
        background:linear-gradient(to bottom,rgba(0,0,0,.8) 0%,rgba(0,0,0,0) 100%);
        filter:blur(10px); border-radius:10px; z-index:-1; pointer-events:none;
      }

      /* --- Carte formulaire --- */
      .card{
        position:relative; width:456px; max-width:95vw; margin-right:2vw;
        background:rgba(10,15,25,.92); border:1px solid var(--border); border-radius:22px;
        backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
        box-shadow:0 18px 60px rgba(0,0,0,.55), 0 6px 16px rgba(0,0,0,.35); overflow:hidden; z-index:2;
        align-self:center; margin-top:4vh; transform:translateY(10px);
      }
      @media (max-width:900px){
        .card{ margin:0 auto; max-width:640px; width:100%; background:#0b1220; transform:none; }
        .card::before{ display:none; }
      }
      .card::before{
        content:""; position:absolute; inset:-48px; z-index:-1;
        background:radial-gradient(320px 260px at 62% 18%, rgba(0,0,0,.62), transparent 72%);
        pointer-events:none;
      }
      .card__head{
        text-align:center; padding:24px 22px 18px;
        background:linear-gradient(180deg,rgba(15,23,42,.98),rgba(11,18,32,.98));
        border-bottom:1px solid rgba(255,255,255,.32); box-shadow:inset 0 1px 0 rgba(255,255,255,.05);
      }
      .card__head .t1{ display:block; font-weight:800; font-size:1.34rem; color:#fff; letter-spacing:.1px; text-shadow:0 1px 2px rgba(0,0,0,.45); }
      .card__head .t2{ display:block; font-size:1.08rem; color:#fff; opacity:.98; margin-top:2px; }
      .card__body{ padding:24px 20px 20px; }

      .field{ display:flex; align-items:center; gap:12px; margin-bottom:18px; }
      .field label{ font-weight:700; color:var(--ink); font-size:15px; }
      .sel{
        flex:1; min-height:48px; padding:10px 12px; background:rgba(255,255,255,.08);
        color:#f8fafc; border:1px solid var(--border); border-radius:12px; outline:0; font-weight:600;
      }
      .sel option{ color:#111827; background-color:#ffffff; }
      .sel:hover{ background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.36); }
      .sel:focus{ border-color:rgba(255,255,255,.55); box-shadow:0 0 0 4px rgba(59,130,246,.38); }
      .chk{ display:flex; align-items:center; gap:8px; font-weight:600; color:var(--ink); }
      .chk input{ width:18px; height:18px; position:relative; top:1px; }
      .field.is-inline{ justify-content:flex-start; gap:10px; }
      .field.is-inline label:first-child{ min-width:auto; }

      .cta{
        display:block; width:100%; margin-top:12px; height:56px; border-radius:18px;
        border:1px solid rgba(255,255,255,.25);
        background:linear-gradient(180deg,var(--cta-grad-top),var(--cta-grad-bot));
        color:var(--cta-text); font-weight:800; font-size:1.02rem;
        box-shadow:0 16px 36px rgba(11,63,145,.55), inset 0 2px 4px rgba(255,255,255,.08);
        cursor:pointer; transition:transform .15s ease, filter .15s ease;
      }
      .cta:hover{ filter:brightness(1.06); transform:translateY(-2px); }
      .cta:active{ transform:translateY(0); filter:brightness(1.02); }
      .cta:focus-visible{ outline:2px solid #93c5fd; outline-offset:3px; }
      @media (prefers-reduced-motion:reduce){ .cta{ transition:none; } }
      @media (max-width:520px){
        .field{ flex-direction:column; align-items:stretch; }
        .field label{ min-width:unset; }
      }

      /* =================================================================
       [[REPERE: SECTIONS DE LA PAGE]]
       ================================================================= */
      .steps{ padding:80px 20px 40px; color:#0f172a; background:#fff; }
      .steps__inner{ max-width:1100px; margin:0 auto; text-align:center; }
      .steps h2{ font-size:clamp(26px,4.2vw,44px); line-height:1.15; font-weight:900; color:#0f172a; margin-bottom:10px; }
      .steps p.subtitle{ color:#64748b; margin-bottom:36px; }
      .sgrid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; align-items:stretch; }
      @media (max-width:980px){ .sgrid{ grid-template-columns:1fr; gap:16px; } }
      .scard{ background:#fff; border:1px solid #e5e7eb; border-radius:18px; box-shadow:0 8px 22px rgba(2,6,23,.06), 0 2px 6px rgba(2,6,23,.04); padding:28px 26px; text-align:center; display:flex; flex-direction:column; }
      .sbullet{ width:64px; height:64px; margin:0 auto 14px; border-radius:50%; display:grid; place-items:center; background:linear-gradient(180deg,var(--cta-grad-top),var(--cta-grad-bot)); color:#fff; font-weight:900; font-size:20px; line-height:1; }
      .scard h3{ font-size:22px; line-height:1.2; font-weight:800; color:#0f172a; margin:6px 0 8px; }
      .scard p{ color:#64748b; }
      .steps__note{ max-width:820px; margin:30px auto 0; text-align:center; font-weight:800; color:#0f172a; font-size:1.4rem; }
      .steps__check{ margin-top:28px; text-align:center; }
      .steps__check svg{ width:64px; height:64px; display:inline-block; }

      .benefits{ background:#f8fbff; border-top:1px solid #eef2f7; padding:80px 20px; color:#0f172a; }
      .benefits__inner{ max-width:1100px; margin:0 auto; text-align:center; }
      .benefits h2{ font-size:clamp(28px,4.2vw,44px); line-height:1.15; font-weight:900; margin-bottom:8px; }
      .benefits .subtitle{ color:#64748b; margin-bottom:32px; }
      .bgrid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; align-items:stretch; }
      @media (max-width:1100px){ .bgrid{ grid-template-columns:repeat(2,1fr); } }
      @media (max-width:720px){ .bgrid{ grid-template-columns:1fr; } }
      .bcard{ background:#fff; border:1px solid #e5e7eb; border-radius:18px; padding:24px 22px; text-align:left; box-shadow:0 10px 28px rgba(2,6,23,.06), 0 2px 6px rgba(2,6,23,.04); display:flex; flex-direction:column; }
      .bicon{ width:48px; height:48px; display:grid; place-items:center; border-radius:12px; background:#e8f2ff; margin-bottom:12px; }
      .bcard h3{ font-size:20px; line-height:1.25; font-weight:800; margin:6px 0 8px; color:#0f172a; }
      .bcard p{ color:#64748b; }
      .benefits + *{ margin-top:0; }

      .process{ background:#fff; padding:80px 20px; color:#0f172a; }
      .process__inner{ max-width:1100px; margin:0 auto; text-align:center; }
      .process h2{ font-size:clamp(28px,4.2vw,44px); line-height:1.15; font-weight:900; margin-bottom:8px; }
      .process .subtitle{ color:#64748b; margin-bottom:36px; }
      .pline{ position:relative; height:76px; margin:0 auto 22px; max-width:880px; background:linear-gradient(90deg,#e6f0fb 0,#e6f0fb 100%); mask:linear-gradient(90deg,transparent 0,#000 8%,#000 92%,transparent 100%); border-radius:999px; }
      .pnode{ position:absolute; top:50%; transform:translate(-50%,-50%); width:42px; height:42px; border-radius:50%; display:grid; place-items:center; background:#0b84ee; color:#fff; font-weight:800; box-shadow:0 6px 18px rgba(11,132,238,.25), inset 0 2px 4px rgba(255,255,255,.25); }
      .pnode.n1{ left:16%; } .pnode.n2{ left:50%; } .pnode.n3{ left:84%; }
      .prow{ display:grid; grid-template-columns:repeat(3,1fr); gap:28px; margin-top:12px; align-items:stretch; }
      @media (max-width:980px){ .prow{ grid-template-columns:1fr; gap:18px; } }
      .pstep{ background:#fff; border:1px solid #e5e7eb; border-radius:18px; padding:26px 22px; text-align:center; box-shadow:0 10px 28px rgba(2,6,23,.06), 0 2px 6px rgba(2,6,23,.04); display:flex; flex-direction:column; }
      .picon{ width:64px; height:64px; border-radius:50%; display:grid; place-items:center; margin:0 auto 12px; background:#e8f2ff; }
      .pstep h3{ font-size:clamp(18px,2.2vw,26px); line-height:1.25; font-weight:800; margin:6px 0 8px; color:#0f172a; }
      .pstep p{ color:#64748b; }

      .metrics{ background:#f8fbff; padding:80px 20px; color:#0f172a; border-top:1px solid #eef2f7; }
      .metrics__inner{ max-width:1100px; margin:0 auto; text-align:center; }
      .metrics h2{ font-size:clamp(28px,4.2vw,44px); line-height:1.15; font-weight:900; margin-bottom:8px; }
      .metrics .subtitle{ color:#64748b; margin-bottom:32px; }
      .mgrid{ display:grid; grid-template-columns:repeat(5,1fr); gap:20px; align-items:stretch; }
      @media (max-width:1200px){ .mgrid{ grid-template-columns:repeat(3,1fr); } }
      @media (max-width:760px){ .mgrid{ grid-template-columns:1fr; } }
      .mcard{ background:#fff; border:1px solid #e5e7eb; border-radius:18px; padding:24px 22px; box-shadow:0 10px 28px rgba(2,6,23,.06), 0 2px 6px rgba(2,6,23,.04); display:flex; flex-direction:column; }
      .micon{ width:56px; height:56px; border-radius:50%; display:grid; place-items:center; margin:0 auto 10px; background:#e8f2ff; }
      .mvalue{ font-size:clamp(28px,4vw,44px); font-weight:900; color:#0b84ee; line-height:1; margin:6px 0 4px; }
      .mcard h3{ font-size:18px; font-weight:800; color:#0f172a; margin-bottom:6px; }
      .mcard p{ color:#64748b; }

      /* =========================================================
       [[REPERE: TEMOIGNAGES]]
       ========================================================= */
      .testi{ background:#ffffff; border-top:1px solid #eef2f7; padding:80px 20px; color:#0f172a; }
      .testi__inner{ max-width:1100px; margin:0 auto; text-align:center; }
      .testi h2{ font-size:clamp(28px,4.2vw,44px); line-height:1.15; font-weight:900; margin-bottom:8px; }
      .testi__rating{ display:flex; gap:10px; align-items:center; justify-content:center; margin-bottom:28px; color:#64748b; font-weight:700; }
      .testi__stars{ display:inline-flex; gap:4px; align-items:center; }
      .testi__stars svg{ width:18px; height:18px; }
      .testi__stars svg path{ fill:var(--cta-grad-top); }
      .testi__grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch; }
      @media (max-width:980px){ .testi__grid{ grid-template-columns:1fr; } }
      .tcard{ background:#fff; border:1px solid #e5e7eb; border-radius:18px; box-shadow:0 10px 28px rgba(2,6,23,.06), 0 2px 6px rgba(2,6,23,.04); padding:24px 22px; text-align:left; }
      .tcard__top{ display:flex; align-items:center; gap:14px; margin-bottom:8px; }
      .avatar{ width:56px; height:56px; border-radius:50%; background:#ffe9cc; color:#111827; font-weight:800; font-size:18px; display:grid; place-items:center; }
      .tcard__name{ font-weight:800; color:#0f172a; }
      .tcard__loc{ color:#64748b; font-size:.95rem; }
      .tcard__stars{ margin:8px 0 10px; display:flex; gap:4px; }
      .tcard__stars svg{ width:18px; height:18px; display:block; flex:0 0 18px; }
      .tcard__stars svg path{ fill:var(--cta-grad-top); }
      .tcard__quote{ color:#0f172a; font-size:1.02rem; line-height:1.5; }
      @media (max-width:980px){ .tcard__stars svg{ width:16px; height:16px; } }
      .tcard__quote em{ font-style:normal; color:#334155; }

      /* Champs/legend visuels */
      fieldset{ border:0; padding:0; margin:0; min-inline-size:unset; }
      legend{ padding:0; margin:0; }
      .sr-only{
        position:absolute !important; width:1px; height:1px; padding:0; margin:-1px;
        overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
      }

      /* MOBILE : logo + dégagement du texte */
      @media (max-width:560px){
        .logo-header{ top:calc(8px + env(safe-area-inset-top)); left:12px; }
        .logo-header img{ height:36px; }
        .hero__copy{ padding-top:64px; }
      }
      @media (max-height:680px){ .hero__copy{ padding-top:72px; } }

      /* =========================================================
       [[REPERE: FAQ]]
       ========================================================= */
      .faq{ background:#f8fbff; border-top:1px solid #eef2f7; padding:80px 20px; color:#0f172a; }
      .faq__inner{ max-width:1100px; margin:0 auto; }
      .faq header{ text-align:center; margin-bottom:28px; }
      .faq h2{ font-size:clamp(28px,4.2vw,44px); line-height:1.15; font-weight:900; margin-bottom:6px; text-align:center; }
      .faq .subtitle{ color:#64748b; }
      .faq__list{ display:grid; gap:14px; max-width:920px; margin:26px auto 0; padding:0 4px; }
      .faq__item{
        background:#fff; border:1px solid #e5e7eb; border-radius:16px;
        box-shadow:0 6px 18px rgba(2,6,23,.06), 0 1px 4px rgba(2,6,23,.04);
        overflow:hidden; transition:border-color .2s ease, box-shadow .2s ease;
      }
      .faq__item.is-open{ border-color:rgba(11,79,191,.35); box-shadow:0 8px 20px rgba(11,79,191,.1), 0 2px 6px rgba(2,6,23,.06); }
      .faq__btn{
        position:relative; width:100%; text-align:left; display:flex; align-items:center; justify-content:space-between;
        gap:16px; padding:20px 44px 20px 24px; background:#fff; border:0; border-bottom:1px solid #e5e7eb;
        font-weight:800; font-size:1.05rem; cursor:pointer; color:var(--brand-ink);
      }
      .faq__btn:focus-visible{ outline:2px solid #93c5fd; outline-offset:2px; }
      .faq__btn:hover{ color:var(--brand); background:linear-gradient(180deg,#f9fbff,#ffffff); }
      .faq__btn[aria-expanded="true"]{ color:var(--brand); background:linear-gradient(180deg,#f0f6ff,#ffffff); }
      .faq__btn::after{
        content:""; position:absolute; right:16px; top:50%; width:18px; height:18px; transform:translateY(-50%) rotate(0deg);
        opacity:.65; transition:transform .2s ease, opacity .2s ease;
        background:no-repeat center/contain url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M8 10l4 4 4-4' stroke='%230b4fbf' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/></svg>");
      }
      .faq__btn:hover::after{ opacity:1; }
      .faq__btn[aria-expanded="true"]::after{ transform:translateY(-50%) rotate(180deg); }
      .faq__panel{
        max-height:0; overflow:hidden; padding:0 24px; transition:max-height .25s ease, padding .2s ease; box-sizing:border-box;
        background:linear-gradient(180deg,#ffffff,#f9fbff);
      }
      .faq__item.is-open .faq__panel{ padding:16px 24px 20px; }
      .faq__content{ padding:16px 20px 20px; color:#475569; line-height:1.55; }
      .faq__content p + p{ margin-top:10px; }
      @media (max-width:720px){
        .faq{ padding:60px 16px; }
        .faq__btn{ padding:16px; font-size:1rem; }
        .faq__content{ padding:14px 16px 18px; }
      }

      /* ===== Mentions légales (styles) ===== */
      #mentions-popup{
        display:none; position:fixed; bottom:60px; left:50%; transform:translateX(-50%);
        width:340px; max-width:95vw; background:#fff; color:#111827; border-radius:13px;
        box-shadow:0 8px 32px rgba(0,0,0,.15); padding:18px 20px 12px; z-index:10000;
        font-size:13px; line-height:1.7; border:1px solid #e5e7eb;
      }
      #close-mentions{ position:absolute; top:6px; right:12px; background:none; color:#111827; border:none; font-size:18px; font-weight:bold; cursor:pointer; padding:0; }

      /* ================== FOOTER PROMO ================== */
      .footer-cta{ background:linear-gradient(180deg,#0b4fbf,#0a2e70); color:#fff; padding:48px 20px; }
      .footer-cta__inner{ max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:40px; flex-wrap:wrap; }
      .footer-cta__left{ flex:0 0 340px; display:flex; align-items:center; justify-content:center; }
      .footer-cta__img{ max-width:100%; height:auto; display:block; filter:drop-shadow(0 6px 16px rgba(0,0,0,.25)); }
      .footer-cta__right{ flex:1; min-width:260px; text-align:left; }
      .footer-cta__right h2{ font-size:clamp(20px,2.6vw,28px); margin-bottom:10px; font-weight:800; }
      .footer-cta__right p{ font-size:16px; margin-bottom:18px; line-height:1.55; }
      .footer-cta__right .cta{
        display:inline-block; background:linear-gradient(180deg,#0b4fbf,#0a2e70); color:#fff; font-weight:700; padding:14px 22px;
        border-radius:14px; text-decoration:none; box-shadow:0 8px 22px rgba(6,182,212,.25); transition:filter .25s ease;
      }
      .footer-cta__right .cta:hover{ filter:brightness(1.1); }
      .footer-cta__trust{ font-size:13px; margin-top:10px; opacity:.9; }
      .footer-legal{ text-align:center; margin-top:32px; font-size:13px; color:rgba(255,255,255,.8); }
      .footer-legal span{ cursor:pointer; text-decoration:none; transition:color .2s ease; }
      .footer-legal span:hover{ color:#fff; text-decoration:underline; }
      @media (max-width:760px){
        .footer-cta__inner{ flex-direction:column; text-align:center; gap:24px; }
        .footer-cta__right{ text-align:center; }
      }

      /* === RC — grand bloc récap ============================== */
      .rc{
        background:#0b4fbf; color:#fff; border-radius:12px; padding:22px 20px; text-align:center;
        max-width:var(--costw); width:100%; margin:28px auto; box-shadow:0 8px 18px rgba(10,30,80,.12); display:none;
      }
      .rc__inner{ display:flex; flex-direction:column; align-items:center; gap:16px; }
      .rc__icon svg{ width:60px; height:60px; opacity:.95; }
      .rc__title{ font-size:1.4rem; font-weight:600; margin:0; }
      .rc__row{ font-size:3rem; font-weight:700; line-height:1; }
      .rc__sub{ font-size:1.1rem; opacity:.9; margin-top:4px; }
      .rc__arrow{ display:flex; justify-content:center; margin:12px 0 6px; }
      .rc__arrow svg{ width:70px; height:36px; }
      .rc__arrow path{ fill:none; stroke:#fff; stroke-width:3; stroke-linejoin:round; }
      @media (max-width:700px){ .rc{ padding:24px 16px; } .rc__row{ font-size:2.4rem; } }

      /* === RC-CARDS — même largeur que .rc ==================== */
      #rc-cards.rc-cards{
        display:flex; flex-direction:column; gap:20px; max-width:var(--costw);
        margin:32px auto 0; padding-inline:0;
      }

      /* === RC-CARD — FLEX : icône proche, corps CENTRÉ ========= */
      #rc-cards .rc-card{
        display:flex; align-items:flex-end; justify-content:center; gap:14px;
        background:#1353C9; color:#fff; border-radius:12px; padding:18px 20px;
        box-shadow:0 8px 18px rgba(10,30,80,.12); width:100%; margin:0 auto;
      }
      #rc-cards .rc-card__icon{ flex:0 0 30px; display:flex; align-items:center; justify-content:center; }
      #rc-cards .rc-card__icon svg{ width:26px; height:26px; }
      #rc-cards .rc-card__body{
        flex:0 0 auto; display:grid; row-gap:6px; justify-items:center; text-align:center;
      }
      #rc-cards .rc-card__value{ font-size:clamp(26px,3.5vw,36px); line-height:1.15; justify-self:center; }
      #rc-cards .rc-card__text{ line-height:1.4; opacity:.95; }
      @media (max-width:680px){
        #rc-cards .rc-card{ gap:10px; padding:16px; }
        #rc-cards .rc-card__icon{ flex-basis:26px; }
        #rc-cards .rc-card__icon svg{ width:22px; height:22px; }
        #rc-cards .rc-card__body{ justify-items:center; text-align:center; }
      }

      /* Masquage du texte “Résultats (brut)” */
      #recap h2, #recap-content{ display:none !important; }

      /* Barre de séparation sous le slogan */
      .slogan-sep{
        width: clamp(200px, 55%, 480px);
        height: 4px;
        background:#0b4fbf;
        border-radius:999px;
        margin: 18px auto 26px;
      }

      /* ===== Bloc produit recommandé (image + specs + prix) ===== */
      .prod{ background:#fff; margin:64px auto 0; padding:0 20px; }
      .prod__inner{
        max-width:var(--maxw); margin:0 auto; display:grid;
        grid-template-columns: 420px 1fr; gap:28px; align-items:center;
      }
      .prod__img{ width:100%; height:auto; display:block; max-width:380px; margin:0 auto; }
      .prod__title{ font-weight:900; font-size:clamp(20px,3vw,28px); color:#0f172a; margin:0 0 10px; }
      .prod__specs{ list-style:none; margin:0 0 14px; padding:0; }
      .prod__specs li{ line-height:1.55; color:#475569; margin:6px 0; }
      .prod__price{ font-weight:800; color:#0b4fbf; font-size:clamp(18px,2.6vw,22px); }
      .prod__amount{ font-size:clamp(26px,4.8vw,38px); line-height:1.1; }
      @media (max-width: 900px){ .prod__inner{ grid-template-columns:1fr; text-align:center; } }
      #prod { margin-top: 28px; }
      .prod__specs li { color: #1e293b; font-size: 0.95rem; line-height: 1.55; }
      .prod__price {
        background: #f0f4ff; border-radius: 8px; display: inline-block;
        padding: 6px 12px; margin-top: 10px; font-weight: 700; color: #0b4fbf;
      }
      @media (max-width: 860px){
        .prod__inner { margin-top:12px; align-items:center; }
        .prod__img { max-height:300px; object-fit:contain; }
        .prod__title { font-size:1.1rem; line-height:1.4; }
        .prod__price { display:block; margin:14px auto 0; }
      }
      .prod__title {
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        font-size: clamp(20px, 2.8vw, 28px);
        font-weight: 900; color: #0f172a; margin-bottom: 10px; letter-spacing: -0.3px;
      }
      .prod__specs li { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; font-size: 0.95rem; color: #1e293b; }
      .prod__price { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; font-weight: 800; letter-spacing: -0.2px; }

      /* ===== Bloc autofinancement (après produit) ===== */
      .autofin{
        background:#fff; max-width:var(--maxw); margin:22px auto 0; padding:0 20px; text-align:center;
      }
      .autofin__line{
        font-weight:800; font-size:clamp(20px,2vw,26px); line-height:1.25; color:#0f172a;
      }
      .autofin__line + .autofin__line{ margin-top:4px; }
      .autofin .v{ color:var(--cta-grad-top); }
      .fin-card{
        border:1px solid #e5e7eb; border-radius:12px; padding:20px 24px; max-width:680px; margin:18px auto 0; background:#fff;
      }
      .fin-list{
        display:grid; grid-template-columns: 1fr auto; gap:10px 18px; text-align:left; align-items:center;
      }
      .fin-list dt{ color:#0f172a; font-weight:700; }
      .fin-list dd{ margin:0; font-weight:800; color:var(--cta-grad-top); }
      .fin-legal{ margin-top:12px; font-size:13px; color:#64748b; text-align:center; }
      @media (max-width:560px){
        .fin-list{ grid-template-columns:1fr; }
        .fin-list dd{ text-align:left; }
      }

      /* =========================================================
   [[REPERE: AERATION RESULTATS PRODUIT + FINANCEMENT]]
   Coller ces overrides en fin de <style>
   ========================================================= */

/* Plus d'air autour de la zone produit + meilleure respiration globale */
.prod{ padding: 40px 20px 10px; }
.prod__inner{ gap: 46px; align-items: start; }

/* Contrainte douce de largeur pour éviter les lignes trop longues */
.prod__inner > div:last-child{ max-width: 560px; }

/* Titre : interlignage + marge pour respirer */
.prod__title{ line-height: 1.22; margin-bottom: 14px; }

/* Liste specs : espacement vertical plus généreux */
.prod__specs li{ margin: 8px 0; }

/* Badge prix : un peu plus compact, descendu légèrement */
.prod__price{
  display: inline-flex; align-items: center; justify-content: center;
  padding: 8px 14px; margin-top: 14px; border-radius: 10px;
}

/* Image: un peu plus petite et relevée pour équilibrer */
.prod__img{ max-width: 340px; margin-top: -6px; }

/* Slogan sous les cartes : marge verticale accrue */
#rc-slogan{ margin-top: 46px !important; margin-bottom: 32px !important; }

/* Carte financement : padding + interligne + gaps */
.fin-card{ padding: 24px 26px; }
.fin-list{ gap: 12px 22px; }
.fin-list dt{ line-height: 1.35; }
.fin-list dd{ line-height: 1.35; }

/* Légales: un peu plus légère visuellement */
.fin-legal{ margin-top: 14px; opacity: .9; }

/* Sur écrans moyens/petits, laisser encore plus d'air et resserrer le badge */
@media (max-width: 1024px){
  .prod__inner{ gap: 36px; }
  .prod__img{ max-width: 320px; }
}
@media (max-width: 860px){
  .prod{ padding-top: 32px; }
  .prod__inner{ gap: 20px; }
  .prod__inner > div:last-child{ max-width: 620px; margin-inline: auto; }
  .prod__price{ margin-top: 10px; }
}

 /* ===== Aération bas de bloc autofinancement ===== */
.autofin {
  padding-bottom: 90px; /* +70 à 90px d’air selon ton goût */
}

@media (max-width: 860px) {
  .autofin {
    padding-bottom: 70px; /* un peu moins sur mobile */
  }
}
   /* ===================== PATCH "respiration + badge prix" (v1) ===================== */

/* 1) Bloc résultats : plus d’air au-dessus/au-dessous + léger coussin interne */
#recap{
  margin: 88px auto 56px !important;   /* ↑↑ avant le bleu, ↓↓ avant le footer */
  padding: 28px 22px 18px !important;  /* un peu plus de confort interne */
}

/* 2) Sous-bloc bleu (montant annuel) : padding un poil plus généreux */
#resume-cout.rc{
  padding: 26px 22px !important;
  border-radius: 14px !important;
}

/* 3) Cartes “détail du coût” : espace vertical + lisibilité */
#rc-cards.rc-cards{ gap: 18px !important; }
#rc-cards .rc-card{ padding: 18px 20px !important; }

/* 4) Slogan + séparateur : respiration et lisibilité */
#rc-slogan{
  line-height: 1.35 !important;
  margin: 28px auto 22px !important;
}
.slogan-sep{
  margin: 12px auto 26px !important;
}

/* 5) Bloc produit : grille plus aérée + badge plus léger visuellement */
.prod__inner{ gap: 32px !important; }
.prod__price{
  background: #f3f7ff !important;   /* bleu clair plus doux */
  border: 1px solid #dbe7ff !important;
  padding: 8px 12px !important;      /* moins massif */
  font-weight: 700 !important;       /* au lieu de 800 */
}
.prod__price .prod__amount{
  font-size: clamp(26px,4.8vw,36px) !important; /* justesse typographique */
}

/* 6) Bloc autofinancement : plus d’espace sous le texte/bilan financement */
.autofin{ margin: 22px auto 40px !important; }

/* 7) Avant le footer bleu : vrai palier visuel (fond blanc “qui respire”) */
.footer-cta{ margin-top: 72px !important; }

/* 8) Ajustements mobiles (cohérents avec l’esprit Lovable 2025) */
@media (max-width: 900px){
  #recap{ margin: 72px auto 48px !important; }
  .prod__inner{ gap: 22px !important; }
  .footer-cta{ margin-top: 64px !important; }
}
  #recap{ margin-bottom: 72px !important; }

      /* ===== PATCH V2 : respiration + badge + carte financement ===== */

/* Plus d’air autour du bloc résultats (fond blanc) */
#recap{
  margin: 96px auto 72px !important;   /* ↑ avant / ↓ après */
  padding: 28px 22px !important;
}

/* Slogan + séparation : souffle supplémentaire */
#rc-slogan{ margin: 30px auto 24px !important; line-height: 1.35 !important; }
.slogan-sep{ margin: 14px auto 34px !important; }

/* Bloc produit : grille un peu plus aérée et image mieux “posée” */
.prod{ margin-top: 36px !important; }
.prod__inner{ gap: 36px !important; align-items: center !important; }
.prod__img{ max-width: 420px !important; max-height: 340px !important; object-fit: contain !important; }

/* Badge prix : plus léger mais lisible (contraste OK) */
.prod__price{
  background: #eef5ff !important;
  border: 1px solid #d6e6ff !important;
  box-shadow: 0 4px 12px rgba(11,79,191,.08) !important;
  padding: 8px 14px !important;
  border-radius: 10px !important;
  font-weight: 700 !important;
}
.prod__price .prod__amount{ font-size: clamp(26px,4.6vw,36px) !important; }

/* Bloc autofinancement : carte plus “premium” et respirante */
.autofin{ margin: 24px auto 44px !important; }
.fin-card{
  max-width: 760px !important;
  padding: 24px 26px !important;
  border-radius: 14px !important;
  box-shadow: 0 6px 16px rgba(2,6,23,.05) !important;
}
.fin-list{ row-gap: 12px !important; }
.fin-list dt{ color:#0f172a !important; }
.fin-list dd{ color:#0b4fbf !important; font-weight: 800 !important; }

/* Palier visuel avant le footer bleu */
.footer-cta{ margin-top: 92px !important; }

/* Mobile : compacts mais respirants */
@media (max-width: 900px){
  #recap{ margin: 80px auto 56px !important; }
  .prod__inner{ gap: 24px !important; }
  .footer-cta{ margin-top: 72px !important; }
}
@media (max-width: 560px){
  .prod__img{ max-width: 360px !important; max-height: 300px !important; }
  .fin-card{ padding: 20px 18px !important; }
}
/* ===== PATCH FINAL – souffle haut avant la carte financement ===== */
.autofin {
  margin-top: 28px !important;   /* léger coussin au-dessus */
}

.fin-card {
  margin-top: 24px !important;   /* espace entre la phrase et la carte */
  box-shadow: 0 6px 18px rgba(0,0,0,.04) !important;  /* effet flottant subtil */
}
.fin-tag{
  display:inline-block;
  font-weight:800;
  font-size:.9rem;
  color:#0b4fbf;
  background:#eaf2ff;
  border:1px solid #d6e6ff;
  padding:6px 10px;
  border-radius:999px;
  margin:0 0 12px;
}
.fin-list dd span[id^="fin-"]{ font-weight:800; }
/* --- Finitions bloc produit --- */
.prod__inner{
  grid-template-columns: 340px 1fr;    /* image 340px, texte fluide */
  gap: 26px;                           /* léger resserrage */
  align-items: center;
}

.prod__title{
  margin: 0 0 10px;                    /* -2px vs avant */
  font-size: clamp(20px, 2.1vw, 28px);
  letter-spacing: -.2px;
}

/* Liste technique : plus nette et régulière */
.prod__specs{
  margin: 0 0 14px;
  padding: 0;
  list-style: none;
  display: grid;
  row-gap: 8px;                        /* rythme constant */
}
.prod__specs li{
  color:#0f172a;
  line-height: 1.45;
  position: relative;
  padding-left: 16px;                  /* puce custom */
}
.prod__specs li::before{
  content: "";
  position: absolute; left: 0; top: 0.7em;
  width: 6px; height: 6px; border-radius: 50%;
  background: #0b4fbf;                 /* puce bleue */
  transform: translateY(-50%);
}

/* Badge prix : alignement base-line + compacité */
.prod__price{
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 10px 14px;
  background: #eaf2ff;
  border: 1px solid #cfe0ff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(11,63,145,.08);
}
.prod__amount{
  font-weight: 800;
  font-size: clamp(22px, 3.6vw, 32px);
  line-height: 1;
}

/* Mobile : un peu plus d’air sous l’image */
@media (max-width: 860px){
  .prod__inner{ grid-template-columns: 1fr; gap: 18px; }
}

.prod__inner {
  margin-bottom: 42px; /* pour donner un peu d'air avant le bloc suivant */
}

.prod__price { margin-top: 12px; }

/* --- Bloc promo Lovable 2025 avec halo lumineux amélioré --- */
.promo2025 {
  position: relative;
  background: linear-gradient(180deg, #f9fafc 0%, #f2f4f7 100%);
  border-radius: 30px;
  box-shadow: 0 18px 42px rgba(15,23,42,0.06);
  padding: clamp(64px,7vw,88px) 24px;  /* plus haut et plus fluide */
  margin: 50px auto 90px;  /* espace plus équilibré */
  max-width: 880px;
  text-align: center;
  transition: transform .3s ease, box-shadow .3s ease;
  overflow: hidden;
}

.promo2025::before {
  content: "";
  position: absolute;
  inset: -60px;  /* halo plus large */
  background: radial-gradient(
    circle at center,
    rgba(33,112,255,0.16) 0%,
    rgba(33,112,255,0.07) 45%,
    transparent 80%
  );
  z-index: 0;
  transition: opacity .4s ease;
  opacity: 0.9;
}

.promo2025:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 46px rgba(15,23,42,0.08);
}
.promo2025:hover::before {
  opacity: 1;
}

.promo2025__inner {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
}

.promo2025__emoji {
  font-size: 42px;
  margin-bottom: 16px;
  opacity: .9;
}

.promo2025__text {
  font-size: clamp(20px,2.2vw,24px);
  color: #0f172a;
  font-weight: 500;
  letter-spacing: -0.2px;
  line-height: 1.45;
  margin-bottom: 10px;
}

.promo2025__text strong {
  color: #0b4fbf;
  font-weight: 700;
}

.promo2025__sub {
  font-size: clamp(14px,1.4vw,15px);
  color: #64748b;
  margin-top: 12px;
  font-weight: 400;
}

/* --- Badge verre dépoli (Lovable 2025) --- */
.promo2025__inner { position: relative; }

.promo2025__badge{
  position: relative;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: -6px auto 14px;               /* rapproche du 🎁 sans coller */
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,.55);     /* verre dépoli */
  border: 1px solid rgba(255,255,255,.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow:
    0 6px 18px rgba(15,23,42,.08),
    inset 0 1px 0 rgba(255,255,255,.6);
  color: #0b4fbf;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
  line-height: 1;
  transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
}

.promo2025__badge::before{
  content:"";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0b4fbf;
  box-shadow: 0 0 0 4px rgba(11,79,191,.12);
}

@keyframes promoBadgePulse{
  0%   { box-shadow: 0 0 0 0 rgba(11,79,191,.22); }
  70%  { box-shadow: 0 0 0 12px rgba(11,79,191,0); }
  100% { box-shadow: 0 0 0 0 rgba(11,79,191,0); }
}

.promo2025__badge::after{
  content:"";
  position:absolute;
  inset:-4px;
  border-radius: inherit;
  pointer-events:none;
  animation: promoBadgePulse 2.6s ease-out infinite;
}

.promo2025:hover .promo2025__badge{
  transform: translateY(-1px);
  box-shadow:
    0 10px 24px rgba(15,23,42,.10),
    inset 0 1px 0 rgba(255,255,255,.65);
}
/* === Tweaks Lovable 2025 – Bandeau promo === */
.promo2025{
  /* respiration interne un peu plus généreuse */
  padding: clamp(56px, 6vw, 84px) 22px;
  /* espace externe plus court au-dessus, plus long dessous */
  margin: 48px auto 110px;
  max-width: 960px; /* un chouïa plus large pour l'effet "hero" */
}

/* Halo recentré et un peu plus dense au milieu */
.promo2025::before{
  inset: -28px; /* halo moins étalé */
  background: radial-gradient( circle at center,
    rgba(33,112,255,.18) 0%,
    rgba(33,112,255,.10) 32%,
    rgba(33,112,255,.04) 54%,
    transparent 72%
  );
  opacity: .9;
}

/* l’inner reste identique mais on accepte un contenu plus large */
.promo2025__inner{ max-width: 760px; }

/* Badge plus proche du texte, un peu plus “chip” */
.promo2025__badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.65);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 10px rgba(15,23,42,.06), inset 0 0 0 1px rgba(11,79,191,.12);
  font-size: 12px;
  font-weight: 600;
  color:#0b4fbf;
  margin: 0 auto 10px;
}

/* Emoji + titre plus “hero” */
.promo2025__emoji{ font-size: 54px; margin: 12px 0 10px; }
.promo2025__text{
  font-size: clamp(22px, 2.4vw, 26px);
  letter-spacing: -.2px;
}
.promo2025__text strong{ font-weight: 800; }

/* Sous-texte un rien plus doux et resserré */
.promo2025__sub{
  font-size: clamp(13px,1.35vw,14px);
  color: #6b7a90;
  margin-top: 12px;
}

/* Mobile: on resserre un peu pour éviter le “gros coussin” */
@media (max-width: 640px){
  .promo2025{ padding: 52px 18px; margin: 42px auto 96px; }
  .promo2025__emoji{ font-size: 48px; }
  .promo2025__badge{ font-size: 11px; padding: 5px 9px; }
  .promo2025__text{ font-size: 20px; }
}

   /* ===== Overlay résultats (masque sous le 1er bloc) ===== */
#recap{ position: relative; }
#gate-overlay{
  position: absolute;
  left: 0;
  right: 0;
  /* top sera fixé en JS = bas de #resume-cout */
  bottom: 0;
  z-index: 50;
  display: none;                /* activé en JS */
  pointer-events: auto;
}
#gate-overlay.is-visible{ display:block; }

#gate-overlay .gate-dim{
  position: absolute; inset: 0;
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

#gate-overlay .gate-card{
  position: sticky;       /* suit le scroll dans la zone masquée */
  top: min(18vh, 140px);
  margin: 24px auto;
  max-width: 720px;
  background: #0b1220;
  color: #fff;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.18);
  box-shadow: 0 16px 48px rgba(0,0,0,.28);
  padding: 22px 20px;
}
.gate-card__title{
  font-weight: 800; font-size: clamp(18px,2.4vw,22px);
  margin-bottom: 6px; text-align:center;
}
.gate-card__sub{
  color:#cbd5e1; text-align:center; line-height:1.45; margin-bottom: 14px;
}
.gate-bullets{
  display:flex; gap:10px; justify-content:center; flex-wrap:wrap;
  color:#e2e8f0; font-weight:600; margin: 6px 0 12px;
}
.gate-bullets span{ display:inline-flex; align-items:center; gap:6px; }

.gate-form{ display:grid; gap:10px; grid-template-columns:1fr 1fr; }
.gate-form .full{ grid-column: 1 / -1; }
.gate-input{
  width:100%; height:48px; border-radius:12px; border:1px solid rgba(255,255,255,.22);
  background: rgba(255,255,255,.06); color:#fff; padding:0 12px; font-weight:600;
}
.gate-input::placeholder{ color:#cbd5e1; opacity:.85; }
.gate-cta{
  height:52px; border-radius:14px; border:1px solid rgba(255,255,255,.28);
  background: linear-gradient(180deg, var(--cta-grad-top), var(--cta-grad-bot));
  color:#fff; font-weight:800; cursor:pointer;
}
.gate-consent{ font-size:12px; color:#cbd5e1; text-align:center; margin-top:8px; }

@media (max-width: 700px){
  #gate-overlay .gate-card{ top: 10vh; }
  .gate-form{ grid-template-columns:1fr; }
}

/* Impression: jamais d’overlay */
@media print{
  #gate-overlay{ display:none !important; }
}

 /* ===== Fix lisibilité cartes coût sur mobile ===== */
@media (max-width: 720px){
  #rc-cards .rc-card{
    align-items: center !important;     /* au lieu de flex-end */
    justify-content: center; 
    flex-direction: column;             /* empile icône, valeur, texte */
    text-align: center;
    padding: 16px 18px;
  }
  #rc-cards .rc-card__icon{
    flex-basis: auto;
    margin: 2px 0 6px;
  }
  #rc-cards .rc-card__body{
    display: block; 
    max-width: 92%;
    margin: 0 auto;
  }
  #rc-cards .rc-card__value{
    font-size: clamp(22px, 7.8vw, 34px);
    line-height: 1.15;
    margin-bottom: 6px;
  }
  #rc-cards .rc-card__text{
    white-space: normal;          /* wrap classique */
    overflow-wrap: anywhere;      /* casse si mot trop long */
    word-break: break-word;       /* sécurité */
    line-height: 1.4;
  }
}
/* CTA overlay – lisibilité et présence renforcées */
#gate-overlay .gate-card .gate-cta{
  font-size: clamp(19px, 2.6vw, 24px); /* + lisible sur desktop */
  font-weight: 800;
  height: clamp(52px, 6vw, 58px);
  padding-inline: 22px;
  line-height: 1.1;
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
}

/* États interactifs cohérents */
#gate-overlay .gate-card .gate-cta:hover{
  filter: brightness(1.08);
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(11,79,191,.28), inset 0 2px 4px rgba(255,255,255,.08);
}
#gate-overlay .gate-card .gate-cta:active{
  transform: translateY(0);
  filter: brightness(1.02);
}
#gate-overlay .gate-card .gate-cta:focus-visible{
  outline: 2px solid #93c5fd;
  outline-offset: 3px;
}

/* CSS du footer (précédemment inline) */
.footer-contact-glow{
  text-align:center;
  margin-top:18px;
  margin-bottom:6px;
}

/* Bouton */
.footer-contact-glow .cta-call{
  position:relative;
  display:inline-block;
  padding:10px 20px;
  color:#fff;
  text-decoration:none;
  font-weight:600;
  letter-spacing:.2px;
  border-radius:40px;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.15);
  overflow:hidden;
  transition:transform .25s ease, box-shadow .25s ease, background .25s ease;
}

/* Anneau en rotation “Vercel-style” */
.footer-contact-glow.orbit .cta-call::before{
  content:"";
  position:absolute;
  inset:-2px;
  border-radius:inherit;
  background:
    conic-gradient(
      from 0deg,
      rgba(33,112,255,.00) 0deg,
      rgba(33,112,255,.55) 90deg,
      rgba(33,112,255,.00) 180deg,
      rgba(33,112,255,.45) 270deg,
      rgba(33,112,255,.00) 360deg
    );
  filter:blur(10px);
  opacity:.55;
  animation:orbitSpin 6s linear infinite;
  z-index:0;
  pointer-events:none;
}

/* Voile interne très doux pour l’aspect “verre” */
.footer-contact-glow.orbit .cta-call::after{
  content:"";
  position:absolute;
  inset:1px;
  border-radius:inherit;
  background:linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.06));
  backdrop-filter:blur(4px);
  -webkit-backdrop-filter:blur(4px);
  z-index:1;
  pointer-events:none;
}

/* Contenu au-dessus des effets */
.footer-contact-glow .cta-call > *{
  position:relative;
  z-index:2;
}

/* Hover : un peu plus lumineux + légère élévation */
.footer-contact-glow .cta-call:hover{
  background:rgba(255,255,255,.12);
  box-shadow:0 10px 28px rgba(11,79,191,.35);
  transform:translateY(-1px);
}

/* Texte “Conseiller local” légèrement adouci */
.footer-contact-glow span{
  opacity:.9;
  font-weight:500;
}

/* Animation rotation */
@keyframes orbitSpin{
  to{ transform:rotate(360deg); }
}

/* Accessibilité : motion reduce */
@media (prefers-reduced-motion: reduce){
  .footer-contact-glow.orbit .cta-call::before{
    animation:none;
    opacity:.35;
  }
}

/* Responsive */
@media (max-width:600px){
  .footer-contact-glow .cta-call{
    font-size:15px;
    padding:9px 16px;
  }
}
