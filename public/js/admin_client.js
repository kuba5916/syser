var socket = io();
// odczytanie i wyświetlenie konfiguracji
function readAdmin() {
    socket.emit('readAdmin');
	displayTab('admin');
}
$('button#tabs-button-3').click(function () {
    socket.emit('readSoundsVisibility');
});

/***************************** wiadomość  **********************************/
// odbieranie informacji od serwera i wyświtalanie jej w liście
socket.on('chat message', function (msg, id, messageSound) {
    if($('#messages li').size() >= 1) {
		$('#messages li').first().remove();
    }
    setVisibilityAfterAddMessage();
    $('#messages').append("<li id=\"" + id + "\" class=\"roomMessage\"><img class=\"rubbish-icon\" src=\"public/images/rubbish.svg\" title=\"Usuń\"/>" + msg + "</li>");
	document.getElementById('attention').setAttribute("class", "col-md-6 attention-icon-grey");
});

// usuwanie konkretnej wiadomości
$("#messages").on("click", ".roomMessage", function (event) {
	socket.emit('li remove', this.id);
});

socket.on('li clear', function (id) {
	document.getElementById("messages").innerHTML = "";
	setVisibilityAfterRemoveMessage();
});

socket.on('li remove', function (id) {
	removeMessage(id);
});

/***************************** czas **********************************/
// wysłanie wiadomości do serwera z prośbą o rozpoczęciu odliczania czasu

// timer
socket.on('timer', function (data, clockFormat) {
    wyswietl(data.countdown, clockFormat);
});

$('#editTime').click(function () {
    $("#editTimeInput").focus();
});

$('#editTimeInput').on('blur', function () {
	var $this = $(this).val();
	if ($this != "") {
		socket.emit('editLiveTime', parseFloat($this.replace(",", ".")));
	}
	$(this).val("");
});

$('#addLiveTime').click(function () {
    var editTime = $('#editEdit').val();
    socket.emit('editLiveTime', editTime);
    $('#editEdit').val('');
});

$('#substractLiveTime').click(function () {
    var editTime = $('#editEdit').val();
    socket.emit('editLiveTime', '-' + editTime);
    $('#editEdit').val('');
});

$('#resumeLiveTime').click(function () {
    socket.emit('resumeLiveTime');
});

$('#pauseLiveTime').click(function () {
    socket.emit('pauseLiveTime');
});

$('#reloadLiveTime').click(function () {
    resetTime();
});

/* inne */
$('#roomChanged').click(function () {
    pokojVisibility();
});

$('#adminChanged').click(function () {
    document.getElementById('global_container').setAttribute("class", "jumbotron vertical-center adminPerspective");
    document.getElementById('roleFunctions').setAttribute("style", "display:none");
    document.getElementById('bodyContent').setAttribute("style", "");
});

/* funkcje czasu gry*/
$('#startTime').click(function(){
    console.log("startTimeClient");
	socket.emit('startGame');
    setGameStarted(true);
    isGameStarted();
});

$('#stopTime').click(function(){
    setGameStarted(false);
    isGameStarted();
    stopGame();
    resetTime();
});

function resetTime() {
    socket.emit('resetLiveTime');
}

/***************** stop game **********/
function stopGame() {
    socket.emit('stopGame');
	document.getElementById('attention').setAttribute("class", "col-md-6 attention-icon-dark-grey");
}

socket.on('stopGame', function(endTimeGame, numberOfHints){
	$('#numberOfHints').text(numberOfHints);
	
	var d = new Date(endTimeGame*1000);
	$('#endGameTime').text(d.getMinutes()+"min. "+d.getSeconds()+"sek.");
	document.getElementById('summary').setAttribute("style", "");
});

/******************/
function setGameStarted(gameStarted) {
    socket.emit('setGameStarted', gameStarted);
}

function isGameStarted() {
    socket.emit('isGameStarted');
}

socket.on('isGameStarted', function (isGameStarted) {
    if(isGameStarted) {
        document.getElementById('startTime').setAttribute("style", "display:none");
        document.getElementById('stopTime').setAttribute("style", "");
		document.getElementById('tabs').hidden = false;
		document.getElementById('summary').setAttribute("style", "display:none");
    } else {
        document.getElementById('startTime').setAttribute("style", "");
        document.getElementById('stopTime').setAttribute("style", "display:none");
		document.getElementById('tabs').hidden = true;
    }
});

/************** help **************/
socket.on('emitHelpSound', function (messageSound) {
    emitMessage(messageSound);
	document.getElementById('attention').setAttribute("class", "col-md-6 attention-icon-red");
});

/********* GO TO *********/
var goToHome = function() {
    var windowLocation = window.location.href;
    var lastURLSlash = windowLocation.lastIndexOf("/");
    var homePage = windowLocation.substring(0, lastURLSlash);
    window.open(homePage, "_self");
}

var goToConfiguration = function() {
    var windowLocation = window.location.href;
    var lastURLSlash = windowLocation.lastIndexOf("/");
    var homePage = windowLocation.substring(0, lastURLSlash);
    var configPage = homePage+"/config";
    window.open(configPage, "_self");
}