//chetan
var http = require('http');
var express = require('express');
var path = require('path');
var sessions = require('express-session');
var bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000;
const fileUpload = require('express-fileupload');
var app = express();

var session;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(sessions({
    secret : 'winterishere',
    resave : false,
    saveUninitialized : true
}));

app.get('/', function(req,res){
    res.sendFile('uploadForm.html',{root : path.join(__dirname)});
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

app.post('/upload', function(req,res) {
      let sampleFile;
      let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname  + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
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
