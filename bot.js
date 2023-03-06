// reminders: CLEAN. UP. ALL. THIS. CODE.   USE. CLASSES.?  READ THE DOC: https://docs.google.com/document/d/1OrxwdLD1l1TE8iau6ToETVmnLuLXyGBhA0VfAY1Lf14/edit
// add personal race record to user database
// also say the personal records WITHIN the win message: ⬤ New personal record!
// add more moderation commands such as givecrown
// maybe censor swear words in R.U.Q.s?
// listen to "good bot" and "bad bot" for reputation (maybe "p bad bot" and "p good bot"? or "poverty bad" and "poverty good")
// add reputations (you can only give one reputation to each user)
// add race cheat checks: if someone did race under 500ms, increase suspicion value by 1, if the suspicion value reaches 3, ban user from bot
// random person from userlist
// catch errors in database commands
//
// hunt command that makes user hunt for... stuff? each item will have its own rarity and price, and you can buy upgrades, for example Magnifier
// store hunting users in format [pid, pid]
//
// inflation command in percent
// xp system?
//
// MPP Dictionary / Povertionary 
// submit word or phrase to it using p-dict submit [phrase] | [description]
// you can read using p-dict read [phrase]
// you can like or dislike using p-dict like [phrase] / p-dict dislike [phrase] you can do it only once but you can change your vote
// do rating in this format: likes:pid,pid,pid,pid dislikes:pid and then just check if user's id is there oh and also save like and dislike count just for internal readability
// if it has more dislikes than likes (but it must have at least 5 [or 4 or 3] dislikes), you can edit the phrase again using p-dict submit [phrase] | [description] and also the rating will reset
// yeah each phrase has its own internal id
// random phrase using p-dict random
//
// DM support
// selling items
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
let botName = `🎆Peenerty🎇 🠖 ${botHelp} 🠔 `; // 🎆🎇 🎲 🌹 🎲 😎 🎲 🎃🍃 ⛄🎄

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


const generateHex = (bw) => {
	if (bw) {
		let _hex = "";
		let white = Math.floor(Math.random() * 2);
		_hex = (white) ? 0xFFFFFFFF : 0x000000FF;
		return _hex;
	} else {
		const hex = [..."ABCDEF123456789"]; // removed 0
		const generateOneHex = () => { return hex[Math.floor(Math.random() * hex.length)]; }
		let _hex = "";
		for (let i = 0; i < 6; i++) _hex += generateOneHex();
		return parseInt("0x" + (_hex) + "FF");
	}
};

const os = require('os');
const sql = require('better-sqlite3');

let db = new sql('./poverty.db', sql.OPEN_READWRITE, (err) => {
	if (err) console.log(err); else log(`Opened poverty database.`);

	if (err && err.code == "SQLITE_CANTOPEN") {
		log(`Creating poverty database.`);
		db = new sql.Database('./poverty.db', (err) => {
			if (err) { console.log(err); } else {
				db.prepare(`
          create table if not exists users (
            id text primary key,
            name text,
            balance integer,
            description text,
            hourly integer,
            daily integer,
            banned integer,
            admin integer
          );
        `)
			}
		});
	}
});

const closeDb = () => {
	db.close((err) => {
		if (err) console.log(err); else log(`Closed poverty database.`);
	});
}

const test = () => {
	/*db.prepare(`
	  insert into users (id, name, balance, description, hourly, daily) values (
		'id123456789',
		'test',
		0,
		'epic desc',
		0,
		0
	  );
	`, (err) => {
	  if (err) console.log(err);	
	});*/

	/*db.prepare(`
			create table if not exists users (
			  id text primary key,
			  name text,
			  balance integer,
			  description text,
			  hourly integer,
			  daily integer,
			  banned integer,
			  admin integer
			);
		  `)
  
	db.prepare(`
	  create table if not exists quotes (
		quote text primary key,
		name text,
		id text,
		quoteID integer
	  );
	`);*/

	/*db.prepare(`
      update users set (balance, hourly, daily, minutely, weekly) = (0, 0, 0, 0, 0);
  	`).run();*/
	/*db.prepare(`
	  alter table users add minutely integer;
	`).run();
	db.prepare(`
	  update users set minutely = 0;
	`).run();*/
	/*db.prepare(`
		create table if not exists shop (
			id integer primary key,
			name text,
			price integer
		);
	`).run();*/
	/*db.prepare(`
		create table if not exists words (
			word text primary key,
			used integer
		);
	`).run();*/
	/*db.prepare(`
			drop table words;
	`).run();*/
	/*db.prepare(`
			alter table users add bank integer;
	`).run();*/
	/*db.prepare(`
			update users set bank = 0;
	`).run();*/
	db.prepare(`
		create table if not exists dictionary (
			phrase text primary key,
			description text,
			likes integer,
			dislikes integer,
			likesids text,
			dislikesids text
		);
	`).run();
}

function addItem(name, price, buyable) {
	let items = db.prepare(`select id from shop`).all().length;
	db.prepare(`insert or ignore into shop (id, name, price, buyable) values (${items}, ?, ?, ?);`).run(name, price, buyable);
}

function addItemToUser(pid, item, amount) {
	let inventory = db.prepare(`select inventory from users where id = '${pid}'`).get().inventory.split(',');
	let itemID = db.prepare(`select id from shop where name = '${item}'`).get().id;

	let hasInInventory = false;
	
	if (inventory[0] !== "") for (let thingy = 0; thingy < inventory.length; thingy++) {
		//console.log(inventory);
		let thingie = inventory[thingy].split('.');
		if (parseInt(thingie[0]) === itemID) {
			hasInInventory = true; break;
		}
	} else inventory.shift();

	if (!hasInInventory) inventory.push(`${itemID}.${amount}`); else {
		for (let thingy = 0; thingy < inventory.length; thingy++) {
			let thingie = inventory[thingy].split('.');
			if (parseInt(thingie[0]) === parseInt(itemID)) inventory[thingy] = `${itemID}.${parseInt(thingie[1])+parseInt(amount)}`;
		}
	}

	db.prepare(`update users set inventory = '${inventory.join(",")}' where id = '${pid}';`).run();
}

function removeItemFromUser(pid, iid, amount) {
	let inventory = db.prepare(`select inventory from users where id = '${pid}'`).get().inventory.split(',');

	let hasInInventory = false;
	
	if (inventory[0] !== "") for (let thingy = 0; thingy < inventory.length; thingy++) {
		let thingie = inventory[thingy].split('.');
		if (parseInt(thingie[0]) === parseInt(iid)) {
			hasInInventory = true; break;
		}
	} else inventory.shift();

	console.log("a", inventory);
	if (hasInInventory) for (let thingy = 0; thingy < inventory.length; thingy++) {
		console.log("hi there", inventory[thingy]);
		let thingie = inventory[thingy].split('.');
		if (parseInt(thingie[0]) === parseInt(iid)) {
			if (parseInt(thingie[1]) - parseInt(amount) !== 0) {
				inventory[thingy] = `${iid}.${parseInt(thingie[1])-parseInt(amount)}`;
			} else inventory.splice(inventory.indexOf(inventory[thingy]), 1);
		}
	}

	db.prepare(`update users set inventory = '${inventory.join(",")}' where id = '${pid}';`).run();
}

const Client = require("./Client");
const e = require("express");
//const { Server } = require("http");
// let gClient = new Client("wss://mppclone.com:8443", "fc4f07afd4cfdc6d8772a51a.acb6a397-ff02-4be3-95e5-fd5f85d731ef"); // wss://www.multiplayerpiano.com   wss://piano.ourworldofpixels.com
let gClient = new Client("wss://mppclone.com:8443","0f1115e5db841f84ecd397c8.81758c47-b00b-4fc0-bea5-aef92ba115ab"); // wss://www.multiplayerpiano.com   wss://piano.ourworldofpixels.com
let currentChannel = "✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧";
let botID = "fc4f07afd4cfdc6d8772a51a";

log(`Took ms to load.`);
gClient.start()
gClient.setChannel("✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧"); // ✧𝓡𝓟 𝓡𝓸𝓸𝓶✧    test/awkward    ✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧    lobby

gClient.on("error", error => {
	console.error(error);
	//sendChat(`Something has happened - ignoring...`);
});

gClient.on("hi", () => {
	log("Connected!");
	//gClient.setName(botName);
	gClient.userset({ "name": botName, "color": "#8080FF" });
	log(`hi ${currentChannel}`);
	//sendChat(`${botName}I have arrived...`);

	if (danceOnStart) {
		danceType = Math.floor(Math.random() * 3) + 6;
		following = false;
		dancing = true;
	}
});

gClient.on("ch", (msg) => {
	currentChannel = msg.ch._id;
	log(`ch ${currentChannel}`);
});

function log(message) {
	let time = new Date().toUTCString();
	console.log(`[${time}]`, message);
	fs.appendFile(`./logs/${currentChannel}.txt`, `[${time}] ${message}\n`, function (err) {
		if (err) throw err;
	});
}

let chat_buffer = [];
let chatSeconds = 0.01; // 6.5    0.01
let chatAmount = 10; // 4   10
let chatRevertTime = 0;
let chatInt = setInterval(() => {
	let msg = chat_buffer[chat_buffer.length - 1];
	if (msg && chatAmount > 0) {
		msg = chat_buffer.shift();
		gClient.sendArray([{ m: "a", message: msg }]);
		chatRevertTime = chatSeconds;
		chatAmount -= 1;
	}
}, 10);

setInterval(() => {
	if (chatAmount < 10) if (chatRevertTime > 0) chatRevertTime -= .1; else chatAmount = 10;
}, 10);

let resetChat = () => {
	chat_buffer = [];
};

let sendChat = msg => {
	msg.match(/.{0,512}/g).forEach(function (x, i) {
		if (x == "") return;
		if (i !== 0) x = "..." + x;
		if (chat_buffer.indexOf(x) < 0) chat_buffer.push(x);
	});
};

gClient.findUserByName = function (search) {
	let array = [];
	for (let i in gClient.ppl) {
		if (gClient.ppl[i].name.indexOf(search) !== -1) {
			array.push(gClient.ppl[i]);
		}
	}
	return array;
}

gClient.findUserBy_ID = function (search) {
	let array = [];
	for (let i in gClient.ppl) {
		if (gClient.ppl[i]._id.indexOf(search) !== -1) {
			array.push(gClient.ppl[i]);
		}
	}
	log(array);
	return array;
}

Array.prototype.random = function () {
	return this[(Math.random() * this.length) | 0];
};

function removeStringfromArray(arr, string) {
	let found = arr.indexOf(string);
	while (found !== -1) {
		arr.splice(found, 1);
		found = arr.indexOf(string);
	}
}

function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function findUser(user) {
	let userName = gClient.findUserByName(user);
	if (userName.length != 0) {
		return userName;
	} else {
		let userID = gClient.findUserBy_ID(user);
		if (userID.length != 0) {
			return userID;
		} else {
			//sendChat(`${user} is not online.`);
			return [];
		}
	}
}

function addUserToDatabase(id, name) {
	if (db.prepare(`select * from users where id = ?;`).get(id) == []) log(`Added user ${name} [${id}] to DB`);

	// add user to database if they're not there already
	db.prepare(`
    insert or ignore into users (id, name, balance, description, hourly, daily, banned, admin, weekly, minutely, inventory, bank) values (
      ?,
      ?,
      0,
      'None',
      0,
      0,
      0,
      0,
      0,
      0,
	  '',
	  0
    );
  `).run(id, name);

	// update username
	db.prepare(`
    update users set name = ? where id = ?;
  `).run(name, id);
}

async function changeUserBalance(id, amount) {
	db.prepare(`
    update users
    set balance = balance + ${amount}
    where id = '${id}';
  `).run();
}

const getUserInventoryIDs = (id) => {
	let inventory = db.prepare(`select inventory from users where id = '${id}'`).get();
	let invArray = inventory.inventory.split(",");
	let ids = [];
	for (let i = 0; i < invArray.length; i++) if (invArray[0] !== '') {
		let split = invArray[i].split('.');
		ids.push(parseInt(split[0]));
	}
	return ids;
}

// db preparations
db.pragma('journal_mode = WAL');
let dbMinutely = db.prepare("update users set (balance, minutely) = (balance + 1, ?) where id = ?;"); //.run({time, userID});
let dbHourly = db.prepare("update users set (balance, hourly) = (balance + 99, ?) where id = ?;"); //.run({time, userID});
let dbDaily = db.prepare("update users set (balance, daily) = (balance + 2399, ?) where id = ?"); //.run(time, id);
let dbWeekly = db.prepare("update users set (balance, weekly) = (balance + 16799, ?) where id = ?"); //.run(time, id);
let dbBanned = db.prepare("update users set banned = ? where id = '?';"); //.run(banned, id);
let dbAdmin = db.prepare("update users set admin = ? where id = '?';"); //.run(admin, id);
let dbDescription = db.prepare("update users set (description) = (?) where id = ?;"); //.run(description, id);
let dbBalance = db.prepare("update users set (balance) = (?) where id = ?;"); //.run(balance, id);
let dbWord = db.prepare("insert or ignore into words (word, used) values (?, ?);"); //.run(word, used);
let dbFindWord = db.prepare(`select * from words where word = ?`); //.get(word);
//db.pragma("synchronous = 1");


function commandInfo(command) {
	switch (command) {
		case "help":
			sendChat(`Lists all the available commands. You can also do "help <command>" to get more information about a specific command.`);
			break;

		case "about":
			sendChat(`Says information about bot.`);
			break;

		case "ban":
			sendChat(`Bans a user from the bot.`);
			break;

		case "unban":
			sendChat(`Unbans a user from the bot.`);
			break;

		case "cat":
			sendChat(`Sends a random cat picture.`);
			break;

		case "dog":
			sendChat(`Sends a random dog picture.`);
			break;

		case "fox":
			sendChat(`Sends a random fox picture.`);
			break;

		case "move":
			sendChat(`Moves the bot to a specified channel. Admin-only.`);
			break;

		case "calls":
			sendChat(`Says amount of command calls made. Admin-only.`);
			break;

		case "eval":
			sendChat(`Evaluates an expression. Admin-only.`);
			break;

		case "command":
			sendChat(`Example command.`);
			break;

		case "randomnumber":
			sendChat(`Says a random number in a user-specified range.`);
			break;

		case "flipcoin":
			sendChat(`Flips a coin.`);
			break;

		case "rolldice":
			sendChat(`Rolls a dice if user has enough Pe. Costs ${Math.round(15 * inflation)}Pe.`);
			break;

		case "slot":
			sendChat(`Rolls a slot machine if user has enough Pe. Costs ${Math.round(420 * inflation)}Pe.`);
			break;

		case "typerace":
		case "tr":
			sendChat(`Starts a type race. Whoever says the word first will win Pe depending on the user's delay. ⬤ Aliases: tr`);
			break;

		case "mathrace":
		case "mr":
			sendChat(`Starts a math race. Whoever solves the problem first will win Pe depending on the user's delay. ⬤ Aliases: mr`);
			break;

		case "balance":
		case "bal":
			sendChat(`Says a user's balance if specified, otherwise says the sender's balance. ⬤ Aliases: bal`);
			break;

		case "give":
			sendChat(`Gives a user a specified amount of Pe.`);
			break;

		case "minutely":
			sendChat(`Gives user minutely award (1Pe) if they wait for more than a minute.`);
			break;

		case "hourly":
			sendChat(`Gives user hourly award (99Pe) if they wait for more than an hour.`);
			break;

		case "daily":
			sendChat(`Gives user daily award (2399Pe) if they wait for more than a day.`);
			break;

		case "weekly":
			sendChat(`Gives user weekly award (16799Pe) if they wait for more than a week.`);
			break;

		case "shop":
		case "store":
			sendChat(`Says items that are available in the shop. Aliases: store`);
			break;

		case "buy":
			sendChat(`Gives user an item from the shop if it's buyable and if the user has enough Pe.`);
			break;

		case "inventory":
		case "inv":
			sendChat(`Says the user's inventory. Aliases: inv`);
			break;

		case "bank":
			sendChat(`Says the amount of Pe in the user's bank.`);
			break;

		case "deposit":
			sendChat(`Deposits the specified amount of Pe to the user's bank if they have enough Pe.`);
			break;

		case "withdraw":
			sendChat(`Withdraws the specified amount of Pe from the user's bank if they have enough Pe in their bank.`);
			break;

		case "info":
			sendChat(`Says information about a user if specified, otherwise says information about the sender.`);
			break;

		case "description":
			sendChat(`Sets user's description to their input.`);
			break;

		case "randomemoji":
			sendChat(`Shows a random emoji.`);
			break;

		case "randomword":
			sendChat(`Says a random word.`);
			break;

		case "randomcolor":
			sendChat(`Says a random color.`);
			break;

		case "randomuserquote":
		case "ruq":
			sendChat(`Says a random user quote. If sender inputs something, it will save into user quotes. Creating costs ${Math.round(160 * inflation)}Pe, reading costs ${Math.round(16 * inflation)}Pe. ⬤ Aliases: ruq ⬤ Quote count: ${db.prepare(`select count(*) as count from quotes`).get().count}`);
			break;

		case "randomtoken":
			sendChat(`Says a random token. They are not real, but there might be a very, VERY low chance one of them works.`);
			break;

		case "randomnoise":
			sendChat(`Generates random noise and uploads to imgur. Costs ${Math.round(32 * inflation)}Pe (due to bandwidth and API usage ❤).`);
			break;

		case "topwords":
			sendChat(`Says the top 10 most used words in logged rooms since 14th November 2022.`);
			break;

		case "randomuserwords":
		case "ruw":
			sendChat(`Says a random word from the user words list if the user has enough Pe. Aliases: ruw`);
			break;

		case "8ball":
			sendChat(`Says a random answer to a question.`);
			break;

		case "ben":
			sendChat(`Makes Ben say an answer to the user's input. Rumor has it that Ben sometimes feels nice and gives you Pe.`);
			break;

		case "eat":
			sendChat(`Makes user eat food.`);
			break;

		case "drink":
			sendChat(`Makes user drink water.`);
			break;

		case "stab":
			sendChat(`Stabs user. You are an evil person if you want to do this.`);
			break;

		case "screamdownears":
			sendChat(`Screams user's ears down. They will be deaf. Suggested by Obscurite.`);
			break;

		case "time":
			sendChat(`Says the current time in UTC.`);
			break;

		case "dance":
			sendChat(`Does a dance based on user selection.`);
			break;

		case "undance":
			sendChat(`Stops dancing.`);
			break;

		case "cursor":
			sendChat(`Set bot cursor to position. Admin-only.`);
			break;

		case "follow":
			sendChat(`Follows a user if specified, otherwise follows sender.`);
			break;

		case "unfollow":
			sendChat(`Stops following.`);
			break;

		case "circlefollow":
			sendChat(`Circles around user if specified, otherwise circles around sender.`);
			break;

		case "calc":
			sendChat(`Calculates an equation.`);
			break;

		case "base64encode":
			sendChat(`Encodes user input to base64.`);
			break;

		case "base64decode":
			sendChat(`Decodes user input from base64.`);
			break;

		case "customencode":
			sendChat(`Encodes user input to a custom encryption.`);
			break;

		case "holdroom":
		case "hr":
			sendChat(`Holds a room for a user for a specific amount of time. 1 second = around ${Math.round(1 * inflation)}Pe. Minimally 5 seconds and maximally 600 seconds (10 minutes). ⬤ Aliases: hr`);
			break;

		case "gamemode":
			sendChat(`Are we playing Minecraft now?`);
			break;

		case "lockdown":
			sendChat(`Locks down the bot. Admin-only.`);
			break;

		case "debug":
			sendChat(`Says the bot's debug info. Admin-only.`);
			break;

		case "ping":
			sendChat(`Pings the server. Admin-only.`);
			break;

		case "admin":
			sendChat(`Sets a user to admin. Admin-only.`);
			break;

		case "unadmin":
			sendChat(`Sets a user from admin to user. Admin-only.`);
			break;

		case "restart":
			sendChat(`Restarts the bot. Admin-only.`);
			break;

		case "kickban":
			sendChat(`Kickbans a player from the room. Admin-only.`);
			break;

		default:
			sendChat(`A help section for this command was not written or the command does not exist.`);
			break;

	}
}

setInterval(() => {
	if (dancing == true) {

		if (danceType == 1) {
			// Moving around in the center
			mouseX = Math.random() * 10 + 45;
			mouseY = Math.random() * 10 + 45;
			gClient.moveMouse(mouseX, mouseY)
		}

		if (danceType == 2) {
			// Random mouse moving
			mouseRandom = Math.floor(Math.random() * 2);
			mouseRanMove = Math.floor(Math.random() * 2);
			mouseAmount = Math.random() * 1;

			if (mouseRandom == 1) {
				if (mouseRanMove == 1) {
					gClient.moveMouse(mouseX += mouseAmount, mouseY)
				} else {
					gClient.moveMouse(mouseX -= mouseAmount, mouseY)
				}
			} else {
				if (mouseRanMove == 1) {
					gClient.moveMouse(mouseX, mouseY += mouseAmount)
				} else {
					gClient.moveMouse(mouseX, mouseY -= mouseAmount)
				}
			}

			if (mouseX > 100 || mouseX < 0) {
				mouseX = Math.floor(Math.random() * 100);
			}
			if (mouseY > 100 || mouseY < 0) {
				mouseY = Math.floor(Math.random() * 100);
			}//, 50);
		}

		if (danceType == 3) {
			// Moving randomly
			mouseX = Math.random() * 100;
			mouseY = Math.random() * 100;
			gClient.moveMouse(mouseX, mouseY)
		}



		if (danceType == 4) {
			// Eight
			sin += (0.01 * danceSpeed);
			gClient.moveMouse(Math.sin(Math.PI / 2 + sin) * Math.abs(Math.sin(sin) * 50) + 50, Math.sin(sin) * Math.abs(Math.sin(sin) * 50) + 50)
		}

		if (danceType == 5) {
			// Circle
			sin += (0.01 * danceSpeed);
			gClient.moveMouse(Math.sin(Math.PI / 2 + sin) * 50 + 50, Math.sin(sin) * 50 + 50)
		}

		if (danceType == 6) {
			// DVD
			gClient.moveMouse(mouseX, mouseY);

			mouseX += dvdVertical;
			mouseY += dvdHorizontal;

			if (mouseX > 100 || mouseX < 0) {
				dvdVertical *= -1;
			}
			if (mouseY > 100 || mouseY < 0) {
				dvdHorizontal *= -1;
			}

			//log(dvdHorizontal, dvdVertical, mouseX, mouseY);
		}

		// Snow
		if (danceType == 7) {
			gClient.moveMouse(Math.sin(sin) * 3 + snowX, snowY);

			sin += (0.05 * danceSpeed);
			snowY++;

			if (snowY > 105) {
				snowX = 110;
			}
			if (snowY > 110) {
				snowY = -10;
			}
			if (snowY < -6 && snowY > -8) {
				snowX = Math.floor(Math.random() * 100);
			}
		}

		// Figure with physics
		if (danceType == 8) {
			//console.log(figureX, figureY);
			figureX += figureXS;
			figureY += figureYS;
			if (figureXS < 0) figureXS += 0.1;
			if (figureXS > 0) figureXS -= 0.1;
			if (figureYS < 97 && figureY <= 97) figureYS += 0.1;
			//if (figureYS > 0) figureYS += 0.1;
			if (figureY >= 97) [figureYS, figureY] = [0, 97];
			gClient.moveMouse(figureX, figureY);

			let figureRandom = Math.floor(Math.random() * 20);

			switch (figureRandom) {
				case 11:
					if (figureX < 97) figureXS = 1;
					break;

				case 14:
					if (figureX > 3) figureXS = -1;
					break;

				case 16:
					if (figureY >= 97) figureYS = -2;
					break;
			}
		}

		// Figure with physics top down TODO
	}
}, 50);

setInterval(() => {
	if (following == true) {
		const user = gClient.ppl[Object.keys(gClient.ppl).find(id => gClient.ppl[id]._id === follow_id)];
		try {
			if (followType == 1) {
				mouseX = Number(user.x);
				mouseY = Number(user.y);
				gClient.moveMouse(mouseX, mouseY);
			}
			if (followType == 2) {
				sin += (0.1 * danceSpeed);
				mouseX = Math.sin(Math.PI / 2 + sin) * 5 + Number(user.x);
				mouseY = Math.sin(sin) * 5 + Number(user.y);
				gClient.moveMouse(mouseX, mouseY);
			}
		} catch (err) {
			//sendChat(`You have given an invalid ID.`);
			following = false;
		}
	}
}, 50);

async function race(startTime, type) {
	switch (type) {
		case 1:
			typeRaceStartTime = startTime;
			typeRacing = true;
			break;
		case 2:
			mathRaceStartTime = startTime;
			mathRacing = true;
			break;
	}

	function done() {
		switch (type) {
			case 1:
				typeRacing = true;
				word = raceWords[Math.floor(Math.random() * raceWords.length)];
				sendChat(`⌨ GO! The word is: ${word.toUpperCase()}`);
				break;

			case 2:
				mathRacing = true;
				let choices = ["+", "-", "*", "/"];
				let pT = choices[Math.floor(Math.random() * choices.length)];
				let pF = (pT !== "*") ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * 12);
				let pS = (pT !== "*") ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * 12);
				problem = `${pF} ${pT} ${pS}`;
				while ((Math.floor(Number.parseFloat(eval(problem))) != Number.parseFloat(eval(problem))) || (pS === 0 && pT === "/")) {
					pT = choices[Math.floor(Math.random() * choices.length)];
					pF = Math.floor(Math.random() * 100);
					pS = Math.floor(Math.random() * 100);
					problem = `${pF} ${pT} ${pS}`;
				}
				sendChat(`➗ GO! The problem is: ${problem}`);
		}

		/*sleep(raceLength).then(() => {
		  if (racing == true) {
			racing = false;
			sendChat(`⌨ Time has run out! No one won.`);
		  }
		});*/
	}

	sleep(raceWait).then(() => { done(); });
}

async function holdRoom(roomName, time) {
	holdingRoom = true;
	let holdClient = new Client("wss://mppclone.com:8443", "0f1115e5db841f84ecd397c8.81758c47-b00b-4fc0-bea5-aef92ba115ab");

	let botID = "0f1115e5db841f84ecd397c8";

	holdClient.setChannel(roomName);

	holdClient.on("error", error => {
		console.error(error);
		sendChat(`Something has happened - ignoring...`);
	});

	holdClient.on("hi", () => {
		log(`Connected to holding room: ${roomName}`);

		holdClient.userset({ "name": botName, "color": "#8080FF" });
		holdClient.sendArray([{ m: "a", message: `This is a room held by Poverty for another user. This bot instance cannot be interacted with. The bot will leave in ${time} seconds.` }]);
	});

	holdClient.on("ch", (msg) => {
		let currentHoldChannel = msg.ch._id;
		log(`ch hold ${currentHoldChannel}`);
	});

	holdClient.start();
	log(`Starting client on hold room...`);

	sleep(time * 1000).then(() => {
		holdingRoom = false;
		holdClient.sendArray([{ m: "a", message: `Time is up! Leaving this room...` }]);
		holdClient.stop();
		log(`Stopping client on hold room...`);
	});
}

let mppBot = {
	"prefix": prefix, // Spaces don't work.
	"name": "Poverty - ",
	"database": {
		"path": "./database.json",
		"json": {
			"banned": [],
			"admins": ["b8e8694638387d339340b6bc"],
			"commandCalls": 0,
			"firstCallDate": "23rd July 2022",
			"users": [],
			"quotes": []
		},
		"save": () => {
			fs.writeFile(mppBot.database.path, JSON.stringify(mppBot.database.json), function (err) {
				if (err) return log(err);
			});
		},
		"load": () => {
			fs.readFile(mppBot.database.path, { encoding: "utf-8" }, function (err, data) {
				if (!err) {
					if (isJson(data)) mppBot.database.json = typeof data == "string" ? JSON.parse(data) : data;
				} else log(err);
			});
		},
	},
	"commands": {
		"help": {
			"isAdmin": false,
			"isHidden": false,
			"function": (input, p) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(p._id, p.name)
					if (!input) {
						//sendChat(`Prefix: ${mppBot.prefix}command`);
						sendChat(`Tip: ${tips[Math.floor(Math.random() * tips.length)]}`);
						let infoCommands = Object.keys(mppBot.commands).filter(command => !mppBot.commands[command].isAdmin && !mppBot.commands[command].isHidden && !mppBot.commands[command].isFun && !mppBot.commands[command].isMisc && !mppBot.commands[command].isEconomy && !mppBot.commands[command].isMod);
						sendChat(`📄 info: ${infoCommands.join(", ")}`);
						let funCommands = Object.keys(mppBot.commands).filter(command => !mppBot.commands[command].isAdmin && !mppBot.commands[command].isHidden && mppBot.commands[command].isFun && !mppBot.commands[command].isMisc && !mppBot.commands[command].isEconomy && !mppBot.commands[command].isMod);
						sendChat(`🎲 fun: ${funCommands.join(", ")}`);
						let miscCommands = Object.keys(mppBot.commands).filter(command => !mppBot.commands[command].isAdmin && !mppBot.commands[command].isHidden && !mppBot.commands[command].isFun && mppBot.commands[command].isMisc && !mppBot.commands[command].isEconomy && !mppBot.commands[command].isMod);
						sendChat(`🔩 misc: ${miscCommands.join(", ")}`);
						let economyCommands = Object.keys(mppBot.commands).filter(command => !mppBot.commands[command].isAdmin && !mppBot.commands[command].isHidden && !mppBot.commands[command].isFun && !mppBot.commands[command].isMisc && mppBot.commands[command].isEconomy && !mppBot.commands[command].isMod);
						sendChat(`💲 economy: ${economyCommands.join(", ")}`);
						let modCommands = Object.keys(mppBot.commands).filter(command => mppBot.commands[command].isAdmin && !mppBot.commands[command].isHidden && !mppBot.commands[command].isFun && !mppBot.commands[command].isMisc && !mppBot.commands[command].isEconomy && mppBot.commands[command].isMod);
						sendChat(`🪓 moderation: ${modCommands.join(", ")}`);
						if (db.prepare(`select * from users where id = '${p._id}'`).get().admin == 1) {
							let adminCommands = Object.keys(mppBot.commands).filter(command => mppBot.commands[command].isAdmin && !mppBot.commands[command].isHidden && !mppBot.commands[command].isFun && !mppBot.commands[command].isMisc && !mppBot.commands[command].isEconomy && !mppBot.commands[command].isMod);
							sendChat(`😎 admin: ${adminCommands.join(", ")}`);
						}
					} else {
						commandInfo(input);
					}
				}
			}
		},
		"about": {
			"isAdmin": false,
			"isHidden": false,
			"function": input => {
				sendChat(`Poverty ⬤ brings you poor functions ⬤ currency: Poverty euro (Pe) ⬤ currently in early alpha ⬤ anything might reset due to necessary updates ⬤ build: ${build}`);
			}
		},
		"ban": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				if (!input) sendChat(`Select which user to ban (ID).`); else {
					//let users = findUser(input);
					let user = db.prepare(`select * from users where name like '%${input}%'`).get();
					if (user == undefined) user = db.prepare(`select * from users where id like '%${input}%'`).get();
					console.log(db.prepare(`select * from users where name like '%${input}%'`).get());
					console.log(db.prepare(`select * from users where id like '%${input}%'`).get());
					if (user == undefined) { sendChat(`User not found.`) } else {
						if (user.banned == 1) {
							sendChat(`${user.name} (ID: ${user.id}) is already banned.`);
						} else {
							db.prepare(`update users set banned = 1 where id = '${user.id}'`).run();
							sendChat(`Banned ${user.name} (ID: ${user.id}) from using this bot.`);
						}
					}
				}
			}
		},
		"unban": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				if (!input) sendChat(`Select which user to unban (_ID).`); else {
					let user = db.prepare(`select * from users where name like '%${input}%'`).get();
					if (user == undefined) user = db.prepare(`select * from users where id like '%${input}%'`).get();
					console.log(db.prepare(`select * from users where name like '%${input}%'`).get());
					if (user == undefined) { sendChat(`User not found.`) } else {
						if (user.banned == 0) {
							sendChat(`${user.name} (ID: ${user.id}) is not banned.`);
						} else {
							db.prepare(`update users set banned = 0 where id = '${user.id}'`).run();

							sendChat(`Unbanned ${user.name} (ID: ${user.id}) from using this bot.`);
						}
					}
				}
			}
		},
		"cat": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": async () => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					let catResult = await fetch("http://aws.random.cat/meow", { method: "GET" }).then(response => response.json()).catch(log);
					if (catResult) sendChat(`An acrobatic cat for you! ${catResult.file}`);
				}
			}
		},
		"dog": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": async () => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					let dogResult = await fetch("https://dog.ceo/api/breeds/image/random", { method: "GET" }).then(response => response.json()).catch(log);
					if (dogResult) if (dogResult.status == "success") sendChat(`A trained dog for you! ${dogResult.message}`);
				}
			}
		},
		"fox": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": async () => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					let foxResult = await fetch("https://randomfox.ca/floof", { method: "GET" }).then(response => response.json()).catch(log);
					if (foxResult) if (foxResult.image) sendChat(`A cute fox for you! ${foxResult.image}`);
				}
			}
		},
		"move": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				if (sayRooms) sendChat(`Moving to ${input}.`);
				let prevChannel = currentChannel;
				gClient.setChannel(input);
				currentChannel = input;
				if (sayRooms) sendChat(`Moved from ${prevChannel} to ${input}.`);
			}
		},
		"calls": {
			"isAdmin": true,
			"isHidden": false,
			"function": () => sendChat(`${Intl.NumberFormat("en-US", { maximumFractionDigits: 3, minimumFractionDigits: 0 }).format(mppBot.database.json.commandCalls)} command call${mppBot.database.json.commandCalls == 1 ? " has been made." : "s have been made."}.`)
		},
		"eval": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (input.indexOf(`"fs"`) == -1) sendChat(`🠖 ${eval(input)}`); else sendChat(`🠖 No.`);
				}
			}
		},
		"command": {
			"isAdmin": false,
			"isHidden": true,
			"function": input => {
				sendChat(`It is only an example! It does nothing.`);
			}
		},
		"randomnumber": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (!input) sendChat(`Choose the maximum number, ex. random 10000`); else {
						random = Math.floor(Math.random() * input);
						sendChat(`${random}`);
					}
				}
			}
		},
		"flipcoin": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": () => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					let coin = Math.floor(Math.random() * 2);
					if (coin == 0) sendChat(`You got Heads!`); else sendChat(`You got Tails!`);
				}
			}
		},
		"rolldice": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let user = db.prepare(`SELECT * FROM users where id = '${msger._id}'`).get();
					let _cost = Math.round(15 * inflation);
					if (user.balance < _cost) { sendChat(`🎲 You need at least ${_cost}Pe to roll a dice.`) } else {
						let dice = Math.floor(Math.random() * 6) + 1;
						if (dice == 6) {
							let lucky = Math.floor(Math.random() * 50) + 15;
							sendChat(`🎲 You rolled a ${dice} and earned ${lucky}Pe!`);
							changeUserBalance(msger._id, lucky);
						} else { changeUserBalance(msger._id, -15); sendChat(`🎲 You rolled a ${dice} and lost ${_cost}Pe!`); }
					}
				}
			}
		},
		"slot": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let inv = getUserInventoryIDs(msger._id);
					if (inv.indexOf(1) >= 0) {
						removeItemFromUser(msger._id, 1, 1);

						let slot1 = slotAlphabet[Math.floor(Math.random() * slotAlphabet.length)];
						let slot2 = slotAlphabet[Math.floor(Math.random() * slotAlphabet.length)];
						let slot3 = slotAlphabet[Math.floor(Math.random() * slotAlphabet.length)];

						if (slot1 == slot2 && slot2 == slot3) {
							let lucky = Math.floor(Math.random() * 100000) + slotEarn;
							sendChat(`🎰 Spinning... ⬤ ${slot1}${slot2}${slot3} ⬤ You've won the slot game and earned ${lucky}Pe!`);
							changeUserBalance(msger._id, lucky);
						} else sendChat(`🎰 Spinning... ⬤ ${slot1}${slot2}${slot3} ⬤ You've lost the slot game! Better luck next time!`);
					} else { sendChat(`🎰 You don't have a Slot Game Ticket!`); }
				}
			}
		},
		"typerace": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					if (!typeRacing) {
						let startTime = Date.now() + raceWait;
						let raceType = 1;
						sendChat(`⌨ Get ready for the type race...`);
						race(startTime, raceType);
					} else {
						if (Date.now() > typeRaceStartTime) {
							sendChat(`⌨ A type race is already in progress with the word: ${word.toUpperCase()}`);
						} else {
							sendChat(`⌨ A type race is already beginning!`);
						}

					}
				}
			}
		}, "tr": { "isAdmin": false, "isHidden": true, "function": (input, msger) => { mppBot.commands.typerace.function(input, msger); } },
		"mathrace": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					if (!mathRacing) {
						let startTime = Date.now() + raceWait;
						let raceType = 2;
						sendChat(`➗ Get ready for the math race...`);
						race(startTime, raceType);
					} else {
						if (Date.now() > mathRaceStartTime) {
							sendChat(`➗ A math race is already in progress with the problem: ${problem}`);
						} else {
							sendChat(`➗ A math race is already beginning!`);
						}

					}
				}
			}
		}, "mr": { "isAdmin": false, "isHidden": true, "function": (input, msger) => { mppBot.commands.mathrace.function(input, msger); } },
		"balance"/*, "bal"*/: {
			"isAdmin": false,
			"isHidden": false,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else { // add input user too
					//if (user == -1 && (msger._id == input)) { mppBot.database.json.users.push(msger._id, msger.name, 0, "None", 0, 0); user = mppBot.database.json.users.length - 6; } // add input user too, and add check if the user id is in the db or not, add it for every db check
					addUserToDatabase(msger._id, msger.name);
					mppBot.database.json.users.push(msger._id, msger.name, 0, "None", 0, 0);

					if (msger._id == input || !input) {
						let user = db.prepare(`select * from users where id = '${msger._id}';`).get();
						sendChat(`You have ${user.balance}Pe.`);

					} else {
						addUserToDatabase(msger._id, msger.name);

						let users = findUser(input);

						let findType = (users.length == 0) ? input : users[0]._id;

						let user = db.prepare(`select * from users where id = '${findType}';`).get();
						if (user == undefined) user = db.prepare(`select * from users where name like '%${input}%';`).get();
						if (user == undefined) user = db.prepare(`select * from users where id like '%${input}%';`).get();
						if (user == undefined) {
							sendChat(`User not found.`);
						} else {
							sendChat(`${user.name} has ${user.balance}Pe.`);
						}
					}

				}
			}
		}, "bal": { "isAdmin": false, "isHidden": true, "function": (input, msger) => { mppBot.commands.balance.function(input, msger); } },
		"baltop": {
			"isAdmin": false,
			"isHidden": false,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let users = db.prepare(`select id,name,balance from users order by balance desc limit 0,10;`).all();
					let message = "⬤ ";
					for (let i = 0; i < users.length; i++) message += `${i + 1}) ${users[i].id.slice(0, 6)} | ${users[i].name} | ${users[i].balance}Pe ⬤ `;
					sendChat(message);
				}
			}
		},
		"give": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let args = input.split(" ");
					let argL = args.length - 1;
					args[1] = Math.round(parseInt(args[1]));

					if (Math.abs(Number(args[1])) != Number(args[1])) { sendChat(`You cannot give negative Pe.`) } else {
						if (args.length == 2) {
							let _user = db.prepare(`select * from users where id = '${msger._id}';`).get();
							let user = db.prepare(`select * from users where name like '%${args[0]}%';`).get();
							if (user == undefined) user = db.prepare(`select * from users where id like '%${args[0]}%';`).get();
							if (user == undefined) { sendChat(`User not found.`); } else {
								if (_user.balance < Number(args[1])) { sendChat(`You don't have enough Pe.`); } else {
									if (user.id == _user.id) sendChat(`You cannot give Pe to yourself.`); else
									if (user.id == botID) sendChat(`You cannot give Pe to me.`); else {
										console.log(_user.id, botID);
										changeUserBalance(user.id, Number(args[1]));
										changeUserBalance(msger._id, -Number(args[1]));
										sendChat(`You gave ${user.name} ${args[1]}Pe.`);
									}
								}
							}
						}
					}
				}
			}
		},
		"minutely": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let time = Date.now();

					let user = db.prepare(`select * from users where id = '${msger._id}';`).get();
					if (user.minutely + 60000 < time) {
						dbMinutely.run(time, msger._id);
						sendChat(`Received minutely reward ⬤ 1Pe`);
					} else { sendChat(`You must wait ${Math.floor(((user.minutely + 60000) - time) / 60000)} minutes before claiming your next minutely reward.`) }
				}
			}
		},
		"hourly": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let time = Date.now();

					let user = db.prepare(`select * from users where id = '${msger._id}';`).get();
					if (user.hourly + 3600000 < time) {
						dbHourly.run(time, msger._id);
						sendChat(`Received hourly reward ⬤ 99Pe`);
					} else { sendChat(`You must wait ${Math.floor(((user.hourly + 3600000) - time) / 60000)} minutes before claiming your next hourly reward.`) }
				}
			}
		},
		"daily": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let time = Date.now();

					let user = db.prepare(`select * from users where id = '${msger._id}';`).get();
					if (user.daily + 86400000 < time) {
						dbDaily.run(time, msger._id);
						sendChat(`Received daily reward ⬤ 2399Pe`);
					} else { sendChat(`You must wait ${Math.floor(((user.daily + 86400000) - time) / 60000)} minutes before claiming your next daily reward.`) }
				}
			}
		},
		"weekly": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let time = Date.now();

					let user = db.prepare(`select * from users where id = '${msger._id}';`).get();
					if (user.weekly + 604800000 < time) {
						dbWeekly.run(time, msger._id);
						sendChat(`Received weekly reward ⬤ 16799Pe`);
					} else { sendChat(`You must wait ${Math.floor(((user.weekly + 604800000) - time) / 60000)} minutes before claiming your next weekly reward.`) }
				}
			}
		},
		"shop": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let shop = db.prepare(`select * from shop where buyable = 1;`).all();
					let message = "⬤ ";

					for (let thing = 0; thing < shop.length; thing++) message += `${shop[thing].name} | ${shop[thing].price}Pe ⬤ `;
					sendChat(message);
				}
			}
		},
		"buy": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					if (input === "" || input === undefined) sendChat(`🛒 Specify the item and amount to buy.`); else {
						let thing = input.split(" ").slice(0,input.split(" ").length-1);
						console.log(thing);
						thing = thing.join(" ");
						console.log(thing);
						let amount = input.split(" ").slice(input.split(" ").length-1)[0];

						if (isNaN(parseInt(amount)) || input.split(" ").length <= 1) sendChat(`🛒 Specify the amount to buy.`); else {
							if (parseInt(amount) <= 0) sendChat(`🛒 You can't buy none or an negative amount of an item.`); else {
								let shop = db.prepare(`select * from shop where buyable = 1;`).all();
								let found = false;
								for (thingy in shop) if (shop[thingy].name === thing) found = true;

								if (!found) sendChat(`🛒 Item does not exist or is not for sale.`); else {
									let balance = db.prepare(`select balance from users where id = '${msger._id}'`).get().balance;
									let price = db.prepare(`select price from shop where name = '${thing}'`).get().price;
									if (balance < price * amount) sendChat(`🛒 You don't have enough Pe to buy this item.`); else {
										addItemToUser(msger._id, thing, amount);

										changeUserBalance(msger._id, -price*parseInt(amount));
										sendChat(`🛒 You bought ${amount}x ${thing} for ${amount * price}Pe.`);
									}
								}
							}
						}
					}
				}
			}
		},
		"bank": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) sendChat(`Currently in lockdown.`); else {
					addUserToDatabase(msger._id, msger.name);

					let bank = db.prepare(`select bank from users where id = '${msger._id}';`).get();
					console.log(bank);
					sendChat(`🏦 You have ${bank.bank}Pe in the bank.`);
				}
			}
		},
		"deposit": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) sendChat(`Currently in lockdown.`); else {
					addUserToDatabase(msger._id, msger.name);

					let args = input.split(" ");
					if (isNaN(parseInt(args[0])) || parseInt(args[0]) !== Math.abs(parseInt(args[0]))) sendChat(`🏦 The provided amount of Pe is invalid.`); else {
						let user = db.prepare(`select balance, bank from users where id = '${msger._id}';`).get();

						if (user.balance >= parseInt(args[0])) { 
							db.prepare(`
								update users
								set balance = balance - ${parseInt(args[0])},
								bank = bank + ${parseInt(args[0])}
								where id = '${msger._id}';
							`).run();
							sendChat(`🏦 Deposited ${parseInt(args[0])}Pe into your bank.`);
						} else sendChat(`🏦 You don't have that much Pe to deposit.`);
					}
				}
			}
		},
		"withdraw": {
			"isAdmin": false,
			"isHidden": false,
			"isEconomy": true,
			"function": (input, msger) => {
				if (lockdown) sendChat(`Currently in lockdown.`); else {
					addUserToDatabase(msger._id, msger.name);

					let args = input.split(" ");
					if (isNaN(parseInt(args[0])) || parseInt(args[0]) !== Math.abs(parseInt(args[0]))) sendChat(`🏦 The provided amount of Pe is invalid.`); else {
						let user = db.prepare(`select balance, bank from users where id = '${msger._id}';`).get();

						if (user.bank >= parseInt(args[0])) { 
							db.prepare(`
								update users
								set balance = balance + ${parseInt(args[0])},
								bank = bank - ${parseInt(args[0])}
								where id = '${msger._id}';
							`).run();
							sendChat(`🏦 Withdrawn ${parseInt(args[0])}Pe from your bank.`);
						} else sendChat(`🏦 You don't have that much Pe in your bank to withdraw.`);
					}
				}
			}
		},
		"inventory": {
			"isAdmin": false,
			"isHidden": false,
			"function": (input, msger) => {
				addUserToDatabase(msger._id, msger.name);

				let inventory = db.prepare(`select inventory from users where id = '${msger._id}'`).get();
				let invArray = inventory.inventory.split(",");
				let message = "| ";
				console.log(inventory, inventory[0]);
				for (let i = 0; i < invArray.length; i++) if (invArray[0] !== '') {
					console.log("hi");
					let thingy = invArray[i].split(".");
					let what = db.prepare(`select name from shop where id = ${parseInt(thingy[0])}`).get().name;

					message += `${thingy[1]}x ${what} | `;
				}

				sendChat((message === "| ") ? "You have nothing." : message);
			}
		}, "inv": { "isAdmin": false, "isHidden": true, "function": (input, msger) => mppBot.commands.inventory.function(input, msger) },
		"info": {
			"isAdmin": false,
			"isHidden": false,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else { // add input user too | edit: wasn't this done?
					if (msger._id == input || !input) {
						addUserToDatabase(msger._id, msger.name);

						try {
							let user = db.prepare(`select * from users where id = '${msger._id}';`).get();

							if (user == undefined) user = db.prepare(`select * from users where name='%${input}%';`).get();
							if (user == undefined) user = db.prepare(`select * from users where id='%${input}%';`).get();
							if (user == undefined) {
								sendChat(`User not found.`);
							} else {
								let isAdmin = (user.admin == 1) ? "yes" : "no";
								let isBanned = (user.banned == 1) ? "yes" : "no";

								sendChat(`Name: ${user.name} ⬤ ID: ${user.id} ⬤ Balance: ${user.balance}Pe ⬤ Description: ${user.description} ⬤ Admin: ${isAdmin} ⬤ Banned: ${isBanned}`);
							}


						} catch (e) {
							sendChat(`There was an error with the database.`);
							console.log(e);
						}

					} else {
						addUserToDatabase(msger._id, msger.name);
						let users = findUser(input);

						let user;

						let findType = (users.length == 0) ? input : users[0]._id;

						if (users.length == 0) {
							user = db.prepare(`select * from users where id = '${findType}';`).get();
							if (user == undefined) user = db.prepare(`select * from users where name like '%${findType}%';`).get();
							if (user == undefined) user = db.prepare(`select * from users where id like '%${findType}%';`).get();
							if (user == undefined) {
								sendChat(`User not found.`);
							} else {
								let isAdmin = (user.admin == 1) ? "yes" : "no";
								let isBanned = (user.banned == 1) ? "yes" : "no";

								sendChat(`Name: ${user.name} ⬤ ID: ${user.id} ⬤ Balance: ${user.balance}Pe ⬤ Description: ${user.description} ⬤ Admin: ${isAdmin} ⬤ Banned: ${isBanned}`);
							}
						} else {
							user = users[0];
							let isAdmin = (user.admin == 1) ? "yes" : "no";
							let isBanned = (user.banned == 1) ? "yes" : "no";

							sendChat(`Name: ${user.name} ⬤ ID: ${user.id} ⬤ Balance: ${user.balance}Pe ⬤ Description: ${user.description} ⬤ Admin: ${isAdmin} ⬤ Banned: ${isBanned}`);
						}
					}
				}
			}
		},
		"description": {
			"isAdmin": false,
			"isHidden": false,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else { // add input user too
					addUserToDatabase(msger._id, msger.name);

					if (input == "") { sendChat(`You must provide a description.`); } else {
						dbDescription.run(input, msger._id);
						sendChat(`Updated your description.`);
					}
				}
			}
		},
		"desc": {
			"isAdmin": false, "isHidden": true, "function": (input, msger) => { mppBot.commands.description.function(input, msger); }
		},
		"randomemoji": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": () => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					let emoji = emojis[Math.floor(Math.random() * emojis.length)];
					sendChat(emoji);
				}
			}
		},
		"randomword": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": () => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					let randomWord = raceWords[Math.floor(Math.random() * raceWords.length)];
					sendChat(randomWord);
				}
			}
		},
		"randomcolor": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": () => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					let randomColor = colors[Math.floor(Math.random() * colors.length)];
					sendChat(randomColor);
				}
			}
		},
		"randomuserquote": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let user = db.prepare(`select * from users where id = '${msger._id}';`).get();
					if (!input) {
						let _cost = Math.round(16 * inflation);
						if (user.balance >= _cost) {
							dbBalance.run(user.balance - _cost, msger._id);
							let quote = db.prepare(`select * from quotes where quoteID = ${Math.floor(Math.random() * db.prepare(`select count(*) as count from quotes;`).get().count + 1)};`).get();
							sendChat(`"${quote.quote}" ~${quote.name} ⬤ ${quote.id.slice(0, 6)} ⬤ You paid ${_cost}Pe to read a quote.`);
						} else {
							sendChat(`You don't have enough Pe. You need at least ${_cost}Pe to read a quote.`);
						}
					} else {
						let _cost = Math.round(160 * inflation);
						if (user.balance >= _cost) {
							dbBalance.run(user.balance - _cost, msger._id);

							db.prepare(`insert or ignore into quotes (quote, name, id, quoteID) values (?, ?, ?, ${db.prepare(`select count(*) as count from quotes;`).get().count + 1});`).run(input, msger.name, msger._id);
							sendChat(`You paid ${_cost}Pe to submit a quote.`);
						} else {
							sendChat(`You don't have enough Pe. You need at least ${_cost}Pe to submit a quote.`);
						}
					}

				}
			}
		},
		"ruq": {
			"isAdmin": false, "isHidden": true, "isMisc": true, "function": (input, msger) => { mppBot.commands.randomuserquote.function(input, msger); }
		},
		"randomtoken": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": () => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					const a = () => { let b = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; let c = ''; for (let d = 0; d < 60; d++) { if (d == 24) { c += '.'; } if (d == 32 || d == 37 || d == 42 || d == 47) { c += '-'; } else { c += b[Math.floor(Math.random() * b.length)]; } } return c; }
					sendChat(a());
				}
			}
		},
		"randomnoise": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);
					if (generating) sendChat('✨ Noise is already being generated.'); else {
						let user = db.prepare(`select * from users where id = '${msger._id}';`).get();
						let _cost;
						switch (input.toLowerCase()) {
							case "color":
							case "colour":
							case "colorful":
							case "colourful":
								_cost = Math.round(48 * inflation);
								if (user.balance >= _cost) {
									dbBalance.run(user.balance - _cost, msger._id);

									generating = true;
									sendChat(`✨ You paid ${_cost}Pe to generate color noise.`);

									let noiseName = `noise-${Date.now()}`;

									let imageData = [];
									for (let i = 0; i < 64; i++) {
										imageData.push([]);
										for (let j = 0; j < 64; j++) {
											imageData[i].push(generateHex(false));
										}
									}

									let image = new jimp(64, 64, function (err, image) {
										if (err) throw err;

										imageData.forEach((row, y) => {
											row.forEach((color, x) => {
												image.setPixelColor(color, x, y);
											});
										});

										image.write(`./noise/${noiseName}.png`, async (err) => {
											if (err) throw err;

											const response = await client.upload({
												image: fs.createReadStream(`./noise/${noiseName}.png`),
												type: 'stream',
											});

											//console.log(response.data);

											generating = false;
											sendChat('✨ Noise generated: ' + response.data.link);

										});
									});
								} else {
									sendChat(`You don't have enough Pe. You need at least ${_cost}Pe to generate color noise.`);
								}
								break;

							case "bnw":
							case "bw":
							case "b&w":
							case "blacknwhite":
							case "blackandwhite":
							case "blackwhite":
							case "black&white":
								_cost = Math.round(32 * inflation);
								if (user.balance >= _cost) {
									dbBalance.run(user.balance - _cost, msger._id);

									generating = true;
									sendChat(`✨ You paid ${_cost}Pe to generate B&W noise.`);

									let noiseName = `noise-${Date.now()}`;

									let imageData = [];
									for (let i = 0; i < 64; i++) {
										imageData.push([]);
										for (let j = 0; j < 64; j++) {
											imageData[i].push(generateHex(true));
										}
									}

									let image = new jimp(64, 64, function (err, image) {
										if (err) throw err;

										imageData.forEach((row, y) => {
											row.forEach((color, x) => {
												image.setPixelColor(color, x, y);
											});
										});

										image.write(`./noise/${noiseName}.png`, async (err) => {
											if (err) throw err;

											const response = await client.upload({
												image: fs.createReadStream(`./noise/${noiseName}.png`),
												type: 'stream',
											});

											//console.log(response.data);

											generating = false;
											sendChat('✨ Noise generated: ' + response.data.link);

										});
									});
								} else {
									sendChat(`You don't have enough Pe. You need at least ${_cost}Pe to generate B&W noise.`);
								}
								break;

							default:
								sendChat(`Usage: color, bnw`);
								break;
						}


					}
				}
			}
		},
		"topwords": {
			"isAdmin": false,
			"isHidden": false,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let words = db.prepare(`select word,used from words order by used desc limit 0,10;`).all();
					let message = "Top words since 14th Nov 22: ⬤ ";
					for (let i = 0; i < words.length; i++) message += `${i + 1}) ${words[i].word} | ${words[i].used}x ⬤ `;
					sendChat(message);
				}
			}
		},
		"randomuserword": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let user = db.prepare(`select * from users where id = '${msger._id}';`).get();

					let _cost = Math.round(4 * inflation);
					if (user.balance >= _cost) {
						dbBalance.run(user.balance - _cost, msger._id);
						let word = db.prepare(`select * from words order by random() limit 1;`).get();
						sendChat(`"${word.word}" ⬤ You paid ${_cost}Pe to get a word.`);
					} else {
						sendChat(`You don't have enough Pe. You need at least ${_cost}Pe to get a word.`);
					}
				}
			}
		}, "ruw": { "isAdmin": false, "isHidden": true, "function": (input,msger) => mppBot.commands.randomuserword.function(input,msger) },
		"dictionary": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					let args = input.split(" ");
					addUserToDatabase(msger._id, msger.name);
					switch (args[0]) {
						case "submit": // MAKE IT CASE INSENSITIVE
							let user = db.prepare(`select balance from users where id = '${msger._id}'`).get();
							if (user.balance >= 50 * inflation) {
								let _args = args;
								_args.shift();
								let entry = [_args.join(" ").slice(0, _args.join(" ").indexOf("|")), _args.join(" ").slice(_args.join(" ").indexOf("|") + 1)];

								let phrase = entry[0].trim();
								let description = entry[1].trim();
								if (phrase === "" || description === "") sendChat(`📘 Invalid submission.`); else {

								}
							} else sendChat(`📘 You don't have enough Pe to submit a phrase!`);
							break;
						case "read":
							break;
						case "like":
							break;
						case "dislike":
							break;
						case "random":
							break;
						default:
							sendChat(`Usage: submit, read, like, dislike, random`);
							break;
					}
				}
			}
		}, "dict": { "isAdmin": false, "isHidden": true, "function": (input,msger) => mppBot.commands.dictionary.function(input,msger) },
		"8ball": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (!input) sendChat(`Ask a question, ex. 8ball Is my future good?`); else {
						//ballRandom = Math.floor(Math.random() * 7);
						ballRandom = Math.floor(Math.random() * ballAnswers.length);
						sendChat(`🎱: ${ballAnswers[ballRandom]}`);
					}
				}
			}
		},
		"ben": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (!input) { sendChat(`Tell/ask Ben something.`); } else {
						benRandom = Math.floor(Math.random() * benAnswers.length);
						let lucky = Math.floor(Math.random() * 1000);

						addUserToDatabase(msger._id, msger.name);

						let user = db.prepare(`select * from users where id = '${msger._id}';`).get();

						if (lucky === 420) {
							sendChat(`Ben says: You're lucky I feel nice today, because I'm giving you some Pe that I don't need right now. Don't ya beg for more.`)
							dbBalance.run(user.balance + Math.floor(Math.random() * 500) + 100, msger._id);
						} else { sendChat(`Ben says: ${benAnswers[benRandom]}`); }
					}
				}
			}
		},
		"eat": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					eatRandom = Math.floor(Math.random() * eatAnswers.length);
					sendChat(`You ate ${eatAnswers[eatRandom]}.`);
				}
			}
		},
		"drink": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					drinkRandom = Math.floor(Math.random() * drinkAnswers.length);
					sendChat(`You drank ${drinkAnswers[drinkRandom]}.`);
				}
			}
		},
		"stab": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					sendChat(`You stabbed ${input}.`);
				}
			}
		},
		"screamdownears": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					sendChat(`You scream ${input}'s ears down.`);
				}
			}
		},
		"punch": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					sendChat(`You punch ${input}.`);
				}
			}
		},
		"kick": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					sendChat(`You kick ${input}.`);
				}
			}
		},
		"slap": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					sendChat(`You slap ${input}.`);
				}
			}
		},
		"time": {
			"isAdmin": false,
			"isHidden": false,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					time = new Date();
					utc = time.toUTCString();
					sendChat(`It is currently ${utc}.`);
				}
			}
		},
		"suggest": {
			"isAdmin": false,
			"isHidden": false,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					addUserToDatabase(msger._id, msger.name);

					let user = db.prepare(`select * from users where id = '${msger._id}'`).get();
					if (user.balance > 10 * inflation && input.length > 5) {
						fs.appendFileSync(`./suggestions.txt`, `${msger._id} : ${input}\n`);
						sendChat(`Thank you for the suggestion.`);
					} else sendChat(`Either you don't have enough Pe or the suggestion was too short.`);
				}
			}
		},
		"dance": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (!input) sendChat(`Specify the dance, ex. dance center (Dances: center, around, random, eight, circle, dvd, snow, figure)`); else {
						// convert to cases
						if (input == "center") {
							danceType = 1;
							following = false;
							dancing = true;
							sendChat(`Now dancing: ${input}.`);

						} else if (input == "around") {
							danceType = 2;
							following = false;
							dancing = true;
							sendChat(`Now dancing: ${input}.`);

						} else if (input == "random") {
							danceType = 3;
							following = false;
							dancing = true;
							sendChat(`Now dancing: ${input}.`);

						} else if (input == "eight") {
							danceType = 4;
							sin = 0;
							following = false;
							dancing = true;
							sendChat(`Now dancing: ${input}.`);

						} else if (input == "circle") {
							danceType = 5;
							sin = 0;
							following = false;
							dancing = true;
							sendChat(`Now dancing: ${input}.`);

						} else if (input == "dvd") {
							danceType = 6;
							following = false;
							dancing = true;
							sendChat(`Now dancing: ${input}.`);

						} else if (input == "snow") {
							danceType = 7;
							[snowX, snowY] = [mouseX, mouseY];
							following = false;
							dancing = true;
							sendChat(`Now dancing: ${input}.`);

						} else if (input == "figure") {
							danceType = 8;
							[figureX, figureY] = [Number(mouseX), Number(mouseY)];
							following = false;
							dancing = true;
							sendChat(`Now dancing: ${input}.`);

						} else {
							sendChat(`Invalid dance: ${input}!`);
						}
					}
				}
			}
		},
		"undance": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (dancing == true) {
						danceType = 0;
						dancing = false;
						sendChat(`Stopped dancing.`);
					} else {
						sendChat(`Cannot undance - I am not dancing.`);
					}
				}
			}
		},
		"cursor": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				if (!input) sendChat(`Say position, ex. cursor 50 50`); else {
					let args = input.split(" ");
					try {
						gClient.moveMouse(Number(args[0]), Number(args[1]));
						sendChat(`Moving cursor to ${input}.`);
					} catch (err) {
						sendChat(`Invalid position given.`);
					}
				}
			}
		},
		"follow": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					dancing = false;
					try {
						if (!input) { follow_id = msger._id; sendChat(`Now following ${msger.name}.`); } else {
							let user = findUser(input); follow_id = user[0]._id; sendChat(`Now following ${user[0].name}.`);
						}
						followType = 1;
						following = true;
					} catch (err) {
						sendChat(`Invalid user or ID.`);
						following = false;
					}
				}
			}
		},
		"unfollow": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (following == false) {
						sendChat(`Cannot unfollow - I am not following anyone.`)
					} else {
						following = false;
						sendChat(`Stopped following.`)
					}
				}
			}
		},
		"circlefollow": {
			"isAdmin": false,
			"isHidden": false,
			"isFun": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					dancing = false;
					try {
						if (!input) { follow_id = msger._id; sendChat(`Now circling ${msger.name}.`); } else {
							let user = findUser(input); follow_id = user[0]._id; sendChat(`Now circling ${user[0].name}.`);
						}
						sin = 0;
						followType = 2;
						following = true;
					} catch (err) {
						sendChat(`Invalid user or ID.`);
						following = false;
					}
				}
			}
		},
		"calc": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": input => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (!input) sendChat(`Specify the equation, ex. calc 2 + 2`); else {
						let args = input.split(" ");
						try {
							switch (args[1]) {
								case "+":
									sendChat(`Result: ${Number(args[0]) + Number(args[2])}`);
									break;

								case "-":
									sendChat(`Result: ${Number(args[0]) - Number(args[2])}`);
									break;

								case "*":
									sendChat(`Result: ${Number(args[0]) * Number(args[2])}`);
									break;

								case "/":
									sendChat(`Result: ${Number(args[0]) / Number(args[2])}`);
									break;

								case "%":
									sendChat(`Result: ${Number(args[0]) % Number(args[2])}`);
									break;

								case ">>":
									sendChat(`Result: ${Number(args[0]) >> Number(args[2])}`);
									break;

								case "<<":
									sendChat(`Result: ${Number(args[0]) << Number(args[2])}`);
									break;

								case ">>>":
									sendChat(`Result: ${Number(args[0]) >>> Number(args[2])}`);
									break;

								case "&":
									sendChat(`Result: ${Number(args[0]) & Number(args[2])}`);
									break;

								case "|":
									sendChat(`Result: ${Number(args[0]) | Number(args[2])}`);
									break;

								case "^":
									sendChat(`Result: ${Number(args[0]) ^ Number(args[2])}`);
									break;

								default:
									sendChat(`Invalid expression given.`);
									break;

								//sendChat(`${input} = ${result}`);
							}
						} catch (err) {
							sendChat(`Invalid expression given.`);
						}
					}
				}
			}
		},
		"base64encode": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": input => {
				if (!input) sendChat(`Specify the string to encode.`); else {
					sendChat(`Result: ${btoa(input)}`);
				}
			}
		},
		"base64decode": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": input => {
				if (!input) sendChat(`Specify the string to decode.`); else {
					sendChat(`Result: ${atob(input)}`);
				}
			}
		},
		"customencode": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": input => {
				if (!input) sendChat(`Specify the string to encode.`); else {
					sendChat(`Result: ${customEncode(input)}`);
				}
			}
		},
		"customdecode": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": input => {
				if (!input) sendChat(`Specify the string to decode.`); else {
					sendChat(`Result: ${customDecode(input)}`);
				}
			}
		},
		"holdroom": {
			"isAdmin": false,
			"isHidden": false,
			"isMisc": true,
			"function": (input, msger) => {
				if (lockdown) { sendChat(`Currently in lockdown.`) } else {
					if (!input) { sendChat(`Specify the room name to hold and the time in seconds.`); } else {
						if (!holdingRoom) {
							addUserToDatabase(msger._id, msger.name);

							let user = db.prepare(`select * from users where id = '${msger._id}'`).get();
							let holdStart = Date.now();
							let args = input.split(" ");
							let roomName = args.slice(0, args.length - 1).join(" ");

							if (roomName.toLowerCase() == currentChannel.toLowerCase) {
								sendChat(`You cannot hold the same room.`)
							} else {
								let time = Number(Math.floor(args[args.length - 1]));

								if (time == NaN || time < 5) {
									holdingRoom = false;
									sendChat(`Invalid time given. Also, you cannot hold a room for less than 5 seconds.`);
								} else {
									if (user.balance < Math.round(time * inflation)) { sendChat(`You do not have enough Pe to hold the room. Try lowering the time or get more Pe. ⬤ 1 second = around ${Math.round(1 * inflation)}Pe`) } else {
										holdingRoom = true;
										changeUserBalance(msger._id, -time);
										holdRoom(roomName, time);
										sendChat(`Holding "${roomName}" for ${time} seconds.`);
									}
								}
							}
						} else {
							sendChat(`Already holding a room. Wait ${Math.floor(Math.abs((Date.now() - holdStart) - (time * 1000)) / 1000)} seconds before trying again.`);
						}
					}
				}
			}
		},
		"hr": {
			"isAdmin": false, "isHidden": true, "isMisc": true, "function": (input, msger) => { mppBot.commands.holdroom.function(input, msger); }
		},
		"gamemode": {
			"isAdmin": false,
			"isHidden": true,
			"isMisc": true,
			"function": input => {
				if (!input) sendChat(`Specify the gamemode.`); else {
					switch (input) {
						case "0":
						case "survival":
						case "s":
							sendChat(`Gamemode set to survival.`);
							break;

						case "1":
						case "creative":
						case "c":
							sendChat(`Gamemode set to creative.`);
							break;

						case "2":
						case "adventure":
						case "a":
							sendChat(`Gamemode set to adventure.`);
							break;

						case "3":
						case "spectator":
						case "sp":
							sendChat(`Gamemode set to spectator.`);
							break;

						case "4":
						case "hardcore":
						case "h":
							sendChat(`Gamemode set to hardcore.`);
							break;

						case "5":
						case "god":
						case "g":
							sendChat(`Gamemode set to god. wait you just broke the law`);
							break;

						case "6":
						case "invincible":
						case "i":
							sendChat(`Gamemode set to invincible. why are you doing this to us`);
							break;

						case "7":
						case "what":
						case "w":
							sendChat(`Gamemode set to what. what are you even trying to do`);
							break;

						case "8":
						case "fox":
						case "f":
							sendChat(`Gamemode set to fox. you are a cute fox now`);
							break;

						case "69":
							sendChat(`Gamemode set to 69. funny`);
							break;

						default:
							sendChat(`Invalid gamemode.`);
							break;

					}

				}
			}
		},
		"lockdown": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				(lockdown) ? lockdown = false : lockdown = true;
				(lockdown) ? sendChat(`Lockdown enabled.`) : sendChat(`Lockdown disabled.`);
			}
		},
		"debug": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				sendChat(`Cursor: ${mouseX}, ${mouseY}`);
				sendChat(`Speed: ${mouseAmount}, dance speed: ${danceSpeed}`);
				sendChat(`Calls: ${Intl.NumberFormat("en-US", { maximumFractionDigits: 3, minimumFractionDigits: 0 }).format(mppBot.database.json.commandCalls)}`);
			}
		},
		"ping": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				pingStart = Date.now();
				pinging = true;
				//sendChat(`Pong!`);
				gClient.sendArray([{ m: "a", message: `Pong!` }]);
			}
		},
		"admin": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				if (!input) sendChat(`Say the name or ID of the user.`); else {
					let user = findUser(input);

					let userDB = db.prepare(`select * from users where id like '%${user[0]._id}%'`).get();

					if (user.length != 0) {
						if (userDB.admin == 0) {
							db.prepare(`update users set admin = 1 where id = ?`).run(user[0]._id);
							sendChat(`${user[0].name} is now an administrator of the bot.`);
						} else {
							sendChat(`${user[0].name} (${user[0]._id}) is already an administrator of the bot.`);
						}
					} else {
						sendChat(`Invalid user or ID.`);
					}

				}
			}
		},
		"unadmin": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				if (!input) sendChat(`Say the name or ID of the user.`); else {
					let user = findUser(input);

					let userDB = db.prepare(`select * from users where id = '${user[0]._id}'`).get();

					if (user.length != 0) {
						if (userDB.admin == 1) {
							db.prepare(`update users set admin = 0 where id = '${user[0]._id}'`);
							sendChat(`${user[0].name} now isn't an administrator of the bot.`);
						} else {
							sendChat(`${user[0].name} (${user[0]._id}) is already an administrator of the bot.`);
						}
					} else {
						sendChat(`Invalid user or ID.`);
					}

				}
			}
		},
		"restart": {
			"isAdmin": true,
			"isHidden": false,
			"function": input => {
				process.exit();
			}
		}, "reload": {
			"isAdmin": true, "isHidden": true, "function": input => { mppBot.commands.restart.function(); }
		},
		"kickban": {
			"isAdmin": true,
			"isHidden": false,
			"isMod": true,
			"function": input => {
				// sendarray kickban https://github.com/LapisHusky/mppclone/wiki/Protocol#kickban
				let name = input.split(" ");
				name.pop();
				let userToBan = (name.length > 0) ? findUser(name.join(" ")) : undefined;
				let time = input.split(" ")[input.split(" ").length - 1];

				console.log(userToBan);
				if (userToBan !== undefined) {
					let _____whatamievendoingatthispoint = [...time];
					_____whatamievendoingatthispoint.pop();
					let parsedTime = parseInt(_____whatamievendoingatthispoint.join(""));

					if (isNaN(parsedTime)) sendChat('Time is invalid!'); else {
						let _time = time[time.length-1];
						let __time = 0;
						let willBan = true;
	
						switch (_time) {
							case "s":
								__time = parsedTime * 1000;
								break;
							case "m":
								__time = parsedTime * 60000;
								break;
							case "h":
								__time = parsedTime * 3600000;
								break;
							default:
								willBan = false;
								break;
						}
						if (willBan) { 
							gClient.sendArray([{ m: "kickban", _id: userToBan[0]._id, ms: __time }]);
							//sendChat(`Kickbanned ${userToBan[0].name} (${userToBan[0]._id}) for ${__time}ms.`);
						}
						else sendChat('Time format is invalid. Accepted formats: s, m, h');
					}
					
				} else sendChat('User is invalid or is not online!');
				
			}
		},
	}
};

mppBot.database.load();

let pdbu = mppBot.database.json.users;
let pdbq = mppBot.database.json.quotes;

gClient.on("p", participant => {
	//log(`${participant.name} joined`);
	// if participant._id not in users database, add it
	addUserToDatabase(participant._id, participant.name);

});

gClient.on("a", msg => {
	log("[" + msg.p._id + "] " + msg.p.name + ": " + msg.a);
	let args = msg.a.split(" ");
	let cmd = args[0].toLowerCase();
	let input = msg.a.substring(cmd.length).trim();
	let commandToRun;
	//addUserToDatabase(msg.p._id, msg.p.name);

	if ((typeRacing || mathRacing) && !lockdown) {
		if (msg.a.toLowerCase() == word && typeRacing && Date.now() >= typeRaceStartTime) {
			typeRacing = false;
			let typeRaceEndTime = Date.now();
			raceMoney = Math.floor(raceSub / (typeRaceEndTime - typeRaceStartTime)) + raceAdd;
			sendChat(`⌨ ${msg.p.name} has won the type race in ${typeRaceEndTime - typeRaceStartTime}ms and earned ${raceMoney}Pe!`);
			changeUserBalance(msg.p._id, raceMoney);
		}

		if (Number.parseInt(msg.a) == Number.parseInt(eval(problem)) && mathRacing && Date.now() >= mathRaceStartTime) {
			mathRacing = false;
			let mathRaceEndTime = Date.now();
			raceMoney = Math.floor(raceSub / (mathRaceEndTime - mathRaceStartTime)) + (raceAdd * 2);
			sendChat(`➗ ${msg.p.name} has won the math race in ${mathRaceEndTime - mathRaceStartTime}ms and earned ${raceMoney}Pe!`);
			changeUserBalance(msg.p._id, raceMoney);
		}
	}

	let isUserAdmin = (db.prepare(`select * from users where id = '${msg.p._id}' and admin = 1`).get() != undefined) ? true : false;
	let isUserBanned = (db.prepare(`select * from users where id = '${msg.p._id}' and banned = 1`).get() != undefined) ? true : false;
	//console.log(db.prepare(`select * from users where id = '${msg.p._id}' and admin = 1`).get());
	Object.keys(mppBot.commands).forEach(command => {
		if (cmd == mppBot.prefix + command) commandToRun = mppBot.commands[command];
	});
	let isBot = (msg.p.tag !== undefined) ? msg.p.tag.text == "BOT" : false;
	if (typeof commandToRun == "object" && !isUserBanned && !isBot) {
		if ((commandToRun.isAdmin && isUserAdmin) || (!commandToRun.isAdmin && isUserAdmin)) {
			if (typeof commandToRun.function == "function") {
				try {
					commandToRun.function(input, msg.p);
				} catch (err) {
					sendChat(mppBot.name + err);
				}
				mppBot.database.json.commandCalls++;
			}
		}
		if (commandToRun.isAdmin && !isUserAdmin) sendChat("You are not an administrator.");
		if (!commandToRun.isAdmin && !isUserAdmin) {
			if (typeof commandToRun.function == "function") {
				try {
					commandToRun.function(input, msg.p);
				} catch (err) {
					sendChat(mppBot.name + err);
				}
				mppBot.database.json.commandCalls++;
			}
		}
		//} else sendChat(`You don't have permission to use this command.`);
	}

	if (detectYoutube) { // make youtube links array    https://www.youtube.com/watch?v=
		let index = msg.a.toLowerCase().indexOf("https://www.youtube.com/watch?v=");
		let link;
		let space = msg.a.indexOf(" ", index);
		if (index == -1) {
			index = msg.a.toLowerCase().indexOf("https://www.youtu.be");
			if (index !== -1) {
				space = msg.a.indexOf(" ", index);
				link = msg.a.substring(index, space).replace("youtu.be/", "youtube.com/watch?v=");
			}
		} else link = msg.a.substring(index, space);

		

		if (space == -1) space = msg.a.length;

		function found(title, author) {
			if (title != undefined) { sendChat(`YT link found: ${title} ⬤ ${author}`) } else { sendChat(`YT link found, however wasn't able to find video.`); log(title); }
		}

		if (index > -1 /*&& msg.a.indexOf("watch?v=") > -1*/) {
			fetch(`https://noembed.com/embed?dataType=json&url=${msg.a.substring(index, space)}`)
				.then(res => res.json())
				.then(data => found(data.title, data.author_name));
		}
	}

	if (pinging && msg.a.indexOf("Pong!") != -1 && msg.p._id == "fc4f07afd4cfdc6d8772a51a") {
		let pingEnd = Date.now()
		pinging = false;
		sendChat(`Pinged in ${pingEnd - pingStart}ms.`);
	}

	io.emit("message", "[" + msg.p._id + "] " + msg.p.name + ": " + msg.a);

	if (!isBot) for (let arg of args) {
		if (dbFindWord.get(arg) === undefined) dbWord.run(arg, 1); else db.prepare('update words set used = ? where word = ?').run(dbFindWord.get(arg).used + 1, arg);
	}


	mppBot.database.save();
});

gClient.start();

console.log(Object.keys(mppBot.commands));

server.listen(process.env.PORT || 3042, (err) => {
	log(`Listening to dashboard.`);
});

server.on('error', err => {
	log('Will not listen to dashboard on this bot instance.');
});


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// website thing ideas:
// toggle lockdown
// send chat message
// log chat messages
// eval
io.on('connection', socket => {
	//log(`${socket.id} website access`);

	socket.on('message', (message) => {
		sendChat("📻: " + message);
	})
});

log("Starting...");