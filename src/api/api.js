export const getCityLatLong = async (cityName) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=82cd1f4afab6298eabe1fbcc4e0a2a5e`
    );
    const data = await res.json();
    const long = data[0].lon;
    const lat = data[0].lat;
    return { lat, long };
  } catch (e) {
    console.log('somthing going wrong', e);
  }
};

export const getCurrentWeather = async (lat, long) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=82cd1f4afab6298eabe1fbcc4e0a2a5e&units=metric`
    );
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (e) {
    console.log('somthing going wrong', e);
  }
};
//`http://api.openweathermap.org/data/2.5/forecast/?id=524901&lat=${lat}&lon=${long}&cnt=7&appid=82cd1f4afab6298eabe1fbcc4e0a2a5e&units=metric`
export const getForecastForWholeDay = async (lat, long) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/?id=524901&lat=${lat}&lon=${long}&cnt=8&appid=82cd1f4afab6298eabe1fbcc4e0a2a5e&units=metric`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('somthing going wrong', e);
  }
};
