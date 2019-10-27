
/** GLOBAL Variables */
//var items = ["Item 1", "Item 2", "Item 42"];

// var items = [
//     {
//         code: "askk123",
//         title: "Phone",
//         price: 123.45,
//         description: "This is the long description of a product so the client learn about it and buy it",
//         category: "Electronics",
//         rating: 4,
//         image: "images/phone.jpg"
//     },
//     {
//         code: "13224",
//         title: "PC",
//         price: 299.99,
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, exercitationem",
//         category: "Compute",
//         rating: 4,
//         image: "images/PC.jpg"
//     },
//     {
//         code: "789654",
//         title: "Speaker",
//         price: 150.10,
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, exercitationem",
//         category: "Sound",
//         rating: 4,
//         image: "images/sound.jpg"
//     }
//     ,{
//         code: "641214",
//         title: "TV",
//         price: 500.00,
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, exercitationem",
//         category: "TV",
//         rating: 4,
//         image: "images/tv.jpg"
//     }
//     ,{
//         code: "7498764",
//         title: "Sofa",
//         price: 50.50,
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, exercitationem",
//         category: "Home",
//         rating: 4,
//         image: "images/chair.jpg"
//     }
//     ];
    
var items=[];

var serverURL = "http://localhost:8080";
function getCatalogFromServer(){

    /**
     * Create a AJAX request to get the data
     * when the data its received:
     * -fill the items array
     * -call display catalog
     */

     $.ajax({
         url:serverURL+"/api/products",
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

              for(var i=0;i<res.length;i++){
                  if(res[i].user=="Alfredo"){
                      //Is my item
                      items.push(res[i]);
                  }
              }

              displayCatalog();

         },
         error:function(error){
             console.log("Error on request",error);

         }
     });

}

/**Functions */
function displayCatalog(){
    /**
     * Travel the Array
     * get each element from the array
     * display the element into the DOM (html)
     */

     for(var i=0;i<items.length;i++){
         displayItem(items[i]);
     }

}

function displayItem(product){
    //var product=items[i];
    //var pLayout="<div> <h4>"+product+"</h4></div>";
    var pLayout=`<div class="item" id="${product.code}">
    <img src="images/${product.image}">
    <h4>${product.title}</h4>
    <h6 class="itemprice">$${product.price}</h6>
    <p>Code: ${product.code}</p>
    <p>${product.description}</p>
    <div class="buttondiv">
    <button class="btn btn-primary btn-sm"><i class="fas fa-cart-plus"></i>Add to Cart</button>
    </div>
    </div>
    
    `
    //console.log(i,pLayout);
    $('#catalog').append(pLayout);
}
function init(){
    console.log("Catalog Page");
    //displayCatalog();
    $("#btn_search").click(search);
    $('#txt_search').keypress(function(e){
        if(e.key=="Enter"){
            search();
            e.preventDefault(); // prevent default action (form submit)
        }

    });
    getCatalogFromServer();
}

function search(){
    var SearchText=$('#txt_search').val();  
    console.log(SearchText);  
    
        for(var i=0;i<items.length;i++){
            if(
                items[i].title.toUpperCase().includes(SearchText.toUpperCase())
                ||items[i].code.toUpperCase().includes(SearchText.toUpperCase())
                || items[i].description.toUpperCase().includes(SearchText.toUpperCase())
                ){
                 
                $('#'+items[i].code).show();
            }
            else
            {
                $('#'+items[i].code).hide();
            }
            
        }
        if(SearchText==""){
            $('#'+items[i].code).show();
        }
}
    
    


btn_search
/**Initialization */
window.onload=init;