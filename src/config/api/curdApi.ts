import axios from 'axios';

const crudApi = axios.create({
  baseURL: 'https://crudcrud.com/api/406c92334f504015b51825305f811afa',
  headers: {
    'Content-Type': 'application/json',
  },
});

export {crudApi};
