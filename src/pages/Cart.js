import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Paragraph from 'components/atoms/Paragraph/Paragraph';
import BoxShadow from 'components/atoms/BoxShadow/BoxShadow';
import Button from 'components/atoms/Button/Button';

import { useItems } from 'store';

import { getTotalPrice } from 'helpers';

import { VscTrash } from 'react-icons/vsc';

const StyledWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: ${({ center }) => center && 'center'};
  align-items: center;
  padding-bottom: 50px;
`;

const StyledChekoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  padding: 0 40px;

  ${({ theme }) => theme.mq.tablet} {
    width: 40%;
    padding-right: 10%;
  }
`;

const StyledList = styled.ul`
  width: 80%;
  list-style: none;
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  display: flex;
  background-color: ${({ theme }) => theme.white};
  padding: 40px;
  margin: 20px 0;
  position: relative;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mq.tablet} {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
  }
`;

const StyledRemoveItemButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  outline: none;
  border: 0;
  background-color: inherit;
  padding: 5px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ flexend }) => flexend && 'flex-end'};
  align-items: ${({ flexend }) => flexend && 'flex-end'};
  ${({ theme }) => theme.mq.tablet} {
    justify-content: ${({ flexend }) => flexend && 'flex-end'};
    align-items: ${({ flexend }) => flexend && 'flex-end'};
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  justify-content: center;
  ${({ theme }) => theme.mq.tablet} {
    padding-right: 0;
  }
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
  const [{ cart }, { changeItemQuantity, removeItemFromCart }] = useItems();

  return (
    <StyledWrapper>
      <Paragraph>Cart summary</Paragraph>
      {cart.length ? (
        <>
          <StyledList>
            {cart.map(({ itemId, title, description, price, image, quantity }) => (
              <StyledListItem key={itemId}>
                <StyledRemoveItemButton onClick={() => removeItemFromCart(itemId)}>
                  <VscTrash color="#fd5c63" size="1.2em" />
                </StyledRemoveItemButton>
                <LazyLoadImage
                  alt={title}
                  src={`https://stickers-shopv1.herokuapp.com${image.formats.thumbnail.url}`}
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
                  <Paragraph grey smallMargin center>
                    Quantity
                  </Paragraph>
                  <StyledButtonWrapper>
                    <button onClick={() => changeItemQuantity(itemId, 'decrease')}>-</button>
                    <Paragraph smallMargin>{quantity}</Paragraph>
                    <button onClick={() => changeItemQuantity(itemId, 'increase')}>+</button>
                  </StyledButtonWrapper>
                  <Paragraph center bold>
                    ${getTotalPrice([{ price, quantity }])}
                  </Paragraph>
                </StyledContentWrapper>
              </StyledListItem>
            ))}
          </StyledList>
          <StyledChekoutWrapper>
            <Paragraph center bold>
              Total price: ${getTotalPrice(cart)}
            </Paragraph>
            <Paragraph>Shopping and taxes will be calculated at checkout.</Paragraph>
            <Button>
              Checkout
              <BoxShadow />
            </Button>
          </StyledChekoutWrapper>
        </>
      ) : (
        <StyledWrapper center>
          <Paragraph>Your cart is empty</Paragraph>
        </StyledWrapper>
      )}
    </StyledWrapper>
  );
};

export default Cart;
