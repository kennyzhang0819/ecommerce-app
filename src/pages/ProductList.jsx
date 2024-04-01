import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { mobile } from "../responsive";
import Slider from "../components/Slider";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 400;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;


const Input = styled.input`
  border: 1px solid lightgray;
  margin-right: 20px;
  padding: 10px;
  ${mobile({ width: "50px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({'category': 'All'});
  const [search, setSearch] = useState('');

  
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        data.unshift('All');
        setCategories(data);
      });
  }, []);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      category: value,
    });
  }

  const handleSearch = (e) => {
    const key = e.target.value;
    setSearch(key);
  }

  return (
    <Container>
      <Navbar />
      <Slider />
      {/* <Categories /> */}
      <Title>{filters.category}</Title>
      
      <FilterContainer>
        <Filter>
          <FilterText>Filter by Category:</FilterText>
          <Select onChange={handleFilters}>
            <Option disabled>Category</Option>
            {categories.map((category, index) => (
              <Option key={index} value={category}>{category}</Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Search:</FilterText>
            <Input placeholder="Search" onChange={handleSearch}/>
        </Filter>
      </FilterContainer>
      <Products cat={filters} search={search}/>
    </Container>
  );
};

export default ProductList;
