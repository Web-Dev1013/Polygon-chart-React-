
import Axios from 'axios'
import {BASE_URL, API_KEY} from '../src/keys'

export function searchTickers(searchString) {
    return new Promise((resolve,reject) => {
        Axios.get(`${BASE_URL}/v2/reference/tickers?search=${searchString}&apiKey=${API_KEY}`).then((res) => {
            resolve(res.data.tickers.map(({ ticker, name }) => ({ ticker, name })))
        }).catch((error) => {
            console.log(error.message || error)
            reject(error)
        })
    })
}

const symbolDetailsCache = {}

export async function  getDetailes(symbol) {
    if (!symbolDetailsCache[symbol]) {
        symbolDetailsCache[symbol] = await loadDetailes(symbol)
    }
    return symbolDetailsCache[symbol]
}

export function  loadDetailes(symbol) {
    return new Promise((resolve, reject) => {
        if (symbol) {
            Axios.get(`${BASE_URL}/v1/meta/symbols/${symbol}/company?apiKey=${API_KEY}`).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                console.log(error.message || error)
                reject(error)
            })
        }
      })
}
 export function getNews(symbol) {
     return new Promise((resolve, reject) => {
         if (symbol) {
            Axios.get(`${BASE_URL}/v1/meta/symbols/${symbol}/news?apiKey=${API_KEY}`).then((res) => {
                resolve(res.data)
                console.log("+++++++++++",resolve(res.data))
            }).catch((error) => {
                console.log(error.message || error)
                reject(error)
            })
         }
     })
 }

 const chartCache = {}

 export async function getChart(symbol) {
     if (!chartCache[symbol]) {
        chartCache[symbol] = await loadChart(symbol)
        console.log(`put ${symbol} data from cache...`)
     } else {
         console.log(`get ${symbol} data from cache...`)
     }
     return chartCache[symbol]
 }

 export function loadChart(symbol) {
    return new Promise((resolve, reject) => {
        if (symbol) {
           Axios.get(`${BASE_URL}/v1/meta/symbols/${symbol}/news?apiKey=${API_KEY}`).then((res) => {
               resolve(res.data)
           }).catch((error) => {
               console.log(error.message || error)
               reject(error)
           })
        }
    })
}
 
