import React from "react";

const WeatherInfo = ({ weatherInfo, cityName }) => {
    if (!cityName == "") {
        return (
            <div className="card card-body my-4">
                <h1 className="card-title">{cityName}</h1>
                <div className="card-content">
                <h4>Temperature: {Math.round(weatherInfo.main.temp)}°</h4>
                <h4>
                    Min/Max Today: {Math.round(weatherInfo.main.temp_min)}° /{" "}
                    {Math.round(weatherInfo.main.temp_max)}°
                </h4>
                <h4>Humidity: {weatherInfo.main.humidity}%</h4>
                </div>
            </div>
        );
    }
};

export default WeatherInfo;
