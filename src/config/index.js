const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://aluraflix-eight.herokuapp.com';

export default {
  URL_BACKEND,
};
