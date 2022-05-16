import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Day from './hour';

import classes from './hours.module.css';
const Days = () => {
  const list = useSelector((state) => state.weather.forcast);
  return (
    <ul className={classes.list}>
      {list.map((item) => (
        <Day
          key={uuidv4()}
          el={{
            date: item.dt,
            temp: item.temp,
            icon: item.icon,
          }}
        />
      ))}
    </ul>
  );
};
export default Days;
