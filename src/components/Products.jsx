import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { fetchProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, search}) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      fetchProducts(cat.category)
      .then(fetchedProducts => {
        let filteredProducts = fetchedProducts;
        if (search) {
          filteredProducts = fetchedProducts.filter(
            (product) =>
              product.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        setProducts(filteredProducts);
      });
    }
    getProducts();

  }, [cat, search]);

  

  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
