const question = document.getElementById("question");
const answer = document.getElementById("answer");
const cases = document.getElementsByClassName("case");
const levelSpan = document.getElementById("level");
const timer = document.getElementById("timer");
const time = document.getElementById("time");
const gameModal = document.getElementById("gameModal");
const win = document.getElementById("win");
const lose = document.getElementById("lose");
const lastLevelWin = document.getElementById("lastLevelWin");
const lastLevellose = document.getElementById("lastLevellose");
const player = document.getElementById("player");

let level;
let timeOnPercent;
const maxSeconds = 20;

const init = () => {
  hideModal();
  level = 1;
  levelSpan.innerHTML = level;
  timeOnPercent = 100;
  setNumbers();
  startTimer();
}

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const getRandomNumber = () => Math.floor(Math.random() * 50) + 1;

const setNumbers = () => {
  const a = Math.floor(Math.random() * 50) + 1;
  const b = Math.floor(Math.random() * 50) + 1;
  const sign = (Math.floor(Math.random() * 100) % 2) + 1;

  console.log(a, b, sign);
  const questionString = `${a} ${(sign == 1 && "+") || "-"} ${b}`;
  question.innerHTML = questionString;

  const trueAnswer = eval(questionString);

  let case2 = getRandomNumber();
  let case3 = getRandomNumber();
  let case4 = getRandomNumber();

  let casesArray = [trueAnswer];
  while (casesArray.length < 4) {
    let randomNumber = getRandomNumber();
    if (casesArray.indexOf(randomNumber) == -1) casesArray.push(randomNumber);
  }

  casesArray = shuffle(casesArray);

  for (let i = 0; i < 4; i++) {
    cases[i].classList.remove("success");
    cases[i].classList.remove("error");

    cases[i].innerHTML = casesArray[i];
    cases[i].onclick = (event) =>
      check(event.target, casesArray[i], trueAnswer);
  }
};

const check = (box, number, trueAnswer) => {
  console.log(box);
  if (number == trueAnswer) {
    // alert("topdi");
    box.classList.add("success");

    setTimeout(() => {
      level++;
      levelSpan.innerHTML = level;
      if (timeOnPercent / 10 <= maxSeconds - 3) timeOnPercent += 30;
    }, 300);
  } else {
    // alert("topolmadi");
    box.classList.add("error");

    setTimeout(() => {
      timeOnPercent -= 30;
    }, 300);
  }

  setTimeout(() => {
    setNumbers();
  }, 300);
};

let timerInterval;
const startTimer = () => {
  timer.innerHTML = 10;
  timerInterval = setInterval(() => {
    timeOnPercent--;
    time.style.width = `${timeOnPercent}%`;
    if (timeOnPercent % 10 == 0) timer.innerHTML = (timeOnPercent / 10);

    if (timeOnPercent <= 0) {
      clearInterval(timerInterval);
      showModal();
    }

  }, 100)
}

const showModal = () => {
  const oldLevel = +localStorage.getItem("level");
  console.log(oldLevel);

  gameModal.classList.remove("d-none");

  if (level > oldLevel) {
    lastLevelWin.innerHTML = level;
    win.classList.remove("d-none");
    player.src = "./audio/win.mp3";

    localStorage.setItem("level", level)
  }
  else {
    lastLevelLose.innerHTML = level;
    lose.classList.remove("d-none");
    player.src = "./audio/over.mp3";
  }

  player.play();
}

const hideModal = () => {
  gameModal.classList.add("d-none");
  win.classList.add("d-none");
  lose.classList.add("d-none");
}

window.onload = init;