import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Paragraph from 'components/atoms/Paragraph/Paragraph';

import { useItems } from 'store';

import { getTotalPrice } from 'helpers';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledList = styled.ul`
  width: 80%;
  list-style: none;
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  background-color: ${({ theme }) => theme.white};
  padding: 40px;
  margin: 20px 0;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ flexend }) => flexend && 'flex-end'};
  align-items: ${({ flexend }) => flexend && 'flex-end'};
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  button {
    padding: 5px;
    margin: 0 10px;
    background-color: inherit;
    border: 0;
    font-size: ${({ theme }) => theme.font.size.header};
    outline: none;
  }
`;

const Cart = () => {
  const [{ cart }, { changeItemQuantity }] = useItems();

  return (
    <StyledWrapper>
      <Paragraph>Cart summary</Paragraph>
      <StyledList>
        {cart.map(({ itemId, title, description, price, image, quantity }) => (
          <StyledListItem key={itemId}>
            <LazyLoadImage
              alt={title}
              src={`http://localhost:1337${image.formats.thumbnail.url}`}
              effect="blur"
              height="156px"
            />
            <StyledContentWrapper>
              <Paragraph bold big>
                {title}
              </Paragraph>
              <Paragraph>{description}</Paragraph>
            </StyledContentWrapper>
            <StyledContentWrapper flexend>
              <Paragraph bold>${getTotalPrice([{ price, quantity }])}</Paragraph>
              <Paragraph grey smallMargin>
                Quantity
              </Paragraph>
              <StyledButtonWrapper>
                <button onClick={() => changeItemQuantity(itemId, 'decrease')}>-</button>
                <Paragraph smallMargin>{quantity}</Paragraph>
                <button onClick={() => changeItemQuantity(itemId, 'increase')}>+</button>
              </StyledButtonWrapper>
            </StyledContentWrapper>
          </StyledListItem>
        ))}
      </StyledList>
      <Paragraph bold>Total price: ${getTotalPrice(cart)}</Paragraph>
    </StyledWrapper>
  );
};

export default Cart;
