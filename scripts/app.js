//this side is for DOM manipulation
const cityForm = document.querySelector('form'); // get the form/inputfield where we type the city in

//Where we want to display info
const card = document.querySelector('.card');
const details = document.querySelector('.details');

//images & icons
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

//
const forecast = new Forecast();


const updateUI = (data) => {
    console.log(data);
    //deconstructure properties
    const {cityDets, weather} = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //Update day & night and icon images
    const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    let timeSrc = weather.IsDayTime ? './img/day.svg' : './img/night.svg';
    time.setAttribute('src', timeSrc);



    //Remove the d-none class to display the info, if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

//add eventlistener to the form
cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //Get the city value the user types in
    //.city is the inputfield (name tag is city)
    const city = cityForm.city.value.trim();

    //clear the form
    cityForm.reset();

    //Update the ui with the new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
}
