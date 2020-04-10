import bodyParser from 'body-parser'
import mongoose from 'mongoose'

//connect to the db

mongoose.connect('mongodb+srv://test:test@todo-dxygg.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true })

//create a schema - like a blueprint

let todoSchema = new mongoose.Schema({ //schema - schemat
    item: String //what mongoose/mongoDB should expect from us
})

let Todo = mongoose.model('Todo', todoSchema) //capital cause its module
//i guess that mongo takes name 'Todo' make it lower capital and add 's' -> 'todos' ???

/*let itemOne = Todo({item: 'buy flowers'}).save((err) => { //new item when launch
    if(err) throw err;
    console.log('item saved')
})*/

//let data = [{item: 'get milk'}, {item: 'walk dog'}, {item:'kick some coding ass'}] //dummy data

const urlencodedParser = bodyParser.urlencoded({extended: false}) //prepare parser to forms

export const todoController = (app) => {
    app.get('/todo',  (req, res) => {
        //get data from mongo andd pass it to view
        Todo.find({}, (err, data) => {
            if(err) throw err;
            res.render('todo', {todos: data})
        }) //we want get all items in collection - 1st param - empty object
        //res.render('todo', {todos: data}) //now we'd like to render as a callback from db get
    })

    //ajax handle submit form and make http post request first! assets/todo-list.js
    app.post('/todo', urlencodedParser, (req, res) => {
        //console.log('app.post')
        //get data from view and add it to mongodb
        Todo(req.body).save((err, data)=>{
            if(err) throw err;
            res.json(data)
        })
        //data.push(req.body) 
        //res.json({todos: data})
    })
    //ajax handle li click and make http delete request first! assets/todo-list.js
    app.delete('/todo/:item',  (req, res) => {
        //console.log('app.delete')
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            //in param we have todo with hyphen, in db with space - that's why its nec to replace
            // /g is global param, /gi - case-insensitive
            if (err) throw err;
            res.json(data);
        })
        /*
        data = data.filter((todo)=> {
            return todo.item.replace(/ /g, '-') !== req.params.item
        })
        res.json(data)
        */
        //res.json({todos: data})
    })

}