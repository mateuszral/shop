import styled from 'styled-components';

const BoxShadow = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export default BoxShadow;
