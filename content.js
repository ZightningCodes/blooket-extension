let token = localStorage.getItem("token");
requestIdleCallback(init);
const getData = () => JSON.parse(localStorage.data)[window.location.pathname]
setData = async (data) => {
    let src = chrome.runtime.getURL("data/setData.js");
    let script = (await (await fetch(src)).text()).replace(/OneMinesraft26969/g, JSON.stringify(data));
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.innerHTML = script;
    element.id = "setData";
    document.head.prepend(element);
    document.getElementById('setData').remove();
}
updateData = () => {
    let src = chrome.runtime.getURL("data/updateData.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "updateData";
    setTimeout(() => {
        document.head.prepend(element);
        document.getElementById('updateData').remove();
    }, 50)
}
let Cheats = {
    'getTokens': { run: getTokens },
    'openBoxes': { run: openBoxes },
    'autoSell': { run: autoSell },
    'autoAnswer': { run: autoAnswer },
    'chestESP': { run: chestESP },
    'setGold': { run: setGold },
    'blookSpoof': { run: getBlooks },
    'getPassword': { run: getPassword },
    'setCrypto': { run: setCrypto },
    'setLure': { run: setLure },
    'setWeight': { run: setWeight },
    'setCoins': { run: setCoins },
    'infiniteFood': { run: infiniteFood }
};
chrome.runtime.onMessage.addListener((message) => {
    message.cheat && Cheats[message.cheat].run(message.args);
});
async function getTokens() {
    console.log('hello')
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
    if (!window.location.pathname.includes("play/")) return alert("You must be ingame to use this!");
    alert("Auto answer enabled");
    let interval = setInterval(() => {
        let data = getData();
        let filter = a => a.innerHTML == data.question.correctAnswers[0] && a.parentElement.id != 'qText'
        if (document.getElementById("qText")) Array.from(document.querySelectorAll('div')).find(filter).parentElement.parentElement.click();
        document.getElementsByClassName("arts__regularBody___1st6G-camelCase styles__background___30vso-camelCase")[0]?.click();
        document.getElementsByClassName("styles__feedbackContainer___ttxTX-camelCase")[0]?.click();
        document.getElementsByClassName("arts__regularBody___1st6G-camelCase")[0]?.click();
        if (!window.location.pathname.includes("play/")) clearInterval(interval);
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
line-height: 350px;`
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
    updateData();
}
function getBlooks() {
    if (window.location.pathname == '/blooks') {
        setData({ blooks: getData().allBlooks });
        updateData();
    }
    else if (window.location.pathname == '/play/lobby') {
        setData({ lockedBlooks: [] });
        updateData();
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
    updateData();
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
    updateData();
}
function setCoins(args) {
    let [cafeCash] = args;
    if (!window.location.pathname.includes('/cafe')) return alert('You must be in a cafe game!');
    setData({ cafeCash })
    alert('Set cash to ' + cafeCash)
    updateData();
}
function infiniteFood() {
    if (!window.location.pathname.includes('/cafe')) return alert('You must be in a cafe game!');
    if (window.location.pathname != '/cafe/shop') Array.from(document.querySelectorAll('div')).find(e => e.innerHTML == "Upgrade Shop").click();
    let items = getData().items;
    Object.keys(items).forEach(item => items[item] = 5);
    setData({ items })
    updateData();
    setTimeout(() => {
        setData({ items })
        updateData();
        setTimeout(() => {
            Array.from(document.querySelectorAll('div')).find(e => e.innerHTML == "Back").click();
            let foods = getData().foods.map(food => ({ name: food.name, level: 5, stock: 999999 }));
            setTimeout(() => {
                setData({ foods });
                updateData();
            }, 333)
        }, 333);
    }, 333)
    alert('Set food to infinity!');
}



function init() {
    let src = chrome.runtime.getURL("data/data.js");
    let element = document.createElement("script");
    element.type = "text/javascript";
    element.src = src;
    element.id = "getData";
    document.head.prepend(element);
    document.getElementById('getData').remove();
}