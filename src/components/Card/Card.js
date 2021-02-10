import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import Paragraph from 'components/Paragraph/Paragraph';
import Header from 'components/Header/Header';
import BoxShadow from 'components/BoxShadow/BoxShadow';

import { routes } from 'routes';

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const StyledDescriptionWrapper = styled.div`
  align-self: flex-start;
`;

const Card = ({ id, title, slug, description, price, image }) => (
  <StyledCard key={id} as={Link} to={`${routes.products}${slug}`}>
    <LazyLoadImage
      alt={title}
      src={`http://localhost:1337${image.formats.thumbnail.url}`}
      effect="blur"
      height="156px"
    />
    <StyledDescriptionWrapper>
      <Header>
        {title} sticker - ${price}
      </Header>
      <Paragraph grey>{description}</Paragraph>
    </StyledDescriptionWrapper>
    <BoxShadow />
  </StyledCard>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.shape({
    formats: PropTypes.shape({
      thumbnail: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Card;
