import axios from "axios";
import React, { useState, useEffect } from "react";
const cityList = require("../city.list.json");
import { WEATHER_KEY } from "../keys";

const WeatherForm = ({ getWeather }) => {
    const [filter, setFilter] = useState("");
    const [filterCitiesShowed, setfilterShowedCities] = useState([]);
    const [cityId, setCityId] = useState(0);
    const [enableButton, setEnableButton] = useState(false);

    const filterCity = (e) => {
        setFilter(e.target.value);
        setEnableButton(false);
    };

    const handleLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (info) => {
                const { latitude, longitude } = info.coords;
                const API_LOCATION_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}`;
                axios
                    .get(API_LOCATION_URL)
                    .then((ubicacion) => {
                        setFilter(`Your location: ${ubicacion.data.name}`);
                        setCityId(ubicacion.data.id);
                        setEnableButton(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            (error) => {
                console.log(error);
            }
        );
    };

    useEffect(() => {
        if (filter.length > 2) {
            const filterCities = cityList.filter((c) =>
                c.name.toLowerCase().includes(filter.toLowerCase())
            );
            setfilterShowedCities(filterCities.splice(0, 5));
        } else {
            setfilterShowedCities([]);
        }
    }, [filter]);

    return (
        <div className="card card-body">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    getWeather(cityId, filter);
                    setFilter("");
                }}
                className="d-grid gap-3"
            >
                <div>
                    <div className="form-group input-group">
                        <input
                            onChange={filterCity}
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            data-bs-container="body"
                            data-bs-toggle="popover"
                            data-bs-placement="top"
                            data-bs-content="Top popover"
                            name="city"
                            placeholder="Type a city name"
                            value={filter}
                        />
                        <a
                            onClick={handleLocation}
                            className="btn btn-light fs-4"
                        >
                            📍
                        </a>
                    </div>
                    <ul className="list-group">
                        {filterCitiesShowed.map((city) => {
                            return (
                                <li
                                    role="button"
                                    className="list-group-item list-group-item-action"
                                    key={city.id}
                                    onClick={() => {
                                        setFilter(
                                            `${city.name}, ${city.country}`
                                        );
                                        setCityId(city.id);
                                        setEnableButton(true);
                                    }}
                                >
                                    {city.name} {city.country}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <button disabled={!enableButton} className="btn btn-success">
                    Get Weather
                </button>
            </form>
        </div>
    );
};

export default WeatherForm;
