//var serverURL = "http://restclass.azurewebsites.net";
var serverURL = "http://localhost:8080";


function init(){
    console.log("Admin Page");

    GetMessages();
}

window.onload=init;
var items=[];

//object constructor for Items
function Item(code,title,price,description,category,rating,image){
this.code=code;
this.title=title;
this.price=price;
this.description=description;
this.category=category;
this.rating=rating;
this.image=image;
this.user="Alfredo";
}

function register(){    
    var code=$('#txt_code').val();
    var title=$('#txt_title').val();
    var price=$('#txt_price').val();
    var description=$('#txt_description').val();
    var category=$('#txt_category').val();
    var rating=$('#txt_rating').val();
    var image=$('#txt_image').val();

    var NewItem=new Item(code,title,price,description,category,rating,image);
    items.push(NewItem);
    console.log(NewItem);

    //send the object to a server

    $.ajax({
        url:serverURL+"/api/products",
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify(NewItem),
        success:function(response){
            //alert the user
            console.log("Data Saved, Server responsed with",response);
            clearForm();
            $('#alert').removeClass("hide");

            //set a timer to execute some actions
            setTimeout(function(){
                $('#alert').addClass("hide");
            },10000);

        },
        error:function(details){
            console.log("Error, something went wrong",details);
        }

    }
    );
}

function GetMessages(){
    $.ajax({
        url:serverURL+"/api/contact/Alfredo",
        type:"GET",
        success:function(res){
            console.log("Server responded OK",res);
            //filter and only get my items to ITEMS array
            /**
             * Travel the array
             * get each item inside the array
             * compare the item.user with your name
             * if equal, add the items to items array
             */
            var comments_div=$('#Messages_div');

             for(var i=0;i<res.length;i++){
                $('#Messages_div').append(`<div class="card comments">
                <div class="card-body">
                Name:${res[i].Name}
                </br>
                Email:${res[i].Email}
                </br>
                Comment:<p>${res[i].Comments}</p>

                </div
                </div>`)
                 
             }

             

        },
        error:function(error){
            console.log("Error on request",error);

        }
    });
}

function clearForm(){
    $('#txt_code').val("");
    $('#txt_title').val("");
    $('#txt_price').val("");
    $('#txt_description').val("");
    $('#txt_category').val("");
    $('#txt_rating').val("");
    $('#txt_image').val("");
}

function solveHomework(){

    var data = [
        {
            age: 99,
            name: "Sergio",
            color: "Gray"
        },
        {
            age: 23,
            name: "John",
            color: "Blue"
        },
        {
            age: 27,
            name: "Alice",
            color: "Pink"
        },
        {
            age: 87,
            name: "Robert",
            color: "Gray"
        },
        {
            age: 23,
            name: "Sheldon",
            color: "Black"
        },
        {
            age: 45,
            name: "Will",
            color: "Green"
        },
        {
            age: 16,
            name: "Kevin",
            color: "Yellow"
        },
        {
            age: 37,
            name: "Liz",
            color: "Pink"
        },
        {
            age: 98,
            name: "Noah",
            color: "White"
        },
        {
            age: 31,
            name: "Alfredo",
            color: "White"
        },
        {
            age: 74,
            name: "Rhenard",
            color: "Green"
        },
        {
            age: 39,
            name: "Myk",
            color: "Blue"
        },
    ];

    var Person=data[i];
        var oldest=data[0];
        var youngest=data[0];
        var sum_all_ages=0;
    for(var i=0;i<data.length;i++){

        sum_all_ages=sum_all_ages+ data[i].age;
        if(data[i].age>oldest.age){
            oldest=data[i];
        }

        if(data[i].age<youngest.age){
            youngest=data[i];
        }

    }

    console.log("Olderst",oldest);
    console.log("Youngest",youngest);
    console.log("Sum all Ages",sum_all_ages);

    //1 - Who (name - age) is the oldest
    //2 - Who (name - age) is the youngest
    //3 - Sum of All ages 

    /*Required read about
    HTTP Methods (GET, POST, PUT, PATCH , DELETE)
    HTTP Status Codes
    */


}

$("#btn_register").on( "click", function(){
    register();
});