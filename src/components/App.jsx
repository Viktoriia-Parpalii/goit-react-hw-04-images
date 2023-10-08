import { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImagesByCategories } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedImagesName, setSearchedImagesName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const fetchMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const saveSearchedImagesNameInState = searchedImagesName => {
    setSearchedImagesName(searchedImagesName);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    const fetchByName = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImagesByCategories(searchedImagesName, page);
        const imagesByCategories = data.hits;
        if (data.hits.length === 0) {
          setIsLoading(true);
          setError(
            toast.warning(`Images weren't found! Please enter another name.`, {
              theme: 'colored',
            })
          );
          return;
        }

        setImages(prevState => [...prevState, ...imagesByCategories]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));

        if (page === Math.ceil(data.totalHits / 12)) {
          setError(toast.info('The images is finished'));
        }
      } catch (error) {
        setError(toast.error(error.message, { theme: 'colored' }));
      } finally {
        setIsLoading(false);
      }
    };
    if (!searchedImagesName) {
      return;
    }

    fetchByName();
  }, [searchedImagesName, page]);

  const onOpenModal = modalData => {
    setIsOpen(true);
    setData(modalData);
  };
  const onCloseModal = () => {
    setIsOpen(false);
    setData(null);
  };

  return (
    <>
      <Searchbar
        saveSearchedImagesNameInState={saveSearchedImagesNameInState}
      />
      {isLoading && (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      )}

      {images.length !== 0 && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}
      {loadMore && <Button fetchMoreImages={fetchMoreImages} />}
      {isOpen && <Modal data={data} onCloseModal={onCloseModal} />}
      <ToastContainer />
    </>
  );
};
