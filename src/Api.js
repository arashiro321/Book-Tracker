import react from 'react'
import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:21262/'
})