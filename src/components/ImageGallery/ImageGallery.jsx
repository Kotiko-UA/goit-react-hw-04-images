import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Ul } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {};
  render() {
    return (
      <Ul>
        {this.props.imageSet.map(img => {
          return (
            <ImageGalleryItem
              omImgClick={this.props.omImgClick}
              key={img.id}
              urlMiniImg={img.webformatURL}
              alt={img.tags}
            />
          );
        })}
      </Ul>
    );
  }
}

export default ImageGallery;
