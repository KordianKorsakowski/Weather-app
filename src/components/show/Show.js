import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { weatherActions } from '../../store/weather-slice';
import { getCityLatLong, getCurrentWeather, getForecastForWholeDay } from '../../api/api';
import City from '../city/City';
import Days from '../forcast24h/hours';
import classes from './show.module.css';

const Show = () => {
  const parms = useParams();
  const { cityName } = parms;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.weather.data);
  const coords = useSelector((state) => state.weather.coords);

  useEffect(() => {
    const getAllInfo = async () => {
      const latLongObj = await getCityLatLong(cityName);
      dispatch(weatherActions.setCoords(latLongObj));
      const data = await getCurrentWeather(latLongObj.lat, latLongObj.long);
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
      const forcast = await getForecastForWholeDay(latLongObj.lat, latLongObj.long);
      dispatch(
        weatherActions.setForcast({
          list: forcast.list,
        })
      );
    };
    getAllInfo();
  }, [dispatch, cityName]);

  const saveHandler = (e) => {
    e.preventDefault();
    console.log(cityName);
    navigate('/cities');
    console.log(coords);
    dispatch(
      weatherActions.saveCity({
        city: data.city,
        temp: data.temp,
        icon: data.icon,
        lat: coords.lat,
        long: coords.long,
        id: uuidv4(),
      })
    );
  };
  return (
    <div className={classes.container}>
      <City />
      <Days />
      <button className={classes.btn} onClick={saveHandler}>
        +
      </button>
    </div>
  );
};

export default Show;
