import { Component } from 'react';
import { Wrapper, NoImg } from './App.styled';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { searchImg } from 'api';
import { toast } from 'react-hot-toast';

export class App extends Component {
  state = {
    imageSet: [],
    searchText: '',
    page: 1,
    modal: false,
    modalUrl: '',
    modalAlt: '',
    loading: false,
    maxPages: 0,
  };
  onSearchSubmit = e => {
    this.setState({
      searchText: `${Date.now()}/${e.target.elements.search.value.toLowerCase()}`,
      imageSet: [],
      page: 1,
    });
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const imgs = await searchImg(this.state.searchText, this.state.page);
        if (imgs.hits.length === 0) {
          toast.error('Your search did not match anything!');
          return;
        }
        this.setState(prevState => ({
          imageSet: [...prevState.imageSet, ...imgs.hits],
          maxPages: Math.round(imgs.totalHits / 12),
        }));

        if (prevState.page === this.state.page) {
          toast.success(`You have ${imgs.totalHits} images`);
        }
        window.scrollBy({
          top: 520,
          behavior: 'smooth',
        });
      } catch (error) {
        toast.error('Wow! Something went wrong!');
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  omImgClick = e => {
    const modalImg = this.state.imageSet.filter(
      img => img.webformatURL === e.target.src
    );
    this.setState({
      modal: true,
      modalUrl: modalImg[0].largeImageURL,
      modalAlt: modalImg[0].alt,
    });
  };
  onExitModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.setState({ modal: false });
    }
  };

  render() {
    return (
      <Wrapper>
        <Searchbar onSearchSubmit={this.onSearchSubmit} />
        {this.state.imageSet.length > 0 && (
          <ImageGallery
            omImgClick={this.omImgClick}
            imageSet={this.state.imageSet}
          />
        )}
        {this.state.loading && <Loader />}

        {this.state.maxPages > 0 &&
          this.state.imageSet.length > 0 &&
          this.state.page !== this.state.maxPages && (
            <Button onLoadMore={this.onLoadMore} />
          )}
        {(this.state.maxPages === 0 ||
          this.state.page === this.state.maxPages) &&
          this.state.imageSet.length > 0 && (
            <NoImg>The pictures are over, look for something else...</NoImg>
          )}
        {this.state.modal && (
          <Modal
            onExitModal={this.onExitModal}
            modalUrl={this.state.modalUrl}
            alt={this.state.modalAlt}
          />
        )}
      </Wrapper>
    );
  }
}
