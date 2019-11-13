import axios from 'axios';

axios.defaults.headers.common['X-CSRF-TOKEN'] = ""
//We are using AXIOS to manage API calls.
//This is where we are going to configure the default values of the API.
let Api = axios.create({
      timeout: 2000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });

export default Api;
