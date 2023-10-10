const lista2listak = document.querySelectorAll(".lista-2");
const lista1elemek = document.querySelectorAll(".lista-1 > li");
const keresesElement = document.getElementById("kereses");
let touchStarted = false;

function setupListeners() {
  if (window.innerWidth > 1200 && window.screen.width > 1200) {
    keresesElement.src = "css/searchicon.png";
    lista2listak.forEach((item, index) => {
      item.style.justifyContent =
        index === 3 ? "center" : index <= 2 ? "left" : "right";
    });
    lista1elemek[0].classList.add("lista-1-hover");
    lista1elemek.forEach((li) =>
      li.addEventListener("mouseenter", handleMouseEnter)
    );
  } else {
    lista1elemek.forEach((li) => {
      li.addEventListener("touchstart", handleTouchStart);
      li.addEventListener("click", handleTouchStart);
    });
    document.querySelectorAll(".l2b").forEach((gomb) => {
      gomb.addEventListener("touchstart", handleL2bTouchStart);
    });
    document
      .querySelector("#menu-icon")
      .addEventListener("touchstart", handleMenuIconTouchStart);
    keresesElement.src = "css/searchiconmt.png";
  }
  window.addEventListener("resize", handleResize);
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
  touchStarted = true;
  lista1elemek.forEach((elem) => elem.classList.remove("lista-1-hover"));
  if (evt.target.tagName === "A") {
    return;
  } else {
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
  if (window.innerWidth <= 1200 && window.screen.width <= 1200) {
    lista2listak.forEach((item) => {
      item.style.justifyContent = "left";
    });
    lista1elemek.forEach((li) => {
      li.classList.remove("lista-1-hover");
    });
    keresesElement.src = "css/searchiconmt.png";
  } else {
    touchStarted = false;
    keresesElement.src = "css/searchicon.png";
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
