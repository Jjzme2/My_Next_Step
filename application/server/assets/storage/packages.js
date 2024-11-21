const packages = [

  // Client
  {
    name: 'Vite',
    description: 'Frontend build tool',
    application_part: 'client',
    link: 'https://vitejs.dev/',
  }
  ,
  {
    name: 'Vue',
    description: 'Frontend framework',
    application_part: 'client',
    link: 'https://vuejs.org/',
  }

  // Server
  ,
  {
    name: 'Express',
    description: 'Web framework for Node.js',
    application_part: 'server',
    link: 'https://expressjs.com/',
  },
  {
    name: 'Body-Parser',
    description: 'Middleware for parsing incoming request bodies',
    application_part: 'server',
    link: 'https://www.npmjs.com/package/body-parser',
  },
  {
    name: 'EJS',
    description: 'Templating engine for Node.js',
    application_part: 'server',
    link: 'https://ejs.co/',
  },
  {
    name: 'PG',
    description: 'PostgreSQL client for Node.js',
    application_part: 'server',
    link: 'https://node-postgres.com/',
  },
  {
    name: 'Nodemon',
    description: 'Utility that automatically restarts the server when changes are made',
    application_part: 'server',
    link: 'https://nodemon.io/',
  },
  {
    name: 'EJS-Lint',
    description: 'Linter for EJS templates',
    application_part: 'server',
    link: 'https://www.npmjs.com/package/ejs-lint',
  },
  {
    name: 'Dotenv',
    description: 'Utility that loads environment variables from a .env file',
    application_part: 'server',
    link: 'https://www.npmjs.com/package/dotenv',
  },
  {
    name: 'FS',
    description: 'File system module for Node.js',
    application_part: 'server',
    link: 'https://nodejs.org/api/fs.html',
  },
  {
    name: 'JS-YAML',
    description: 'YAML parser and serializer for Node.js',
    application_part: 'server',
    link: 'https://www.npmjs.com/package/js-yaml',
  },
  {
    name: 'Markdown-It',
    description: 'Markdown parser for Node.js',
    application_part: 'server',
    link: 'https://markdown-it.github.io/',
  },
  {
	name: 'Bcrypt',
	description: 'Password hashing library',
	application_part: 'server',
	link: 'https://www.npmjs.com/package/bcrypt',
  },
]

module.exports = packages;