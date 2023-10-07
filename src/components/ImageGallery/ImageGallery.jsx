import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';

export class ImageGallery extends Component {
  render() {
    const { images, onOpenModal } = this.props;
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
  }
}
