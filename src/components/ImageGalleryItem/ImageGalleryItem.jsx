import { Component } from 'react';
import { Image, Li } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {};

  render() {
    return (
      <Li onClick={this.props.omImgClick}>
        <Image
          loading="lazy"
          src={this.props.urlMiniImg}
          alt={this.props.alt}
        />
      </Li>
    );
  }
}

export default ImageGalleryItem;
