var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
let resultArea = document.querySelector(".comment");

var modalContent = document.querySelector(".modal-content"); // Added missing 'var' keyword
var modalText = document.querySelector("#modalText"); // Added missing 'var' keyword
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function calculate() {
  if (age.value == '' || height.value == '' || weight.value == '' || (male.checked == false && female.checked == false)) {
    modal.style.display = "block";
    modalText.innerHTML = `All fields are required!`;
  } else {
    countBmi();
  }
}

function countBmi() {
  var p = [age.value, height.value, weight.value];
  if (male.checked) {
    p.push("male");
  } else if (female.checked) {
    p.push("female");
  }

  var bmi = Number(p[2]) / (Number(p[1]) / 100 * Number(p[1]) / 100);

  var result = '';
  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = 'Healthy';
  } else if (25 <= bmi && bmi <= 29.9) {
    result = 'Overweight';
  } else if (30 <= bmi && bmi <= 34.9) {
    result = 'Obese';
  } else if (35 <= bmi) {
    result = 'Extremely obese';
  }

  resultArea.style.display = "block";
  document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}</span>`;
  document.querySelector("#result").innerHTML = bmi.toFixed(2);
}

// Event listener for modal close button
span.onclick = function() { // Fixed syntax for defining the onclick event handler
  modal.style.display = "none";
}

// Event listener to close modal when clicking outside the modal
window.onclick = function(event) { // Fixed syntax for defining the onclick event handler
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const imageContainer = document.querySelector('.image');
const videoContainer = document.getElementById('video-container');

let stream;

async function startVideo() {
    try {
        // Access the user's webcam
        stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Show the video container
        videoContainer.style.display = 'flex';

        // Show the video stream in the video element
        video.srcObject = stream;

        // Hide the image container
        imageContainer.style.display = 'none';

        // Hide the start button and show the stop button
        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
    } catch (error) {
        console.error('Error accessing the webcam:', error);
    }
}

function stopVideo() {
    // Stop the video stream
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    // Clear the video element srcObject to stop video playback
    video.srcObject = null;

    // Show the image container
    imageContainer.style.display = 'block';

    // Hide the video container
    videoContainer.style.display = 'none';

    // Show the start button and hide the stop button
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
}

startButton.addEventListener('click', startVideo);
stopButton.addEventListener('click', stopVideo);
