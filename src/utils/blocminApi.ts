import axios from 'axios'

export const blocminApi = axios.create({
  baseURL: 'https://app.blocmin.com/api',
  //baseURL: 'http://localhost:9001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fileURL = 'https://app.blocmin.com/imagenes?imagen=https://rotux.s3.amazonaws.com/'
