var container2 = document.getElementsByClassName("container2")[0];
var container3 = document.getElementsByClassName("container3")[0];
var checkIcon = document.getElementById("check-icon");
var xIcon = document.getElementById("x-icon");

var i = 0;

xIcon.addEventListener("click", ()=>{
    typeNote();
})
checkIcon.addEventListener("click", ()=>{
    createNote();
})

const typeNote = () => {
    if (container3.style.display == 'none') {
        container3.style.display = 'block';
    } else {
        container3.style.display = 'none';
    }
}

const createNote = () => {
    var noteText = document.getElementById('note-text').value;
    var myCard = document.createElement("div");
    var myCardText = document.createElement("h1");
    
    myCardText.innerHTML = noteText;

    myCardText.setAttribute("style", "width:250px; height:250px; font-size:26px; padding:25px; margin-top:10px; overflow:hidden; box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.75)");

    myCardText.style.margin = margin();
    myCardText.style.transform = rotate();
    myCardText.style.background = color();

    myCard.appendChild(myCardText);

    container2.insertAdjacentElement('beforeend', myCard);

    myCard.addEventListener('mouseenter', ()=>{
        myCard.style.transform = "scale(1.1)";
    })
    myCard.addEventListener('mouseleave', ()=> {
        myCard.style.transform = "scale(1)";
    })
    myCard.addEventListener('dblclick', ()=> {
        myCard.remove();
    })

    document.getElementById('note-text').value = '';
}

const margin = () => {
    var random_margin = ["-5px", "1px", "5px", "10px", "7px"];

    return random_margin[Math.floor(Math.random()*random_margin.length)];
}

const rotate = () => {
    var random_rotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];

    return random_rotate[Math.floor(Math.random()*random_rotate.length)];
}

const color = () => {
    var random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];

    if (i > random_colors.length-1) {
        i = 0;
    }

    return random_colors[i++];
}