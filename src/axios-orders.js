import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-builder-74bb4-default-rtdb.firebaseio.com/'
});

export default instance;
