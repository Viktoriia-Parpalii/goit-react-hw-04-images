import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, onOpenModal, largeImageURL } = this.props;
    return (
      <li
        className="ImageGalleryItem"
        onClick={() => onOpenModal(largeImageURL)}
      >
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
      </li>
    );
  }
}
