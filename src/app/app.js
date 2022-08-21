import React, { useEffect, useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import WeatherForm from "./components/WeatherForm";
import { WEATHER_KEY } from "./keys";
import axios from "axios";
import MapView from "./components/MapView";

const App = () => {
    const [weatherInfo, setWeatherInfo] = useState({});
    const [cityName, setCityName] = useState("");
    const [ubication, setUbication ] = useState([]);
    const getWeather = async (id, city) => {
        setCityName(city);
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${WEATHER_KEY}&units=metric`;
        const response = await axios.get(API_URL);
        setUbication([response.data.coord.lat, response.data.coord.lon]);
        setWeatherInfo(response.data);
    };


    useEffect(() => {
        console.log(ubication)
    }, [weatherInfo, ubication]);
    return (
        <div className="container p-4">
            <h1 className="text-center my-4" >Weather Information Searcher</h1>
            <div className="d-flex row py-4 justify-content-center">
                <div className="col-md-6">
                    <WeatherForm getWeather={getWeather} />
                    {weatherInfo.id && (
                        <WeatherInfo
                            weatherInfo={weatherInfo}
                            cityName={cityName}
                        />
                    )}
                </div>
            </div>
            {
                ubication.length !== 0 &&
            <div className="d-flex justify-content-center">
                <MapView ubication={ubication}/>
            </div>
            }
        </div>
    );
};

export default App;
