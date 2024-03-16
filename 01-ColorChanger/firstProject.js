const myButtons = document.querySelectorAll(".button");
const documentBody = document.querySelector("body");

myButtons.forEach (function (iButton) {
    iButton.addEventListener('mouseover', function (iEvent) {
        
        if (iEvent.target.id === 'grey') {
            documentBody.style.backgroundColor = iEvent.target.id;
        }
        else if (iEvent.target.id === 'purple') {
            documentBody.style.backgroundColor = iEvent.target.id;
        }
        else if (iEvent.target.id === 'blue') {
            documentBody.style.backgroundColor = iEvent.target.id;
        }
        else if (iEvent.target.id === 'yellow') {
            documentBody.style.backgroundColor = iEvent.target.id;
        }

    } )
})