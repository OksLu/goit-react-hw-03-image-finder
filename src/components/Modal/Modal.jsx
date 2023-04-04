import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';
import { GrClose } from 'react-icons/gr';

export class Modal extends Component {
  static propTypes = {
    currentImg: PropTypes.shape({
      id: PropTypes.number.isRequired,
      smallImg: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
    hideModal: PropTypes.func.isRequired,
  };

  state = {
    image: null,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressEsc);
  }

  handlePressEsc = e => {
    if (e.code === 'Escape') {
      this.props.hideModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressEsc);
  }
  render() {
    const { hideModal, currentImg } = this.props;
    return (
      <div className={css.overlay}>
        <button className={css.close}>
          <GrClose onClick={hideModal} />
        </button>
        <div onClick={hideModal} className={css.modal}>
          <img src={currentImg.largeImg} alt={currentImg.tags} />
        </div>
      </div>
    );
  }
}
