// get key from this link: https://developer.accuweather.com/user/me/apps
const key = 'eAhfBJXjU0mEAKpXncKPOHEgHnYgx1ah';

// get hour weather forecast information
const getHourWeather = async(cityID, index) => {
    const link = `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/` + `${cityID}?apikey=${key}&details=true&metric=true`;
    const response = await fetch(link);
    const data = await response.json();
    return data[index];
};

// get day weather forecast information
const getDayWeather = async(cityID) => {
    const link = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/` + `${cityID}?apikey=${key}&details=true&metric=true`;
    const response = await fetch(link);
    const data = await response.json();
    return data;
};

// get current weather information
const getWeather = async(cityID) => {
    const link = 'https://dataservice.accuweather.com/currentconditions/v1/' + `${cityID}?apikey=${key}&details=true`;
    const response = await fetch(link);
    const data = await response.json();
    return data[0];
};

// get City Info
const getCity = async(cityName) => {
    const link = 'https://dataservice.accuweather.com/locations/v1/cities/search' + `?apikey=${key}&q=${cityName}`;
    const response = await fetch(link);
    const data = await response.json();
    return data[0];
};