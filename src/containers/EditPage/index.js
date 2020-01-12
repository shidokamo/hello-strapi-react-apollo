/**
 *
 * EditPage
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import Button from '../../components/Button';
import Input from '../../components/InputsIndex';

import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../../queries';

import './styles.scss';

// Constant used to when to send the files on the `/upload` instand of `/:contentType` route.
const FILE_RELATIONS = {
  product: [{ name: 'pictures', multiple: true }],
};

const EditPage = props => {
  // Get router URI information
  const {
    match: {
      params: { id },
    },
  } = props;

  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const title =
    id === 'create'
      ? `Create a new ${props.contentType}` // You can get contentType from Router
      : `Edit ${id}`;

  if (id !== 'create') {
    const { loading, error, data } = useQuery(GET_PRODUCT, {
      variables: { id: id },
    });
    if (loading) return <p>loading...</p>;
    if (error) return <p>GraphQL error</p>;
    setName(data.product.name);
    setDescription(data.product.description);
  }

  handleChange = e => {
    setName(e.target.name);
    setDescription(e.target.value);
    console.log(name, description);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (props.id !== 'create') {
      updateProduct({
        variables: { id: props.id, name: name, description: description },
      });
    } else {
      createProduct({ variables: { name: name, description: description } });
      input.value = '';
    }
    // TODO:
    // catch -> finally ->
    //         this.props.history.push(`/${params.contentType}s`);
  };

  return (
    <div className="editPageWrapper">
      <div className="container-fluid">
        <h1>{title}</h1>
        <Link to={`/${params.contentType}s`}>Back</Link>
        <form className="formWrapper" onSubmit={handleSubmit}>
          <div className="row">
            <form onSubmit={handleSubmit}></form>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Button type="submit" primary>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

EditPage.defaultProps = {};
EditPage.propTypes = {};

export default EditPage;
