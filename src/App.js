import { CssBaseline, Grid } from '@material-ui/core';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import List from './components/List'
import { useEffect, useState } from 'react';
import { getPlacesData } from './api/index'

function App() {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })

  }, [])

  useEffect(() => {
    // console.log('coordinates bounds', coordinates, bounds)

    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      console.log(data)
      setPlaces(data)
    })


  }, [bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            setBounds={setBounds}

          />
        </Grid>
      </Grid>

    </>
  );
}

export default App;
