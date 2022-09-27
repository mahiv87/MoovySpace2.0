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
		rankedMovies: [MovieRanking]!
		moovyFriends: [User]!
		sentFriendRequests: [User]!
		receivedFriendRequests: [User]!
		notifications: Boolean
	}

	type Ranking {
		author: User
		ranking: Int
		review: String
		createdAt: String
	}

	type Movie {
		_id: ID
		movieId: Int
		title: String
		description: String
		image: String
		backdrop: String
		trailer: String
		createdAt: String
		rankings: [Ranking]!
	}

	type MovieRanking {
		movie: Movie
		ranking: Ranking
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
		# movies(username: String!): [Movie]
		# movie(movieId: String!): Movie
		allMovies: [Movie]
		movieDetails(movieId: _id): Movie
		me: User

		rankedMovies(username: String): [MovieRanking]
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		saveMovie(movie: inputMovie!): User
		likeMovie(movie: inputMovie!): User
		favoriteMovie(movie: inputMovie!): User
		# removeMovie(movieId: Int!): User
		# unlikeMovie(movieId: Int!): User
		# unfavoriteMovie(movieId: Int!): User
		removeMovie(movieId: ID!): User
		unlikeMovie(movieId: ID!): User
		unfavoriteMovie(movieId: ID!): User

		giveMoovyRank(ranking: Int!, movie: inputMovie!, review: String): User
		sendFriendRequest(userId: ID!, friendId: ID!): User
		toggleFriendResponse(action: String!, userId: ID!, friendId: ID!)
		toggleNotifications(userId: ID!): User
	}
`;

module.exports = typeDefs;
