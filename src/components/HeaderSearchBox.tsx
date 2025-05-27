import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  padding: 0 1rem;
  padding-left: 0.5rem;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
  }
`;

const SearchContainer = styled.div`
  width: 300px;
  height: 36px;
  background: rgba(65, 65, 65, 0.60);
  border-radius: 18px;
  margin-left: auto;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(75, 75, 75, 0.70);
  }

  &:focus-within {
    background: rgba(85, 85, 85, 0.80);
  }
`;

const SearchIcon = styled(BiSearch)`
  color: #9ca3af;
  font-size: 1.2rem;
`;

const HeaderSearchBox = () => {
    return (
        <SearchContainer>
            <SearchIcon />
            <SearchInput
                placeholder="Uygulama veya oyun ara..."
                type="text"
            />
        </SearchContainer>
    );
};

export default HeaderSearchBox;
