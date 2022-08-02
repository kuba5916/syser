/****************** film **************************/

var sendMovie = function(movieName) {
	socket.emit('sendMovie', movieName);
}

socket.on('sendMovie', function(movieName, id) {

    if ($('#messages li').size() >= 1) {
        $('#messages li').first().remove();
    }
    setVisibilityAfterAddMessage();
	
    $('#messages').append("<li id=\"" + id + "\" class=\"roomMessage\">" + "<img class=\"rubbish-icon\" src=\"public/images/rubbish.svg\" title=\"Usuń\"/><video id=\"movie" + id + "\" width=\"400\" controls autoplay muted><source src=\"public/uploads/movies/"+movieName+"\" type=\"video/mp4\"/></video></li>");
		
	document.getElementById('attention').setAttribute("class", "col-md-6 attention-icon-grey");
	
});