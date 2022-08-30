// guide page
function playPause_g() {
  var audio = document.querySelector(".g");
  if (audio.paused)
    audio.play();
  else
    audio.pause();
};
function playPause_c() {
  var audio = document.querySelector(".c");
  if (audio.paused)
    audio.play();
  else
    audio.pause();
};
function playPause_e() {
  var audio = document.querySelector(".e");
  if (audio.paused)
    audio.play();
  else
    audio.pause();
};
function playPause_a() {
  var audio = document.querySelector(".a");
  if (audio.paused)
    audio.play();
  else
    audio.pause();
};



// Home page product displays
function displayElement() {
  document.getElementById("showImage").style.display = "inline-block";
};

function showPicture(theImg) {
  var imgElement = document.getElementById("showImage");
  imgElement.setAttribute("src", theImg.src);

};



// about poge submit button pop up
function submitform() {
  alert("Thank you for your input! You will be contacted shortly.")
}




