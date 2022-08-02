// wysyłanie wiadomości z formularza do serwera
$('#sendText').click(function () {
	var newMessage = $('#textMessage').val();
    if (newMessage != '') {
		newMessage = newMessage.replace(/(?:\r\n|\r|\n)/g, '<br />');
        socket.emit('chat message', newMessage);
    }
    $('#textMessage').val('');
});

var importMessage = function(id){
	var message = $('#message-'+id+' span').html();
	
	var find = '<br>';
	var re = new RegExp(find, 'g');
	message = message.replace(re, '\r\n');
	
	find = '&lt;';
	var re = new RegExp(find, 'g');
	message = message.replace(re, '<');
	
	find = '&gt;';
	var re = new RegExp(find, 'g');
	message = message.replace(re, '>');
	
	$('#textMessage').val(message);
}