import { useSelector } from 'react-redux';
import classes from './city.module.css';

const City = () => {
  const wetherData = useSelector((state) => state.weather.data);
  const sunrise = new Date(wetherData.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(wetherData.sunset * 1000).toLocaleTimeString();
  return (
    <div className={classes.container}>
      <div className={classes.containerSmall}>
        <h1 className={classes.title}>{wetherData.city}</h1>
        <p className={classes.weather}>{wetherData.description}</p>
      </div>
      <img
        src={`http://openweathermap.org/img/wn/${wetherData.icon}@2x.png`}
        alt='new'
        className={classes.icon}
      />
      <div className={classes.containerSmall}>
        <p className={classes.temp}>{Math.round(wetherData.temp)}°C</p>
        <p className={classes.pressure}>💨 {wetherData.wind} km/h</p>
        <p className={classes.pressure}>{wetherData.pressure} hPa</p>
      </div>
      <div className={classes.sunContainer}>
        <p className={classes.suntime}>☀️ {sunrise}</p>
        <p className={classes.suntime}>🌑 {sunset}</p>
      </div>
    </div>
  );
};

export default City;
