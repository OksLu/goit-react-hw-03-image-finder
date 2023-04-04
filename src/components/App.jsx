import { fetchPics } from './apiService';
import { React, Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/LoadMore';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    gallery: [],
    loading: false,
    page: 0,
    errorMsg: '',
    openModal: false,
    currentImg: null,
  };

  onSubmit = searchQuery => {
    this.setState({ query: searchQuery, page: 0 });
    this.loadMore();
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  loadImages = async () => {
    try {
      const { query, page } = this.state;

      this.setState({ loading: true });
      const response = await fetchPics(query, page);

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...response],
        errorMsg: '',
      }));
    } catch (error) {
      this.setState({
        errorMsg: 'Error while loading data. Try again later.',
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.loadImages();
    }
    if (prevState.query !== this.state.query) {
      this.setState({ gallery: [] });
    }
  }
  onImageClick = e => {
    this.setState({ openModal: true });
    const currentId = e.target.id;
    const currentObj = this.state.gallery.find(
      items => items.id === +currentId
    );
    this.setState({ currentImg: currentObj });
  };
  showModal = e => {
    this.setState({ openModal: true });
    console.log(e.target.id);
  };
  hideModal = () => {
    this.setState({ openModal: false });
  };
  render() {
    const { loading, gallery, openModal, currentImg } = this.state;
    return (
      <div>
        {loading && <Loader />}
        <Searchbar onSubmit={this.onSubmit} />
        <ImagesGallery gallery={gallery} onImageClick={this.onImageClick} />

        {openModal && (
          <Modal hideModal={this.hideModal} currentImg={currentImg} />
        )}
        {gallery.length !== 0 && <LoadMore onClick={this.loadMore} />}
      </div>
    );
  }
}
