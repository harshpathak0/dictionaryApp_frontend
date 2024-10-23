import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

export const api = {
  getWords: () => axios.get(`${API_URL}/word`),
  createWord: (data) => axios.post(`${API_URL}/createWord`, data),
  createMeaning: (wordId, meaning) => 
    axios.post(`${API_URL}/meaning`, { wordId, meaning }),
  getMeaningsForWord: (wordId) => 
    axios.get(`${API_URL}/meaning/${wordId}`),
  editMeaning: (meaningId, meaning) => 
    axios.put(`${API_URL}/editMeaning/${meaningId}`, { meaning }),
  deleteMeaning: (meaningId) => 
    axios.delete(`${API_URL}/deleteMeaning/${meaningId}`),
};
