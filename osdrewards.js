import choc, {set_content} from "https://rosuav.github.io/shed/chocfactory.js";
import "https://cdn.jsdelivr.net/npm/comfy.js/dist/comfy.min.js"; const ComfyJS = window.ComfyJS;
const {A, LI} = choc;

const params = new URLSearchParams(window.location.search);
let rewardid = params.get("rewardid");
if (!rewardid) {
	document.getElementById("people").appendChild(LI(
		"As people redeem your custom reward, they'll appear here. " +
		"You'll need to pick a specific reward - try it out and you'll get a link."
	));
}

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
	if (!flags.customReward) return;
	if (!rewardid) {
		document.getElementById("people").appendChild(LI([
			"Custom reward sighted with message " + message + " ",
			A({href: window.location + "?rewardid=" + extra.customRewardId},
				"Add THIS link as a browser source to watch for this reward."
			),
		]));
		return;
	}
	if (rewardid !== extra.customRewardId) return;
	document.getElementById("people").appendChild(LI(user));
}

//TODO: Mod-only command to initiate and clear things

const username = "Rosuav"; //TODO: Get this from a query param
ComfyJS.Init(username);
