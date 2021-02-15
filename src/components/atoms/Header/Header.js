import styled from 'styled-components';

const Header = styled.h2`
  font-size: ${({ theme, big }) => (big ? theme.font.size.bigHeader : theme.font.size.header)};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

export default Header;
