'use strict';

var params = {
  output: document.getElementById('output'),
  result: document.getElementById('result'),
  scoreHuman: 0,
  scoreAI: 0,
  roundResult: document.getElementById('round-score'),
  newGame: document.getElementById('newgame-button'),
  numberGameText: document.getElementById('number-game'),
  progress: [],
  clicksNumber: 0,
  endGame: null
  }



//Funkcja ruchu komputera

function getAIscore() {
  
  var AIscore = Math.floor(Math.random() * 3 + 1);
  
  return AIscore;
 };

//Funkcja zamiany wyniku na tekst
function changeMoveToText(humanMove) {
  var moveText = ' ';
  
  if (humanMove === 1) 
  {moveText = 'Papier';}
  else if (humanMove === 2) 
  {moveText = 'Kamień';}
  else 
  {moveText = 'Nożyce';}
  
  return moveText;
};

//funkcja porównania wyników
function compareScore(humanMove, AImove) {
  
  var scoreText = ' ';
  
  if (humanMove === AImove) 
  {scoreText = 'REMIS!';}
  
  else if(
    (humanMove === 1 && AImove === 2) ||
    (humanMove === 2 && AImove === 3) ||
    (humanMove === 3 && AImove === 1)) 
  {scoreText = 'WYGRAŁEŚ!';}
  
  else 
  {scoreText = 'PRZEGRAŁEŚ!';}
  
  return scoreText;
  
};


//blokowanie klawiszy przed wyborem ilości rund

var elems = document.getElementsByClassName('player-move');

for(var i = 0; i < elems.length; i++) {
  elems[i].disabled = true;
  }


//funkcja wyświetlania wyniku pojedynczej gry

function displayGameScoreText (humanText, AItext, compareResult) { 

params.output.innerHTML = 'wybór gracza: ' + humanText +  '<br><br>' + 'wybór komputera: ' + AItext + '<br><br>' + 'Wynik pojedynku: ' + compareResult;
};

//funkcje zliczanania wyników i wyświetlannia wyników



function getHumanResult (scoreText) {
  if (scoreText === 'WYGRAŁEŚ!') {params.scoreHuman += 1;}
};

function getAIresult (scoreText) {
  if (scoreText === 'PRZEGRAŁEŚ!') {params.scoreAI += 1;}
};
  
function displayResults() {
params.result.innerHTML = 'Wyniki rundy' + '<br><br>' + 'Wygrane gracza: ' + params.scoreHuman +  '<br><br>' + 'Wygrane komputera: ' + params.scoreAI;
};

 // licznik gier  
  
 function clicksCount() {
  
  params.clicksNumber += 1;
  
}

//funkcja nowa gra i liczba rund

var numberGame;

params.newGame.addEventListener('click', function(){
	var numberGameChoice = window.prompt('Do ilu wygranych gramy w jednej rundzie?');
  
  if ((!isNaN(numberGameChoice)) 
      && (numberGameChoice != 0)) {

  numberGame = parseInt(numberGameChoice);
    
  params.numberGameText.innerHTML = 'Gramy do ' + numberGame + ' wygranych';
  
  var elems = document.getElementsByClassName('player-move');
  
  for(var i = 0; i < elems.length; i++) {
          elems[i].disabled = false;
          }
  document.getElementById('newgame-button').disabled = true;
    }
  
    else 
    
    {params.numberGameText.innerHTML = 'Podaj LICZBĘ rund! '
    };
  
  return numberGame;
});

//funkcje kończenia rundy

function finishRound(){
 if ((numberGame === params.scoreHuman) ||
      (numberGame === params.scoreAI))
     
      {params.endGame = true;
      
      document.getElementById('newgame-button').disabled = false;

      var elems = document.getElementsByClassName('player-move');
        for(var i = 0; i < elems.length; i++) {
          elems[i].disabled = true;
          }
      
      params.result.innerHTML = '';
      params.output.innerHTML = '';
      }

      else {
        params.endGame = false;
      }
};

function theEnd(){
  
if (params.endGame == true && numberGame === params.scoreHuman) {
    
  showSummary();
    
  params.roundResult.innerHTML = 'WYGRAŁEŚ RUNDĘ! ' + '<br><i class="fas fa-grin-alt smile"></i><br>' + ' Wygrane gracza: ' + params.scoreHuman + '  Wygrane komputera: ' + params.scoreAI;
    
  }
  
  else if (params.endGame == true && numberGame === params.scoreAI) {
   
    showSummary();
    params.roundResult.innerHTML = 'PRZEGRAŁEŚ RUNDĘ! ' + '<br><i class="fas fa-frown sad"></i><br>' + ' Wygrane gracza: ' + params.scoreHuman + '  Wygrane komputera: ' + params.scoreAI;
   
  }
};


  function showSummary() {
    showModal(event);
   
    for (var i = 0; i < params.progress.length; i++) {
      var node = document.createElement('tr')

      for (var key of ['gameNo', 'human', 'AI', 'gameScore']) {
          var tb = document.createElement('td')
          tb.innerHTML = params.progress[i][key]
          node.appendChild(tb)
      }
      
      document.getElementById('my-data').appendChild(node);

    }
    params.numberGameText.innerHTML = 'NACIŚNIJ PRZYCISK NOWA RUNDA';
};

    //Funkcja wyniku człowieka


var buttonsList = document.getElementsByClassName('player-move');




for (var i=0; i < buttonsList.length; i++) {
  initClickWatch(i);
}

function initClickWatch(value) {
  
  buttonsList[value].addEventListener('click', function() {
    var humanMoveAttribute = buttonsList[value].getAttribute('data-move');
    var humanMove = Number(humanMoveAttribute);
  
    var humanText = changeMoveToText(humanMove);
    var AImove = getAIscore();
    var AItext = changeMoveToText(AImove);
    var compareResult = compareScore(humanMove, AImove);
    var game = {
      gameNo: params.clicksNumber,
      human: humanText,
      AI: AItext,
      gameScore: compareResult,
      }
    
  params.progress.push(game);
    

  compareScore(humanMove, AImove);
  displayGameScoreText (humanText, AItext, compareResult);
  getHumanResult(compareResult);
  getAIresult(compareResult);
  displayResults(params.scoreHuman, params.scoreAI);
  finishRound();
  theEnd();

  });        
}
      
          
    
    //Funkcja wyświetlannia modala

function showModal(event){
  
     
  var modals =  document.querySelectorAll('.modal');
        
  for(var i = 0; i < modals.length; i++){
      modals[i].classList.remove('show');
    }
        
  document.querySelector('#modal-one').classList.add('show');
       
  document.querySelector('#modal-overlay').classList.add('show');
        
};
      
   //Funkcja zamykania modala   
    
var hideModal = function(event){
  
  document.querySelector('#modal-overlay').classList.remove('show');
  params.progress.length = 0; 
  var table = document.getElementById('my-data');
  table.innerHTML = '';
  params.clicksNumber = 0;
  params.scoreHuman = 0;
  params.scoreAI = 0;
};
      
var closeButtons = document.querySelectorAll('.modal .close');
      
for(var i = 0; i < closeButtons.length; i++){

    closeButtons[i].addEventListener('click', hideModal);
};
       
      
document.querySelector('#modal-overlay').addEventListener('click', hideModal);
      
      // Blokada kliknięć z samego modala
      
var modals = document.querySelectorAll('.modal');
      
for(var i = 0; i < modals.length; i++){

  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
};
    
 
