import axios from 'axios';

// apiToken = dcf5062a

export const baseURL = 'http://www.omdbapi.com?apikey=dcf5062a';
export const loginBaseURL = 'http://www.omdbapi.com/?i=tt3896198';

export default axios.create({
  baseURL,
});