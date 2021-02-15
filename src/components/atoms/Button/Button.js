import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  border: none;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  margin-top: 5px;
  position: relative;
`;

export default Button;
