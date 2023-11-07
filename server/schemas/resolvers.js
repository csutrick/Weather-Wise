const { Profile } = require('../models');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
  },

  Mutation: {
    addProfile: async (parent, { name }) => {
      return Profile.create({ name });
    },
    addFavorite: async (parent, { profileId, favorite }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { favorites: favorite },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    removeFavorite: async (parent, { profileId, favorite }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { favorites: favorite } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
