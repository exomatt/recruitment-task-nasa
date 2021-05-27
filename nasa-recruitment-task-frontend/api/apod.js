import {Urls} from "./constants/api";
import axios from 'axios'

export const getApod= async(date) => {
  return await axios.get(`${Urls.BASE_URL}/apod`,{
    params:{
      date: date
    }
  })
    .then(result => {
      return result.data
    })
    .catch(error => {
      console.log("Error at getting apod");
    })
}
