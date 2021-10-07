import { CssBaseline, Grid } from '@material-ui/core';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import List from './components/List'
import { useEffect, useState } from 'react';
import { getPlacesData } from './api/index'

function App() {

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })

  }, [])

  useEffect(() => {
    const filterdPlaces = places.filter((place) => Number(place?.rating) > rating)
    setFilteredPlaces(filterdPlaces)
  }, [rating])

  useEffect(() => {
    // console.log('coordinates bounds', coordinates, bounds)
    setIsLoading(true)
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      // console.log(data)
      setPlaces(data);
      setFilteredPlaces([])
      setRating('')
      setIsLoading(false)
    })


  }, [type, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>

    </>
  );
}

export default App;
