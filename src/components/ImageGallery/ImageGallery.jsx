import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Ul } from './ImageGallery.styled';

export const ImageGallery = props => {
  return (
    <Ul>
      {props.imageSet.map(img => {
        return (
          <ImageGalleryItem
            omImgClick={props.omImgClick}
            key={img.id}
            urlMiniImg={img.webformatURL}
            alt={img.tags}
          />
        );
      })}
    </Ul>
  );
};
