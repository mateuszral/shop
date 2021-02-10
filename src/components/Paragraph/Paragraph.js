import styled from 'styled-components';

const Paragraph = styled.p`
  font-weight: ${({ theme, bold }) => bold && theme.font.weight.semiBold};
  color: ${({ theme, grey }) => grey && theme.grey100};
  margin: 5px 0;

  ${({ theme }) => theme.mq.tablet} {
    margin: 15px 0;
  }
`;

export default Paragraph;
