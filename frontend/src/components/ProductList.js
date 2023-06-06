import React, { useState, useEffect } from "react";
import { getProducts } from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((result) => {
      setProducts(result);
    });
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts().then((result) => {
        setProducts(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ShowProductList = () => {
    return products.map((product) => {
      return (
        <div className="column is-one-quarter" key={product.id}>
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={product.url} alt="image" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{product.name}</p>
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <a
                onClick={() => navigate(`/edit/${product.id}`)}
                className="card-footer-item button is-info">
                Edit
              </a>
              <a
                onClick={() => deleteProduct(product.id)}
                className="card-footer-item button is-danger">
                Delete
              </a>
            </footer>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container mt-5">
      <div className="field mt-3">
        <div className="control">
          <button
            type="submit"
            className="button is-success"
            onClick={() => navigate("/add")}>
            Add Product
          </button>
        </div>
      </div>
      <div className="columns is-multiline">
        <ShowProductList />
      </div>
    </div>
  );
};

export default ProductList;
