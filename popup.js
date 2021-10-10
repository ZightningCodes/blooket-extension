const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getTokens').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'getTokens' })
        })
    }, false)
    document.getElementById('openBoxes').addEventListener('click', async () => {
        let box = document.getElementById('boxInput');
        let amount = document.getElementById('boxAmountInput');
        let sucess = true;
        if (!["aquatic", "bot", "space", "breakfast", "medieval", "wonderland"].includes(box.value.toLowerCase().replace(/Box/g, '').replace(/ /g, ''))) {
            box.value = "";
            box.placeholder = "Invalid box! (e.g. 'Space')";
            setTimeout(() => {
                box.placeholder = "Box name (e.g. 'Space')";
            }, 1500)
            sucess = false
        }
        if (!Number(amount.value)) {
            amount.value = "";
            amount.placeholder = "Invalid amount!";
            setTimeout(() => {
                amount.placeholder = "Amount to open"
            }, 1500)
            sucess = false
        }
        if (sucess) chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'openBoxes', args: [capitalize(box.value), Number(amount.value)] })
        })
    }, false)
    document.getElementById('autoSell').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'autoSell' })
        })
    }, false)
    document.getElementById('autoAnswer').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'autoAnswer' })
        })
    }, false)
    document.getElementById('chestESP').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'chestESP' })
        })
    }, false)
    document.getElementById('setGold').addEventListener('click', async () => {
        let gold = document.getElementById('gold')
        if (!Number(gold.value)) gold.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setGold', args: [Number(gold.value)] })
        })
    }, false)
    document.getElementById('blookSpoof').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'blookSpoof' })
        })
    }, false)
    document.getElementById('getPassword').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'getPassword' })
        })
    }, false)
    document.getElementById('setCrypto').addEventListener('click', async () => {
        let crypto = document.getElementById('crypto')
        if (!Number(crypto.value)) crypto.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setCrypto', args: [Number(crypto.value)] })
        })
    }, false)
    document.getElementById('setLure').addEventListener('click', async () => {
        let value = document.getElementById('lureLevel')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setLure', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('setWeight').addEventListener('click', async () => {
        let value = document.getElementById('weight')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setWeight', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('setCoins').addEventListener('click', async () => {
        let value = document.getElementById('coins')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setCoins', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('infiniteFood').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'infiniteFood' })
        })
    }, false)
    document.getElementById('antiGlitch').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'antiGlitch' })
        })
    }, false)
    document.getElementById('maxBlooks').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'maxBlooks' })
        })
    }, false)
    document.getElementById('allMega').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'allMega' })
        })
    }, false)
    document.getElementById('setCash').addEventListener('click', async () => {
        let value = document.getElementById('cash')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setCash', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('instantWin').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'instantWin' })
        })
    }, false)
    document.getElementById('setRound').addEventListener('click', async () => {
        let value = document.getElementById('round')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setRound', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('setTokens').addEventListener('click', async () => {
        let value = document.getElementById('tokens')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setTokens', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('setDamage').addEventListener('click', async () => {
        let value = document.getElementById('damage')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setDamage', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('setPrices').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setPrices' })
        })
    }, false)
    document.getElementById('allFree').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'allFree' })
        })
    }, false)
    document.getElementById('clearEnemies').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'clearEnemies' })
        })
    }, false)
    document.getElementById('removeDucks').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'removeDucks' })
        })
    }, false)
    document.getElementById('removeObsticles').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'removeObsticles' })
        })
    }, false)
}, false)