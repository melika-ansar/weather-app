import { FaLocationDot } from 'react-icons/fa6';
import Input from '../../Shared/Inputs/Inputs';
import './../../index.css';
import Button from '../../Shared/Button/Button';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { weatherApi } from '../../services/weather/weather';

function Weather() {
  const [city, setCity] = useState(''); 
  const [weather, setWeather] = useState<any | null>(null); 
  const [error, setError] = useState<string | null>(null); 
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearch = async (city: string) => {
     try {
       setError(null);
       const weatherData = await
         weatherApi.getWeatherByCity(city);

       setWeather(weatherData);
       setCity('');
     } catch (err) {
       setError('City not found');
       setWeather(null);
     }
  };

  const handlesubmit =(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    handleSearch(city); 
  }

  const addHistory = (data: any) => {
    if (searchHistory.find(item => item.name === data.name)) {
      return; 
    }
    setSearchHistory([...searchHistory, data]); 
  };

  const removeHistory = (historyItem: any) => {
    setSearchHistory(
      searchHistory.filter(item => item.name !== historyItem.name) 
    );
  };

  return (
    <div className="background w-full h-screen flex justify-center items-center">
      <CiLogout
        onClick={handleLogout}
        className="absolute text-3xl top-4 right-12"
      />
      <div className="flex flex-col justify-start items-center gap-6 bg-white/50 inset-0 w-[85%] h-[40rem] rounded-3xl ">
        <form
          className="flex flex-col justify-center items-center gap-5"
          onSubmit={handlesubmit}
        >
          <p className="text-gray-600 mt-10 font-medium text-xl">
            Search your desired city:
          </p>
          <Input
            name={'search'}
            type={'search'}
            value={city}
            onChange={e => setCity(e.target.value)}
            className="w-80 h-10  rounded-lg bg-white/45 outline-none p-3 focus:outline-[2px] focus:outline-gray-300"
          />
          <Button
            className=" bg-blue-300 text-white h-10 w-24 rounded-lg active:scale-95"
            type="submit"
            children="search"
          />
          {error && (
            <div className="w-full">
              <div className="text-red-500 text-center mt-24 ">{error}</div>
            </div>
          )}
        </form>

        {weather && (
          <div className="w-96 h-52 flex flex-col gap-3 justify-center items-center rounded-lg bg-black/10 ">
            <div className="flex items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-24 h-24"
              />
              <div className="flex flex-col gap-1">
                <p className=" text-white font-light text-3xl">
                  {Math.round(weather.main.temp)}°C
                </p>
                <div className="flex">
                  <FaLocationDot className="text-white text-lg mt-1 " />
                  <p className="mt-[2px] font-thin text-white text-base">
                    {weather.name}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white">{weather.weather[0].description}</p>
            <Button
              onClick={() => addHistory(weather)}
              children="Add to history"
              className=" bg-black/15 p-2 mt-2 rounded-lg active:scale-95 text-white"
            />
          </div>
        )}

        {searchHistory.length > 0 && (
          <div className=" flex justify-center w-[50rem] mt-3 gap-5">
            {searchHistory.map(item => (
              <div className="grid grid-cols-1 justify-center items-center pt-2 justify-items-center w-28 h-42 rounded-lg bg-black/20 border border-2 border-black ">
                <Button
                  onClick={() => removeHistory(item)}
                  children="remove item"
                  className=" bg-black/20 p-2 text-xs rounded-lg active:scale-95 text-white"
                />
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="weather icon"
                  className="w-12 h-12"
                />
                <p className=" text-white font-light text-xl">
                  {item.main.temp}°C
                </p>
                <p className=" font-thin text-white text-base pb-2">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
