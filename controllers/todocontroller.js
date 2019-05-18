var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connet to database
mongoose.connect('mongodb+srv://rishsinghal:test@cluster0-30zu4.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

// schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item: 'get milk'},{item: 'walk'},{item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo',function(req,res){
        //get data from mongodb
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});
        });
    });

    app.post('/todo',urlencodedParser,function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
}