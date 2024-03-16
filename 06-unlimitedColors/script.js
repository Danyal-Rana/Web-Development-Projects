const randomColor = function () {
    const hex = "0123456789ABCDEF";

    let color = "#";

    for (let i=1; i<7; i++) {
        color += hex[Math.floor(Math.random()*16)];
    }

    return color;
};

let myInterval;

const startChangingColor = function () {

    if (! myInterval) {
        myInterval = setInterval (changeBgColor, 1000);
    }

    function changeBgColor () {
        document.body.style.backgroundColor = randomColor();
    }
};
const stopChangingColor = function () {
    clearInterval(myInterval);
    myInterval = null;
};

document.querySelector('#start').addEventListener ('click', startChangingColor);
document.querySelector("#stop").addEventListener ("click", stopChangingColor);