var http=require("http");
var express=require("express");

var app=express();



/**
 * CONFIGURATION
 */

 //enable CORS security
 app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



//read req body as obj

var bodyParser=require("body-parser");
app.use(bodyParser.json());

// to server HTML content
var ejs=require("ejs");
app.set("views",__dirname+"/public");
app.engine('html',ejs.renderFile);
app.set("view engine",ejs);

//To serve static files
app.use(express.static(__dirname+"/public"));


//Mongoose connection
var mongoose=require("mongoose");
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var db=mongoose.connection;

 //DB obj constructor
 var ItemDB;
 var ContactDB;

 /** The Allowed SchemaTypes are:
  * String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array
  */

 //define an schema for the collection (table)
 var itemSchema=mongoose.Schema({
     code:String,
     title:String,
     price:Number,
     description:String,
     category:String,
     rating:Number,
     image:String,
     user:String
 });

 var ContactSchema=mongoose.Schema({
     Name:String,
     Email:String,
     Comments:String,
     user:String
 });

 //create constructor(s) for the schema(s)
 ItemDB=mongoose.model("itemCH5",itemSchema);

 ContactDB=mongoose.model("messagesCH5",ContactSchema);



//catch error on mongo connection
db.on('error',function(error){
    console.log("** Error connecting to MongoDB");
});



//catch susccess on mongo connection
db.on('open',function(){
    console.log("DB is Live!!");
})
/**
 * WEB SERVER FUNCTIONALITY
 */

 
app.get('/',function(req,res){
    res.render('index.html');

});

app.get("/contact",function(req,res){
    res.render("contact.html");
});

app.get("/about",function(req,res){
    res.send("My Name is Alfredo Calderon");
});

app.get('/catalog',function(req,res){
    res.render('index.html');

});

app.get('/admin',function(req,res){
    res.render('admin.html');

});

app.listen(8080, function(){
    console.log("Server running at http://localhost:8080");

});

/**
 * API FUNCTIONALITY
 */

 var items=[];
 var count=0;

 app.get('/api/products',function(req,res){
     console.log("User wants the catalog");
     //res.json(items);
     ItemDB.find({},function(error,data){
         if(error){
             console.log("** Error on retrieving", error);
             res.status(500);
             res.send(error);// this is return
         }

         res.status(200);
         res.json(data);

     });
 });

 app.get('/api/products/:user',function(req,res){
     var name=req.params.user;

     ItemDB.find({user:name},function(error,data){
        if(error){
            console.log("** Error on filtering", error);
            res.status(500);
            res.send(error);// this is return
        }
        res.status(200);
        res.json(data);
    });

 });

 app.post('/api/products',function(req,res){
    console.log("User wants to save item");

    //read the item
    var item=req.body;
    console.log(item);

    //perform validation

    //create a DB object
    var ItemForMongo=ItemDB(item);
    

    ItemForMongo.save(function(error,savedItem){
        if(error){
            console.log("** Error Saving item to DB",error);
            res.status(500)//Internal server error
            res.send(error); // This is a Return
        }

        //No error , send the saved item back to client
        console.log("Item Saved Correctly!");
        res.status(201);
        res.json(savedItem);

    });

    //assign unique id

    // item.id=count;
    // count++;

    //store and send back the item
    //.push(item);
    //res.send(item);
});

app.get('/api/contact/:user',function(req,res){
    console.log("User wants to see Contact Messages");
    var user=req.params.user;
    ContactDB.find({user:user},function(error,data){
        if(error){
            console.log("** Error on retrieving", error);
            res.status(500);
            res.send(error);// this is return
        }

        res.status(200);
        res.json(data);

    });
});

app.post("/api/contact",function(req,res){
    var msg=req.body;
    console.log("New Message from",msg.Name);

    var Contact_For_Mongo=ContactDB(req.body);
    Contact_For_Mongo.save(function(error,savedMsg){
        if(error){
            console.log("Error saving Contact Msg",error);
            res.status(500);
            res.send(error);
        }
        res.status(201)//created
        res.json(savedMsg);

    });
    

});