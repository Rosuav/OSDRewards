import choc, {set_content, DOM} from "https://rosuav.github.io/shed/chocfactory.js";
import "https://cdn.jsdelivr.net/npm/comfy.js/dist/comfy.min.js"; const ComfyJS = window.ComfyJS;
const {A, B, FORM, INPUT, LI} = choc;

const params = new URLSearchParams(window.location.search);
let channel = params.get("channel");
if (!channel) {
	set_content("#people", [
		LI(FORM([
			"Enter your channel name: ",
			INPUT({name: "channel"}),
			INPUT({type: "submit", value: "Go!"}),
		])),
		LI(A({href: "https://sikorsky.rosuav.com/listrewards"}, "Or click here to log in and list all rewards for your channel.")),
	]);
}

let rewardid = params.get("rewardid");
if (channel && !rewardid) {
	DOM("#people").appendChild(LI(
		"As people redeem your custom reward, they'll appear here. " +
		"You'll need to pick a specific reward - try it out and you'll get a link."
	));
}

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
	if (!flags.customReward) return;
	if (!rewardid) {
		DOM("#people").appendChild(LI([
			"Custom reward sighted with message " + message + " ",
			A({href: window.location + "&rewardid=" + extra.customRewardId},
				"Add THIS link as a browser source to watch for this reward."
			),
		]));
		return;
	}
	if (rewardid !== extra.customRewardId) return;
	DOM("#people").appendChild(LI([B(user), ": " + message]));
}

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
	if ((flags.mod || flags.broadcaster) && command === params.get("advance"))
	{
		//Remove the first entry, leaving the rest
		DOM("#people").firstElementChild.remove();
	}
	//TODO: 'Clear all' command?
}

if (channel) ComfyJS.Init(channel);
