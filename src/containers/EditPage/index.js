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

import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT, UPDATE_PRODUCT } from '../../queries';

import './styles.scss';

const EditPage = props => {
  // Hooks
  const { id } = useParams(); // Get router URI
  // Set page information
  const title = `Edit ${id}`;
  const [newDescription, setDescription] = useState('');
  const [newName, setName] = useState('');

  // Mutation
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  // Load existing data at initial mounting
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>Failed to load product data.</p>;
  const name = data.product.name;
  const description = data.product.description;
  // これはなぜかうまくいかない。Hook の呼び出し順がおかしくなってエラーになる。
  // const [newDescription, setDescription] = useState(data.product.description);
  // const [newName, setName] = useState(data.product.name);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('New Name: ', newName);
    console.log('New Description: ', newDescription);
    if (newDescription || newName) {
      updateProduct({
        variables: {
          id: id,
          name: newName,
          description: newDescription,
        },
      });
    }
    // TODO:
    // catch -> finally ->
    //         this.props.history.push(`/${params.contentType}s`);
  };

  return (
    <div className="editPageWrapper">
      <div className="container-fluid">
        <h1>{title}</h1>
        <Link to={`/products`}>Back</Link>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <p>Name</p>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                defaultValue={name}
                onChange={e => setName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p>Description</p>
            </div>
            <div className="col-md-8">
              <textarea
                rows="10"
                cols="50"
                defaultValue={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p>{description}</p>
            </div>
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
