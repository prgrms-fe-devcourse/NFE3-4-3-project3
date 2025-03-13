import axios from 'axios'

const LIBRARY_URL = import.meta.env.VITE_API_LIBRARY_URL

const LibraryApi = axios.create({
  baseURL: LIBRARY_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default LibraryApi
