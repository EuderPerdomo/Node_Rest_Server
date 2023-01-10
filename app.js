
//import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
//dotenv.config()

require('dotenv').config()

const Server = require('./models/server')
//import { server } from './models/server.js'

const server=new Server()
server.listen()




