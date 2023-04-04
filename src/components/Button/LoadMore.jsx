import PropTypes from 'prop-types';
import css from './LoadMore.module.css';

export const LoadMore = ({ onClick }) => {
  return (
    <button type="button" className={css.loadMore} onClick={onClick}>
      Load more...
    </button>
  );
};

LoadMore.prototype = {
  onClick: PropTypes.func.isRequired,
};
