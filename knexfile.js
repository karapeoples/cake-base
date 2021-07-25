// Update with your config settings.

module.exports = {
	development: {
		client: 'sqlite3',
		connection: { filename: './data/tasty.db3' },
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys = ON', done)
			},
		},
	},

	testing: {
		client: 'sqlite3',
		connection: {
			filename: './data/tasty_test.db3',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys=ON', done)
			},
		},
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		 ssl: {
		require: true,
    rejectUnauthorized: false
  },
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},
}
