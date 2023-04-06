import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '33722400-4ec97df60eea6ef613b463c01';
const CONFIG = 'image_type=photo&orientation=horizontal&per_page=12';

export async function fetchPics(searchQuery, page = 1) {
  const URL = `${ENDPOINT}?key=${API_KEY}&q=${searchQuery}&${CONFIG}&page=${page}`;

  const response = await axios.get(URL);
  return response.data;
  //   .hits.map(hit => {
  //   return {
  //     id: hit.id,
  //     smallImg: hit.webformatURL,
  //     largeImg: hit.largeImageURL,
  //     tags: hit.tags,
  //   };
  // });
}
