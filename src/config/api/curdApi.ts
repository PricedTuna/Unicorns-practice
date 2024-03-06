import axios from 'axios';

const crudApi = axios.create({
  baseURL: 'https://crudcrud.com/api/7223b15d0ff648efba2ed6618f787fa1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export {crudApi};
