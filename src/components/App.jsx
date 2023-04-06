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
    total: null,
    loading: false,
    page: 0,
    errorMsg: '',
    openModal: false,
    currentImg: null,
  };

  onSubmit = searchQuery => {
    this.setState({ query: searchQuery.trim(), page: 0 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  loadImages = async () => {
    if (this.state.page !== 0) {
      try {
        const { query, page } = this.state;

        this.setState({ loading: true });
        const response = await fetchPics(query, page);
        const images = response.hits.map(hit => {
          return {
            id: hit.id,
            smallImg: hit.webformatURL,
            largeImg: hit.largeImageURL,
            tags: hit.tags,
          };
        });

        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...images],
          total: response.totalHits,
          errorMsg: '',
        }));
      } catch (error) {
        this.setState({
          errorMsg: 'Error while loading data. Try again later.',
        });
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.loadImages();
    }
    if (prevState.query !== this.state.query) {
      this.setState({ gallery: [] });
      this.loadMore();
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
    const { loading, gallery, openModal, currentImg, total } = this.state;
    return (
      <div>
        {loading && <Loader />}
        <Searchbar onSubmit={this.onSubmit} />
        <ImagesGallery gallery={gallery} onImageClick={this.onImageClick} />

        {openModal && (
          <Modal hideModal={this.hideModal} currentImg={currentImg} />
        )}
        {gallery.length !== 0 && gallery.length < total && (
          <LoadMore onClick={this.loadMore} />
        )}
      </div>
    );
  }
}
