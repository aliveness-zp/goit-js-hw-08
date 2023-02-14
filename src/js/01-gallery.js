// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

const galleryMarckupString = createGalleryMarkup(galleryItems);

galleryList.insertAdjacentHTML('beforeend', galleryMarckupString);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" data-lightbox="images" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

// 2. Слушатель событий, настройка basiclightbox

galleryList.addEventListener('click', giveLargeImgClick);

function giveLargeImgClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}">`,
    {
      onShow: instance => {
        window.addEventListener('keydown', closeModal);
      },

      onClose: intanse => {
        window.removeEventListener('keydown', closeModal);
      },
    }
  );

  instance.show();

  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}
