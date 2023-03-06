let date = new Date();
let time = Date.now();

const fetch = require("node-fetch");
const fs = require("fs");

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const jimp = require('jimp');

const { ImgurClient } = require('imgur');
const client = new ImgurClient({ clientId: 'c519c899a71677b', clientSecret: '58f0ba866d0d0f608e12d2e72644022f790aa12e' });

const { doesNotMatch } = require("assert");

const build = fs.statSync("./bot.js").mtime.toUTCString();

const args = process.argv.slice(2);

let owner = "f644736ae0ce34b9a0687c2d";

let channels = [
	"✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧",
	"lobby",
	"lobby2",
	"test/awkward",
	"pi314",
]
let defaultChannel = channels[0];

let prefix = "p-";
let botHelp = prefix + "help";

let emojis = [
	"😀",
	"🤨",
	"🤨",
	"👋",
	"✨",
	"🍷",
	"😶",
	"🤖",
	"🐕‍🦺",
	"🤣",
	"😁",
	"🎼",
	"😮",
	"❗",
	"🔅",
	"👍",
	"😨",
	"❓",
	"🤗",
	"💯",
	"👴",
	"💥",
	"⛔",
	"😕",
	"🌐",
	"🎶",
	"✋",
	"💦",
	"😴",
	"🧼",
	"🔇",
	"🌿",
	"⛓️",
	"🌊",
	"🙄",
	"🍿",
	"😎",
	"🥶",
	"🥵",
	"🔹",
	"📅",
	"👌",
	"😐",
	"📰",
]

let cipher = [
	"/-\\",
	"I))",
	"I(x",
	"I)x",
	"I==",
	"I=x",
	"(-I",
	"I-I",
	"-I-",
	"-I)",
	"I()",
	"I-x",
	"IvI",
	"I\\I",
	"0xx",
	"I-)",
	"O-x",
	"I)\\",
	"-()",
	"-Ix",
	"-II",
	"\\/x",
	"\\/V",
	"\\/\\",
	"\\/I",
	"-/-",
];
let botName = `🎆Poverty🎇 🠖 ${botHelp} 🠔 `; // 🎆🎇 🎲 🌹 🎲 😎 🎲 🎃🍃 ⛄🎄

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let danceOnStart = true;

let lockdown = false;

let random = 10;

let mouseX = Math.floor(Math.random() * 100);
let mouseY = Math.floor(Math.random() * 100);
let mouseRandom = 0;
let mouseRanMove = 0;
let mouseAmount = 0.5;
let danceSpeed = 3;

let dancing = false;
let danceType = 1;

let dvdHorizontal = 1 / 2;
let dvdVertical = 0.8 / 2;

let snowX = 0;
let snowY = 0;

let sin = 0;

let figureX = 0;
let figureXS = 0;
let figureY = 0;
let figureYS = 0;

let input = "";
let count = 1 + 1;

let follow_id = "f644736ae0ce34b9a0687c2d";
let following = false;
let followType = 1;

let myself = false;

let typeRacing = false;
let mathRacing = false;

let typeRaceStartTime;
let mathRaceStartTime;
let raceWait = 5000;
let raceLength = Infinity; // 60000

let raceAdd = 5;
let raceSub = 69000;

let detectYoutube = true;

let sayRooms = false;

let holdStart;
let holdingRoom = false;

let pinging = false;
let pingStart = Date.now();

let generating = false;

let inflation = 3;

//const customEncode=(a)=>{let b="";for(let c=0;c<a.length;c++){let d=String.fromCharCode(((a.charCodeAt(c)>>(c&a.length))%26)+97%123);b+=d;}return b;}
const customEncode = (_string) => {
	let string = _string.replace(/([^a-zA-Z"])+/gi, "").toUpperCase();
	let eArray = [];
	for (let i = 0; i < string.length; i++) eArray.push(cipher[string.charCodeAt(i) - 65]);
	return eArray.join("");
};

const customDecode = (string) => {
	let dArray = string.match(/.{1,3}/g);
	let decoded = "";
	for (let i = 0; i < dArray.length; i++) {
		if (cipher.indexOf(dArray[i]) < 0) return "Invalid";
		decoded += String.fromCharCode(cipher.indexOf(dArray[i]) + 65);
	}
	return decoded;
}

let ballAnswers = [
	"Yes.",
	"No.",
	"Perhaps.",
	"Likely.",
	"Not likely.",
	"Signs point to yes.",
	"Signs point to no.",
	"I don't know.",
	"I should not tell you now.",
	"Maybe.",
	"Look up and you will see.",
	"Impossible.",
	"Never.",
	"Definitely.",
	"I have no idea.",
	"I think so.",
	"I don't think so.",
	"It is certain.",
	"Without a doubt.",
	"You may rely on it.",
	"You may not rely on it.",
	"Count on it.",
	"Don't count on it."
];
let ballRandom = Math.floor(Math.random() * ballAnswers.length);

let eatAnswers = [
	"meat",
	"raw chicken",
	"chocolate",
	"chips",
	"an apple",
	"a pear",
	"paper",
	"a phone",
	"a bone",
	"a piano key",
	"me",
	"Qhy",
	"nothing",
	"air",
	"a sandwich",
];
let eatRandom = Math.floor(Math.random() * eatAnswers.length);

let drinkAnswers = [
	"water",
	"lemonade",
	"juice",
	"coffee",
	"nothing",
];
let drinkRandom = Math.floor(Math.random() * drinkAnswers.length);

let benAnswers = [
	"Yes?",
	"No.",
	"Ho ho ho!",
	"Ugh!"
];
let benRandom = Math.floor(Math.random() * benAnswers.length);

const newline = (process.platform === "win32") ? "\r\n" : "\n";
console.log(process.platform);

const raceWords = fs.readFileSync('./race.txt').toString().split(newline); // use \n for heroku
let word;

let problem;

let slotAlphabet = [
	..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
]
let [slotCost, slotEarn] = [420, 100000];

let tips = [
	`Try using ⬤ ${prefix}help command ⬤ to know more about a command.`,
	`Check out ⬤ ${prefix}randomuserquote ⬤ where you can submit quotes or read them.`,
	`Check out ⬤ ${prefix}typerace ⬤ to earn Pe.`,
	`There's a rumor that Ben can give you some Pe.`,
]