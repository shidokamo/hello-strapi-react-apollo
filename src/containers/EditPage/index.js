/**
 *
 * EditPage
 *
 */

import React from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import Button from '../../components/Button';

import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../../queries';

import './styles.scss';

// Constant used to when to send the files on the `/upload` instand of `/:contentType` route.
const FILE_RELATIONS = {
  product: [{ name: 'pictures', multiple: true }],
};

const EditPage = props => {
  // Hooks
  const { id, contentType } = useParams(); // Get router URI
  // Set page information
  const title = id === 'create' ? `Create a new ${contentType}` : `Edit ${id}`;

  // const [description, setDescription] = useState('');
  // const [name, setName] = useState('');
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  // Load existing data at initial mounting
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>Failed to load product data.</p>;
  const name = data.product.name;
  const description = data.product.description;

  const handleSubmit = e => {
    e.preventDefault();
    updateProduct({
      variables: {
        id: id,
        name: name,
        description: description,
      },
    });
    // TODO:
    // catch -> finally ->
    //         this.props.history.push(`/${params.contentType}s`);
  };

  return (
    <div className="editPageWrapper">
      <div className="container-fluid">
        <h1>{title}</h1>
        <Link to={`/${contentType}s`}>Back</Link>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <p>Name</p>
            </div>
            <div className="col-md-8">
              <input type="text" cols="50" defaultValue={name}></input>
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
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p>${description}</p>
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
