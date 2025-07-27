const mongoose = require('mongoose');
const Chat = require('./models/chat');

main()
.then((res) => {
    console.log("Connection Successful.");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Syncord');
}

let allChats = [
    {
        from : "Raj",
        to : "Ritu",
        message : "Send me the project details.",
        Created_at : new Date()
    },
    {
        from: "Aman",
        to: "Neha",
        message: "Can you check the report?",
        Created_at: new Date()
    },
    {
        from: "Priya",
        to: "Karan",
        message: "Let's catch up after lunch.",
        Created_at: new Date()
    },
    {
        from: "Sahil",
        to: "Meera",
        message: "Meeting postponed to 4 PM.",
        Created_at: new Date()
    },
    {
        from: "Divya",
        to: "Arjun",
        message: "Where is the design file?",
        Created_at: new Date()
    },
    {
        from: "Karan",
        to: "Divya",
        message: "Just sent it on mail.",
        Created_at: new Date()
    },
    {
        from: "Ritu",
        to: "Raj",
        message: "I’ll send it in 10 minutes.",
        Created_at: new Date()
    },
    {
        from: "Aman",
        to: "Sahil",
        message: "Great job on the presentation!",
        Created_at: new Date()
    },
    {
        from: "Neha",
        to: "Aman",
        message: "Thanks! Couldn't have done it without your input.",
        Created_at: new Date()
    },
    {
        from: "Shruti",
        to: "Ritu",
        message: "Can we schedule a quick call?",
        Created_at: new Date()
    },
    {
        from: "Meera",
        to: "Karan",
        message: "Did you fix the bug?",
        Created_at: new Date()
    },
    {
        from: "Raj",
        to: "Neha",
        message: "What’s the status of task #34?",
        Created_at: new Date()
    },
    {
        from: "Divya",
        to: "Sahil",
        message: "Let’s finalize the UI today.",
        Created_at: new Date()
    },
    {
        from: "Neha",
        to: "Meera",
        message: "I’ll be a little late today.",
        Created_at: new Date()
    },
    {
        from: "Arjun",
        to: "Aman",
        message: "Join the Zoom in 5.",
        Created_at: new Date()
    },
    {
        from: "Karan",
        to: "Priya",
        message: "You free for a coffee?",
        Created_at: new Date()
    },
    {
        from: "Sahil",
        to: "Priya",
        message: "Send me the client feedback.",
        Created_at: new Date()
    },
    {
        from: "Meera",
        to: "Divya",
        message: "Need help with the budget report.",
        Created_at: new Date()
    },
    {
        from: "Raj",
        to: "Arjun",
        message: "Did you get the vendor quotes?",
        Created_at: new Date()
    },
    {
        from: "Priya",
        to: "Neha",
        message: "Lunch at 1?",
        Created_at: new Date()
    }
];

Chat.insertMany(allChats);