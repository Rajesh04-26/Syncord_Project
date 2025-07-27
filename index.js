const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

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

 //Home route
app.get('/', (req, res) => {
  res.render('home.ejs');
});

 //Index route
app.get('/chats' , async(req,res) => {
    let chats = await Chat.find();
    res.render("index.ejs" , { chats });
});

 //Create route
app.post('/chats' , async(req,res) => {
    try {
        const { from, to, message } = req.body;
        const newChat = new Chat({
            from,
            to,
            message,
            Created_at: new Date()
        });
        const savedChat = await newChat.save();
        console.log(savedChat); 
        res.redirect('/chats');
    } catch (err) {
        console.error("Error saving chat:", err);
        res.status(500).send("Internal Server Error");
    }
});

 //Edit route
app.get('/chats/:id/edit' , async(req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs' , { chat });
});

 //Update route
app.put('/chats/:id' , async(req,res) => {
    let {id} = req.params;
    let { msg : newMsg } = req.body;
    let updateChat = await Chat.findByIdAndUpdate( 
        id,
        { message : newMsg },
        { runValidators : true , new : true }
    );
    console.log(updateChat);
    res.redirect('/chats');
});

 //Delete route
app.delete('/chats/:id' , async(req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats')
});

const port = 8000;
app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});