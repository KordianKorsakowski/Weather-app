import { Link } from 'react-router-dom';

import Search from './Search';
import classes from './mainHeader.module.css';

const MainHeader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <p>WeatherApp</p>
      </div>
      <div className={classes.samllContainer}>
        <p>
          <Link to='/cities'>Saved City</Link>
        </p>

        <Search />
      </div>
    </div>
  );
};
export default MainHeader;
