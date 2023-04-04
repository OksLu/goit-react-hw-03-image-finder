import { Component } from 'react';
import css from './Modal.module.css';
import { GrClose } from 'react-icons/gr';

export class Modal extends Component {
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
