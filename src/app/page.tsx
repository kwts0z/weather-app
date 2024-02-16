'use client'

import { useState } from "react";
import Board, { BoardProps } from "./components/weatherBoard";
import search from "../assets/search.svg"
import Image from 'next/image';

const axios = require('axios').default;

export default function Home() {
  const [props, setProps] = useState<BoardProps>({name: "", temp: 0, humid: 0, wind: 0, icon: ""});
  const [place, setPlace] = useState("");
  const [imgURL, setImgURL] = useState("/weather/sunny.png");
  const [position, setPosition] = useState({
    lat: 0,
    lon: 0
  });

  const codeImage = new Map([
    ["01d", "/weather/sunny.png"],
    ["01n", "/weather/sunny.png"],
    ["02d", "/weather/clouds.png"],
    ["02n", "/weather/clouds.png"],
    ["03d", "/weather/clouds.png"],
    ["03n", "/weather/clouds.png"],
    ["04d", "/weather/clouds.png"],
    ["04n", "/weather/clouds.png"],
    ["09d", "/weather/drizzle.png"],
    ["10d", "/weather/rain.png"],
    ["11d", "/weather/thunderstorm.png"],
    ["13d", "/weather/snow.png"],
    ["50d", "/weather/mist.png"],
    ["50n", "/weather/mist.png"]
  ]);

  const handleClick = async () => {
    if(place != ""){
      const response = await axios.get('/api/get-weather', {params: {place: place}});
      setProps({
        name: response.data.name,
        temp: response.data.main.temp,
        humid: response.data.main.humidity,
        wind: response.data.wind.speed,
        icon: "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
      });
      setImgURL(`${codeImage.get(response.data.weather[0].icon)}`);
    }else {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
        const response = await axios.get('/api/get-weather', {params: {
          lat: position.lat,
          lon: position.lon
        }});
        setProps({
          name: response.data.name,
          temp: response.data.main.temp,
          humid: response.data.main.humidity,
          wind: response.data.wind.speed,
          icon: "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
        });
        setImgURL(`${codeImage.get(response.data.weather[0].icon)}`);
        console.log(position);
      } else {
        console.error('Geolocation is not supported by this browser');
      }
    }
  }
  return (
    <main className={`flex flex-col min-h-screen max-h-screen w-full items-center justify-center space-y-20 text-white bg-no-repeat bg-center bg-contain`} style={{ backgroundImage: `url('${imgURL}')` }}>
      <div className="flex flex-row space-x-5 items-center justify-center">
        <input className="bg-transparent backdrop-blur-2xl rounded-full border-b border-gray-300 focus:outline-none text-center" placeholder="Country/City/postal" onChange={(e) => setPlace(e.target.value)}></input>
        <div className="bg-transparent backdrop-blur-2xl rounded-full hover:cursor-pointer hover:backdrop-blur-0 active:bg-white active:bg-opacity-5 p-2 border-b border-gray-300">
          <Image src={search} alt="search" onClick={handleClick}/>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <Board {...props}/>
      </div>
    </main>
  )
}