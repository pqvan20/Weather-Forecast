const cityForm = document.querySelector('.inputForm');
const output = document.querySelector('.output');
var aNum = 4;

function right() {
    if (aNum < 11) {
        aNum++;
        var aSmallerNum = aNum - 5;
        document.getElementById(`hourTable${aNum}`).style.display = "inline-block";
        document.getElementById(`hourTable${aSmallerNum}`).style.display = "none";
    }
}

function left() {
    if (aNum >= 5) {
        var aSmallerNum = aNum - 5;
        document.getElementById(`hourTable${aNum}`).style.display = "none";
        document.getElementById(`hourTable${aSmallerNum}`).style.display = "inline-block";
        aNum--;
    }
}

const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;
    let date = `${weather.LocalObservationDateTime}`;
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    let minute = date.substring(14, 16);
    let hourCurrent = date.substring(11, 13);
    let amOrPm;
    if (hourCurrent >= 12 && hourCurrent < 24) {
        amOrPm = "PM";
    } else
        amOrPm = "AM";

    if (hourCurrent > 12) {
        hourCurrent = hourCurrent - 12;
    }
    var num1 = 1;

    output.innerHTML = `    
    <div class="containner">
        <div class="vanWeather">
            <span class="van">VAN</span>
            <span class="weather">Weather</span>
            <img src="images/flag.png" class="vietnamFlag">
        </div>
        <div class="currentWeather">
            <div class="place">${cityDets.EnglishName}</div>
            <div>Today ${day}/${month}/${year} ${hourCurrent}:${minute} ${amOrPm}</div>
            <img class="image" src="images/${weather.WeatherIcon}.svg">
            <span class="num">${weather.Temperature.Metric.Value}</span> <span class="degreeC">°C</span>
            <span class="weatherText">${weather.WeatherText}</span>
        </div>
        <br>
        <div class="center1">
            <div class="row1">
                <table class="currentWeatherInfo">
                    <tr>
                        <td>UV index<img src="images/sun.svg" class="smallIcon"></td>
                    </tr>
                    <tr>
                        <td>${weather.UVIndex} - ${weather.UVIndexText}</td>
                    </tr>
                </table>

                <table class="currentWeatherInfo">
                    <tr>
                        <td>Wind<img src="images/wind.png" class="smallIcon"></td>
                    </tr>
                    <tr>
                        <td>${weather.Wind.Speed.Metric.Value}km/h</td>
                    </tr>
                </table>
                <table class="currentWeatherInfo">
                    <tr>
                        <td>Humidity<img src="images/waterdrop.png" class="smallHumidityIcon"></td>
                    </tr>
                    <tr>
                        <td>${weather.RelativeHumidity}%</td>
                    </tr>
                </table>
            </div>

            <div class="row2">
                <table class="currentWeatherInfo">
                    <tr>
                        <td>Dew Point<img src="images/dewPoint.png" class="smallDewPointIcon"></td>
                    </tr>
                    <tr>
                        <td>${weather.DewPoint.Metric.Value}°C</td>
                    </tr>
                </table>

                <table class="currentWeatherInfo">
                    <tr>
                        <td>Cloud Cover<img src="images/cloudCover.svg" class="smallIcon"></td>
                    </tr>
                    <tr>
                        <td>${weather.CloudCover}%</td>
                    </tr>
                </table>

                <table class="currentWeatherInfo">
                    <tr>
                        <td>Visibility<img src="images/visibility.png" class="smallIcon"></td>
                    </tr>
                    <tr>
                        <td>${weather.Visibility.Metric.Value}km</td>
                    </tr>
                </table>
            </div>
            ${data.hourText2}
            ${data.dayText2}
        </div>
    </div>
`
};

const updateCity = async(city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    let dayText = "";
    for (let i = 0; i < 5; i++) {
        const dayWeather = await getDayWeather(cityDets.Key);
        let date = `${dayWeather.DailyForecasts[i].Date}`;
        let day = date.substring(8, 10);
        let monthNow = date.substring(6, 7);
        let monthNowString;
        if (monthNow == 1) {
            monthNowString = "Jan";
        } else if (monthNow == 2) {
            monthNowString = "Feb";
        } else if (monthNow == 3) {
            monthNowString = "Mar";
        } else if (monthNow == 4) {
            monthNowString = "Apr";
        } else if (monthNow == 5) {
            monthNowString = "May";
        } else if (monthNow == 6) {
            monthNowString = "Jun";
        } else if (monthNow == 7) {
            monthNowString = "Jul";
        } else if (monthNow == 8) {
            monthNowString = "Aug";
        } else if (monthNow == 9) {
            monthNowString = "Sep";
        } else if (monthNow == 10) {
            monthNowString = "Oct";
        } else if (monthNow == 11) {
            monthNowString = "Nov";
        } else if (monthNow == 12) {
            monthNowString = "Dec";
        }

        let dayAndMonth = day + " " + monthNowString;
        var minTemperature = `${dayWeather.DailyForecasts[i].Temperature.Minimum.Value}`
        var subMinTemperature = minTemperature.substring(0, 2);
        var maxTemperature = `${dayWeather.DailyForecasts[i].Temperature.Maximum.Value}`
        var subMaxTemperature = maxTemperature.substring(0, 2);

        dayText = dayText +
            ` 
    <table class="hourDayTable">
        <tr>
            <td>${dayAndMonth}</td>
        </tr>
        <tr>
            <td><img class="hourDayIcon" src="images/${dayWeather.DailyForecasts[i].Day.Icon}.svg"></td>
        </tr>
        <tr>
            <td class="twoTem">${subMinTemperature}°-${subMaxTemperature}°</td>
        </tr>
    </table>
    `;
    }
    let dayText2 = `<div class="hourDaySection marginBottom"><div class="hourDayBorder">` + dayText + `</div></div>`

    let hourText = "";
    for (let i = 0; i < 12; i++) {
        const hourWeather = await getHourWeather(cityDets.Key, i);
        let hour = hourWeather.DateTime.substring(11, 16);
        hourText = hourText +
            ` 
    <table class="hourDayTable" id="hourTable${i}">
        <tr>
            <td>${hour}</td>
        </tr>
        <tr>
            <td><img class="hourDayIcon" src="images/${hourWeather.WeatherIcon}.svg"></td>
        </tr>
        <tr>
            <td>${hourWeather.Temperature.Value}°</td>
        </tr>
    </table>
    `;
    }
    let hourText2 = `
    <div class="hourDaySection">    
    <table class="hourDayTable">
        <tr>
            <td style="color:#7d6aa0">.</td>
        </tr>
        <tr>
            <td><img src="images/left.png" type="button" class="left" onClick="left()"></td>
        </tr>
        <tr>
            <td style="color:#7d6aa0">.</td>
        </tr>
    </table>
    <div class="hourDayBorder">` + hourText + `</div>    
    <table class="hourDayTable">
        <tr>
            <td style="color:#7d6aa0">.</td>
        </tr>
        <tr>
            <td><img src="images/right.png" type="button" class="right"  onClick="right()"></td>
        </tr>
        <tr>
            <td style="color:#7d6aa0">.</td>
        </tr>
    </table>
    </div>`

    // return {
    //     cityDets: cityDets,
    //     weather: weather
    // };
    return {
        cityDets,
        weather,
        dayText2,
        hourText2
    };
}

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});