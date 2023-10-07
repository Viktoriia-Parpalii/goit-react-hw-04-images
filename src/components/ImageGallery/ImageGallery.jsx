import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onOpenModal }) => {
  const showImages = Array.isArray(images) && images.length;
  return (
    <ul className="ImageGallery">
      {showImages &&
        images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onOpenModal={onOpenModal}
            />
          );
        })}
    </ul>
  );
};
