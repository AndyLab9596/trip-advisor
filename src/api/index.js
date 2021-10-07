import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";


export const getPlacesData = async (sw, ne) => {
    try {
        // request
        const { data: { data } } = await axios.get(URL, {

            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,

            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': 'fd900c448emsh6aeee24e13313ddp13d371jsnc731906c6158'
            }
        })
        return data;
    } catch (error) {
        console.log(error)
    }
}




