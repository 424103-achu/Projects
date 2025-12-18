const game = ["cricket", "football", "hockey", "tennis", "badminton"];
game.name = "game";
const movie = [
  "baahubali",
  "dude",
  "aedilhemushkil",
  "interstellar",
  "ninnukori",
];
movie.name = "movie";
const animal = ["panda", "racoon", "giraffe", "elephant", "wolf"];
animal.name = "animal";
const bird = ["eagle", "peacock", "sparrow", "kingfisher", "vulture"];
bird.name = "bird";
var category;
var num;
var alrcrct = 0;
var score = 0;
var hinttaken = false;
var wrongtrials = 0;
const trials = 7;
var crctans = 0;
var total = 5;
const ques=5;
var correct = 0;
var cumscore = 0;
const hangman = "HANGMAN";
var clue1 = -1;
var clue2 = -1;
var clue3 = -1;
function defaultval() {
  hinttaken = false;
  crctans = 0;
  wrongtrials = 0;
  score = 0;
  alrcrct = 0;
  var clue1 = -1;
  var clue2 = -1;
  var clue3 = -1;
  var total = 3;
  const correct = 0;
  var cumscore = 0;
  document.querySelector(".trials").innerHTML = "7 wrong trials left";
  document.querySelector(".hint-content").innerText = "-";
  document.querySelector(".attempts").textContent = "-";
}
function ingamedefaultval() {
  hinttaken = false;
  crctans = 0;
  wrongtrials = 0;
  score = 0;
  alrcrct = 0;
  var clue1 = -1;
  var clue2 = -1;
  var clue3 = -1;
  document.querySelector(".trials").innerHTML = "7 wrong trials left";
  document.querySelector(".hint-content").innerText = "-";
  document.querySelector(".attempts").textContent = "-";
}
function selectword(category) {
  let seed = Date.now();
  let x = Math.sin(seed);
  //console.log(x);
  let rand = x - Math.floor(x);
  num = Math.floor(rand * 5);
  //console.log(num);
  //console.log(category[num].length);
  let length = category[num].length;
  var blanks = "";
  if (length == 4 || length == 5) {
    clue1 = Math.floor(Math.random() * 4);
  } else if (length >= 6 && length <= 9) {
    clue1 = Math.floor(Math.random() * 6);
    clue2 = Math.floor(Math.random() * 6);
    if (clue1 == clue2) {
      clue2 = (clue1 + 4) % length;
    }
  } else {
    clue1 = Math.floor(Math.random() * length);
    clue2 = Math.floor(Math.random() * length);
    clue3 = Math.floor(Math.random() * length);
    if (clue1 == clue2) {
      clue2 = (clue1 + 3) % length;
    }
    if (clue1 == clue3) {
      clue3 = (clue1 + 3) % length;
    }
    if (clue2 == clue3) {
      clue3 = (clue2 + 4) % length;
    }
  }
  console.log(category[num]);
  for (let i = 0; i < length; i++) {
    if (i == clue1 || i == clue2 || i == clue3) {
      blanks +=
        '<div class="blank" id="' + i + '">' + category[num][i] + "</div>";
      alrcrct++;
    } else {
      blanks += '<div class="blank" id="' + i + '"></div>';
    }
    // console.log(blanks)
  }
  document.querySelector(".word").innerHTML = blanks;
}
function restartgame() {
  defaultval();
  startGame();
}
function nextgame() {
  if (total - 1 == 0) {
    gameover();
  } else {
    ingamedefaultval();
    total--;
    startGame();
  }
}
function exitgame() {
  document.getElementById("endgame").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("startpage").style.display = "block";
}
function startGame() {
  start();
  document.getElementById("game").style.display = "block";
  document.getElementById("endgame").style.display = "none";
  document.getElementById("startpage").style.display = "none";
}
function start() {
  let type = Math.floor(Math.random() * 4) + 1;
  // console.log(type);
  document.querySelector(".your-score").innerHTML =
    "<h2>YOUR SCORE : " + score + " </h2>";
  switch (type) {
    case 1:
      category = game;
      selectword(game);
      break;
    case 2:
      category = movie;
      selectword(movie);
      break;
    case 3:
      category = animal;
      selectword(animal);
      break;
    case 4:
      category = bird;
      selectword(bird);
      break;
    default:
      break;
  }
}
function showhint() {
  if (hinttaken) {
    console.log(category.name);
    if (category.name == "animal") {
      var hintcontent = "It is an " + category.name + " name";
    } else {
      var hintcontent = "It is a " + category.name + " name";
    }
    console.log(hintcontent);

    document.querySelector(".hint-content").innerText = hintcontent;
  }
}
function checkletter(letter) {
  let exist = false;
  let tempscore = 0;
  for (let i = 0; i < category[num].length; i++) {
    if (
      category[num][i] === letter &&
      (i === clue1 || i === clue2 || i === clue3)
    ) {
      continue;
    }
    if (category[num][i] === letter) {
      ++crctans;
      let id = i.toString();
      console.log(id);
      console.log(document.getElementById(id));
      document.getElementById(id).innerText = letter;
      exist = true;
      if (!hinttaken) tempscore += 10;
      else {
        tempscore += 5;
      }
    }
  }
  console.log("crctans : " + crctans);
  console.log("alrcrct" + alrcrct);
  if (exist) {
    score += tempscore;
    document.querySelector(".your-score").innerHTML =
      "<h2>YOUR SCORE : " + score + " </h2>";
    if (crctans + alrcrct == category[num].length) {
      console.log(crctans + alrcrct);
      cumscore += score;
      console.log(total);
      correct++;
      nextgame();
    }
    return true;
  } else {
    score -= 5;
    document.querySelector(".your-score").innerHTML =
      "<h2>YOUR SCORE : " + score + " </h2>";
    return false;
  }
}
function gameover() {
   document.querySelector(".your-Score").innerHTML =
    "<h3>correct answers : "+correct+"</h3>"+"<h3>wrong answers : "+(ques-correct)+"</h3>"+
    "<h2>YOUR SCORE : " + cumscore + " </h2>";
  document.getElementById("game").style.display = "none";
  document.getElementById("endgame").style.display = "block";
 
}
function check() {
  let letter = document.querySelector(".blank-enter").value;
  // console.log(letter);
  letter.toLowerCase();
  if (!/[a-z]/.test(letter)) {
    document.querySelector(".trials").innerHTML = "Enter a valid letter!!";
  } else {
    if (checkletter(letter)) {
      document.querySelector(".trials").innerHTML =
        "Hurrayy letter exists!!! try next letter";
    } else {
      console.log(wrongtrials);
      if (wrongtrials == 3) {
        hinttaken = true;
        document.querySelector(".trials").innerHTML =
          "Wrong trial!!! " +
          (trials - wrongtrials - 1).toString() +
          " chances left.Check Hint";
        document.querySelector(".attempts").textContent +=
          hangman[wrongtrials].toString();
      } else {
        document.querySelector(".trials").innerHTML =
          "Wrong trial!!! " +
          (trials - wrongtrials - 1).toString() +
          " chances left";
        let attempts = document.querySelector(".attempts").textContent;
        if (attempts === "-") {
          document.querySelector(".attempts").textContent =
            hangman[0].toString();
        } else {
          document.querySelector(".attempts").textContent +=
            hangman[wrongtrials].toString();
        }
      }
      wrongtrials++;
      if (wrongtrials == 7) {
        nextgame();
      }
    }
  }
  document.querySelector(".blank-enter").value = "";
}
