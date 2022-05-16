import { format } from 'date-fns';
import classes from './hour.module.css';

const Day = (props) => {
  const info = props.el;
  const time = format(new Date(info.date * 1000), 'HH:mm');
  return (
    <li className={classes.container}>
      <h3 className={classes.time}>{time}</h3>
      <div className={classes.smallContainer}>
        <img
          src={`http://openweathermap.org/img/wn/${info.icon}@2x.png`}
          alt='new'
          className={classes.icon}
        />
        <p className={classes.temp}>{Math.round(info.temp)}°C</p>
      </div>
    </li>
  );
};

export default Day;
