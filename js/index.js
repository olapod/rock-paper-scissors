'use strict';
var params = {
  output: document.getElementById('output'),
  result: document.getElementById('result'),
  addScoreHuman: 0,
  addScorePlayer: 0,
  roundResult: document.getElementById('round-score'),
  newGame: document.getElementById('newgame-button'),
  numberGameText: document.getElementById('number-game'),
  progress: [],
  clicksNumber: 0,
  
 
}


//Funkcja ruchu komputera

function playerMoveResult() {
  
  var playerScore = Math.floor(Math.random() * 3 + 1);
  
  return playerScore;
 };

//Funkcja zamiana wyniku na tekst
function moveToText(humanMove) {
  var moveText = ' ';
  
  if (humanMove === 1) {moveText = 'Papier';}
  else if (humanMove === 2) {moveText = 'Kamień';}
  else {moveText = 'Nożyce';}
  
  return moveText;
};

//funkcja przycisków
function compareScore(humanMove, playerMove) {
  
  var scoreText = ' ';
  
  if (humanMove === playerMove) {scoreText = 'REMIS!';}
  else if(
    (humanMove === 1 && playerMove === 2) ||
    (humanMove === 2 && playerMove === 3) ||
    (humanMove === 3 && playerMove === 1)
  ) {scoreText = 'WYGRAŁEŚ!';}
  else {scoreText = 'PRZEGRAŁEŚ!';}
  
  return scoreText;
  };




  
//funkcja blokowania klawiszy

document.getElementById('paper-button').disabled = true;
document.getElementById('stone-button').disabled = true;
document.getElementById('shears-button').disabled = true;



//funkcja wyświetlania wyniku pojedynczej gry
function gameScoreText (humanText, playerText, compareResult) { 
params.output.innerHTML = 'wybór gracza: ' + humanText +  '<br><br>' + 'wybór komputera: ' + playerText + '<br><br>' + 'Wynik pojedynku: ' + compareResult;};

//funkcje zliczania wyników i wyświetlania wyników



function humanSummary (scoreText) {
  if (scoreText === 'WYGRAŁEŚ!') {params.addScoreHuman += 1;}};

function playerSummary (scoreText) {
  if (scoreText === 'PRZEGRAŁEŚ!') {params.addScorePlayer += 1;}};
  
function displayResults(addScoreHuman, addScorePlayer) {
params.result.innerHTML = 'Wyniki rundy' + '<br><br>' + 'Wygrane gracza: ' + params.addScoreHuman +  '<br><br>' + 'Wygrane komputera: ' + params.addScorePlayer;
};

 // licznik gier  
  
 function ClicksCount() {
  
  params.clicksNumber += 1;
  
}

//funkcja nowa gra i liczba rund

var numberGame;

params.newGame.addEventListener('click', function(){
	var numberGameChoice = window.prompt('Do ilu wygranych gramy w jednej rundzie?');
  
  if ((!isNaN(numberGameChoice)) 
      && (numberGameChoice != 0))  {
  numberGame = parseInt(numberGameChoice);
    
  params.numberGameText.innerHTML = 'Gramy do ' + numberGame + ' wygranych';
    
  document.getElementById('paper-button').disabled = false;
  document.getElementById('stone-button').disabled = false;
  document.getElementById('shears-button').disabled = false;}
else {params.numberGameText.innerHTML = 'Podaj LICZBĘ rund! '};
  
  return numberGame;
});


//funkcje kończenia rundy
var endGame;

function finishRound(){
 if (
      (numberGame === params.addScoreHuman) ||
      (numberGame === params.addScorePlayer))
     {endGame = true;
      document.getElementById('paper-button').disabled = true;
      document.getElementById('stone-button').disabled = true;
      document.getElementById('shears-button').disabled = true;
      params.result.innerHTML = '';
      params.output.innerHTML = '';
      }
 else {endGame = false;}
  
   };

function theEnd(){
  
if (endGame == true && numberGame === params.addScoreHuman) {
    params.roundResult.innerHTML = 'WYGRAŁEŚ RUNDĘ! :) KONIEC GRY! NACIŚNIJ PRZYCISK NOWA RUNDA';
    showModal(event);
    params.addScorePlayer = 0;
    params.addScoreHuman = 0;
  }
  
  else if (endGame == true && numberGame === params.addScorePlayer) {
   params.roundResult.innerHTML = 'PRZEGRAŁEŚ RUNDĘ! :( KONIEC GRY! NACIŚNIJ PRZYCISK NOWA RUNDA';
   showModal(event);
    params.addScorePlayer = 0;
    params.addScoreHuman = 0;}};

    //Funkcja wyniku człowieka


var buttonsList = document.getElementsByClassName('player-move');




for (var i=0; i < buttonsList.length; i++) {
  initClickWatch(i);
  }


function initClickWatch(value) {
  
  buttonsList[value].addEventListener('click', function() {
  var humanMoveAttribute = buttonsList[value].getAttribute('data-move');
  var humanMove = Number(humanMoveAttribute);

  var humanText = moveToText(humanMove);
  var playerMove = playerMoveResult();
  var playerText = moveToText(playerMove);
  var compareResult = compareScore(humanMove, playerMove);
  

  compareScore(humanMove, playerMove);
  gameScoreText (humanText, playerText, compareResult);
  humanSummary(compareResult);
  playerSummary(compareResult);
  displayResults(params.addScoreHuman, params.addScorePlayer);
  finishRound();
  theEnd();
  params.progress.push (new saveProgress(params.clicksNumber, humanText, playerText, compareResult, params.addScorePlayer, params.addScoreHuman));
   console.log(params.progress);

   for (var i = 0; i < params.progress.length; i++) {
      var node = document.createElement("tr")
      for (var key of ['gameNo', 'human', 'player', 'gameScore', 'lostNo', 'winNo']) {
        var tb = document.createElement("td")
        tb.innerHTML = params.progress[i][key]
        node.appendChild(tb)
      }
      document.getElementById("my-data").appendChild(node);
    }
   
  
     });        
    }
    

    
        
    
    //Funkcja wyświetlania modala

      function showModal(event){
        event.preventDefault();
        
      var modals =  document.querySelectorAll('.modal');
        
      for(var i = 0; i < modals.length; i++){
      modals[i].classList.remove('show');}
        
      document.querySelector('#modal-one').classList.add('show');
       
      document.querySelector('#modal-overlay').classList.add('show');
          
      };
      
      
    
      var hideModal = function(event){
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
      };
      
      var closeButtons = document.querySelectorAll('.modal .close');
      
      for(var i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', hideModal);
      }
      
      // Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 
      
      document.querySelector('#modal-overlay').addEventListener('click', hideModal);
      
      // Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 
      
      var modals = document.querySelectorAll('.modal');
      
      for(var i = 0; i < modals.length; i++){
        modals[i].addEventListener('click', function(event){
          event.stopPropagation();
        });
      }
    
    
function saveProgress(gameNo, human, player, gameScore, lostNo, winNo) {
  this.gameNo = gameNo;
  this.human = human;
  this.player = player;
  this.gameScore = gameScore;
  this.lostNo = lostNo;
  this.winNo = winNo;
  }

  
  

      
