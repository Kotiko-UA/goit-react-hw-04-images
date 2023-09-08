import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38382365-2ce894cbac0e5297650bdbdb4';
export const searchImg = async (search, page, signal) => {
  const queryValue = search.indexOf('/');
  const query = search.slice(queryValue + 1, search.length);
  const searchParams = new URLSearchParams({
    q: query,
    page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  const resp = await axios.get(`?${searchParams}`, { signal });
  return resp.data;
};
