/***************************** sockets **********************************/
socket.on('sendImage', function image(image, id) {
    if ($('#messages li').size() >= 1) {
        $('#messages li').first().remove();
    }
    setVisibilityAfterAddMessage();
    // wyświetl obrazek
    $('#messages').append("<li id=\"" + id + "\" class=\"roomMessage\">" + '<img class=\"rubbish-icon\" src=\"public/images/rubbish.svg\" title=\"Usuń\"/><img class="img-responsive center-block" src="public/uploads/images/' + image + '"/>' + "</li>");
	document.getElementById('attention').setAttribute("class", "col-md-6 attention-icon-grey");
});
/****************************************************/

var selectImage = function(id){
	// usuń dotychczasowe zaznaczenie
	$('.selected-image').removeClass("selected-image");
		
	// ustaw klasę "selected" na elemencie o ID == id
	$('#'+id).addClass("selected-image");
}

var sendImage = function(){
	// znajdź image który ma element "selected"
	// pobierz jego <p>name</p>
	// i przekaż do serwera w celu przesłania obrazka
	var imageName = $('.selected-image img').attr("alt");
	socket.emit('sendImage', imageName);
}

