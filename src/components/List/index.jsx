import { FormControl, Grid, InputLabel, MenuItem, Select, Typography, CircularProgress } from '@material-ui/core';
import React, { useState, useEffect, createRef, Fragment } from 'react';
import PlaceDetails from '../PlaceDetails';

import useStyles from './style';
const List = ({ places, childClicked, isLoading }) => {
    const classes = useStyles();
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [elRefs, setElrefs] = useState([]);
    console.log(elRefs)

    useEffect(() => {
        setElrefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));

    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Restaurants, Hotels and Attractions around you
            </Typography>

            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />

                </div>
            ) : (
                <Fragment>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)} >
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)} >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>About 3.0</MenuItem>
                            <MenuItem value={4}>About 4.0</MenuItem>
                            <MenuItem value={4.5}>About 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, index) => (
                            <Grid ref={elRefs[index]} item key={index} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === index}
                                    refProp={elRefs[index]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Fragment>
            )}



        </div>
    );
};

export default List;