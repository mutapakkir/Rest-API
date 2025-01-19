require('dotenv').config()//mengimport dotenv
const axios = require('axios')//mengimport axios
//fungsi untuk membuat instance axios
const weatherAPI = axios.create({
    baseURL: "https://www.weatherapi.com/v1",//base url dari weather api
    headers:{
        Accept:'aplication/json',//header untuk menerima data dalam bentuk json
        Authorization : `Bearer${process.env.WEATHER_BEARER}`//header untuk mengirim token
    }
})

module.exports = weatherAPI