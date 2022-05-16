import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { weatherActions } from '../../store/weather-slice';

import { getCurrentWeather, getForecastForWholeDay } from '../../api/api';

import classes from './saveCity.module.css';

const SaveCity = (props) => {
  const data = props.cityInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seeDetailsHandler = (e) => {
    e.preventDefault();
    navigate(`/cities/${data.city}`);
    console.log(data);
    const getAllInfo = async () => {
      const getInfoAboutSevedCity = await getCurrentWeather(data.lat, data.long);
      dispatch(
        weatherActions.setData({
          city: getInfoAboutSevedCity.name,
          temp: getInfoAboutSevedCity.main.temp,
          pressure: getInfoAboutSevedCity.main.pressure,
          weather: getInfoAboutSevedCity.weather[0].main,
          description: getInfoAboutSevedCity.weather[0].description,
          icon: getInfoAboutSevedCity.weather[0].icon,
          sunrise: getInfoAboutSevedCity.sys.sunrise,
          sunset: getInfoAboutSevedCity.sys.sunset,
          wind: getInfoAboutSevedCity.wind.speed,
        })
      );
      const getInfoAboutForcastSevedCity = await getForecastForWholeDay(data.lat, data.long);
      dispatch(
        weatherActions.setForcast({
          list: getInfoAboutForcastSevedCity.list,
        })
      );
    };
    getAllInfo();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(weatherActions.deleteCity(data.id));
    console.log('delete');
  };

  return (
    <div className={classes.card}>
      <div className={classes.container} onClick={seeDetailsHandler}>
        <h3 className={classes.city}>{data.city}</h3>
        <div className={classes.smallContainer}>
          <p className={classes.temp}>{Math.round(data.temp)}°C</p>
          <img
            src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt='new'
            className={classes.icon}
          />
        </div>
      </div>
      <button onClick={deleteHandler} className={classes.btn}>
        x
      </button>
    </div>
  );
};

export default SaveCity;
