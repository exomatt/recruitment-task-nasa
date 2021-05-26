import {Urls} from "./constants/api";
import axios from 'axios'

export const getWeather= async(date) => {
  return await axios.get(`${Urls.BASE_URL}/weather`,{
    params:{
      date: date
    }
  })
    .then(result => {
      console.log(result)
      return result.data
    })
    .catch(error => {
      console.log("Error at getting countries");
    })
}
