import { Image, Li } from './ImageGalleryItem.styled';

export const ImageGalleryItem = props => {
  return (
    <Li onClick={props.omImgClick}>
      <Image loading="lazy" src={props.urlMiniImg} alt={props.alt} />
    </Li>
  );
};
