//chetan
var http = require('http');
var express = require('express');
var path = require('path');
var sessions = require('express-session');
var bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000;
var app = express();
var session;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(sessions({
    secret : 'winterishere',
    resave : false,
    saveUninitialized : true
}));

app.get('/', function(req,res){
    res.sendFile('ashish.html',{root : path.join(__dirname)});
});



app.get('/login', function(req,res){
    res.sendFile('hpage.html',{root : path.join(__dirname)});
});

app.post('/login', function(req,res){
    session = req.session;
  //  res.end(JSON.stringify(req.body));
    if(req.body.username == 'chetan')  {
        session.uniqueID = req.body.username;
       }

    res.redirect('/redirects');
    console.log(session);
});

app.get('/redirects', function(req,res){
    session = req.session;
    if(session.uniqueID ){
     var ch =     '<a href="/logout">logout</a>';
     res.send(ch);
    } 
    else {   
            res.redirect('/login');      
    }
});

app.post('/upload', function(req,res){
    /*if(Object.keys(req.files).length == 0){
        res.send('No file uploaded');
    }
    else {
        let uploadedFile = req.files.picture;
        var dirc = '/albus/' + 'fg.jpg';
        uploadedFile.mv(dirc, function(err){
            if (err)
               console.log("error occured");
            res.send('file uploaded');
        });
    }*/
    var filenam =  req.body.username;


    req.files.picture.mv(filenam, function(err){
         if (err){
           res.send('file uploaded');
         }
           console.log('error occured');
         else {
             res.send('file uploaded');
             console.log('file uploaded');
         }
    })
});


app.get('/logout', function(req,res){
    req.session.destroy(function(error){
        if (error) throw error;
          console.log(error);
    });
    res.redirect('/login');
})
app.listen(port, function() {
    console.log('Hey, there ! chetan');
    //chetan
});
