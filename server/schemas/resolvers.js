const { AuthenticationError } = require('apollo-server-express');
const { User, Movie } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	// Queries
	Query: {
		users: async () => {
			return User.find().populate('savedMovies').sort({ savedMovies: 'ASC'});
		},
		user: async (parent, { username }) => {
			return await User.findOne({ username }).populate('savedMovies').populate('likedMovies').populate('favoriteMovies').populate('rankedMovies').populate('moovyFriends').populate('sentFriendRequests').populate('receivedFriendRequests');
		},
		movies: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Movie.find(params).sort({ createdAt: -1 });
		},
		movie: async (parent, { movieId }) => {
			return Movie.findOne({ _id: movieId });
		},
		me: async (parent, args, context) => {
			if (context.user) {
				return await User.findOne({ _id: context.user._id }).populate('savedMovies').populate('likedMovies').populate('favoriteMovies').populate('rankedMovies').populate('moovyFriends').populate('sentFriendRequests').populate('receivedFriendRequests');
			}
			throw new AuthenticationError('You need to be logged in!');
		}
		// TODO: add queries for "userMoovyFriends" and "rankedMovies"
	},

	// Mutations
	Mutation: {
		// Add user mutation
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		// Log in mutation
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('No user found with this email address');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);

			return { token, user };
		},
		// Save movie mutation
		saveMovie: async (parent, { movie }, context) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$addToSet: {
							savedMovies: movie
						}
					},
					{
						new: true
					}
				);
			}

			throw new AuthenticationError('You need to be logged in!');
		},
		// Like movie mutation
		likeMovie: async (parent, { movie }, context) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$addToSet: {
							likedMovies: movie
						}
					},
					{
						new: true
					}
				);
			}
		},
		//Favorite movie mutation
		favoriteMovie: async (parent, { movie }, context) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$addToSet: {
							favoriteMovies: movie
						}
					},
					{
						new: true
					}
				);
			}
		},
		// Remove saved movie mutation
		removeMovie: async (parent, { movieId }, context) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$pull: { savedMovies: { movieId: movieId } }
					},
					{ new: true }
				);
			}

			throw new AuthenticationError('You need to be logged in!');
		},
		//remove liked Movie
		unlikeMovie: async (parent, { movieId }, context) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$pull: { likedMovies: { movieId: movieId } }
					},
					{ new: true }
				);
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		//remove favorite Movies
		unfavoriteMovie: async (parent, { movieId }, context) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$pull: { favoriteMovies: { movieId: movieId } }
					},
					{ new: true }
				);
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		// TODO: add mutations for "giveMoovyRank", "sendFriendRequest", "toggleFriendResponse" and "toggleNotifications"
	}

};

module.exports = resolvers;
