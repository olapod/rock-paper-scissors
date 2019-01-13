'use strict';

var output = document.getElementById('output');
var result = document.getElementById('result');

//Funkcja ruchu komputera

function playerMoveResult() {
  
  var playerScore = Math.floor(Math.random() * 3 + 1);
  
  return playerScore;
 };

//Funkcja zamiana wyniku na tekst
function moveToText(number) {
  var moveText = ' ';
  
  if (number === 1) {moveText = 'Papier';}
  else if (number === 2) {moveText = 'Kamień';}
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

//Funkcja wyniku człowieka

var paper = document.getElementById('paper-button');
var stone = document.getElementById('stone-button');
var shears = document.getElementById('shears-button');

document.getElementById('paper-button').disabled = true;
document.getElementById('stone-button').disabled = true;
document.getElementById('shears-button').disabled = true;

// przycisk PAPIER
paper.addEventListener('click', function (){
  
  var humanMove = 1;
  var humanText = moveToText(1);
  var playerMove = playerMoveResult();
  var playerText = moveToText(playerMove);
  var compareResult = compareScore(humanMove, playerMove);
  
  compareScore(humanMove, playerMove);
  gameScoreText (humanText, playerText, compareResult);
  humanSummary(compareResult);
  playerSummary(compareResult);
  displayResults(addScoreHuman, addScorePlayer);
  finishRound();
  theEnd();
  });

//PRZYCISK KAMIEŃ
stone.addEventListener('click', function (){
  
	var humanMove = 2;
  var humanText = moveToText(2);
  var playerMove = playerMoveResult();
  var playerText = moveToText(playerMove);
  var compareResult = compareScore(humanMove, playerMove);
  
  compareScore(humanMove, playerMove);
  gameScoreText (humanText, playerText, compareResult);
  humanSummary(compareResult);
  playerSummary(compareResult);
  displayResults(addScoreHuman, addScorePlayer);
  finishRound();
  theEnd();
 });

//PRZYCISK NOŻYCE
shears.addEventListener('click', function (){
  
	var humanMove = 3;
  var humanText = moveToText(3);
  var playerMove = playerMoveResult();
  var playerText = moveToText(playerMove);
  var compareResult = compareScore(humanMove, playerMove);
  
  compareScore(humanMove, playerMove);
  gameScoreText(humanText, playerText, compareResult);
  humanSummary(compareResult);
  playerSummary(compareResult);
  displayResults(addScoreHuman, addScorePlayer);
  finishRound();
  theEnd();
 });

//funkcja wyświetlania wyniku pojedynczej gry
function gameScoreText (humanText, playerText, compareResult) { 
output.innerHTML = 'wybór gracza: ' + humanText +  '<br><br>' + 'wybór komputera: ' + playerText + '<br><br>' + 'Wynik pojedynku: ' + compareResult;};

//funkcje zliczania wyników i wyświetlania wyników

var addScoreHuman = 0;
var addScorePlayer = 0;

function humanSummary (scoreText) {
  if (scoreText === 'WYGRAŁEŚ!') {addScoreHuman += 1;}};

function playerSummary (scoreText) {
  if (scoreText === 'PRZEGRAŁEŚ!') {addScorePlayer += 1;}};
  
function displayResults(addScoreHuman, addScorePlayer) {
result.innerHTML = 'Wyniki rundy' + '<br><br>' + 'Wygrane gracza: ' + addScoreHuman +  '<br><br>' + 'Wygrane komputera: ' + addScorePlayer;
};


//funkcja nowa gra i liczba rund
var newGame = document.getElementById('newgame-button');
var numberGameText = document.getElementById('number-game');
var numberGame;

newGame.addEventListener('click', function(){
	numberGameChoice = window.prompt('Do ilu wygranych gramy w jednej rundzie?');
  
  if ((!isNaN(numberGameChoice)) 
      && (numberGameChoice != 0))  {
  numberGame = parseInt(numberGameChoice);
    
  numberGameText.innerHTML = 'Gramy do ' + numberGame + ' wygranych';
    
  document.getElementById('paper-button').disabled = false;
  document.getElementById('stone-button').disabled = false;
  document.getElementById('shears-button').disabled = false;}
else {numberGameText.innerHTML = 'Podaj LICZBĘ rund! '};
  
  return numberGame;
});


//funkcje kończenia rundy
var endGame;

function finishRound(){
 if (
      (numberGame === addScoreHuman) ||
      (numberGame === addScorePlayer))
     {endGame = true;
      document.getElementById('paper-button').disabled = true;
      document.getElementById('stone-button').disabled = true;
      document.getElementById('shears-button').disabled = true;
      result.innerHTML = '';
      output.innerHTML = '';
      }
 else {endGame = false;}
  
   };

function theEnd(){
  
if (endGame == true && numberGame === addScoreHuman) {
    numberGameText.innerHTML = 'WYGRAŁEŚ RUNDĘ! :) KONIEC GRY! NACIŚNIJ PRZYCISK NOWA RUNDA';
    
    addScorePlayer = 0;
    addScoreHuman = 0;
  }
  
  else if (endGame == true && numberGame === addScorePlayer) {
   numberGameText.innerHTML = 'PRZEGRAŁEŚ RUNDĘ! :( KONIEC GRY! NACIŚNIJ PRZYCISK NOWA RUNDA';
    
    addScorePlayer = 0;
    addScoreHuman = 0;}};