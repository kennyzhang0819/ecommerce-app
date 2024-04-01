import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { Search } from "@mui/icons-material";
import { fetchSearchProducts } from "../data";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
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
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState([]);

  
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
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
      <Title>{filters.category}</Title>
      <SearchContainer>
            <Input placeholder="Search" onChange={handleSearch}/>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
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
      </FilterContainer>
      <Products cat={filters} search={search}/>
    </Container>
  );
};

export default ProductList;
