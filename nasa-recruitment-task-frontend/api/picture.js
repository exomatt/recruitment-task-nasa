import {Urls} from "./constants/api";
import axios from 'axios'

export const getCameraNames= async() => {
  return await axios.get(`${Urls.BASE_URL}/picture/cameraNames`)
    .then(result => {
      return result.data
    })
    .catch(error => {
      console.log("Error at getting camera name values");
    })
}

export const getRoverNames= async() => {
  return await axios.get(`${Urls.BASE_URL}/picture/roverNames`)
    .then(result => {
      return result.data
    })
    .catch(error => {
      console.log("Error at getting rover name values");
    })
}

export const getPictures= async(pictureFilters) => {
  return await axios.get(`${Urls.BASE_URL}/picture`,{
    params:{
      ...pictureFilters
    }
  })
    .then(result => {
      return result.data
    })
    .catch(error => {
      console.log("Error at getting rover name values");
    })
}
