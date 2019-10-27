

function saveMessage(){
    
    // read data

    var Name=$('#txt_name').val();
    var Email=$('#txt_email').val();
    var Comments=$('#txt_comments').val();    

    //create an object
    var item = 
        {
            Name:Name,
            Email:Email,
            Comments:Comments,
            user:"Alfredo"
        };

        console.log(item);

    //send the object to back end

    $.ajax({
        url:"/api/contact",
        type:"POST",
        data:JSON.stringify(item),
        contentType:'application/json',
        success:function(res){
            console.log("Server says",res);

        },
        error:function(error){
            console.log("Error saving message",error);
        }
    });

    // $.ajax({
    //     url:serverURL+"/api/products",
    //     type:"POST",
    //     contentType:"application/json",
    //     data:JSON.stringify(item),
    //     success:function(response){
    //         //alert the user
    //         console.log("Data Saved, Server responsed with",response);
    //         clearForm();
    //         $('#alert').removeClass("hide");

    //         //set a timer to execute some actions
    //         setTimeout(function(){
    //             $('#alert').addClass("hide");
    //         },10000);

    //     },
    //     error:function(details){
    //         console.log("Error, something went wrong",details);
    //     }

    // }
    // );
}

function clearForm(){
    $('#txt_name').val("");
    $('#txt_email').val("");
    $('#txt_comments').val("");  
    
}
function init(){
    console.log("contact page!");

    $('#btn_send_contact').click(saveMessage);
}
window.onload=init;