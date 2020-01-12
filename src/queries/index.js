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

export const CREATE_PRODUCT = gql`
  mutation($name: String!, $description: String!) {
    createProduct(input: { data: { name: $name, description: $description } }) {
      product {
        name
        description
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation($id: String!, $name: String!, $description: String!) {
    updateProduct(
      input: {
        where: { id: $id }
        data: { name: $name, description: $description }
      }
    ) {
      product {
        name
        description
      }
    }
  }
`;
