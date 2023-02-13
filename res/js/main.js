const main = document.getElementById("main");

// Main Menu Props
const mainMenuImg = document.createElement("img");
main.appendChild(mainMenuImg);
const playButtonImg = document.createElement("img");
main.appendChild(playButtonImg);

// Backstory Props
let file;
let data;
const textField = document.createElement("div");
main.appendChild(textField);
const speaker = document.createElement("p");
main.appendChild(speaker);
const hint = document.createElement("p");
main.appendChild(hint);

// Game Props
const orderRail = document.createElement("img");
let orders = [];
let customers = [];

// Main Menu Handling
const mainMenu = async () => {
  try {
    file = await fetch("./res/data/dialogue.json");
    data = await file.json();
  } catch (err) {
    console.log(err);
  }
  mainMenuImg.src = "./res/img/logo.png";
  mainMenuImg.style.position = "absolute";
  mainMenuImg.style.width = "326px";
  mainMenuImg.style.height = "334px";
  mainMenuImg.style.left = `${window.innerWidth / 4 - 163}px`;
  mainMenuImg.style.top = `${window.innerHeight / 12}px`;

  playButtonImg.src = "./res/img/playButton.png";
  playButtonImg.style.position = "absolute";
  playButtonImg.style.transition = "0.1s";
  playButtonImg.style.width = "366px";
  playButtonImg.style.height = "120px";
  playButtonImg.style.left = `${window.innerWidth / 4 - 183}px`;
  playButtonImg.style.top = `${window.innerHeight / 1.5}px`;
  playButtonImg.style.cursor = "pointer";
};

playButtonImg.onclick = () => {
  buttonBump(playButtonImg);
  setTimeout(() => {
    bulkHide(playButtonImg, mainMenuImg);
    backstory();
  }, 400);
};

// Backstory Handling
const backstory = () => {
  let progress = 0;
  textField.id = "dialogue";
  speaker.id = "speaker";
  speaker.innerHTML = data.dialogues[progress].speaker;
  hint.id = "hint";
  hint.innerText = "Click to continue";
  textField.innerText = data.dialogues[progress].text;
  window.addEventListener("click", () => {
    if (progress == data.dialogues.length) {
      window.removeEventListener("click");
      bulkHide(textField, speaker, hint);
      gameplay();
      return;
    }
    progress++;
    speaker.innerText = data.dialogues[progress].speaker;
    textField.innerText = data.dialogues[progress].text;
  });
};

// Gameplay Handling
const gameplay = () => {

};

const buttonBump = (element) => {
  element.style.scale = 0.9;
  setTimeout(() => {
    element.style.scale = 1;
  }, 200);
};

const bulkHide = (...elements) => {
  elements.forEach((element) => (element.style.display = "none"));
};

class customer {
  constructor() {}
}
