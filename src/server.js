import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import bodyParser from 'body-parser'
import session from 'express-session'
import * as sapper from '@sapper/server'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const SequelizeStore = require('connect-session-sequelize')(session.Store)

import { User, sequelize } from './model.js'

const sessionStore = new SequelizeStore({
  db: sequelize
})

//sessionStore.sync() //first time, initialize sessions table

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

passport.use(new LocalStrategy({
	usernameField: 'email',
  passwordField: 'password'
}, async function (email, password, done) {
	if (!email || !password ) {
		done('Email and password required', null)
		return
	}

	const user = await User.findOne({ where: {email: email}})

	if (!user) {
		done('User not found', null)
		return
	}

	const valid = await user.isPasswordValid(password)

	if (!valid) {
		done('Email and password do not match', null)
		return
	}

	done(null, user)
}))

passport.serializeUser((user, done) => {
	done(null, user.email)
})

passport.deserializeUser((email, done) => {
	User.findOne({ where: {email: email}}).then(user => {
		done(null, user)
	})
})

polka() // You can also use Express
  .use(
    session({
			secret: '343ji43j4n3jn4jk3n', //enter a random string here
			resave: false,
			saveUninitialized: true,
			name: 'rpnsvelte',
			cookie: {
				maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
      },
      store: sessionStore
    }),
    bodyParser.json(),
    passport.initialize(),
		passport.session(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: req => {
        return ({
          user: req.session && req.session.passport && req.session.passport.user
        })
      }
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
