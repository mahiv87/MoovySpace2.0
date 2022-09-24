const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		savedMovies: [Movie]!
		likedMovies: [Movie]!
		favoriteMovies: [Movie]!
		rankedMovies: [Movie]!
		moovyFriends: [User]!
		notifications: Boolean
	}

	type Ranking {
		rankId: Int
		author: User
		ranking: Int
		createdAt: String
	}

	type Movie {
		movieId: Int
		title: String
		description: String
		image: String
		backdrop: String
		trailer: String
		createdAt: String
		rankings: [Ranking]!
		moovyStars: Int
	}

	input inputMovie {
		movieId: Int
		title: String
		description: String
		image: String
		backdrop: String
		trailer: String
		createdAt: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		user(username: String!): User
		movies(username: String!): [Movie]
		movie(movieId: String!): Movie
		me: User

		userMoovyFriends(username: String): [User]
		rankedMovies(username: String): [Movie]
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		saveMovie(movie: inputMovie!): User
		likeMovie(movie: inputMovie!): User
		favoriteMovie(movie: inputMovie!): User
		removeMovie(movieId: Int!): User
		unlikeMovie(movieId: Int!): User
		unfavoriteMovie(movieId: Int!): User

		giveMoovyStars(userId: ID!, ranking: Int!, movieId: Int!): User
		addMoovyFriend(userId: ID!, friendId: ID!): User
		toggleNotifications(userId: ID!): User
	}
`;

module.exports = typeDefs;
