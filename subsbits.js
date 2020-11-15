import "https://cdn.jsdelivr.net/npm/comfy.js/dist/comfy.min.js"; const ComfyJS = window.ComfyJS;

const params = new URLSearchParams(window.location.search);
let channel = params.get("channel");
let goal = params.get("goal"); if (goal) document.getElementById("goal").innerHTML = goal;

let count = 0;
try {count = parseInt(localStorage.getItem("subsbits_counter"));} catch (e) {count = 0;}
if (count !== count) count = 0;
document.getElementById("count").innerHTML = count;

function add_count(n) {
	count += parseInt(n);
	document.getElementById("count").innerHTML = count;
	localStorage.setItem("subsbits_counter", count);
}

//Note: Not using onGiftSubContinue, but everything else counts.
ComfyJS.onSub = function ( user, message, subTierInfo, extra ) {
	if (params.get("tiervalue")) add_count({"1000": 500, "2000": 1000, "3000": 2500}[subTierInfo.plan]);
	else add_count(500);
};
ComfyJS.onResub = function ( user, message, streamMonths, cumulativeMonths, subTierInfo, extra ) {
	if (params.get("resubs")) ComfyJS.onSub(user, message, subTierInfo, extra);
};
/* Do these automatically call onSub too?
ComfyJS.onSubGift = function ( gifterUser, streakMonths, recipientUser, senderCount, subTierInfo, extra ) {
	console.log( "Sub gift", gifterUser, streakMonths, recipientUser, senderCount, subTierInfo, extra )
	ComfyJS.onSub(gifterUser, "", subTierInfo, extra);
};
ComfyJS.onSubMysteryGift = function ( gifterUser, numbOfSubs, senderCount, subTierInfo, extra ) {
	console.log( "Mystery gift", gifterUser, numbOfSubs, senderCount, subTierInfo, extra )
	for (let i = 0; i < numbOfSubs; ++i) ComfyJS.onSub(gifterUser, "", subTierInfo, extra);
};*/
ComfyJS.onCheer = function ( user, message, bits, flags, extra ) {
	console.log("Cheer", bits);
	add_count(bits);
};

let reset = false;
document.getElementById("resetcount").onclick = function() {
	if (reset) add_count(-count);
	reset = !reset;
	this.innerHTML = reset ? "Click again to reset count" : "Reset?";
};

if (channel) ComfyJS.Init(channel);
else document.querySelector("form").classList.remove("hidden");
