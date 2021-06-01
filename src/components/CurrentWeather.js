import React, { useState, useEffect } from "react";
import Error from "./Error";
const APIKEY = process.env.REACT_APP_APIKEY;

function CurrentWeather(props) {
    const [city, setCity] = useState(props.params.location);
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [temp, setTemp] = useState("");
    const [feelsLike, setFeelsLike] = useState("");
    const [maxTemp, setMaxTemp] = useState("");
    const [minTemp, setMinTemp] = useState("");
    const [humidity, setHumidity] = useState("");
    const [wind, setWind] = useState("");
    const [error, setError] = useState(props.error);

    useEffect(() => {
        let endpoint;
        if (typeof props.params.location === "string") {
            endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${props.params.location}&units=${props.params.unit}&appid=${APIKEY}`;
        } else {
            endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${props.params.location.lat}&lon=${props.params.location.lon}&units=${props.params.unit}&appid=${APIKEY}`;
        }

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === 200) {
                    setError(null);
                    setCity(data.name);
                    setCountry(data.sys.country);
                    setDescription(data.weather[0].description);
                    setIcon(data.weather[0].icon);
                    setTemp(data.main.temp.toFixed());
                    setFeelsLike(data.main["feels_like"].toFixed());
                    setMaxTemp(data.main["temp_max"].toFixed());
                    setMinTemp(data.main["temp_min"].toFixed());
                    setHumidity(data.main.humidity);
                    setWind(data.wind.speed);
                } else {
                    setError(data.message);
                }
            });
    }, [props.params.location, props.params.unit]);

    if (error) {
        return <Error error={error} />;
    } else {
        return (
            <div className="current-weather">
                <div className="location">
                    <h1>
                        <i className="ri-map-pin-2-line"></i>
                        {city}
                    </h1>
                    <small>{country}</small>
                </div>
                <div className="weather-info">
                    <div className="weather-icon">
                        <img
                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt="weather-icon"
                        />
                        <p className="weather-description">{description}</p>
                    </div>
                    <div className="temp">
                        <p>
                            {temp} {props.displayUnit(props.params.unit)}
                        </p>
                        <small>
                            Feels like: {feelsLike}{" "}
                            {props.displayUnit(props.params.unit)}
                        </small>
                    </div>
                </div>
                <div className="weather-details">
                    <p>
                        <i className="ri-temp-hot-fill"></i>Max: {maxTemp}{" "}
                        {props.displayUnit(props.params.unit)}
                    </p>
                    <p>
                        <i className="ri-temp-cold-fill"></i>Min: {minTemp}{" "}
                        {props.displayUnit(props.params.unit)}
                    </p>
                    <p>
                        <i className="ri-drop-line"></i>Humidity: {humidity}%
                    </p>
                    <p>
                        <i className="ri-windy-line"></i>Wind: {wind}{" "}
                        {props.params.unit === "metric" ? "m/s" : "mph"}
                    </p>
                </div>
            </div>
        );
    }
}

export default CurrentWeather;
