import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import Paragraph from 'components/Paragraph/Paragraph';

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

const StyledDescriptionWrapper = styled.div`
  align-self: flex-start;
`;

const Card = ({ id, title, slug, description, price, categories, image }) => (
  <StyledCard key={id} as={Link} to={`${routes.products}${slug}`}>
    <LazyLoadImage
      alt={title}
      src={`http://localhost:1337${image.formats.thumbnail.url}`}
      effect="blur"
      height="156px"
    />
    <StyledDescriptionWrapper>
      <Paragraph bold>
        {title} sticker - ${price}
      </Paragraph>
      <Paragraph grey>{description}</Paragraph>
      <Paragraph bold>Categories: {categories.map(({ name }) => `${name} `)}</Paragraph>
    </StyledDescriptionWrapper>
  </StyledCard>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  image: PropTypes.shape({
    formats: PropTypes.shape({
      thumbnail: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Card;
