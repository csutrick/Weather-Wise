const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Profile {
        _id: ID
        name: String
        email: String
        password: String
        favorites: [String]!
    }

    type Auth {
        token: ID!
        profile: Profile
    }

    type Query {
        profiles: [Profile]!
        profile(profileId: ID!): Profile
    }

    type Mutation {
        addProfile(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        addFavorite(profileId: ID!, favorite: String!): Profile
        removeProfile(profileId: ID!): Profile
        removeFavorite(profileId: ID!, favorite: String!): Profile
    }
`;

module.exports = typeDefs;
