import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://restaurano-default-rtdb.firebaseio.com/'
});

export default instance;