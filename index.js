const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');
const ExpressError = require('./views/ExpressError.js')

main()
.then((res) => {
    console.log("Connection Successful.");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Syncord');
}

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));

 //asyncWrap function()
function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}

 //Home route
app.get('/', (req, res) => {
  res.render('home.ejs');
});

 //Index route
app.get('/chats' , asyncWrap(async(req,res) => {
    let chats = await Chat.find();
    res.render("index.ejs" , { chats });
}));

 //Show route
app.get('/chats/:id' , asyncWrap(async(req,res,next) => {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
         next(new ExpressError(404, "Chat not found"));
        }
        res.render("show.ejs" , { chat });
}));

 //Create route
app.post('/chats' , asyncWrap(async(req,res) => {
        const { from, to, message } = req.body;
        const newChat = new Chat({
            from,
            to,
            message,
            Created_at: new Date()
        });
        const savedChat = await newChat.save();
        res.redirect('/chats');
}));

 //Edit route
app.get('/chats/:id/edit' , asyncWrap(async(req,res) => {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render('edit.ejs' , { chat });
}));

 //Update route
app.put('/chats/:id' , asyncWrap(async(req,res) => {
        let {id} = req.params;
        let { msg : newMsg } = req.body;
        let updateChat = await Chat.findByIdAndUpdate( 
    
            id,
            { message : newMsg },
            { runValidators : true , new : true }
        );
        console.log(updateChat);
        res.redirect('/chats');
}));

 //Delete route
app.delete('/chats/:id' , asyncWrap(async(req,res) => {
        let {id} = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect('/chats')
}));


 //MONGOOSE ValidationErr Handling middleware
const handleValidationErr = (err) => {
    console.log("Validation error occured.");
    console.dir(err.message);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name == "ValidationError") {
        handleValidationErr(err);
    }
    next(err);
});

 //ErrorHandling Middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Error Occured" } = err;
    res.status(status).send(message);
})

const port = 8000;
app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});