import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import BoxShadow from 'components/BoxShadow/BoxShadow';

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0 ${({ theme }) => theme.layout.mobileSidesPadding};
`;

const StyledListItem = styled.li`
  background-color: ${({ theme, featuredItem }) => (featuredItem ? theme.grey400 : theme.white)};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  padding: 10px 15px;
  margin: 5px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const FilterBar = ({ handleClick, featuredItem = 'all' }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/categories').then(({ data }) => setCategories(data));
  }, []);

  return (
    <StyledList>
      <StyledListItem
        onClick={handleClick}
        data-category="all"
        featuredItem={featuredItem === 'all'}
      >
        All
        <BoxShadow />
      </StyledListItem>
      {categories.map(({ id, name, slug }) => (
        <StyledListItem
          key={id}
          onClick={handleClick}
          data-category={slug}
          featuredItem={featuredItem === slug}
        >
          {name}
          <BoxShadow />
        </StyledListItem>
      ))}
    </StyledList>
  );
};

FilterBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  featuredItem: PropTypes.string,
};

FilterBar.defaultProps = {
  featuredItem: 'all',
};

export default FilterBar;
