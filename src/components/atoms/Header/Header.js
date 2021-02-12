import styled from 'styled-components';

const Header = styled.h2`
  font-size: ${({ theme, big }) => (big ? theme.font.size.bigHeader : theme.font.size.header)};
`;

export default Header;
