// ====== Configuración: cambia estos datos ======
const TELEFONO_WHATSAPP = "00000000000"; // código de país + número, sin + ni espacios
const MENSAJE_WHATSAPP = "Hola doctor, quisiera pedir una consulta.";

// ====== Curso: enlace de pago y precio ======
const PRECIO_CURSO = "[Precio]";      // por ejemplo "$25 USD"
const ENLACE_PAGO = "";               // pega aquí tu enlace de pago (por ejemplo, el de QvaPay)
const MENSAJE_PAGO_CUBA = "Hola doctor, quiero comprar el curso de tiroides y pagar desde Cuba.";

const precio = document.getElementById("precio");
if (precio) precio.textContent = PRECIO_CURSO;

const btnPago = document.getElementById("btn-pago");
if (btnPago) {
  if (ENLACE_PAGO) {
    btnPago.href = ENLACE_PAGO;
    btnPago.target = "_blank";
    btnPago.rel = "noopener";
  } else {
    btnPago.addEventListener("click", (e) => {
      e.preventDefault();
      alert("El pago estará disponible muy pronto. Mientras tanto, usa la opción Pagar desde Cuba.");
    });
  }
}

const btnPagoCuba = document.getElementById("btn-pago-cuba");
if (btnPagoCuba) {
  btnPagoCuba.href =
    "https://wa.me/" + TELEFONO_WHATSAPP + "?text=" + encodeURIComponent(MENSAJE_PAGO_CUBA);
  btnPagoCuba.target = "_blank";
  btnPagoCuba.rel = "noopener";
}

// ====== 1. Año automático en el pie de página ======
const anio = document.getElementById("anio");
if (anio) anio.textContent = new Date().getFullYear();

// ====== 2. Botón de WhatsApp con mensaje prellenado ======
const botonWhatsApp = document.getElementById("btn-whatsapp");
if (botonWhatsApp) {
  botonWhatsApp.href =
    "https://wa.me/" + TELEFONO_WHATSAPP + "?text=" + encodeURIComponent(MENSAJE_WHATSAPP);
}

// ====== 3. Resaltar en el menú la sección que se está viendo ======
const enlaces = document.querySelectorAll("nav a[href^='#']");
const secciones = [...enlaces]
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        enlaces.forEach((a) =>
          a.classList.toggle("activo", a.getAttribute("href") === "#" + entrada.target.id)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  secciones.forEach((s) => observador.observe(s));
}

// ====== 4. Un solo video suena a la vez ======
const videos = document.querySelectorAll(".lista-videos video");
videos.forEach((v) =>
  v.addEventListener("play", () => videos.forEach((o) => o !== v && o.pause()))
);

// ====== 5. Menú en celulares ======
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu-principal");
if (menuBtn && menu) {
  const cerrar = () => {
    menu.classList.remove("abierto");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menú");
  };
  menuBtn.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    menuBtn.setAttribute("aria-expanded", String(abierto));
    menuBtn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrar));
  window.addEventListener("resize", () => { if (window.innerWidth > 768) cerrar(); });
}
