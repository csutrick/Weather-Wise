import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($profileId: ID!, $favorite: String!) {
    addFavorite(profileId: $profileId, favorite: $favorite) {
      _id
      name
      favorites
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($profileId: ID!, $favorite: String!) {
    removeFavorite(profileId: $profileId, favorite: $favorite) {
      _id
      name
      favorites
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;
