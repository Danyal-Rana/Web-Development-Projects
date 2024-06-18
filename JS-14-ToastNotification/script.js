let toastBox = document.getElementById('toastBox');
let successMsg = ' <i class="fa-solid fa-circle-check"></i> Successfully Submitted.';
let errorMsg = ' <i class="fa-solid fa-circle-xmark"></i> Please fix the error!';
let invalidMsg = ' <i class="fa-solid fa-circle-exclamation"></i> Invalid input, check again.';

function showToast(msg) {
    let myToast = document.createElement('div');
    myToast.classList.add('toast');
    myToast.innerHTML = msg;

    toastBox.appendChild(myToast);

    if (msg.includes('error')) {
        myToast.classList.add('error');
    } else if (msg.includes('Invalid')) {
        myToast.classList.add('invalid');
    }

    setTimeout(() => {
        myToast.remove();        
    }, 5000);
}