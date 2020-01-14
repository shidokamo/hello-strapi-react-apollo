/**
 *
 * EditPage
 *
 */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  let { id, contentType } = useParams();
  console.log('id:', id);
  console.log('contentType:', contentType);

  //const [description, setDescription] = useState('');
  //const [name, setName] = useState('');
  let description = '';
  let name = '';
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [createProduct] = useMutation(CREATE_PRODUCT);

  let title = id === 'create' ? `Create a new ${contentType}` : `Edit ${id}`;

  if (id !== 'create') {
    // if の中に hook を持ってくるのはまずいかも？
    const { loading, error, data } = useQuery(GET_PRODUCT, {
      variables: { id: id },
    });
    if (loading) return <p>loading...</p>;
    if (error) return <p>GraphQL error</p>;
    description = data.product.description;
    //setName(data.product.name);
    //setDescription(data.product.description);
  }

  const handleChange = e => {
    setName(e.target.name);
    setDescription(e.target.value);
    console.log(name, description);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id !== 'create') {
      updateProduct({
        variables: { id: id, name: name, description: description },
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
        <Link to={`/${contentType}s`}>Back</Link>
        <div className="row" onChange={handleChange}>
          <div className="col-md-4">
            <p>Name</p>
          </div>
          <div className="col-md-8">
            <input type="text"></input>>
          </div>
          <div className="col-md-4">
            <p>Description</p>
          </div>
          <div className="col-md-8">
            <textarea rows="10" cols="50"></textarea>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <p>${description}</p>
          </div>
        </div>
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
      </div>
    </div>
  );
};

EditPage.defaultProps = {};
EditPage.propTypes = {};

export default EditPage;
