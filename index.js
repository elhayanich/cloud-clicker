//* Variables
//? score
let score = 0;
let scoreMultiplier = 1;
let storedScore = parseInt(localStorage.getItem("score"));
//? nom du joueur
let playerName = localStorage.getItem("playerName");
//? les bonus
const bonus1 = {
  element: document.querySelector("#bonus-1"),
  isUnlocked: false,
  cost: 90,
  amount: 0,
  storedAmount: 0,
};
const bonus2 = {
  element: document.querySelector("#bonus-2"),
  isUnlocked: false,
  cost: 250,
  amount: 0,
  storedAmount: 0,
};
const bonus3 = {
  element: document.querySelector("#bonus-3"),
  isUnlocked: false,
  cost: 500,
  amount: 0,
  storedAmount: 0,
};
let anyActiveBonus = false;
//? les paliers (à définir)
steps = [100, 500, 1500, 3000];
let reachedStep1 = false;
let reachedStep2 = false;
let reachedStep3 = false;
let reachedStep4 = false;
//? noeuds HTML
//! --Body
const body = {
  backgroundImage: document.querySelector("main"),
  scoreDisplay: document.querySelector("#score-display"),
  cloud: document.querySelector("#clicker"),
};
//! --Header
const header = {
  userName: document.querySelector(".name"),
  overlay: document.querySelector(".overlay"),
  popup: document.querySelector(".popup"),
  popupInput: document.querySelector(".popup-input"),
  popupSubmit: document.querySelector(".popup-submit"),
  burgerMenu: document.querySelector(".burger-menu"),
  menuList: document.querySelector(".menu-list"),
};

//* Fonctions, événements & affectations
//? fonction pour initialiser l'état du jeu au démarrage
function checkState() {
  checkName();
  checkScore();
  checkBonuses();
}
checkState();
//? fonction pour remplacer "Your Name" par la valeur stockée dans localStorage (si elle existe)
function checkName() {
  if (playerName !== "" && playerName != null) {
    header.userName.textContent = playerName;
  }
}
//? fonction qui remplace la valeur par défaut du score si une autre valeur existe dans localStorage
function checkScore() {
  if (!isNaN(storedScore) && storedScore != null) {
    body.scoreDisplay.innerHTML = storedScore;
    score = storedScore;
    checkStep();
  }
}
//?
function checkBonuses() {
  if (
    !isNaN(localStorage.getItem("bonus-1")) &&
    localStorage.getItem("bonus-1") != null
  ) {
    bonus1.storedAmount = parseInt(localStorage.getItem("bonus-1"));
    bonus1.amount = bonus1.storedAmount;
    activeBonus();
  }
  if (
    !isNaN(localStorage.getItem("bonus-2")) &&
    localStorage.getItem("bonus-2") != null
  ) {
    bonus2.storedAmount = parseInt(localStorage.getItem("bonus-2"));
    bonus2.amount = bonus2.storedAmount;
    activeBonus();
  }
  if (
    !isNaN(localStorage.getItem("bonus-3")) &&
    localStorage.getItem("bonus-3") != null
  ) {
    bonus3.storedAmount = parseInt(localStorage.getItem("bonus-3"));
    bonus3.amount = bonus3.storedAmount;
    activeBonus();
  }
}
//? fonction qui va s'occuper de changer l'arrière-plan

// Fonction pour gérer le clignotement des boutons bonus
function blinkBonus(element) {
  element.classList.add("blinking");
  setTimeout(function () {
    element.classList.remove("blinking");
  }, 3000);
}

// Fonction qui ajoute un petit check à coté du palier dés qu'il est atteint + glow bonus + clignotement bonus
function checkStep() {
  if (!reachedStep1) {
    if (score >= steps[0] && score < steps[1]) {
      reachedStep1 = true;
      body.backgroundImage.style.backgroundImage =
        "url(./assets/Background-2.png)";
      scoreMultiplier = 2;
      bonus1.isUnlocked = true;
      bonus1.element.classList.add("bonus-glow");
      document.querySelectorAll(".grid-item")[0].classList.add("reached");
      blinkBonus(bonus1.element);
    }
  }
  if (!reachedStep2) {
    if (score >= steps[1] && score < steps[2]) {
      reachedStep1 = true;
      reachedStep2 = true;
      body.backgroundImage.style.backgroundImage =
        "url(./assets/background-3.png)";
      scoreMultiplier = 4;
      bonus2.isUnlocked = true;
      bonus2.element.classList.add("bonus-glow");
      document.querySelectorAll(".grid-item")[1].classList.add("reached");
      blinkBonus(bonus2.element);
    }
  }
  if (!reachedStep3) {
    if (score >= steps[2] && score < steps[3]) {
      reachedStep1 = true;
      reachedStep2 = true;
      reachedStep3 = true;
      body.backgroundImage.style.backgroundImage =
        "url(./assets/background-4.png)";
      scoreMultiplier = 8;
      bonus3.isUnlocked = true;
      bonus3.element.classList.add("bonus-glow");
      document.querySelectorAll(".grid-item")[2].classList.add("reached");
      blinkBonus(bonus3.element);
    }
  }
  if (!reachedStep4) {
    if (score >= steps[3]) {
      // Gérer le dernier palier ( À revoir : le joueur doit pouvoir continuer à jouer (?))
      reachedStep4;
      document.querySelectorAll(".grid-item")[3].classList.add("reached");
    }
    if (score >= steps[3]) {
      body.backgroundImage.classList.add("blur-background");
      const messageElement = document.createElement("div");
      messageElement.textContent =
        "You fulfilled your mission. Enjoy eternity in paradise!";
      messageElement.classList.add("message");
      document.body.appendChild(messageElement);
    } /*  else {
      body.backgroundImage.classList.remove("blur-background");
    } */ /* ^ n'est pas utilisé */
  }
}

// fonction qui change l'affichage du score
function updateScore() {
  body.scoreDisplay.innerHTML = score;
  localStorage.setItem("score", score);
  checkStep();
}

// fonction qui gère l'augmentation du score
function augmentScore(a) {
  score = score + a * scoreMultiplier;
  updateScore();
}
function bonusAugmentScore() {
  /* augmentScore(bonus1.amount + bonus2.amount + bonus3.amount); */
  score += bonus1.amount + bonus2.amount * 3 + bonus3.amount * 5;
  updateScore();
}
// événement qui augmente le score à chaque fois qu'on clicke sur le nuage
body.cloud.addEventListener("click", () => {
  augmentScore(1);
});
//? fonctions pour les bonus
function activeBonus() {
  if (anyActiveBonus != true) {
    setInterval(bonusAugmentScore, 1000);
    anyActiveBonus = true;
  }
}
// bonus#1
bonus1.element.addEventListener("click", () => {
  if (score >= bonus1.cost) {
    score -= bonus1.cost;
    updateScore();
    bonus1.amount++;
    localStorage.setItem("bonus-1", bonus1.amount);
    activeBonus();
  }
});
// bonus#2
bonus2.element.addEventListener("click", () => {
  if (score >= bonus2.cost) {
    score -= bonus2.cost;
    updateScore();
    bonus2.amount++;
    localStorage.setItem("bonus-2", bonus2.amount);
    activeBonus();
  }
});
// bonus#3
bonus3.element.addEventListener("click", () => {
  if (score >= bonus3.cost) {
    score -= bonus3.cost;
    updateScore();
    bonus3.amount++;
    localStorage.setItem("bonus-3", bonus3.amount);
    activeBonus();
  }
});

//? Gestion du popup
// Pour afficher notre popup name  :
header.userName.addEventListener("click", () => {
  header.overlay.classList.toggle("hidden");
  header.popup.classList.toggle("hidden");
});
//Pour masquer notre popup:
header.overlay.addEventListener("click", () => {
  header.overlay.classList.toggle("hidden");
  header.popup.classList.toggle("hidden");
});
//Entrer le nom du joueur en cliquant sur "enter")
header.popupInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const errors = [];
    if (header.popupInput.value === "" || header.popupInput.value == null) {
      errors.push(`Name is required`);
    }
    if (errors.length > 0) {
      e.preventDefault();
      alert(errors.join(","));
      return;
    } else {
      /* playerName = header.popupInput.value;
      header.userName.innerHTML = `${playerName}`; */
      localStorage.setItem("playerName", header.popupInput.value);
      header.userName.textContent = localStorage.getItem("playerName");
      header.overlay.classList.toggle("hidden");
      header.popup.classList.toggle("hidden");
    }
  }
});

//Entrer le nom du joueur ( en cliquant sur la souris )
header.popupSubmit.addEventListener("click", (e) => {
  const errors = [];
  if (header.popupInput.value === "" || header.popupInput.value == null) {
    errors.push(`Name is required`);
  }
  if (errors.length > 0) {
    e.preventDefault();
    alert(errors.join(","));
    return;
  } else {
    /* playerName = header.popupInput.value;
    header.userName.innerHTML = `${playerName}`; */
    localStorage.setItem("playerName", header.popupInput.value);
    header.userName.textContent = localStorage.getItem("playerName");
    header.overlay.classList.toggle("hidden");
    header.popup.classList.toggle("hidden");
  }
});

// Vibration si on clique sur le cloud
body.cloud.addEventListener("click", () => {
  body.cloud.classList.add("clicked");

  setTimeout(() => {
    clicker.classList.remove("clicked");
  }, 500);
});


// Sélection des éléments d'instructions et du bouton "Accept mission"
const instructionsElement = document.querySelector(".instructions");
const acceptMissionButton = document.querySelector(".accept-mission");
const menuList = document.querySelector(".menu");

// icone info 
const burgerImage = document.querySelector(".burger-image");


burgerImage.addEventListener("click", function () {
  instructionsElement.classList.remove("hidden");
  instructionsElement.classList.add("visible");
});

// Fermer les instructions en cliquant sur "Accept mission"
acceptMissionButton.addEventListener("click", function () {
  instructionsElement.classList.add("hidden");
  instructionsElement.classList.remove("visible");
  menuList.classList.remove("active");
});

// Sélection du menu burger et ajout d'un écouteur d'événements pour ouvrir et fermer le menu
const burgerMenu = document.querySelector(".menu");
burgerMenu.addEventListener("click", function () {
  menuList.classList.toggle("active");
});
