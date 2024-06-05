let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (valueSearch) {
        checkWeather();
    }
})

let id = '1488641a1d241a8ad90eee95d4410a0d';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;

const checkWeather = () => {
    fetch (url + '&q=' + valueSearch.value)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if (data.cod == 200) {
            city.querySelector('figcaption').innerText = data.name;
            city.querySelector('img').src = 'https://flagsapi.com/'+data.sys.country+'/flat/32.png';

            temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'.png';
            temperature.querySelector('figcaption span').innerText = data.weather[0].description;

            description.innerText = data.weather[0].description;
            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
        } else {
            main.classList.add('error');

            setTimeout(() => {
                main.classList.remove('error');                
            }, 1000);
        }

        valueSearch.value = '';
    })
}

const initApp = () => {
    valueSearch.value = 'Islamabad';
    checkWeather();
}

initApp();