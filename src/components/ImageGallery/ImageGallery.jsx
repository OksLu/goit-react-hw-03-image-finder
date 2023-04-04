import propTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImagesGallery = ({ gallery, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {gallery.map(item => (
        <ImageGalleryItem
          key={item.id}
          item={item}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};

ImagesGallery.prototype = {
  gallery: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
