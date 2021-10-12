const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
document.addEventListener('DOMContentLoaded', function () {

    if (!localStorage.options) localStorage.options = JSON.stringify({ darkMode: false, color: '#0bc3d0' })

    if (JSON.parse(localStorage.options).darkMode) {
        document.getElementById('darkMode').click();
        document.getElementById('theme').href = 'css/dark.css';
    } else document.getElementById('theme').href = 'css/light.css';

    document.getElementById('colorSetting').value = JSON.parse(localStorage.options).color;
    updateColor()

    document.getElementById('darkMode').addEventListener('click', async () => {
        options = JSON.parse(localStorage.options ? localStorage.options : '{}');
        options.darkMode = document.querySelector("#darkMode").checked
        localStorage.options = JSON.stringify(options);
        if (JSON.parse(localStorage.options).darkMode) document.getElementById('theme').href = 'css/dark.css';
        else document.getElementById('theme').href = 'css/light.css';
    })

    document.getElementById('colorSetting').addEventListener('change', updateColor)

    document.getElementById('reset').addEventListener('click', () => {
        delete localStorage.options;
        document.querySelector('#darkMode').checked && document.querySelector('#darkMode').click();
        document.querySelector('#colorSetting').value = '#0bc3d0';
        updateColor()
    })

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
    document.getElementById('highlightAnswer').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'highlightAnswer' })
        })
    }, false)
    document.getElementById('chestESP').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'chestESP' })
        })
    }, false)
    document.getElementById('takeAll').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'takeAll' })
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
    document.getElementById('setPassword').addEventListener('click', async () => {
        let crypto = document.getElementById('password')
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setPassword', args: [crypto.value] })
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
    document.getElementById('alwaysMega').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'alwaysMega' })
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
    document.getElementById('lowerStats').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'lowerStats' })
        })
    }, false)
    document.getElementById('maxStats').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'maxStats' })
        })
    }, false)
    document.getElementById('setDoom').addEventListener('click', async () => {
        let value = document.getElementById('doom')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setDoom', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('maxResources').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'maxResources' })
        })
    }, false)
    document.getElementById('setGuests').addEventListener('click', async () => {
        let value = document.getElementById('guests')
        if (!Number(value.value)) value.value = "";
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'setGuests', args: [Number(value.value)] })
        })
    }, false)
    document.getElementById('noTaxes').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'noTaxes' })
        })
    }, false)
    document.getElementById('skipGuest').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'skipGuest' })
        })
    }, false)
    document.getElementById('choiceESP').addEventListener('click', async () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cheat: 'choiceESP' })
        })
    }, false)
}, false)
async function updateColor() {
    options = JSON.parse(localStorage.options);
    let color = document.getElementById('colorSetting').value
    options.color = color;
    localStorage.options = JSON.stringify(options)

    if (document.getElementById('color')) document.getElementById('color').remove();
    let script = `button:hover { border: 2px solid #0bc3d0; color: #0bc3d0; } input:hover { border: 2px solid #0bc3d0; color: #0bc3d0; } .detailText:hover { color: #0bc3d0; } .color:hover { border: 2px solid #0bc3d0; }`.replace(/#0bc3d0/g, color);
    let element = document.createElement("style");
    element.innerHTML = script;
    element.id = "color";
    document.head.append(element);
}