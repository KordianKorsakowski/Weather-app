import { Fragment, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Show from './components/show/Show';
import MainHeader from './components/mainHeader/MainHeader';
import SaveCities from './components/yourCities/SaveCities';
import { getCurrentWeather, getForecastForWholeDay } from './api/api';
import { weatherActions } from './store/weather-slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('weatherLocalSotrage'));
    console.log(getLocalStorage);
    if (getLocalStorage) {
      dispatch(weatherActions.saveCityLS({ array: getLocalStorage }));
    }
  }, [dispatch]);

  useEffect(() => {
    const getAllInfo = async () => {
      const data = await getCurrentWeather(52.2297, 21.0117);
      dispatch(
        weatherActions.setData({
          city: data.name,
          temp: data.main.temp,
          pressure: data.main.pressure,
          weather: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          wind: data.wind.speed,
        })
      );
    };
    const setForcast = async () => {
      const data = await getForecastForWholeDay(52.2297, 21.0117);
      dispatch(
        weatherActions.setForcast({
          list: data.list,
        })
      );
    };
    getAllInfo();
    setForcast();
  }, [dispatch]);

  return (
    <Fragment>
      <MainHeader />
      <Routes>
        <Route path='/cities' element={<SaveCities />} />
        <Route path='/cities/:cityName/*' element={<Show />} />
        <Route path='/' element={<Navigate to='/cities' replace />} />
      </Routes>
    </Fragment>
  );
}

export default App;
