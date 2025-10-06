let proximity = 0;
let time_left = 300;
let em_lvl = 1;

window.onload = function () {

//start game
const startButton = document.querySelector("#startButton");
//
const continueButton1 = document.querySelector("#continueButton1");

//quit
const button1 = document.querySelector("#button1");
//restart
const button2 = document.querySelector("#button2");

//confirm quit
const button4 = document.querySelector("#button4");
//continue
const button5 = document.querySelector("#button5");
//confirm quit
const button6 = document.querySelector("#button6");
//continue
const button7 = document.querySelector("#button7");


//proximity
const proximity_text = document.querySelector("#proximity_text");
//time
const time_left_text = document.querySelector("#time_left_text");
//emergency level
const em_lvl_text = document.querySelector("#em_lvl_text");



startButton.onclick = startGame;
continueButton1.onclick = continueGame1;

button1.onclick = goQuit;
button2.onclick = goRestart;


//startGame
function startGame(){
    document.getElementById("startButton").style.display = "none";
    document.getElementById("continueButton1").style.display = "block";
    document.getElementById("meteor_img").style.display = "none";
    document.getElementById("start_vid").style.display = "block";

    const outputImpactor = document.getElementById("output")
    

    const html = `
        <h1>This is a game where your choices decide the faith of humanity</h1>
        <ul>
          <li>
            <strong>Impactor 2025</strong><br>
            <strong>Warning: threat</strong><br>
            <strong><del>Approach date:2025-Oct-05 19:45</del></strong><br>
            <strong>Approach date: TODAY TODAY TODAY</strong><br>
          </li>
        </ul>
      `;

      outputImpactor.innerHTML = html;
}

function continueGame1(){
    document.getElementById("start_vid").style.display = "none";
    document.getElementById("continueButton1").style.display = "none";
    document.getElementById("output").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("controlContainer").style.display = "block";
    document.getElementById("stats").style.display = "block";
    startOptions()
}

//goQuit 

function goQuit(){
    document.getElementById('quitModal').style.display = 'block';

    button4.onclick = confirmQuit;
    button5.onclick = Continue;

    function confirmQuit(){
        alert("Game has been quit.");
        window.location.href = "index.html"
    }

    function Continue(){
        document.getElementById("quitModal").style.display = 'none';
    }

}

//goRestart

function goRestart(){
    document.getElementById('restartModal').style.display = 'block';

    button6.onclick = confirmRestart;
    button7.onclick = Continue;

    function confirmRestart(){
    }

    function Continue(){
        document.getElementById("restartModal").style.display = 'none';
    }
}
}
