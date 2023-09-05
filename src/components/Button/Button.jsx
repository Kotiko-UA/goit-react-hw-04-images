import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return <ButtonLoadMore onClick={onLoadMore}>Load more</ButtonLoadMore>;
};
