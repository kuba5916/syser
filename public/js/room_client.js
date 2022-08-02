var socket = io();

// odczytanie i wyświetlenie konfiguracji
function readRoom() {
    socket.emit('readRoom');
}
readRoom();
/***************************** wiadomość tekstowa **********************************/
// odbieranie informacji od serwera i wyświtalanie jej w liście
socket.on('chat message', function (msg, id, messageSound) {
    if ($('#messages li').size() >= 1) {
        $('#messages li').first().remove();
    }
    //responsiveVoice.speak(msg, "Polish Female");
    emitMessage(messageSound);
    setVisibilityAfterAddMessage();
    $('#messages').append("<li id=\"" + id + "\" class=\"roomMessage\">" + msg + "</li>");
	$("#help").attr( "class", "help-icon-grey" );
});

socket.on('li remove', function (id) {
    var abc = "#messages li[id=\"" + id + "\"]";
    $(abc).remove();
    setVisibilityAfterRemoveMessage();
});

socket.on('li clear', function (id) {
    document.getElementById("messages").innerHTML = "";
    setVisibilityAfterRemoveMessage();
});

/***************************** wysyłanie obrazka **********************/
socket.on('sendImage', function (image, id, messageSound) {
    
    if ($('#messages li').size() >= 1) {
        $('#messages li').first().remove();
    }
    emitMessage(messageSound);
    setVisibilityAfterAddMessage();
    // wyświetl obrazek
    $('#messages').append("<li id=\"" + id + "\" class=\"clickEvent\">" + '<img class="img-responsive center-block" src="public/uploads/images/' + image + '"/>' + "</li>");
	
	$("#help").attr( "class", "help-icon-grey" );
});

/***************************** wysyłanie dźwięku **********************/
socket.on('user sound', function () {
    emitSoundMessage();
});

socket.on('sendSound', function (sound) {
	emitSoundMessage(sound);
});

function emitSoundMessage(sound) {
	soundName = sound.substring(0,sound.search(".mp3"));
	ion.sound({
		sounds: [
			{
				name: soundName,
				ready_callback: function () {
					console.log("Utwór "+soundName+" został odtworzony.")
				},
				ended_callback: function () {
					console.log("Utwór "+soundName+" został zatrzymany.");
					setStopPlayed();
				}
			}
		],
		path: "public/uploads/sounds/",
		preload: true,
		multiplay: true,
		volume: 0.9
	});
    ion.sound.play(soundName);
}

function setStopPlayed(){
	socket.emit('soundStopPlaying');
}

/*************************** filmy ***********************************/
socket.on('sendMovie', function (movieName, id, messageSound) {
    
    if ($('#messages li').size() >= 1) {
        $('#messages li').first().remove();
    }
    setVisibilityAfterAddMessage();
    $('#messages').append("<li id=\"" + id + "\" class=\"clickEvent\">" + "<video id=\"movie" + id + "\" style=\"width:100%\" width=\"400\" controls autoplay><source src=\"public/uploads/movies/"+movieName+"\" type=\"video/mp4\" /></video></li>");
	$("#help").attr( "class", "help-icon-grey" );
	
});

/***************************** czas ***********************************/
// timer
socket.on('timer', function (data, timeFormat) {
    wyswietl(data.countdown, timeFormat);
});

/***************************** help **********************************/
$('#help').click(function () {
    socket.emit('help');
	$(this).attr( "class", "help-icon-red" );
});

/************************* stop game **********************/
socket.on('stopGame', function(endTimeGame, numberOfHints){
	document.getElementById('help').setAttribute("class", "help-icon-grey");
});

/*************** personalizacja POKOJU GRY ************/
socket.on('readGameRoomPersonalizations', function (gameRoomPersonalizations) {
	//document.getElementById("global_container").style.backgroundColor = gameRoomPersonalizations.backgroundColor;
	//document.getElementById("time").style.color = gameRoomPersonalizations.clockColor
	//document.getElementById("time").style.fontSize = gameRoomPersonalizations.clockSize;
	//if(gameRoomPersonalizations.clockFont != null && gameRoomPersonalizations.clockFont != "default"){
	//	document.getElementById("time").style.fontFamily = gameRoomPersonalizations.clockFont;
	//}
	//$('#messages li').css("color", gameRoomPersonalizations.textColor);
	//document.getElementById("messages").style.fontSize = gameRoomPersonalizations.textSize;
	//document.getElementById("help").style.display = gameRoomPersonalizations.helpEnabled == "true" ? "block" : "none";
	//document.getElementById("help").innerHTML  = gameRoomPersonalizations.helpButtonValue;
	
	/*if(gameRoomPersonalizations.backgroundType == "image"){
		$('#global_container.jumbotron').css("background-image", "url('../public/uploads/images/"+gameRoomPersonalizations.backgroundImage+"')").css("background-position","center").css("background-repeat", "no-repeat").css("background-size","100%");
		$('#global_container.jumbotron').css("background-color", "");
	} else {
		$('#global_container.jumbotron').css("background-image", "none");
		$('#global_container.jumbotron').css("background-color", gameRoomPersonalizations.backgroundColor);
	}*/
/*	html, #global_container.jumbotron {
    background-image: url(../images/room-background.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
}*/
});

socket.on('updateTextPersonalization', function (textColor) {
	$('#messages li').css("color", textColor);
});

socket.on('refreshRoom', function(){
	location.reload();
});