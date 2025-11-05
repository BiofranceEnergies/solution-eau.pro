/* =======================================================================
   creadou50.js — LP Adoucisseur (Solution-Eau.pro)
   - Init unique et visible
   - Calculs simples (mock) pour l’exemple
   - Overlay (lead gate) + FAQ + Mentions
   ======================================================================= */

(function () {
  "use strict";

  /* ========================= CONFIG ========================= */
  const CFG = {
    GATE_KEY: "se_gate_unlocked",
    GATE_FORCE_PARAM: "lock",

    // Valeurs par défaut si pas d’inputs avancés
    defaultInputs: {
      kwhEau: 0,                 // non utilisé ici (version eau)
      factureAnnuelle: 1200,     // €
      coutProduitsAnnuels: 220,  // lessive, ménagers, dermato
      coutEnergieECS: 300,       // énergie liée à l'ECS/machines
      entretienMateriels: 60,    // détartrants/pannes
      gainEnergiePct: 18,        // 18% d'énergie économisée
      gainProduitsPct: 40,       // 40% de produits en moins
      dureeProjection: 10        // années
    },

    // Produit/Financement (exemple)
    produitPrixTTC: 1890,
    financement: {
      dureeMois: 60,
      taegPct: 6.5,
      mensualiteEstimee: 39
    }
  };

  /* ====================== HELPERS DOM ======================= */
  const $ = (sel, root = document) => root.querySelector(sel);

  function fmtMoney(n) {
    const v = Math.round(Number(n) || 0);
    return v.toLocaleString("fr-FR") + " €";
  }

  function show(el, yes = true) {
    if (!el) return;
    el.style.display = yes ? "" : "none";
  }

  /* ====================== CALCULS (mock) ==================== */
  function compute(inputs) {
    const i = { ...CFG.defaultInputs, ...inputs };

    // Gains produits : 40% de 220 €
    const gainProd = (i.gainProduitsPct / 100) * i.coutProduitsAnnuels;

    // Gains énergie : 18% de 300 €
    const gainEnergie = (i.gainEnergiePct / 100) * i.coutEnergieECS;

    // Matériel / entretien (forfait simple)
    const gainMateriel = i.entretienMateriels;

    const totalAnnuel = gainProd + gainEnergie + gainMateriel;
    const total10ans = totalAnnuel * i.dureeProjection;

    return {
      annual: Math.round(totalAnnuel),
      tenYears: Math.round(total10ans),
      parts: {
        prod: Math.round(gainProd),
        energie: Math.round(gainEnergie),
        materiel: Math.round(gainMateriel)
      }
    };
  }

  /* =================== AFFICHAGE RÉSULTATS ================== */
  function renderResults(r) {
    // Résumé
    $("#rc-annual") && ($("#rc-annual").textContent = fmtMoney(r.annual));
    $("#rc-10ans") && ($("#rc-10ans").textContent = fmtMoney(r.tenYears));

    // Cartes
    $("#rc-val-prod") && ($("#rc-val-prod").textContent = r.parts.prod);
    $("#rc-val-energie") && ($("#rc-val-energie").textContent = r.parts.energie);
    $("#rc-val-materiel") && ($("#rc-val-materiel").textContent = r.parts.materiel);

    // Produit + financement (exemple)
    const prix = CFG.produitPrixTTC;
    $("#prod-prix") && ($("#prod-prix").textContent = fmtMoney(prix));

    $("#af-total")   && ($("#af-total").textContent = fmtMoney(r.annual));
    $("#fin-capital")&& ($("#fin-capital").textContent = fmtMoney(prix));
    $("#fin-mensu")  && ($("#fin-mensu").textContent = CFG.financement.mensualiteEstimee.toLocaleString("fr-FR"));
    $("#fin-duree")  && ($("#fin-duree").textContent = CFG.financement.dureeMois);
    $("#fin-taeg")   && ($("#fin-taeg").textContent = CFG.financement.taegPct.toString().replace(".", ","));
    $("#fin-total")  && ($("#fin-total").textContent = fmtMoney(CFG.financement.mensualiteEstimee * CFG.financement.dureeMois));

    // Afficher les blocs
    show($("#recap"), true);
    show($("#resume-cout"), true);
    show($("#prod"), true);
    show($("#autofin"), true);
  }

  /* ========================= FORM =========================== */
  function bindForm() {
    const form = $("#form-estimation");
    if (!form) {
      console.warn("[init] #form-estimation introuvable");
      return;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Récup basique
      const foyer = $("#foyer")?.value || "";
      const peau  = $("#peau")?.checked ? 1 : 0;

      // On pourrait pondérer selon foyer/peau => ici on reste simple
      const res = compute({});

      renderResults(res);

      // Lead-gate si pas déjà déverrouillé
      const unlocked = localStorage.getItem(CFG.GATE_KEY) === "1";
      if (!unlocked) openGate();
    });

    console.log("[init] Form bind OK");
  }

  /* ======================== GATE ============================ */
  function openGate() {
    const gate = $("#gate-overlay");
    if (!gate) return;

    show(gate, true);

    const form = $("#gate-form");
    if (form && !form.__bound) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const tel = $("#gate-phone")?.value.trim();
        if (!tel) {
          alert("Le téléphone est obligatoire.");
          return;
        }
        // Ici : envoi au Apps Script si besoin
        localStorage.setItem(CFG.GATE_KEY, "1");
        show($("#gate-overlay"), false);
      });
      form.__bound = true;
    }
  }

  function maybeForceGate() {
    const usp = new URLSearchParams(location.search);
    if (usp.has(CFG.GATE_FORCE_PARAM)) {
      localStorage.removeItem(CFG.GATE_KEY);
    }
  }

  /* ======================== FAQ ============================= */
  function bindFAQ() {
    document.querySelectorAll(".faq__item").forEach((it) => {
      const btn = it.querySelector(".faq__btn");
      const panel = it.querySelector(".faq__panel");
      if (!btn || !panel) return;

      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        // Fermer les autres
        document.querySelectorAll(".faq__btn[aria-expanded='true']").forEach((b) => {
          if (b !== btn) {
            b.setAttribute("aria-expanded", "false");
            const p = b.closest(".faq__item")?.querySelector(".faq__panel");
            if (p) p.style.maxHeight = "0px";
            b.closest(".faq__item")?.classList.remove("is-open");
          }
        });

        btn.setAttribute("aria-expanded", open ? "false" : "true");
        it.classList.toggle("is-open", !open);
        if (!open) {
          panel.style.maxHeight = "none";
          const h = panel.scrollHeight;
          panel.style.maxHeight = h + "px";
        } else {
          panel.style.maxHeight = "0px";
        }
      });
    });
  }

  /* ====================== MENTIONS ========================== */
  function bindMentions() {
    const link = $("#mentions-legales-link");
    const pop  = $("#mentions-popup");
    const close= $("#close-mentions");
    if (!link || !pop) return;

    link.addEventListener("click", () => {
      pop.classList.add("open");
      pop.setAttribute("aria-modal", "true");
      show(pop, true);
    });
    close && close.addEventListener("click", () => {
      pop.classList.remove("open");
      pop.removeAttribute("aria-modal");
      show(pop, false);
    });
    pop.addEventListener("click", (e) => {
      if (e.target === pop) {
        pop.classList.remove("open");
        pop.removeAttribute("aria-modal");
        show(pop, false);
      }
    });
  }

  /* ======================== INIT ============================ */
  function __initApp() {
    bindForm();
    bindFAQ();
    bindMentions();
    maybeForceGate();
    console.log("[init] App OK");
  }

  // Expose si besoin
  window.__initApp = __initApp;

  document.addEventListener("DOMContentLoaded", __initApp);
})();
