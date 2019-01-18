"use strict";var numberGame,endGame,params={output:document.getElementById("output"),result:document.getElementById("result"),addScoreHuman:0,addScorePlayer:0,roundResult:document.getElementById("round-score"),newGame:document.getElementById("newgame-button"),numberGameText:document.getElementById("number-game"),progress:[],clicksNumber:0};function playerMoveResult(){return Math.floor(3*Math.random()+1)}function moveToText(e){return 1===e?"Papier":2===e?"Kamień":"Nożyce"}function compareScore(e,a){return e===a?"REMIS!":1===e&&2===a||2===e&&3===a||3===e&&1===a?"WYGRAŁEŚ!":"PRZEGRAŁEŚ!"}function gameScoreText(e,a,t){params.output.innerHTML="wybór gracza: "+e+"<br><br>wybór komputera: "+a+"<br><br>Wynik pojedynku: "+t}function humanSummary(e){"WYGRAŁEŚ!"===e&&(params.addScoreHuman+=1)}function playerSummary(e){"PRZEGRAŁEŚ!"===e&&(params.addScorePlayer+=1)}function displayResults(e,a){params.result.innerHTML="Wyniki rundy<br><br>Wygrane gracza: "+params.addScoreHuman+"<br><br>Wygrane komputera: "+params.addScorePlayer}function clicksCount(){params.clicksNumber+=1}function finishRound(){numberGame===params.addScoreHuman||numberGame===params.addScorePlayer?(endGame=!0,document.getElementById("paper-button").disabled=!0,document.getElementById("stone-button").disabled=!0,document.getElementById("shears-button").disabled=!0,params.result.innerHTML="",params.output.innerHTML=""):endGame=!1}function theEnd(){1==endGame&&numberGame===params.addScoreHuman?(params.roundResult.innerHTML="WYGRAŁEŚ RUNDĘ! :) KONIEC GRY! NACIŚNIJ PRZYCISK NOWA RUNDA",showModal(event),params.addScorePlayer=0,params.addScoreHuman=0):1==endGame&&numberGame===params.addScorePlayer&&(params.roundResult.innerHTML="PRZEGRAŁEŚ RUNDĘ! :( KONIEC GRY! NACIŚNIJ PRZYCISK NOWA RUNDA",showModal(event),params.addScorePlayer=0,params.addScoreHuman=0)}document.getElementById("paper-button").disabled=!0,document.getElementById("stone-button").disabled=!0,document.getElementById("shears-button").disabled=!0,params.newGame.addEventListener("click",function(){var e=window.prompt("Do ilu wygranych gramy w jednej rundzie?");return isNaN(e)||0==e?params.numberGameText.innerHTML="Podaj LICZBĘ rund! ":(numberGame=parseInt(e),params.numberGameText.innerHTML="Gramy do "+numberGame+" wygranych",document.getElementById("paper-button").disabled=!1,document.getElementById("stone-button").disabled=!1,document.getElementById("shears-button").disabled=!1),numberGame});for(var buttonsList=document.getElementsByClassName("player-move"),i=0;i<buttonsList.length;i++)initClickWatch(i);function initClickWatch(m){buttonsList[m].addEventListener("click",function(){var e=buttonsList[m].getAttribute("data-move"),a=Number(e),t=moveToText(a),n=playerMoveResult(),r=moveToText(n),o=compareScore(a,n);compareScore(a,n),gameScoreText(t,r,o),humanSummary(o),playerSummary(o),displayResults(params.addScoreHuman,params.addScorePlayer),finishRound(),theEnd(),data.push(params.clicksNumber,t,r,o,params.addScorePlayer,params.addScoreHuman),console.log(data);var d=data[-1];console.log("final data: "+d)})}for(i=0;i<finalData.length;i++){var node=document.createElement("tr");for(var key in finalData[i]){var tb=document.createElement("td");tb.innerHTML=finalData[i][key],node.appendChild(tb)}document.getElementById("my-data").appendChild(node)}function showModal(e){e.preventDefault();for(var a=document.querySelectorAll(".modal"),t=0;t<a.length;t++)a[t].classList.remove("show");document.querySelector("#modal-one").classList.add("show"),document.querySelector("#modal-overlay").classList.add("show")}var hideModal=function(e){e.preventDefault(),document.querySelector("#modal-overlay").classList.remove("show"),params.progress.length=0,document.getElementById("my-data").innerHTML=""},closeButtons=document.querySelectorAll(".modal .close");for(i=0;i<closeButtons.length;i++)closeButtons[i].addEventListener("click",hideModal);document.querySelector("#modal-overlay").addEventListener("click",hideModal);var modals=document.querySelectorAll(".modal");for(i=0;i<modals.length;i++)modals[i].addEventListener("click",function(e){e.stopPropagation()});var data=function(e,a,t,n,r,o){this.gameNo=e,this.human=a,this.player=t,this.gameScore=n,this.lostNo=r,this.winNo=o};