let token = localStorage.getItem("token");
setInterval(() => {
    if (!document.getElementById('getData')) init()
}, 0)
const getData = () => JSON.parse(localStorage.data)[window.location.pathname];
setData = async (data) => {
    let src = chrome.runtime.getURL("utils/setData.js");
    let script = (await (await fetch(src)).text()).replace(/OneMinesraft26969/g, JSON.stringify(data));
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.innerHTML = script;
    element.id = "setData";
    document.head.prepend(element);
    document.getElementById('setData').remove();
}
let Cheats = {
    'getTokens': { run: getTokens },
    'openBoxes': { run: openBoxes },
    'autoSell': { run: autoSell },
    'autoAnswer': { run: autoAnswer },
    'highlightAnswer': { run: highlightAnswer },
    'chestESP': { run: chestESP },
    'setGold': { run: setGold },
    'takeAll': { run: takeAll },
    'blookSpoof': { run: blookSpoof },
    'getPassword': { run: getPassword },
    'setCrypto': { run: setCrypto },
    'setPassword': { run: setPassword },
    'setLure': { run: setLure },
    'setWeight': { run: setWeight },
    'setCoins': { run: setCoins },
    'infiniteFood': { run: infiniteFood },
    'setCash': { run: setCash },
    'antiGlitch': { run: antiGlitch },
    'maxBlooks': { run: maxBlooks },
    'allMega': { run: allMega },
    'alwaysMega': { run: alwaysMega },
    'instantWin': { run: instantWin },
    'setRound': { run: setRound },
    'setTokens': { run: setTokens },
    'setDamage': { run: setDamage },
    'setPrices': { run: setPrices },
    'allFree': { run: allFree },
    'clearEnemies': { run: clearEnemies },
    'removeDucks': { run: removeDucks },
    'removeObsticles': { run: removeObsticles },
    'lowerStats': { run: lowerStats },
    'maxStats': { run: maxStats },
    'setDoom': { run: setDoom },
    'maxResources': { run: maxResources },
    'setGuests': { run: setGuests },
    'noTaxes': { run: noTaxes },
    'skipGuest': { run: skipGuest },
    'choiceESP': { run: choiceESP }
};
chrome.runtime.onMessage.addListener((message) => {
    message.cheat && Cheats[message.cheat].run(message.args);
});
async function getTokens() {
    var name = window.jwt_decode(token.replace("JWT ", "")).name;
    fetch("https://api.blooket.com/api/users/addtokens", {
        headers: {
            authorization: token,
            "content-type": "application/json;charset=UTF-8",
        },
        referrer: "https://www.blooket.com/",
        body: JSON.stringify({
            name,
            addedTokens: 500
        }),
        method: "PUT"
    }).then(() => {
        alert('Tokens added!')
    });
}
async function openBoxes(args) {
    let [box, amount] = args
    var name = window.jwt_decode(token.replace("JWT ", "")).name,
        tokens = await fetch("https://api.blooket.com/api/users/tokens?name=" + name),
        price = getPrice(box),
        opens = Math.floor(amount * price > tokens ? Math.floor(tokens / 25) : (amount * price) / 25);
    let interval = setInterval(function () {
        if (!opens) return clearInterval(interval);
        fetch("https://api.blooket.com/api/users/unlockblook", {
            headers: {
                authorization: token,
                "content-type": "application/json;charset=UTF-8",
            },
            referrer: "https://www.blooket.com/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: JSON.stringify({
                name,
                box,
            }),
            method: "PUT"
        })
            .then((response) => {
                if (response.status != 200) {
                    return clearInterval(interval);
                }
                response = response.json()
                if (response.isNewBlook) alert(`New Blook! ${response.blook}`)
            })
            .catch((e) => {
                clearInterval(interval);
            });
        opens--;
        if (!opens) {
            clearInterval(interval);
            alert('Auto open complete!')
        }
    }, 128);
}
function getPrice(box) {
    switch (box.toLowerCase()) {
        case "aquatic":
            return 25;
        case "bot":
            return 20;
        case "space":
            return 20;
        case "breakfast":
            return 15;
        case "medieval":
            return 15;
        case "wonderland":
            return 20;
    }
}
async function autoSell() {
    var name = window.jwt_decode(token.replace("JWT ", "")).name,
        blooks = await getOverflow(name);
    for (var [blook, numSold] of Object.entries(blooks))
        fetch("https://api.blooket.com/api/users/sellblook", {
            headers: {
                authorization: token,
                "content-type": "application/json;charset=UTF-8",
            },
            referrer: "https://www.blooket.com/",
            body: JSON.stringify({
                name,
                blook,
                numSold,
            }),
            method: "PUT"
        });
    alert('Auto sell complete')
}
async function getOverflow(name) {
    return Object.fromEntries(
        Object.entries(
            await (
                await fetch("https://api.blooket.com/api/users/blooks?name=" + name)
            ).json()
        )
            .filter((x) => x[1] > 1)
            .map((x) => [x[0], x[1] - 1])
    );
}

async function autoAnswer() {
    if (!ingame()) return alert("You must be ingame to use this!");
    alert("Auto answer enabled");
    let interval = setInterval(() => {
        let data = getData();
        let filter = a => a.innerHTML == data.question.correctAnswers[0] && a.parentElement.id != 'qText'
        if (document.getElementById("qText")) Array.from(document.querySelectorAll('div')).find(filter).parentElement.parentElement.click();
        if (document.querySelector("div[class*='styles__feedbackContainer___IASS4-camelCase']")) document.querySelector("div[class*='styles__feedbackContainer___IASS4-camelCase']").click();
        if (document.querySelector("#body > div.styles__questionContainer___1D5cX-camelCase > div")) document.querySelector("#body > div.styles__questionContainer___1D5cX-camelCase > div").click();
        if (document.querySelector("div[class*='arts__regularBody___1st6G-camelCase styles__background___30vso-camelCase']")) document.querySelector("div[class*='arts__regularBody___1st6G-camelCase styles__background___30vso-camelCase']").click();
        if (!ingame()) clearInterval(interval);
    }, 0);
}
async function highlightAnswer() {
    if (!ingame()) return alert("You must be ingame to use this!");
    alert("Highlight answers enabled");
    let interval = setInterval(() => {
        let data = getData();
        let correct = a => data.question.correctAnswers.includes(a.innerHTML) && a.parentElement.id != 'qText'
        let wrong = a => a.parentElement.id != 'qText' && a.className.includes('answerContainer') && !data.question.correctAnswers.includes(a.children[0].children[0].innerHTML)
        if (document.getElementById("qText")) {
            Array.from(document.querySelectorAll('div')).filter(correct).forEach(x => x.parentElement.parentElement.style = "background-color: rgb(0, 207, 119);");
            if (Array.from(document.querySelectorAll('div')).filter(wrong).length) Array.from(document.querySelectorAll('div')).filter(wrong).forEach(x => x.style = "background-color: rgb(225, 40, 33);");
        }
        if (!ingame()) clearInterval(interval);
    }, 0);
}
function checkDouble(list) {
    count = {};
    for (item of list) {
        if (!count[item]) count[item] = 1;
        else return true;
    }
    return false;
}
async function chestESP() {
    if (window.location.pathname != '/play/gold') return alert('You must be in a gold quest game!');
    alert('Chest ESP enabled');
    let data = getData();
    interval = setInterval(() => {
        data = getData();
        if (data?.stage == 'prize') {
            boxes = data.choices;
            choiceDiv = document.querySelector("div[class*='arts__regularBody']")?.children[1];
            if (!choiceDiv) return clearInterval(interval)
            if (!document.querySelector("p[class*='chest-esp']")) boxes.forEach((box, i) => {
                textElement = document.createElement('p');
                textElement.className = "chest-esp";
                textElement.innerText = box.text;
                textElement.style = `text-align: center;
font-size: 30px;
color: white;
font-family:Titan One;
sans-serif;
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
border-color: black;
line-height: 375px;`
                try { choiceDiv.children[i].appendChild(textElement); } catch (e) { }
            });
        };
        if (window.location.pathname != '/play/gold') clearInterval(interval)
    }, 0)
}
function setGold(args) {
    let [gold] = args;
    if (window.location.pathname != '/play/gold') return alert('You must be in a gold quest game!');
    setData({ gold });
    alert('Set gold to ' + gold);
    //updateData();
}
function takeAll() {
    let src = chrome.runtime.getURL("scripts/gold/takeAll.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "takeAll";
    document.head.prepend(element);
    document.getElementById('takeAll').remove();
}
function blookSpoof() {
    if (window.location.pathname == '/blooks') {
        setData({ blooks: getData().allBlooks });
        ////updateData();
    }
    else if (window.location.pathname == '/play/lobby') {
        setData({ lockedBlooks: [] });
        //updateData();
    }
    else alert('This can only be used on the blook page or in a game lobby!');
}
function getPassword() {
    if (window.location.pathname == "/play/hack") {
        let interval = setInterval(() => {
            if (window.location.pathname != '/play/hack') return clearInterval(interval);
            let { stage, correctPassword } = getData();
            if (stage == "hack") Array.from(document.getElementsByClassName('styles__button___3HSB4-camelCase')).forEach(x => {
                if (x.innerHTML == correctPassword) x.click()
            })
        }, 0)
    } else alert('This can only be used in crypto hack!')
}
function setCrypto(args) {
    if (window.location.pathname != '/play/hack') return alert('You must be in a crypto hack game!');
    setData({ crypto: args[0] });
}
function setPassword(args) {
    if (window.location.pathname != '/play/hack') return alert('You must be in a crypto hack game!');
    setData({ password: args[0] });
}
function setLure(args) {
    let [lure] = args
    if (window.location.pathname != '/play/fishing') return alert('You must be in a fishing frenzy game!');
    setData({ lure })
    alert('Set lure to ' + (lure + 1))
}
function setWeight(args) {
    let [weight] = args;
    if (window.location.pathname != '/play/fishing') return alert('You must be in a fishing frenzy game!');
    setData({ weight })
    alert('Set weight to ' + weight)
    //updateData();
}
function setCoins(args) {
    let [cafeCash] = args;
    if (!window.location.pathname.includes('/cafe')) return alert('You must be in a cafe game!');
    setData({ cafeCash })
    alert('Set cash to ' + cafeCash)
    //updateData();
}
function setCash(args) {
    let [cash] = args;
    if (window.location.pathname != '/play/factory') return alert('You must be in a factory game!');
    setData({ cash })
    alert('Set cash to ' + cash)
    //updateData();
}
function infiniteFood() {
    if (!window.location.pathname.includes('/cafe')) return alert('You must be in a cafe game!');
    if (window.location.pathname != '/cafe/shop') try { Array.from(document.querySelectorAll('div')).find(e => e.innerHTML == "Upgrade Shop").click(); } catch (e) { }
    try {
        let items = getData().items;
        Object.keys(items).forEach(item => items[item] = 5);
        setData({ items })
        setTimeout(() => {
            setData({ items })
            setTimeout(() => {
                Array.from(document.querySelectorAll('div')).find(e => e.innerHTML == "Back").click();
                let foods = getData().foods.map(food => ({ name: food.name, level: 5, stock: 999999 }));
                setTimeout(() => {
                    setData({ foods });
                }, 333)
            }, 333);
        }, 333)
    } catch (e) {
        try {
            let foods = getData().foods.map(food => ({ name: food.name, level: 5, stock: 999999 }));
            setData({ foods });
        } catch (e) { }
    }
    alert('Set food to infinity!');
}
function antiGlitch() {
    if (window.location.pathname != '/play/factory') return alert('You must be in a factory game!')
    let interval = setInterval(() => {
        let newData = {
            glitchMsg: "",
            glitch: "",
            glitcherName: "",
            glitcherBlook: "",
            bites: 0,
            ads: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            hazards: ["", "", "", "", ""],
            lol: false,
            joke: false,
            slow: false,
            dance: false,
            color: "",
            popUpAmount: 0,
            popUpType: "",
        }
        setData(newData);
        if (window.location.pathname != '/play/factory') return clearInterval(interval);
    }, 0)
}
function maxBlooks() {
    if (window.location.pathname != '/play/factory') return alert('You must be in a factory game!')
    let blooks = getData().blooks.map(x => ({ ...x, level: 4 }));
    setData({ blooks });
    //updateData();
}
function allMega() {
    if (window.location.pathname != '/play/factory') return alert('You must be in a factory game!')
    let blooks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => ({
        name: "Mega Bot",
        color: "#d71f27",
        class: "🤖",
        rarity: "Legendary",
        cash: [80000, 430000, 4200000, 62000000, 1000000000],
        time: [5, 5, 3, 3, 3],
        price: [7000000, 120000000, 1900000000, 35000000000],
        active: false,
        level: 4,
        bonus: 5.5
    }))
    setData({ blooks });
    //updateData();
}
function alwaysMega() {
    if (window.location.pathname != '/play/factory') return alert('You must be in a factory game!')
    let interval = setInterval(() => {
        if (window.location.pathname != '/play/factory') return clearInterval(interval);
        try {
            if (getData().progress != 3 || !getData().choices.length) return;
            let choices = [{
                name: "Mega Bot",
                color: "#d71f27",
                class: "🤖",
                rarity: "Legendary",
                cash: [80000, 430000, 4200000, 62000000, 1000000000],
                time: [5, 5, 3, 3, 3],
                price: [7000000, 120000000, 1900000000, 35000000000],
                active: false,
                level: 4,
                bonus: 5.5
            }, getData().choices[1], getData().choices[2]]
            setData({ choices, progress: 0 });
            //updateData();
        } catch (e) { console.log(e) }
    }, 0)
}
function instantWin() {
    if (window.location.pathname != '/play/racing') return alert('You must be in a racing game!')
    setData({ progress: getData().goalAmount });
    setTimeout(() => {
        Array.from(document.querySelectorAll('div')).find((a) =>
            a.innerHTML == getData().question.correctAnswers[0] && a.parentElement.id != 'qText'
        ).parentElement.parentElement.click();
    }, 100)
}
function setTokens(args) {
    let [tokens] = args;
    if (window.location.pathname != '/defense') return alert('You must be in a tower defense game!');
    setData({ tokens })
    alert('Set tokens to ' + tokens)
}
function setRound(args) {
    let [round] = args;
    if (window.location.pathname != '/defense') return alert('You must be in a tower defense game!');
    setData({ round })
    alert('Set round to ' + round)
}
async function setDamage(args) {
    let src = chrome.runtime.getURL("scripts/towerdefense/setDamage.js");
    let script = (await (await fetch(src)).text()).replace(/OneMinesraft26969/g, args[0]);
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.innerHTML = script;
    element.id = "setDamage";
    document.head.prepend(element);
    document.getElementById('setDamage').remove();
}
function setPrices() {
    let src = chrome.runtime.getURL("scripts/towerdefense/setPrices.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "setPrices";
    document.head.prepend(element);
    document.getElementById('setPrices').remove();
}
function allFree() {
    let src = chrome.runtime.getURL("scripts/towerdefense/allFree.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "allFree";
    document.head.prepend(element);
    document.getElementById('allFree').remove();
}
function clearEnemies() {
    let src = chrome.runtime.getURL("scripts/towerdefense/clearEnemies.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "clearEnemies";
    document.head.prepend(element);
    document.getElementById('clearEnemies').remove();
}
function removeDucks() {
    let src = chrome.runtime.getURL("scripts/towerdefense/removeDucks.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "removeDucks";
    document.head.prepend(element);
    document.getElementById('removeDucks').remove();
}
function removeObsticles() {
    let src = chrome.runtime.getURL("scripts/towerdefense/removeObsticles.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "removeObsticles";
    document.head.prepend(element);
    document.getElementById('removeObsticles').remove();
}
function lowerStats() {
    if (window.location.pathname != '/tower/battle') return alert('You must be in a tower of doom game!');
    if (getData().phase != 'select') return alert('You must be on the attribute selection page!');
    let enemyCard = getData().enemyCard
    setData({ enemyCard: { ...enemyCard, strength: 0, charisma: 0, wisdom: 0 } })
}
function maxStats() {
    if (window.location.pathname != '/tower/battle') return alert('You must be in a tower of doom game!');
    if (getData().phase != 'select') return alert('You must be on the attribute selection page!');
    let myCard = getData().myCard
    setData({ myCard: { ...myCard, strength: 20, charisma: 20, wisdom: 20 } })
}
function setDoom(args) {
    let [coins] = args;
    if (!window.location.pathname.includes('/tower')) return alert('You must be in a tower of doom game!');
    setData({ coins })
    alert('Set coins to ' + coins)
}
function maxResources() {
    if (window.location.pathname != '/kingdom') return alert('You must be in a crazy kingdom game!');
    setData({ materials: 100, people: 100, happiness: 100, gold: 100 })
}
function setGuests(args) {
    let [guestScore] = args;
    if (window.location.pathname != '/kingdom') return alert('You must be in a crazy kingdom game!');
    setData({ guestScore })
    alert('Set guests to ' + guestScore)
}
function noTaxes() {
    let src = chrome.runtime.getURL("scripts/crazykingdom/noTaxes.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "noTaxes";
    document.head.prepend(element);
    document.getElementById('noTaxes').remove();
}
function skipGuest() {
    let src = chrome.runtime.getURL("scripts/crazykingdom/skipGuest.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "skipGuest";
    document.head.prepend(element);
    document.getElementById('skipGuest').remove();
}
function choiceESP() {
    if (window.location.pathname != '/kingdom') return alert('You must be in a crazy kingdom game!');
    let interval = setInterval(() => {
        try {
            if (window.location.pathname != '/kingdom') return clearInterval(interval);
            Array.from(document.getElementsByClassName('choiceESP')).forEach(x => x.remove())
            let elements = {
                materials: Array.from(document.querySelectorAll('div')).find(x => Array.from(x.children).find(e => e.className.includes('tree'))),
                people: Array.from(document.querySelectorAll('div')).find(x => Array.from(x.children).find(e => e.className.includes('users') && e.parentElement.className.includes('statContainer'))),
                happiness: Array.from(document.querySelectorAll('div')).find(x => Array.from(x.children).find(e => e.className.includes('grin'))),
                gold: Array.from(document.querySelectorAll('div')).find(x => Array.from(x.children).find(e => e.className.includes('coins')))
            }
            let data = getData().guest;
            Object.entries(data.yes).forEach(x => {
                if (x[0] == 'msg') return;
                let element = document.createElement('div');
                element.className = 'choiceESP';
                element.style = 'font-size: 24px; color: rgb(75, 194, 46); font-weight: bolder;';
                element.innerText = String(x[1])
                elements[x[0]].appendChild(element);
            })
            Object.entries(data.no).forEach(x => {
                if (x[0] == 'msg') return;
                let element = document.createElement('div');
                element.className = 'choiceESP';
                element.style = 'font-size: 24px; color: darkred; font-weight: bolder;';
                element.innerText = String(x[1])
                elements[x[0]].appendChild(element);
            })
        } catch (e) { }
    }, 0)
}




function ingame() {
    let wlp = window.location.pathname;
    return wlp.includes("play/") || wlp == '/defense' || wlp.includes('tower') || wlp.includes('cafe') || wlp.includes('kingdom');
}

function init() {
    let src = chrome.runtime.getURL("utils/data.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "getData";
    document.head.prepend(element);
}