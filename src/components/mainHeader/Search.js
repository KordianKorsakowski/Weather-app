import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './search.module.css';

const Search = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const cityChanegeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/cities/${city}`);
    setCity('');
  };

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input placeholder='city...' value={city} type='text' onChange={cityChanegeHandler} />
      <button className={classes.btn}>🔎</button>
    </form>
  );
};

export default Search;
