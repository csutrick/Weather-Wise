const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    favorites: [String]!
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
    addProfile(name: String!): Profile
    addFavorite(profileId: ID!, favorite: String!): Profile
    removeProfile(profileId: ID!): Profile
    removeFavorite(profileId: ID!, favorite: String!): Profile
  }
`;

module.exports = typeDefs;
