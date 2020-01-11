/**
 *
 * ProductsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../queries';

import Table from '../../components/Table';
import Markdown from '../../components/Markdown';
// Utils

import './styles.scss';

const ProductsPage = props => {
  const onClick = id => {
    props.history.push(`/product/${id}`);
  };

  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return <p>loading...</p>;
  if (error) return <p>GraphQL error : ${error}</p>;

  return (
    <div className="productPageWrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1>Products</h1>
          </div>
          <div className="col-md-4 offset-md-4 productPageLink">
            <Link to="form/product/create">Create a product</Link>
          </div>
        </div>
        <div className="row">
          <Table
            data={data.products}
            headers={['_id', 'name', '']}
            onClick={onClick}
          />
        </div>
        <div className="row">
          <Markdown
            data={data.products}
            headers={['_id', 'name', 'description', '']}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

ProductsPage.defaultProps = {};

ProductsPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ProductsPage;
