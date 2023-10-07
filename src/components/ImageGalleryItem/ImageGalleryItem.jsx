export const ImageGalleryItem = ({
  webformatURL,
  tags,
  onOpenModal,
  largeImageURL,
}) => {
  return (
    <li className="ImageGalleryItem" onClick={() => onOpenModal(largeImageURL)}>
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
};
