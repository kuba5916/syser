var socket = io();
/***************************** zarządzanie konfiguracją **********************************/

displayTab('config');

/*socket.on('readPredefinedSoundsMessage', function (sounds) {
	id = 0;
    sounds.forEach(sound => {
		s
		id++;
	});
});*/

function removePredefinedSoundMessages(id){
	console.log("siema");
	socket.emit('removePredefinedSoundMessages', id);
	location.reload();
}

// usunięcie wiadomości
var usunWiadomosc = function (id) {
    console.log(id);
    socket.emit('removeMessage', id);

    location.reload();
};

/************ refrashe room *********/

$('#saveGameRoomPersonalizations').click(function () {
    socket.emit('refreshRoom');
});

/************************************/

/***************************** wysyłanie obrazu **********************************/
var deleteImage = function (image) {
    socket.emit('removeImage', image);

	location.reload();
};
/***************************** wysyłanie dźwięku **********************************/
// usunięcie dźwięku
var deleteSound = function (sound) {
    socket.emit('deleteSound', sound);

	location.reload();
};

$("#savePredefinedSound").click(function () {
    data = $("#predefinedSounds").serializeArray();
	 
	for (i in data) {
		console.log(": "+data[i].value);
		data[i].value = data[i].value == "" ? "0" :data[i].value;
	}
	
	predefinedSound = {
			"name": data[0].value,
			"timeout": parseInt(data[1].value)*60,
			"interval": parseInt(data[3].value)*60
		};
		
	socket.emit('addPredefinedSound', predefinedSound);
});
/**************** wysyłanie filmu ******************/
var deleteMovie = function (movie) {
    socket.emit('deleteMovie', movie);

	location.reload();
};

$("#backgroundType").change(function () {
	if($(this).val() == "image") {
		$("#tRbackgroundImage").show();
		$("#tRbackgroundColor").hide();
	} else {
		$("#tRbackgroundImage").hide();	
		$("#tRbackgroundColor").show();
	}
});

/********formularz**********/
$("#period").change(function () {
	if($(this).val() == "periodically") {
		$("#periodNumberInput").show();	
	} else {
		$("#periodNumberInput").hide();	
	}
});