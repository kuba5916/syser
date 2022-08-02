/***************************** wysyłanie dźwięku **********************************/
/* wysyłanie dźwięku */
socket.on('isSoundPlayed', function(isSoundPlayed){
	if(isSoundPlayed == true) {
		$('.soundButton').hide();
	} else {
		$('.soundButton').show();
	}
});

var sendSound = function(sound) {
	socket.emit('sendSound', sound);
}