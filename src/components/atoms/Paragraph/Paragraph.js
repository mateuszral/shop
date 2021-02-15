import styled from 'styled-components';

const Paragraph = styled.p`
  font-weight: ${({ theme, bold }) => bold && theme.font.weight.semiBold};
  font-size: ${({ theme, big }) => big && theme.font.size.header};
  color: ${({ theme, grey }) => grey && theme.grey100};
  margin: 5px 0;
  align-self: ${({ center }) => center && 'center'};

  ${({ theme }) => theme.mq.tablet} {
    align-self: initial;
    margin: ${({ smallMargin }) => (smallMargin ? '5px' : '15px')} 0;
  }
`;

export default Paragraph;
