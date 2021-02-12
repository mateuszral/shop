import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Paragraph from 'components/atoms/Paragraph/Paragraph';

import { routes } from 'routes';

import { useItems } from 'store';

import { BiCart } from 'react-icons/bi';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 5px;

  span {
    margin-left: 5px;
    font-size: ${({ theme }) => theme.font.size.header};
  }
`;

const Navigation = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [{ cart }] = useItems();

  useEffect(() => {
    let total = 0;

    cart.forEach(({ quantity }) => {
      total += quantity;
    });

    setTotalAmount(total);
  }, [cart]);

  return (
    <StyledNav>
      <StyledParagraph as={Link} to={routes.home} bold>
        Home
      </StyledParagraph>
      <span>
        <StyledLink to={routes.cart}>
          <BiCart size="1.5em" /> <span>{totalAmount}</span>
        </StyledLink>
      </span>
    </StyledNav>
  );
};

export default Navigation;
