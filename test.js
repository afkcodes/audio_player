// // Check if the browser supports AudioContext
// const AudioContext = window.AudioContext || window.webkitAudioContext;
// let audioContext = null;

// if (AudioContext) {
//   // Create an AudioContext instance
//   audioContext = new AudioContext();
//   window.ctx = audioContext;
// } else {
//   console.error("Web Audio API is not supported in this browser.");
// }

// // Get DOM elements
// const audioElement = document.getElementById("audioElement");
// const eq1Gain = document.getElementById("eq1Gain");
// const eq1Frequency = document.getElementById("eq1Frequency");
// const eq2Gain = document.getElementById("eq2Gain");
// const eq2Frequency = document.getElementById("eq2Frequency");

// // Create a BiquadFilterNode for each equalizer
// const eq1Filter = audioContext.createBiquadFilter();
// const eq2Filter = audioContext.createBiquadFilter();

// // Connect equalizer nodes to audio context destination
// eq1Filter.connect(audioContext.destination);
// eq2Filter.connect(audioContext.destination);

// // Function to initialize the audio and handle play
// async function initAudio() {
//   if (audioContext && audioElement && eq1Filter && eq2Filter) {
//     const source = audioContext.createMediaElementSource(audioElement);

//     // Connect source to equalizer nodes
//     source.connect(eq1Filter);
//     source.connect(eq2Filter);

//     // Set equalizer types to peaking (for demonstration)
//     eq1Filter.type = "peaking";
//     eq2Filter.type = "peaking";

//     // Set equalizer parameters
//     eq1Gain.addEventListener("input", () => {
//       eq1Filter.gain.value = parseFloat(eq1Gain.value);
//     });

//     eq1Frequency.addEventListener("input", () => {
//       eq1Filter.frequency.value = parseFloat(eq1Frequency.value);
//     });

//     eq2Gain.addEventListener("input", () => {
//       eq2Filter.gain.value = parseFloat(eq2Gain.value);
//     });

//     eq2Frequency.addEventListener("input", () => {
//       eq2Filter.frequency.value = parseFloat(eq2Frequency.value);
//     });

//     // Assign audio source to the audio element
//     audioElement.crossOrigin = "anonymous"; // Replace with your audio file

//     // Load audio
//     audioElement.load();

//     // Play the audio when the user interacts with the page
//     audioElement.addEventListener("click", async () => {
//       try {
//         await audioElement.play();
//         console.log("Audio is playing.");
//       } catch (error) {
//         console.error("Failed to play the audio:", error);
//       }
//     });
//   } else {
//     console.error("AudioContext or elements not available.");
//   }
// }

// let init = false;

// // Initialize audio when DOM content is loaded
// document.addEventListener("onDomLoaded", () => {
//   if (!init) {
//     initAudio();
//     init = true;
//   }
// });

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Get the audio element
const audioElement = document.getElementById("audioElement");

// Create a media element source node
const source = audioContext.createMediaElementSource(audioElement);

// Connect the source to the AudioContext output
source.connect(audioContext.destination);

console.log(audioContext);
window.ctx = audioContext;
