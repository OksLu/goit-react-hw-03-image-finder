import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ item, onImageClick }) => {
  return (
    <li>
      <img
        src={item.smallImg}
        alt={item.tags}
        id={item.id}
        onClick={onImageClick}
        className={css.image}
      />
    </li>
  );
};

ImageGalleryItem.prototype = {
  item: propTypes.shape({
    id: propTypes.number.isRequired,
    smallImg: propTypes.string.isRequired,
    largeImage: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }).isRequired,
  onImageClick: propTypes.func.isRequired,
};
