const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getTokens').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, ['tokens'])
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
        if (!Number(gold.value)) {
            gold.value = "";
            gold.placeholder = "Invalid amount!";
            return setTimeout(() => { gold.placeholder = "Gold" }, 1500)
        }
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
        if (!Number(crypto.value)) {
            crypto.value = "";
            crypto.placeholder = "Invalid amount!";
            return setTimeout(() => {
                crypto.placeholder = "Crypto"
            }, 1500)
        }
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
}, false)