import "https://cdn.jsdelivr.net/npm/comfy.js/dist/comfy.min.js"; const ComfyJS = window.ComfyJS;

const params = new URLSearchParams(window.location.search);
let channel = params.get("channel");
let goal = params.get("goal"); if (goal) document.getElementById("goal").innerHTML = goal;

let count = 0;
//Note: Not using onGiftSubContinue, but everything else counts the same way.
ComfyJS.onSub = ComfyJS.onResub = ComfyJS.onSubGift = ComfyJS.onSubMysteryGift = function () {
	++count;
	document.getElementById("count").innerHTML = count;
};

if (channel) ComfyJS.Init(channel);
else document.querySelector("form").classList.remove("hidden");
