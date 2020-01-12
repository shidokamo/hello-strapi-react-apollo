import gql from 'graphql-tag';

export const GET_PRODUCT = gql`
  query product($id: ID!) {
    product(id: $id) {
      _id
      name
      description
    }
  }
`;

export const GET_PRODUCTS = gql`
  query {
    products {
      _id
      name
      description
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation($name: !String, $description: !String) {
    createProduct(input: {
      data: {
        name: $name
        description: $description
      }
    }) {
      product {
        name
        description
      }
    }
  }
`;

