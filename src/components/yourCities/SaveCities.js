import { useSelector } from 'react-redux';

import SaveCity from './SaveCity';
import classes from './saveCities.module.css';

const SaveCities = () => {
  let show = false;
  const data = useSelector((state) => state.weather.cities);
  if (data.length !== 0) {
    show = true;
  }
  return (
    <>
      {!show && (
        <div className={classes.info}>
          <p>WeatherApp</p>
        </div>
      )}
      {show && (
        <div className={classes.list}>
          {data.map((city) => (
            <SaveCity
              key={city.id}
              cityInfo={{
                city: city.city,
                temp: city.temp,
                icon: city.icon,
                lat: city.lat,
                long: city.long,
                id: city.id,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SaveCities;
