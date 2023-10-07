import { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImagesByCategories } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
// export class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     error: null,
//     searchedImagesName: null,
//     modal: {
//       isOpen: false,
//       data: null,
//     },
//     page: 1,
//     loadMore: false,
//   };
//   fetchMoreImages = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   saveSearchedImagesNameInState = searchedImagesName => {
//     this.setState({
//       searchedImagesName: searchedImagesName,
//       images: [],
//       page: 1,
//     });
//   };
//   fetchByName = async () => {
//     try {
//       this.setState({ isLoading: true });
//       const data = await fetchImagesByCategories(
//         this.state.searchedImagesName,
//         this.state.page
//       );
//       const imagesByCategories = data.hits;
//       if (data.hits.length === 0) {
//         this.setState({
//           loadMore: false,
//           error: toast.warning(
//             `Images weren't found! Please enter another name.`,
//             { theme: 'colored' }
//           ),
//         });
//         return;
//       }
//       this.setState(prevState => ({
//         images: [...prevState.images, ...imagesByCategories],
//         loadMore: this.state.page < Math.ceil(data.totalHits / 12),
//       }));
//       if (this.state.page === Math.ceil(data.totalHits / 12)) {
//         this.setState({
//           error: toast.info('The images is finished'),
//         });
//       }
//     } catch (error) {
//       this.setState({
//         error: toast.error(error.message, { theme: 'colored' }),
//       });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       this.state.page !== prevState.page ||
//       this.state.searchedImagesName !== prevState.searchedImagesName
//     ) {
//       this.fetchByName();
//     }
//   }
//   onOpenModal = modalData => {
//     this.setState({
//       modal: {
//         isOpen: true,
//         data: modalData,
//       },
//     });
//   };
//   onCloseModal = () => {
//     this.setState({
//       modal: {
//         isOpen: false,
//         data: null,
//       },
//     });
//   };
//   render() {
//     return (
//       <>
//         <Searchbar
//           saveSearchedImagesNameInState={this.saveSearchedImagesNameInState}
//         />
//         {this.state.isLoading && (
//           <MagnifyingGlass
//             visible={true}
//             height="80"
//             width="80"
//             ariaLabel="MagnifyingGlass-loading"
//             wrapperStyle={{}}
//             wrapperClass="MagnifyingGlass-wrapper"
//             glassColor="#c0efff"
//             color="#e15b64"
//           />
//         )}

//         {this.state.images.length !== 0 && (
//           <ImageGallery
//             images={this.state.images}
//             onOpenModal={this.onOpenModal}
//           />
//         )}
//         {this.state.loadMore && (
//           <Button fetchMoreImages={this.fetchMoreImages} />
//         )}
//         {this.state.modal.isOpen && (
//           <Modal
//             data={this.state.modal.data}
//             onCloseModal={this.onCloseModal}
//           />
//         )}
//          {this.state.error && <ToastContainer />}
//       </>
//     );
//   }
// }
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

  // componentDidUpdate(_, prevState) {
  //   if (
  //     this.state.page !== prevState.page ||
  //     this.state.searchedImagesName !== prevState.searchedImagesName
  //   ) {
  //     this.fetchByName();
  //   }
  // }
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
      {error && <ToastContainer />}
    </>
  );
};
