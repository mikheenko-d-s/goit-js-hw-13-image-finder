import photosTpl from './templates/gallery.hbs';
import PhotoApiService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';
import toastify from './js/toastify';
import './js/components/lightbox';

import './sass/main.scss';
import getRefs from './js/get-refs';

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });
const photoApiService = new PhotoApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchPhotos);

function onSearch(e) {
  e.preventDefault();
  clearPhotosContainer();
  photoApiService.query = e.currentTarget.elements.query.value;

  if (!photoApiService.query) {
    return;
  }

  if (photoApiService.query.trim() === '') {
    return toastify.onFetchError();
  }

  loadMoreBtn.show();
  photoApiService.resetPage();
  fetchPhotos();

  e.currentTarget.elements.query.value = '';
}

function fetchPhotos() {
  loadMoreBtn.disable();
  loadMoreBtn.removeEnd();

  photoApiService.fetchPhotos().then(photos => {
    if (photos.length === 0) {
      loadMoreBtn.hide();
      return toastify.onFetchError();
    }

    if (photos.length < 12 && photos.length > 0) {
      loadMoreBtn.showEnd();
      appendPhotosMarkup(photos);
      return;
    }

    appendPhotosMarkup(photos);
    loadMoreBtn.enable();
    scroll();

    return;
  });
}

function appendPhotosMarkup(photos) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', photosTpl(photos));
  scroll();
}

function clearPhotosContainer() {
  refs.galleryContainer.innerHTML = '';
}

function scroll() {
  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

// Infinite-scroll
// const onEntry = entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting && photoApiService.query !== '') {
//       photoApiService.fetchPhotos().then(photos => {
//         if (photos.length < 12 && photos.length >= 0) {
//           loadMoreBtn.showEnd();
// appendPhotosMarkup(photos);
//           return;
//         }

//         appendPhotosMarkup(photos);
//         loadMoreBtn.enable();

//         return;
//       });
//     }
//   });
// };

// const options = {
//   rootMargin: '250px',
// };

// const observer = new IntersectionObserver(onEntry, options);

// observer.observe(refs.sentinel);
