const lista2listak = document.querySelectorAll(".lista-2");
const lista1elemek = document.querySelectorAll(".lista-1 > li");
let touchStarted = false;
function setupListeners() {
  for (const elem of lista1elemek) {
    elem.addEventListener("mouseenter", handleMouseEnter);
    elem.addEventListener("touchstart", handleTouchStart);
    elem.addEventListener("click", handleTouchStart);
  }

  window.addEventListener("resize", handleResize);
  document.querySelectorAll(".l2b").forEach((gomb) => {
    gomb.addEventListener("touchstart", handleL2bTouchStart);
  });
  document
    .querySelector("#menu-icon")
    .addEventListener("touchstart", handleMenuIconTouchStart);
}

function handleMouseEnter(evt) {
  if (!touchStarted && window.innerWidth > 1200 && window.screen.width > 1200) {
    elrejtVagyMutat(false, lista2listak);
    lista1elemek.forEach((elem) => elem.classList.remove("lista-1-hover"));
    evt.target.classList.add("lista-1-hover");
    evt.target.nextElementSibling?.classList.add("lista-2");
  }
}

function handleTouchStart(evt) {
  lista1elemek.forEach((elem) =>
    elem.removeEventListener("mouseenter", handleMouseEnter)
  );
  touchStarted = true;
  lista1elemek.forEach((elem) => elem.classList.remove("lista-1-hover"));
  const firstChild = evt.target.firstElementChild;
  const isFirstChildAnchor = firstChild && firstChild.tagName === "A";

  if (!isFirstChildAnchor) {
    elrejtVagyMutat(false, lista2listak);
    const isTablet = window.innerWidth <= 1200 && window.innerWidth > 810;
    const isMobile = window.innerWidth <= 810;

    if (isTablet) {
      evt.target.nextElementSibling?.classList.add("ontablet2");
    } else if (isMobile) {
      elrejtVagyMutat(false, lista1elemek);
      elrejtVagyMutat(false, lista2listak);
      evt.target.nextElementSibling?.classList.add("onmobile2");
    }
  }
}

function handleL2bTouchStart(evt) {
  evt.target.parentElement.classList.remove("onmobile2");
  elrejtVagyMutat(true, lista1elemek);
}

function handleMenuIconTouchStart(evt) {
  if (evt.target.checked) {
    elrejtVagyMutat(true, lista2listak);
  }
}

function handleResize() {
  lista2listak.forEach((item, index) => {
    item.style.justifyContent =
      index === 3 ? "center" : index === 0 ? "left" : "right";
  });

  const keresesElement = document.getElementById("kereses");
  if (window.innerWidth <= 1200) {
    keresesElement.src = "css/searchiconmt.png";
  } else {
    keresesElement.src = "";
  }
}

function elrejtVagyMutat(mutat, lista) {
  for (const elem of lista) {
    elem.style.display = mutat ? "block" : "none";
    if (lista === lista2listak) {
      elem.classList.toggle("lista-2", mutat);
    }
    elem.classList.remove("ontablet2");
  }
}

setupListeners();
