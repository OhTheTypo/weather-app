import React, { useState, useEffect } from "react";
const APIKEY = process.env.REACT_APP_APIKEY;

function Forecast(props) {
    const [forecast, setForecast] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let endpoint;
        if (typeof props.params.location === "string") {
            endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${props.params.location}&units=${props.params.unit}&appid=${APIKEY}`;
        } else {
            endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.params.location.lat}&lon=${props.params.location.lon}&units=${props.params.unit}&appid=${APIKEY}`;
        }

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === "200") {
                    setHasError(false);
                    setForecast(data.list);
                } else {
                    setHasError(true);
                }
            });
    }, [props.params.location, props.params.unit, props.error]);

    const forecastElements = forecast
        .filter((elem) => elem["dt_txt"].includes("12:00:00"))
        .map((elem) => {
            const day = String(new Date(elem["dt_txt"])).substring(0, 4);
            return (
                <section key={day}>
                    <p className="day">{day}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}
                        alt="weather-icon"
                    />
                    <p>{elem.weather[0].description}</p>
                    <p className="forecast-temp">
                        {elem.main.temp.toFixed()}{" "}
                        {props.displayUnit(props.params.unit)}
                    </p>
                </section>
            );
        });

    if (hasError) {
        return null;
    } else {
        return <div className="forecast">{forecastElements}</div>;
    }
}

export default Forecast;
