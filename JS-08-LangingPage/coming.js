const targetDate = new Date ("June 21, 2024 00:00:00").getTime();

const x = setInterval (() => {
    let currTime = new Date().getTime();
    const remainingTime = targetDate - currTime;

    const days = Math.floor (remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor ((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor ((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor ((remainingTime % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (remainingTime < 0)
    {
        clearInterval (currTime);

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }

},1000)