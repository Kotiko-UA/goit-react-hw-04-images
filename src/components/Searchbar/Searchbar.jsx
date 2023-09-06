import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  FormInput,
  HeaderWrap,
  SearchForm,
  SearchFormButton,
} from './Searchbar.styled';
import { toast } from 'react-hot-toast';

export const Searchbar = props => {
  const [input, setInput] = useState('');

  const onInput = ({ target }) => {
    setInput(target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (e.target.elements.search.value === '') {
      toast.error('Gotta write something!');
      return;
    }
    props.onSearchSubmit(e);
  };
  return (
    <HeaderWrap>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <BsSearch size={36} />
        </SearchFormButton>

        <FormInput
          onChange={onInput}
          type="text"
          name="search"
          value={input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </HeaderWrap>
  );
};
