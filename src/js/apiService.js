const API_KEY = '21915448-ca2a23b845d7ec90c85800139';
// const cors_api_host = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = 'https://pixabay.com/api';

export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhotos() {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
      key: API_KEY,
    });

    const url = `${BASE_URL}/?${searchParams}`;
    // const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();

        return hits;
      })
      .catch(err => console.log(err));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// const apiKey = '21915448-ca2a23b845d7ec90c85800139';
// export default {
//     searchQuery: '',
//     page: 1,
//     fetchImg() {
//         const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;
//         return fetch(url)
//             .then(res => res.json())
//             .then(({ hits }) => {
//                 this.incrementPage();
//                 return hits;
//             })
//             .catch(err => console.log(err));
//     },
//     incrementPage() {
//         this.page += 1;
//     },
//     resetPage() {
//         this.page = 1;
//     },
//     get query() {
//         return this.searchQuery;
//     },
//     set query(value) {
//         this.searchQuery = value;
//     },
// };
