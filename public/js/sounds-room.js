function emitSound() {
    var mySound = soundManager.createSound({
        url: 'public/sounds/bomb_siren.mp3',
    });
    mySound.play();
}

function emitSoundClock() {
    var mySoundClock = soundManager.createSound({
        url: 'public/sounds/ring.mp3',
    });
    mySoundClock.play();
}

function emitMessage(messageSound) {
  var url;
  if (messageSound != null && messageSound != "") {
    url = "public/uploads/sounds/"+messageSound;
  } else {
    url = "media/door_bell.mp3"
  }
	var mySoundClock = soundManager.createSound({
        url: url,
    });
    mySoundClock.play();
}