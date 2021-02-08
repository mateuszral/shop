import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

const StyledDescriptionWrapper = styled.div`
  align-self: flex-start;
`;

const Card = ({ id, title, slug, description, price, categories, image }) => (
  <StyledCard key={id} as={Link} to={`${routes.products}${slug}`}>
    <img alt={title} src={`http://localhost:1337${image.formats.thumbnail.url}`} />
    <StyledDescriptionWrapper>
      <Paragraph bold>{title} sticker</Paragraph>
      <Paragraph grey>{description}</Paragraph>
      <Paragraph bold>Categories: {categories.map(({ name }) => `${name} `)}</Paragraph>
      <Paragraph bold>${price}</Paragraph>
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
