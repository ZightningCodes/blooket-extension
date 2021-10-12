const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
document.addEventListener('DOMContentLoaded', function () {

    if (!localStorage.options) localStorage.options = JSON.stringify({ darkMode: false, color: '#0bc3d0' })

    let colors = [
        '#ff0000', '#ff1c00', '#ff2b00', '#fe3700', '#fe4100',
        '#fd4a00', '#fc5200', '#fa5a00', '#f96100', '#f76800',
        '#f56f00', '#f37500', '#f07c00', '#ee8200', '#eb8800',
        '#e78e00', '#e49300', '#e19900', '#dd9e00', '#d9a400',
        '#d4a900', '#d0ae00', '#cbb300', '#c6b800', '#c1bd00',
        '#bbc200', '#b6c700', '#b0cc00', '#a9d000', '#a2d500',
        '#9bd900', '#93de00', '#8ae200', '#81e600', '#77eb00',
        '#6bef00', '#5ef300', '#4df700', '#37fb00', '#00ff00',
        '#00fd28', '#00fa3c', '#00f84d', '#00f55d', '#00f26b',
        '#00ef79', '#00eb87', '#00e895', '#00e4a3', '#00e1b0',
        '#00ddbe', '#00d9cb', '#00d5d8', '#00d1e5', '#00cdf2',
        '#00c9fe', '#00c5ff', '#00c1ff', '#00bcff', '#00b8ff',
        '#00b3ff', '#00afff', '#00aaff', '#00a5ff', '#00a0ff',
        '#009bff', '#0095ff', '#008fff', '#0089ff', '#0082ff',
        '#007bff', '#0073ff', '#006aff', '#0061ff', '#0056ff',
        '#004aff', '#003cff', '#0029ff', '#0000ff', '#4400fa',
        '#6000f4', '#7400ee', '#8500e8', '#9300e2', '#a000dc',
        '#ab00d5', '#b500ce', '#bf00c8', '#c700c1', '#cf00ba',
        '#d600b3', '#dc00ac', '#e200a6', '#e8009f', '#ed0098',
        '#f10091', '#f5008a', '#f90084', '#fc007d', '#ff0077',
        '#ff0070', '#ff006a', '#ff0064', '#ff005e', '#ff0058',
        '#ff0052', '#ff004c', '#ff0046', '#ff0040', '#ff003b',
        '#ff0035', '#ff002f', '#ff002a', '#ff0023', '#ff001d',
        '#ff0015', '#ff000c'
    ];    
    setInterval(() => {
        if (!JSON.parse(localStorage.options).chroma) return;
        updateColor(colors[0]);
        colors.push(colors.shift());
    }, 38)

    document.getElementById('darkMode').checked = JSON.parse(localStorage.options).darkMode;
    document.getElementById('chroma').checked = JSON.parse(localStorage.options).chroma;
    if (JSON.parse(localStorage.options).darkMode) {
        document.getElementById('theme').href = 'css/dark.css';
    } else document.getElementById('theme').href = 'css/light.css';

    document.getElementById('colorSetting').value = JSON.parse(localStorage.options).color;
    updateColor(document.getElementById('colorSetting').value, false)

    document.getElementById('darkMode').addEventListener('click', async () => {
        options = JSON.parse(localStorage.options ? localStorage.options : '{}');
        options.darkMode = document.querySelector("#darkMode").checked
        localStorage.options = JSON.stringify(options);
        if (JSON.parse(localStorage.options).darkMode) document.getElementById('theme').href = 'css/dark.css';
        else document.getElementById('theme').href = 'css/light.css';
    })

    document.getElementById('chroma').addEventListener('click', async () => {
        options = JSON.parse(localStorage.options ? localStorage.options : '{}');
        options.chroma = document.querySelector("#chroma").checked
        localStorage.options = JSON.stringify(options);
        if (!options.chroma) updateColor(document.getElementById('colorSetting').value);
    })

    document.getElementById('colorSetting').addEventListener('change', () => {
        updateColor(document.getElementById('colorSetting').value, false)
    })

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
async function updateColor(hex, chroma = true) {
    options = JSON.parse(localStorage.options);
    let color = hex
    options.color = color;
    if (!chroma) localStorage.options = JSON.stringify(options)

    if (document.getElementById('color')) document.getElementById('color').remove();
    let script = `button:hover { border: 2px solid #0bc3d0; color: #0bc3d0; } input:hover { border: 2px solid #0bc3d0; color: #0bc3d0; } .detailText:hover { color: #0bc3d0; } .color:hover { border: 2px solid #0bc3d0; }`.replace(/#0bc3d0/g, hex);
    let element = document.createElement("style");
    element.innerHTML = script;
    element.id = "color";
    document.head.append(element);
}
