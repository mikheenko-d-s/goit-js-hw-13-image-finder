import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';

import getRefs from '../../js/get-refs';

const refs = getRefs();

export default refs.galleryContainer.onclick = e => {
  if (!e.target.getAttribute('data')) {
    return;
  }

  const image = e.target.getAttribute('data');
  const alt = e.target.getAttribute('alt');

  const instance = basicLightbox.create(
    `<img data="large-img" class="large-img" width="1400" height="900" src="${image}" alt="${alt}" />`,
  );
  instance.show();

  document.querySelector('.large-img').onclick = e => {
    instance.close();
  };
};
