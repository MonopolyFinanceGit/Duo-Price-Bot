var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
import Discord from "discord.js";
import "dotenv/config";
const client = new Discord.Client({
    shards: "auto",
    intents: [Discord.Intents.FLAGS.GUILDS],
});
console.log("Found Token - ", !!process.env.TOKEN);
function getPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const raw = yield fetch("https://api.coingecko.com/api/v3/simple/price?ids=monopoly-layer2-duo&vs_currencies=usd");
            const data = (yield raw.json());
            return data["monopoly-layer2-duo"].usd;
        }
        catch (e) {
            console.error("Failed to fetch", e);
        }
    });
}
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Attempting Login");
        client.login(process.env.TOKEN).then(() => "Logged in.");
    });
}
function setBotActivity() {
    return __awaiter(this, void 0, void 0, function* () {
        const price = yield getPrice();
        if (!price)
            return;
        const ClientPresence = client.user.setActivity(`$${price}`, {
            type: 3 /* WATCHING */,
        });
        console.log(`Activity set to ${ClientPresence.activities[0].name}`);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield login();
            setInterval(setBotActivity, 30000);
        }
        catch (e) {
            console.log(e);
        }
    });
}
main();
