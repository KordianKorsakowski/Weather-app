import { createSlice } from '@reduxjs/toolkit';
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    coords: {},
    data: {},
    forcast: [],
    cities: [],
  },
  reducers: {
    setCoords(state, action) {
      state.coords = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setForcast(state, action) {
      const list = action.payload.list;
      state.forcast = [];
      list.forEach((el) => {
        state.forcast.push({ dt: el.dt, temp: el.main.temp, icon: el.weather[0].icon });
      });
    },
    saveCity(state, action) {
      const existingCity = state.cities.find((city) => city.city === action.payload.city);
      if (!existingCity) {
        state.cities = [...state.cities, action.payload];
        localStorage.setItem('weatherLocalSotrage', JSON.stringify(state.cities));
      }
    },
    saveCityLS(state, action) {
      state.cities = action.payload.array;
    },
    deleteCity(state, action) {
      const id = action.payload;
      state.cities = state.cities.filter((city) => city.id !== id);
      localStorage.removeItem('weatherLocalSotrage');
      localStorage.setItem('weatherLocalSotrage', JSON.stringify(state.cities));
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice;
