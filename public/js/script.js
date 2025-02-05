const lista2listak = document.querySelectorAll(".lista-2");
const lista1elemek = document.querySelectorAll(".lista-1 > li");
const keresesElement = document.getElementById("kereses");
let touchStarted = false;

function setupListeners() {
  if (
    window.innerWidth > 1200 &&
    window.screen.width > 1200 &&
    window.outerWidth > 1200
  ) {
    touchStarted = false;
    keresesElement.src = "/css/searchicon.png";
    lista2listak.forEach((item, index) => {
      item.style.justifyContent =
        index === 3 ? "center" : index <= 2 ? "left" : "right";
    });
    lista1elemek[0].classList.add("lista-1-hover");
    lista1elemek.forEach((li) =>
      li.addEventListener("mouseenter", handleMouseEnter)
    );
  } else {
    touchStarted = true;
    lista2listak.forEach((item) => (item.style.justifyContent = "center"));
    lista1elemek.forEach((li) => li.classList.remove("lista-1-hover"));
    lista1elemek.forEach((li) => {
      li.addEventListener("click", handleTouchStart);
    });
    document.querySelectorAll(".l2b").forEach((gomb) => {
      gomb.addEventListener("click", handleL2bTouchStart);
    });
    document
      .querySelector("#menu-icon")
      .addEventListener("click", handleMenuIconTouchStart);
    keresesElement.src = "/css/searchiconmt.png";
  }
}

window.addEventListener("resize", setupListeners);

function handleMouseEnter(evt) {
  if (!touchStarted && window.innerWidth > 1200 && window.screen.width > 1200) {
    elrejtVagyMutat(false, lista2listak);
    lista1elemek.forEach((elem) => elem.classList.remove("lista-1-hover"));
    evt.target.classList.add("lista-1-hover");
    evt.target.nextElementSibling?.classList.add("lista-2");
  }
}

function handleTouchStart(evt) {
  console.log(evt.target);
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
      evt.target.nextElementSibling.classList.add("onmobile2");
      console.log(evt.target.nextElementSibling);
    }
  }
}

function handleL2bTouchStart(evt) {
  evt.target.parentElement.classList.remove("onmobile2");
  elrejtVagyMutat(true, lista1elemek);
}

function handleMenuIconTouchStart(evt) {
  if (evt.target.checked) {
    elrejtVagyMutat(false, lista2listak);
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

for (elem of lista2listak) {
  elem.style.display = "none";
}

setupListeners();
