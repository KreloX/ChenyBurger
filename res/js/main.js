const main = document.getElementById("main");

// Main Menu Props
const mainMenuImg = document.createElement("img");
main.appendChild(mainMenuImg);
const playButtonImg = document.createElement("img");
main.appendChild(playButtonImg);

// Backstory Props
const textField = document.createElement("div");
main.appendChild(textField);
const speaker = document.createElement("p");
main.appendChild(speaker);
const hint = document.createElement("p");
main.appendChild(hint);

// Pre-Game Props
const startPrompt = document.createElement("div");
main.appendChild(startPrompt);

const yesDiv = document.createElement("div");
main.appendChild(yesDiv);
const yesButton = document.createElement("div");
yesDiv.appendChild(yesButton);

const noDiv = document.createElement("div");
main.appendChild(noDiv);
const noButton = document.createElement("div");
noDiv.appendChild(noButton);

// Game Props
// Common
const dayCounter = document.createElement("div");
main.appendChild(dayCounter);
const bottomButtons = document.createElement("div");
main.appendChild(bottomButtons);
const deskButton = document.createElement("div");
bottomButtons.appendChild(deskButton);
const grillButton = document.createElement("div");
bottomButtons.appendChild(grillButton);
const buildButton = document.createElement("div");
bottomButtons.appendChild(buildButton);
const orderRail = document.createElement("div");
main.appendChild(orderRail);
const orderPin = document.createElement("div");
main.appendChild(orderPin);
const orderPinInside = document.createElement("div");
orderPin.appendChild(orderPinInside);
// Order Screen
const orderScreen = document.createElement("div");
main.appendChild(orderScreen);
const orderDesk = document.createElement("div");
orderScreen.appendChild(orderDesk);
const moneyDisplay = document.createElement("div");
orderScreen.appendChild(moneyDisplay);
const orderOffer = document.createElement("div");
orderScreen.appendChild(orderOffer);
// Grill Screen
const grillScreen = document.createElement("div");
main.appendChild(grillScreen);
const grillDesk = document.createElement("div");
grillScreen.appendChild(grillDesk);
const grill = document.createElement("div");
grillDesk.appendChild(grill);
const meatSource = document.createElement("div");
grillDesk.appendChild(meatSource);
const meatTrash = document.createElement("div");
grillDesk.appendChild(meatTrash);
const meatDeposit = document.createElement("div");
grillDesk.appendChild(meatDeposit);
const trashSymbol = document.createElement("img");
meatTrash.appendChild(trashSymbol);
// Build Screen
const buildScreen = document.createElement("div");
main.appendChild(buildScreen);
const sourceWrapper = document.createElement("div");
buildScreen.appendChild(sourceWrapper);
const sourceShelf = document.createElement("div");
sourceWrapper.appendChild(sourceShelf);
for (let i = 0; i < 6; i++) {
  sourceWrapper.appendChild(sourceWrapper.lastChild.cloneNode(true));
}
const buildDesk = document.createElement("div");
buildScreen.appendChild(buildDesk);
const buildMeatSource = document.createElement("div");
buildDesk.appendChild(buildMeatSource);
const plate = document.createElement("div");
buildDesk.appendChild(plate);

// Main Menu Handling
let dialogueFile;
let dialogueData;
let ingredientsFile;
let ingredientsData;
const mainMenu = async () => {
  try {
    dialogueFile = await fetch("./res/data/dialogue.json");
    dialogueData = await dialogueFile.json();
    ingredientsFile = await fetch("./res/data/ingredients.json");
    ingredientsData = await ingredientsFile.json();
  } catch (err) {
    console.log(err);
  }
  mainMenuImg.src = "./res/img/logo.png";
  mainMenuImg.id = "mainImg";

  playButtonImg.src = "./res/img/playButton.png";
  playButtonImg.id = "playImg";
};

playButtonImg.onclick = () => {
  buttonPress(playButtonImg);
  setTimeout(() => {
    hide(playButtonImg, mainMenuImg);
    backstory();
  }, 400);
};

// Backstory Handling
const backstory = () => {
  let progress = 0;
  textField.id = "dialogue";
  speaker.id = "speaker";
  hint.id = "hint";
  textField.innerText = dialogueData.dialogues[progress].text;
  speaker.innerText = dialogueData.dialogues[progress].speaker;
  hint.innerText = "Click to continue";
  const advanceStory = () => {
    if (progress == dialogueData.dialogues.length - 1) {
      window.removeEventListener("click", advanceStory);
      hide(textField, speaker, hint);
      preGame();
      return;
    }
    progress++;
    speaker.innerText = dialogueData.dialogues[progress].speaker;
    textField.innerText = dialogueData.dialogues[progress].text;
  };
  window.addEventListener("click", advanceStory);
};

// preGame Handling
let chosen = false;

const preGame = () => {
  startPrompt.id = "prompt";
  yesDiv.id = "yesDiv";
  yesButton.id = "button";
  noDiv.id = "noDiv";
  noButton.id = "button";
  startPrompt.innerText = "Přijmout nabídku?";
  yesButton.innerText = "Ano";
  noButton.innerText = "Ne";
  yesButton.onclick = () => {
    if (!chosen) {
      buttonPress(yesButton);
      setTimeout(() => {
        hide(startPrompt, yesDiv, noDiv);
        advanceDay();
        assignIds();
      }, 400);
    }
    chosen = true;
  };
  noButton.onclick = () => {
    if (!chosen) {
      buttonPress(noButton);
      setTimeout(() => {
        hide(startPrompt, yesDiv, noDiv);
        //goodEnding();
      }, 400);
    }
    chosen = true;
  };
};

// Good Ending Handling
const goodEnding = () => {};

// Gameplay Handling
let topOffset = 0;
let day = 1;
let orders = [];
let pinOccupied = false;
let depositLevel;
let buildLevel;
let burgerExists = false;
let burger;
const advanceDay = () => {
  topOffset = 0;
  depositLevel = 0;
  buildLevel = 530;
  hide(
    bottomButtons,
    orderScreen,
    grillScreen,
    buildScreen,
    orderRail,
    orderPin
  );
  deskButton.innerHTML = "Order<br>Station";
  grillButton.innerHTML = "Grill<br>Station";
  buildButton.innerHTML = "Build<br>Station";
  dayCounter.style.display = "block";
  dayCounter.style.color = "black";
  dayCounter.style.backgroundColor = "bisque";
  dayCounter.style.borderColor = "black";
  dayCounter.id = "day";
  dayCounter.innerText = `${day}. Den`;
  day++;
  setTimeout(() => {
    dayCounter.style.transition = "2s";
    dayCounter.style.color =
      dayCounter.style.backgroundColor =
      dayCounter.style.borderColor =
        "transparent";
    dayCounter.style.scale = "12";
    setTimeout(() => {
      gameplay();
    }, 2000);
  }, 500);
};

const gameplay = () => {
  setTimeout(() => {
    hide(dayCounter);
    dayCounter.style.scale = "1";
  }, 1000);

  let moneyMade = 0;

  new Patty();
  new Sauce(0);
  new Sauce(1);
  new Sauce(2);
  new Sauce(3);
  for (let i = 0; i < 7; i++) {
    new Ingredient(i);
  }
  hide(grillScreen, buildScreen);
  orderScreen.style.display = "block";
  orderRail.style.display = "block";
  orderPin.style.display = "block";
  orderPinInside.style.display = "block";
  orderOffer.style.display = "block";
  orderOffer.innerText = "Take Order";
  moneyDisplay.innerText = `${moneyMade.toFixed(2)} $`;
  sourceWrapper.childNodes.forEach((shelf) => {
    shelf.id = "shelf";
  });
  sourceShelf.style.display = "block";
  bottomButtons.style.display = "block";
  orderOffer.onclick = () => {
    hide(orderOffer);
    new Order();
  };
  deskButton.onclick = () => {
    hide(grillScreen, buildScreen);
    meatDeposit.innerHTML = "";
    orderScreen.style.display = "block";
    buttonPress(deskButton);
  };
  grillButton.onclick = () => {
    hide(orderScreen, buildScreen);
    grillScreen.style.display = "block";
    buttonPress(grillButton);
  };
  buildButton.onclick = () => {
    hide(grillScreen, orderScreen);
    meatDeposit.innerHTML = "";
    buildScreen.style.display = "block";
    buttonPress(buildButton);
  };
};

const assignIds = () => {
  // Common
  orderScreen.id = "orderScreen";
  grillScreen.id = "grillScreen";
  buildScreen.id = "buildScreen";
  orderRail.id = "rail";
  orderPin.id = "pin";
  orderPinInside.id = "innerPin";
  // Order Station
  orderDesk.id = "orderDesk";
  moneyDisplay.id = "moneyDisplay";
  orderOffer.id = "orderOffer";
  // Grill Station
  grillDesk.id = "grillDesk";
  grill.id = "grill";
  meatSource.id = "meatSource";
  meatTrash.id = "meatTrash";
  trashSymbol.id = "trashSymbol";
  trashSymbol.src = "./res/img/trash.png";
  meatDeposit.id = "meatDeposit";
  // Build Station
  buildDesk.id = "buildDesk";
  sourceWrapper.id = "sourceWrapper";
  buildMeatSource.id = "buildSource";
  plate.id = "plate";
  // Bottom Buttons
  bottomButtons.id = "bottomWrapper";
  deskButton.id = "deskButton";
  grillButton.id = "grillButton";
  buildButton.id = "buildButton";
};

const buttonPress = (element) => {
  element.style.scale = 0.9;
  setTimeout(() => {
    element.style.scale = 1;
  }, 200);
};

const hide = (...elements) => {
  elements.forEach((element) => (element.style.display = "none"));
};

const getRandomInt = (min /*inclusive*/, max /*exlusive*/) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const getIngredientImgSrc = (index) => {
  return ingredientsData.ingredients[index].src;
};

const orderTemplate = document.createElement("div");
class Order {
  constructor(/* customer */) {
    this.ingredients;
    this.occupiingPin = false;
    this.orderInstance = orderTemplate.cloneNode(true);
    this.orderInstance.id = "order";
    this.orderInstance.style.scale = "0.3";
    this.orderInstance.style.left = "10%";
    this.orderInstance.style.top = "-15%";
    main.appendChild(this.orderInstance);
    orders.push(this);
    this.assignIngredients();

    let offset = [0, 0];
    let mousePos;
    let isDown = false;

    this.orderInstance.addEventListener(
      "mousedown",
      (e) => {
        isDown = true;
        offset = [
          this.orderInstance.offsetLeft - e.clientX,
          this.orderInstance.offsetTop - e.clientY,
        ];
      },
      true
    );
    document.addEventListener(
      "mouseup",
      () => {
        isDown = false;
        this.orderInstance.style.top = "-15%";
        if (this.isOffscreen()) {
          this.orderInstance.style.left = "10%";
        }
        if (this.isAbovePlate && burger.finished) {
          this.remove();
          burger.present();
        }
        if (!this.isNearPin()) {
          if (this.occupiingPin) {
            pinOccupied = false;
            this.occupiingPin = false;
          }
          this.orderInstance.style.scale = "0.3";
          return;
        }
        if (pinOccupied && !this.occupiingPin) {
          this.orderInstance.style.left = "10%";
          this.orderInstance.style.scale = "0.3";
          return;
        }
        pinOccupied = true;
        this.occupiingPin = true;
        this.orderInstance.style.left = "86.5%";
        this.orderInstance.style.top = "4%";
        this.orderInstance.style.scale = "1";
      },
      true
    );

    document.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault();
        if (isDown) {
          mousePos = {
            x: event.clientX,
            y: event.clientY,
          };
          this.orderInstance.style.left = mousePos.x + offset[0] + "px";
          this.orderInstance.style.top = mousePos.y + offset[1] + "px";
        }
      },
      true
    );
  }
  assignIngredients(/* Random range depending on customer */) {
    this.ingredients = new Array(getRandomInt(5, 10));
    for (let i = 0; i < this.ingredients.length - 1; i++) {
      this.ingredients[i] = getRandomInt(1, 11);
    }
    this.ingredients[getRandomInt(1, this.ingredients.length - 2)] = 1;
    this.ingredients[0] = 0;
    this.ingredients[this.ingredients.length - 2] = 11;
    for (let i = this.ingredients.length - 1; i > 0; i--) {
      this.orderInstance.innerHTML += `<br><img id="orderImg" src="${getIngredientImgSrc(
        this.ingredients[i - 1]
      )}">`;
    }
  }
  isOffscreen() {
    let rect = this.orderInstance.getBoundingClientRect();
    return rect.x + rect.width < 20;
  }

  isNearPin() {
    let rect = this.orderInstance.getBoundingClientRect();
    let pinRect = orderPin.getBoundingClientRect();
    return rect.x + rect.width > pinRect.x;
  }
  isAbovePlate() {
    let rect = this.pattyInstance.getBoundingClientRect();
    let plateRect = plate.getBoundingClientRect();
    return (
      rect.x + rect.width / 2 > plateRect.x - 10 &&
      rect.x < plateRect.x + plateRect.width - rect.width / 2
    );
  }
  remove() {
    main.removeChild(this.orderInstance);
  }
}

const pattyTemplate = document.createElement("img");
class Patty {
  constructor() {
    this.pattyInstance = pattyTemplate.cloneNode(true);
    this.pattyInstance.id = "pattySource";
    this.pattyInstance.src = "./res/img/rawPatty.png";
    grillScreen.appendChild(this.pattyInstance);

    let offset = [0, 0];
    let mousePos;
    let isDown = false;

    this.pattyInstance.addEventListener(
      "mousedown",
      (e) => {
        isDown = true;
        offset = [
          this.pattyInstance.offsetLeft - e.clientX,
          this.pattyInstance.offsetTop - e.clientY,
        ];
      },
      true
    );
    document.addEventListener(
      "mouseup",
      () => {
        isDown = false;
        if (this.isAboveGrill()) {
          new GrillingPatty(mousePos.x + offset[0], mousePos.y + offset[1]);
          this.pattyInstance.remove();
          new Patty();
          return;
        }
        this.pattyInstance.style.left = "6.5%";
        this.pattyInstance.style.top = "75%";
      },
      true
    );
    document.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault();
        if (isDown) {
          mousePos = {
            x: event.clientX,
            y: event.clientY,
          };
          this.pattyInstance.style.left = mousePos.x + offset[0] + "px";
          this.pattyInstance.style.top = mousePos.y + offset[1] + "px";
        }
      },
      true
    );
  }
  isAboveGrill() {
    let rect = this.pattyInstance.getBoundingClientRect();
    let grillRect = grill.getBoundingClientRect();
    return (
      rect.x > grillRect.x &&
      rect.x < grillRect.x + grillRect.width &&
      rect.y < grillRect.y + grillRect.height - 50 &&
      rect.y > grillRect.y
    );
  }
  remove() {
    grillScreen.removeChild(this.pattyInstance);
  }
}

const rawPatty = document.createElement("img");
rawPatty.src = "./res/img/rawPatty.png";
const cookedPatty = document.createElement("img");
cookedPatty.src = "./res/img/patty.png";
const burntPatty = document.createElement("img");
burntPatty.src = "./res/img/burntPatty.png";
class GrillingPatty {
  constructor(left, top) {
    this.left = left;
    this.top = top;
    this.pattyInstance = pattyTemplate.cloneNode(true);
    this.pattyInstance.id = "pattyGrilling";
    this.pattyInstance.src = "./res/img/rawPatty.png";
    grillScreen.appendChild(this.pattyInstance);
    this.pattyInstance.style.left = this.left + "px";
    this.pattyInstance.style.top = this.top + "px";
    this.cooked = false;
    this.burnt = false;

    this.offset = [0, 0];
    this.mousePos;
    this.isDown = false;

    setTimeout(() => {
      this.pattyInstance.src = "./res/img/patty.png";
      this.cooked = true;
      setTimeout(() => {
        this.pattyInstance.src = "./res/img/burntPatty.png";
        this.burnt = true;
      }, 15000);
    }, 15000);

    this.pattyInstance.addEventListener(
      "mousedown",
      (e) => {
        this.isDown = true;
        this.offset = [
          this.pattyInstance.offsetLeft - e.clientX,
          this.pattyInstance.offsetTop - e.clientY,
        ];
      },
      true
    );
    document.addEventListener(
      "mouseup",
      () => {
        this.isDown = false;
        if (this.isAboveTrash()) {
          this.pattyInstance.remove();
          return;
        }
        if (this.isAboveDeposit()) {
          this.pattyInstance.remove();
          if (this.burnt) {
            new DepositedPatty(2);
            return;
          }
          if (this.cooked) {
            new DepositedPatty(1);
            return;
          }
          new DepositedPatty(0);
          return;
        }
        if (this.isAboveGrill()) {
          this.pattyInstance.style.left =
            this.mousePos.x + this.offset[0] + "px";
          this.pattyInstance.style.top =
            this.mousePos.y + this.offset[1] + "px";
          return;
        }
        this.pattyInstance.style.left = this.left + "px";
        this.pattyInstance.style.top = this.top + "px";
      },
      true
    );
    document.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault();
        if (this.isDown) {
          this.mousePos = {
            x: event.clientX,
            y: event.clientY,
          };
          this.pattyInstance.style.left =
            this.mousePos.x + this.offset[0] + "px";
          this.pattyInstance.style.top =
            this.mousePos.y + this.offset[1] + "px";
        }
      },
      true
    );
  }
  isAboveGrill() {
    let rect = this.pattyInstance.getBoundingClientRect();
    let grillRect = grill.getBoundingClientRect();
    return (
      rect.x > grillRect.x &&
      rect.x < grillRect.x + grillRect.width &&
      rect.y < grillRect.y + grillRect.height - 50 &&
      rect.y > grillRect.y
    );
  }
  isAboveTrash() {
    let rect = this.pattyInstance.getBoundingClientRect();
    let trashRect = meatTrash.getBoundingClientRect();
    return (
      rect.x > trashRect.x - 20 &&
      rect.x < trashRect.x + trashRect.width &&
      rect.y < trashRect.y + trashRect.height + 20 &&
      rect.y > trashRect.y - 20
    );
  }
  isAboveDeposit() {
    let rect = this.pattyInstance.getBoundingClientRect();
    let depositRect = meatDeposit.getBoundingClientRect();
    return (
      rect.x > depositRect.x - 20 &&
      rect.x < depositRect.x + depositRect.width &&
      rect.y < depositRect.y + depositRect.height + 20 &&
      rect.y > depositRect.y - 20
    );
  }
  remove() {
    grillScreen.removeChild(this.pattyInstance);
  }
}

class DepositedPatty {
  constructor(cookedLevel) {
    this.pattyInstance;
    if (cookedLevel == 1) {
      this.pattyInstance = cookedPatty.cloneNode(true);
    } else if (cookedLevel == 0) {
      this.pattyInstance = rawPatty.cloneNode(true);
    } else {
      this.pattyInstance = burntPatty.cloneNode(true);
    }
    new BuildPatty(cookedLevel);
    this.pattyInstance.style.position = "absolute";
    this.pattyInstance.style.width = "100%";
    this.pattyInstance.style.top = depositLevel + "px";
    meatDeposit.appendChild(this.pattyInstance);
    depositLevel -= 15;
  }
}

const sauceTemplate = document.createElement("img");
class Sauce {
  constructor(type) {
    this.type = type;
    this.leftOffset;
    this.sauceInstance = sauceTemplate.cloneNode(true);
    if (this.type == 0) {
      this.sauceInstance.src = "./res/img/ketchup.png";
      this.leftOffset = 70;
      this.sauceInstance.style.left = 70 + "%";
    } else if (this.type == 1) {
      this.sauceInstance.src = "./res/img/mustard.png";
      this.leftOffset = 75;
      this.sauceInstance.style.left = 75 + "%";
    } else if (this.type == 2) {
      this.sauceInstance.src = "./res/img/mayo.png";
      this.leftOffset = 80;
      this.sauceInstance.style.left = 80 + "%";
    } else {
      this.sauceInstance.src = "./res/img/bbq.png";
      this.leftOffset = 85;
      this.sauceInstance.style.left = 85 + "%";
    }
    this.sauceInstance.style.position = "absolute";
    this.sauceInstance.style.width = "4%";
    this.sauceInstance.style.top = 60 + "%";
    this.sauceInstance.style.cursor = "pointer";
    this.sauceInstance.style.transition = "0.1s";
    buildScreen.appendChild(this.sauceInstance);

    let offset = [0, 0];
    let mousePos;
    let isDown = false;

    this.sauceInstance.addEventListener(
      "mousedown",
      (e) => {
        isDown = true;
        offset = [
          this.sauceInstance.offsetLeft - e.clientX,
          this.sauceInstance.offsetTop - e.clientY,
        ];
      },
      true
    );
    document.addEventListener(
      "mouseup",
      () => {
        isDown = false;
        if (this.isAbovePlate()) {
          if (burgerExists && !burger.finished) {
            burger.addIngredient(this.type + 6);
          }
          this.sauceInstance.remove();
          new Sauce(this.type);
          return;
        }
        this.sauceInstance.style.left = this.leftOffset + "%";
        this.sauceInstance.style.top = 60 + "%";
      },
      true
    );
    document.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault();
        if (isDown) {
          mousePos = {
            x: event.clientX,
            y: event.clientY,
          };
          this.sauceInstance.style.left = mousePos.x + offset[0] + "px";
          this.sauceInstance.style.top = mousePos.y + offset[1] + "px";
        }
      },
      true
    );
  }
  isAbovePlate() {
    let rect = this.sauceInstance.getBoundingClientRect();
    let plateRect = plate.getBoundingClientRect();
    return (
      rect.x + rect.width / 2 > plateRect.x - 10 &&
      rect.x < plateRect.x + plateRect.width - rect.width / 2
    );
  }
  remove() {
    buildScreen.removeChild(this.sauceInstance);
  }
}

const ingredientTemplate = document.createElement("img");
class Ingredient {
  constructor(type) {
    this.type = type;
    this.ingredientInstance = ingredientTemplate.cloneNode(true);
    this.topOffset;
    switch (this.type) {
      case 0:
        this.ingredientInstance.src = "./res/img/heel.png";
        this.ingredientInstance.style.top = 82 + "%";
        this.topOffset = 82;
        break;
      case 1:
        this.ingredientInstance.src = "./res/img/cheese.png";
        this.ingredientInstance.style.top = 69 + "%";
        this.topOffset = 69;
        break;
      case 2:
        this.ingredientInstance.src = "./res/img/pickle.png";
        this.ingredientInstance.style.top = 57 + "%";
        this.topOffset = 57;
        break;
      case 3:
        this.ingredientInstance.src = "./res/img/onion.png";
        this.ingredientInstance.style.top = 45 + "%";
        this.topOffset = 45;
        break;
      case 4:
        this.ingredientInstance.src = "./res/img/lettuce.png";
        this.ingredientInstance.style.top = 32 + "%";
        this.topOffset = 32;
        break;
      case 5:
        this.ingredientInstance.src = "./res/img/tomato.png";
        this.ingredientInstance.style.top = 19 + "%";
        this.topOffset = 19;
        break;
      case 6:
        this.ingredientInstance.src = "./res/img/crown.png";
        this.ingredientInstance.style.top = 6 + "%";
        this.topOffset = 6;
        break;
    }
    this.ingredientInstance.style.left = 1 + "%";
    this.ingredientInstance.style.position = "absolute";
    this.ingredientInstance.style.width = "11%";
    this.ingredientInstance.style.cursor = "pointer";
    this.ingredientInstance.style.zIndex = "100";
    this.ingredientInstance.style.transition = "0.1s";
    buildScreen.appendChild(this.ingredientInstance);

    let offset = [0, 0];
    let mousePos;
    let isDown = false;

    this.ingredientInstance.addEventListener(
      "mousedown",
      (e) => {
        isDown = true;
        offset = [
          this.ingredientInstance.offsetLeft - e.clientX,
          this.ingredientInstance.offsetTop - e.clientY,
        ];
      },
      true
    );
    document.addEventListener(
      "mouseup",
      () => {
        isDown = false;
        if (this.isAbovePlate()) {
          if (this.type == 0 && !burgerExists) {
            burger = new Burger();
            burgerExists = true;
          } else if (burgerExists && !burger.finished) {
            if (this.type == 6) {
              burger.addIngredient(13);
              this.ingredientInstance.remove();
              new Ingredient(this.type);
              burger.finish();
              return;
            }
            burger.addIngredient(this.type);
          }
          this.ingredientInstance.remove();
          new Ingredient(this.type);
          return;
        }
        this.ingredientInstance.style.left = "1%";
        this.ingredientInstance.style.top = this.topOffset + "%";
      },
      true
    );
    document.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault();
        if (isDown) {
          mousePos = {
            x: event.clientX,
            y: event.clientY,
          };
          this.ingredientInstance.style.left = mousePos.x + offset[0] + "px";
          this.ingredientInstance.style.top = mousePos.y + offset[1] + "px";
        }
      },
      true
    );
  }
  isAbovePlate() {
    let rect = this.ingredientInstance.getBoundingClientRect();
    let plateRect = plate.getBoundingClientRect();
    return (
      rect.x + rect.width / 2 > plateRect.x - 10 &&
      rect.x < plateRect.x + plateRect.width - rect.width / 2
    );
  }
  remove() {
    buildScreen.removeChild(this.ingredientInstance);
  }
}

class BuildPatty {
  constructor(type) {
    this.type = type;
    this.buildLevel = buildLevel;
    this.pattyInstance = pattyTemplate.cloneNode(true);
    switch (this.type) {
      case 0:
        this.pattyInstance.src = "./res/img/rawPatty.png";
        break;
      case 1:
        this.pattyInstance.src = "./res/img/patty.png";
        break;
      case 2:
        this.pattyInstance.src = "./res/img/burntPatty.png";
        break;
    }
    this.pattyInstance.style.position = "absolute";
    this.pattyInstance.style.width = "11%";
    this.pattyInstance.style.zIndex = "100";
    this.pattyInstance.style.top = this.buildLevel + "px";
    this.pattyInstance.style.left = "20%";
    this.pattyInstance.style.cursor = "pointer";
    this.pattyInstance.style.transition = "0.1s";
    buildScreen.appendChild(this.pattyInstance);

    let offset = [0, 0];
    let mousePos;
    let isDown = false;

    this.pattyInstance.addEventListener(
      "mousedown",
      (e) => {
        isDown = true;
        offset = [
          this.pattyInstance.offsetLeft - e.clientX,
          this.pattyInstance.offsetTop - e.clientY,
        ];
      },
      true
    );
    document.addEventListener(
      "mouseup",
      () => {
        isDown = false;
        if (this.isAbovePlate()) {
          if (burgerExists && !burger.finished) {
            burger.addIngredient(this.type + 10);
          }
          this.pattyInstance.remove();
          return;
        }
        this.pattyInstance.style.left = "20%";
        this.pattyInstance.style.top = this.buildLevel + "px";
      },
      true
    );
    document.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault();
        if (isDown) {
          mousePos = {
            x: event.clientX,
            y: event.clientY,
          };
          this.pattyInstance.style.left = mousePos.x + offset[0] + "px";
          this.pattyInstance.style.top = mousePos.y + offset[1] + "px";
        }
      },
      true
    );
    buildLevel -= 15;
  }
  isAbovePlate() {
    let rect = this.pattyInstance.getBoundingClientRect();
    let plateRect = plate.getBoundingClientRect();
    return (
      rect.x + rect.width / 2 > plateRect.x - 10 &&
      rect.x < plateRect.x + plateRect.width - rect.width / 2
    );
  }
  remove() {
    buildScreen.removeChild(this.pattyInstance);
  }
}

let orderHolder;
class Burger {
  constructor() {
    this.burgerInstance = document.createElement("div");
    this.finished = false;
    this.topOffset = 0;
    this.addIngredient(0);
    buildScreen.appendChild(this.burgerInstance);
  }
  addIngredient(type) {
    let ingredientInstance = document.createElement("img");
    ingredientInstance.style.position = "absolute";
    ingredientInstance.style.left = "45%";
    ingredientInstance.style.top = 82 - topOffset + "%";
    topOffset += 3;
    switch (type) {
      case 0:
        ingredientInstance.src = "./res/img/heel.png";
        break;
      case 1:
        ingredientInstance.src = "./res/img/cheese.png";
        break;
      case 2:
        ingredientInstance.src = "./res/img/pickle.png";
        break;
      case 3:
        ingredientInstance.src = "./res/img/onion.png";
        break;
      case 4:
        ingredientInstance.src = "./res/img/lettuce.png";
        break;
      case 5:
        ingredientInstance.src = "./res/img/tomato.png";
        break;
      case 6:
        ingredientInstance.src = "./res/img/ketchupSplash.png";
        break;
      case 7:
        ingredientInstance.src = "./res/img/mustardSplash.png";
        break;
      case 8:
        ingredientInstance.src = "./res/img/mayoSplash.png";
        break;
      case 9:
        ingredientInstance.src = "./res/img/bbqSplash.png";
        break;
      case 10:
        ingredientInstance.src = "./res/img/rawPatty.png";
        break;
      case 11:
        ingredientInstance.src = "./res/img/patty.png";
        break;
      case 12:
        ingredientInstance.src = "./res/img/burntPatty.png";
        break;
      case 13:
        ingredientInstance.src = "./res/img/crown.png";
        break;
    }
    this.burgerInstance.appendChild(ingredientInstance);
  }
  finish() {
    this.finished = true;
    orderHolder = document.createElement("div");
    orderHolder.style.position = "absolute";
    orderHolder.style.width = "4%";
    orderHolder.style.height = "16%";
    orderHolder.style.left = "41%";
    orderHolder.style.top = "80%";
    orderHolder.style.backgroundColor = "darkgray";
    buildScreen.appendChild(orderHolder);
  }
  present() {
    let presentedBurger = this.burgerInstance.cloneNode(true);
    buildScreen.removeChild(orderHolder);
    buildScreen.removeChild(this.burgerInstance);
    hide(grillScreen, buildScreen);
    orderScreen.style.display = "block";
    orderScreen.appendChild(presentedBurger);
    setTimeout(() => {
      orderScreen.removeChild(presentedBurger);
      moneyMade += 2;
      moneyDisplay.innerText = `${moneyMade.toFixed(2)} $`;
      orderOffer.style.display = "block";
    }, 3000);
  }
  remove() {
    buildScreen.removeChild(this.ingredientInstance);
  }
}
