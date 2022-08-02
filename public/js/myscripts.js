// ustawienie tytułu strony
//document.title = "Pokój nr " + document.URL.substring(document.URL.lastIndexOf(":") + 1, document.URL.lastIndexOf(":") + 2);

var editTimeButton = true;
var inputMessage = true;

function pokojVisibility()
{
    document.getElementById('admin').setAttribute("style", "display:none");
    document.getElementById('headerAdmin').setAttribute("style", "display:none");
    document.getElementById('room').setAttribute("class", "col-md-12 col-lg-12 roomPerspective messageSended");
}

function setVisibilityAfterAddMessage() {
    // ukryj czas zegar
    document.getElementById('zegar').setAttribute("style", "display:none");
}

function setVisibilityAfterRemoveMessage() {
    // pokaż czas zegar
    document.getElementById('zegar').setAttribute("style", "");
}

function set_body_height() { // set body height = window height
    $('#messages').height(($(window).height()) / 2);
}

// TABS przełączanie
function openCity(evt, id, page) {
    var i, tabcontent, tablinks;
	buttonName = "tabs-button-"+id;
	contentName = "tabs-content-"+id;
    tabcontent = document.getElementsByClassName("tabcontent");
    for(i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for(i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(contentName).style.display = "block";
    evt.currentTarget.className += " active";
	
	setCookie(page+"TabName", id);
}

function displayTab(page){ 
	tabName = getCookie(page+'TabName');
	console.log(page+"TabName " + tabName);
	if(tabName == undefined || tabName == ""){
		tabName = "1";
	}
	buttonName = "tabs-button-"+tabName;
	contentName = "tabs-content-"+tabName;
	
	// buttonName
    var tablink = document.getElementById(contentName);
	tablink.className += " active";
	tablink.style.display = "block";
	
	// contentName
	var tablink = document.getElementById(buttonName);
	tablink.className += " active";
}

var timeFormat;
function wyswietl(n, clockFormat){
    s = n % 60;
                   
	if(clockFormat == "gms") {
		m = Math.floor((n % 3600) / 60);
		g = Math.floor(n / 3600);
		document.getElementById('time').innerHTML = '' + ((g < 10) ? '0' + g : g) + ':' + ((m < 10) ? '0' + m : m) + ':' + ((s < 10) ? '0' + s : s);
	}
	if(clockFormat == "ms") {
		m = Math.floor(n / 60);
		document.getElementById('time').innerHTML = '' + ((m < 10) ? '0' + m : m) + ':' + ((s < 10) ? '0' + s : s);
	}
}

var removeMessage = function(id){
	var abc = "#messages li[id=\"" + id + "\"]";
    $(abc).remove();
    setVisibilityAfterRemoveMessage();
}