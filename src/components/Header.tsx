import { FC } from 'react';
import styled from 'styled-components';
import HeaderSearchBox from './HeaderSearchBox';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: black;
  border: 1px solid #000000;
  border-radius: 9999px;
  box-shadow: 0 0 3px 3px rgb(100, 100, 100);
  margin: 1.5rem 10rem;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 9999px;
  background: transparent;
  font-size: 1rem;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.2s;
  font-family: 'Inter', sans-serif;
  font-weight: bold;

  &:hover {
    background: rgba(65, 65, 65, 0.60);
    color: #ffffff;
  }
`;

const Logo = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function Header() {
  return (
    <StyledHeader>
      <NavButtons>
        <NavButton>Uygulamalar</NavButton>
        <NavButton>Oyunlar</NavButton>
      </NavButtons>
      <Logo>APK Realm</Logo>
      <HeaderSearchBox />
    </StyledHeader>
  );
}