//DOM elements 
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

//Copy to clipboard

clipboardEl.addEventListener('click', ()=>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
})

const randomFunctions = {
    lower : getRandomLower,
    upper : getRandomUpper,
    symbol : getRandomSymbols,
    number : getRandomNumber
}



//generate event listener
generateEl.addEventListener('click', ()=> {
    const length =  +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
})


//generate password function

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = '';
    const itemsCount = lower + upper + number + symbol;
    const itemsArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );

    console.log(itemsArr);
    if (itemsCount === 0){
        return '';
    }

    for (let i = 0; i < length; i += itemsCount){
        itemsArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            //console.log(funcName)
            
            generatedPassword += randomFunctions[funcName]();
        });
    }
    const finalPwd = generatedPassword.slice(0, length);
    return finalPwd;
}



// Generator functions - http://www.net-comber.com/charset.html

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}


function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}


function getRandomSymbols(){
    const symbols = "!@#&^*$(){}[]/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}
