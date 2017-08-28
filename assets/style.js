document.addEventListener("DOMContentLoaded", function() {

  let requestUrl = "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/topscorers";
  sendGetRequest(requestUrl);

  function sendGetRequest(requestUrl) {
    let request = new XMLHttpRequest();
    request.onload = function() {
      if (request.status == 200 && request.readyState == 4) {
        let jsonObject = request.response;
        populateTable(jsonObject);
      } else {
        let exception = document.querySelector('table');
        exception.innerHTML = "Error while page loading, error code: " + request.status;
        exception.style.backgroundColor = "white";
      }
    }
    request.open("GET", requestUrl, true);
    request.setRequestHeader("X-Mashape-Key", "kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw");
    request.responseType = 'json';
    request.send(null);
  }

  function populateTable(jsonObj) {
    let tableBody = document.querySelector('tbody');
    let playersNumber = 20;
    let playersCount = jsonObj["data"]["topscorers"].length;
    playersNumber = Math.min(playersNumber, playersCount);
    for (let i = 0; i < playersNumber; i++) {
      let scorerInfo = jsonObj["data"]["topscorers"][i];
      let tableRow = tableBody.insertRow(i);
      let tableData = [];
      for (let j = 0; j < 4; j++) {
        tableData[j]= tableRow.insertCell(j);
      }
      tableData[0].classList.add("col-xs-2");
      tableData[1].classList.add("col-xs-4");
      tableData[2].classList.add("col-xs-4");
      tableData[3].classList.add("col-xs-2");
      tableData[0].innerHTML = i + 1;
      tableData[1].innerHTML = scorerInfo["fullname"];
      tableData[2].innerHTML = scorerInfo["team"];
      tableData[3].innerHTML = scorerInfo["goals"];
    }
  }

});
