import express from 'express'
import {todoController} from './controllers/todoController'

const app = express()

//set up template engine

app.set('view engine', 'ejs')

//static files
app.use(express.static("./public")) //usin on evry route

todoController(app);

//listen to port
app.listen(3000)
console.log('u are listerning to port 3000')

//were going to use mvc arch
