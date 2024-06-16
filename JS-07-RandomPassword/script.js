const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvqxuz";
const numSet = "0123456789"
const symbolSet = "`~!@#$%^&*()_+[]{}?><.,/|";

const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random()* dataSet.length)]
}

// selectors
const totalChar = document.getElementById("total-char");
const upperInput = document.getElementById("upper-case");
const lowerInput = document.getElementById("lower-case");
const numInput = document.getElementById("numbers");
const symbolInput = document.getElementById("symbols");
const passBox = document.getElementById("pass-box");

const generate = document.getElementById("btn");
generate.addEventListener("click", function() {
    passGenerator();
})

const passGenerator = (passWord = "") => {
    if (upperInput.checked) {
        passWord += getRandomData(upperSet);
    }
    if (lowerInput.checked) {
        passWord += getRandomData(lowerSet);
    }
    if (numInput.checked) {
        passWord += getRandomData(numSet);
    }
    if (symbolInput.checked) {
        passWord += getRandomData(symbolSet);
    }

    if (passWord.length < totalChar.value) {
        return passGenerator(passWord);
    }

    passBox.innerText = truncateString (passWord, totalChar.value);
}

function truncateString (str, num) {
    if (str.length > num) {
        let subStr = str.substring (0, num);
        return subStr;
    } else {
        return str;
    }
}