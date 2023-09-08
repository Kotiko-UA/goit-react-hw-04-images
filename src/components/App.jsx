import { useEffect, useRef, useState } from 'react';
import { Wrapper, NoImg } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImg } from 'api';
import { toast } from 'react-hot-toast';

export const App = () => {
  const [imageSet, setImageSet] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxPages, setMaxPages] = useState(0);

  const onSearchSubmit = e => {
    setSearchText(
      `${Date.now()}/${e.target.elements.search.value.toLowerCase()}`
    );
    setImageSet([]);
    setPage(1);
  };

  const controllerRef = useRef();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    async function searchFunc() {
      try {
        setLoading(true);
        const imgs = await searchImg(
          searchText,
          page,
          controllerRef.current.signal
        );
        if (imgs.hits.length === 0) {
          toast.error('Your search did not match anything!');
          return;
        }
        setImageSet(prevState => [...prevState, ...imgs.hits]);

        const calcMaxPages = Math.round(imgs.totalHits / 12);

        setMaxPages(calcMaxPages);

        if (page === 1) {
          toast.success(`You have ${imgs.totalHits} images`);
        }
        if (page !== 1) {
          setTimeout(() => {
            window.scrollBy({
              top: 520,
              behavior: 'smooth',
            });
          }, 0);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          toast.error('Wow! Something went wrong!');
        }
      } finally {
        setLoading(false);
      }
    }
    if (searchText !== '') searchFunc();
  }, [searchText, page]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const omImgClick = e => {
    const modalImg = imageSet.filter(img => img.webformatURL === e.target.src);
    setModal(true);
    setModalUrl(modalImg[0].largeImageURL);
    setModalAlt(modalImg[0].alt);
  };

  const onExitModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      setModal(false);
    }
  };

  return (
    <Wrapper>
      <Searchbar onSearchSubmit={onSearchSubmit} />
      {imageSet.length > 0 && (
        <ImageGallery omImgClick={omImgClick} imageSet={imageSet} />
      )}
      {loading && <Loader />}

      {maxPages > 0 && imageSet.length > 0 && page !== maxPages && (
        <Button onLoadMore={onLoadMore} />
      )}
      {(maxPages === 0 || page === maxPages) && imageSet.length > 0 && (
        <NoImg>The pictures are over, look for something else...</NoImg>
      )}
      {modal && (
        <Modal onExitModal={onExitModal} modalUrl={modalUrl} alt={modalAlt} />
      )}
    </Wrapper>
  );
};
