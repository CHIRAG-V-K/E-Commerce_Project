// to add image data

// function chirag(){
//     let data = [{"iid":"1","iname":"lap1.jpg","amount":"30000","desc":"HP Pro-Book","quantity":"1"},{"iid":"2","iname":"lap2.jpg","amount":"40000","desc":"Chrome-Book","quantity":"1"},{"iid":"3","iname":"lap3.jpg","amount":"35000","desc":"Lenovo Legion","quantity":"1"},{"iid":"4","iname":"lap4.jpg","amount":"100000","desc":"Mac-Book Pro","quantity":"1"},{"iid":"5","iname":"lap5.jpg","amount":"50000","desc":"Hp Pavillion","quantity":"1"},{"iid":"6","iname":"lap6.jpg","amount":"55000","desc":"Asus TUF Gaming","quantity":"1"},{"iid":"7","iname":"lap7.jpg","amount":"50000","desc":"Mi Note-Book","quantity":"1"},{"iid":"8","iname":"lap8.jpg","amount":"43000","desc":"Dell H5483-21G","quantity":"1"}];
    
//     localStorage.setItem("Collections",JSON.stringify(data))

// }



function registerUser(){
    let UID = ("" + Math.random()).substring(2, 10);
    let Name = document.getElementById('name').value;
    let Phone = document.getElementById('phone').value;
    let Gender = document.querySelector('input[type="radio"]:checked').value;
    let Email = document.getElementById('email').value;
    let Password = document.getElementById('pswd').value;
    let CPassword = document.getElementById('cpswd').value;

    if((Name == '')){
        alert('Enter your Name');
        document.getElementById('name').focus();
        return ;
    }
    if((Phone == '')){
        alert('Enter your Number');
        document.getElementById('phone').focus();
        return ;
    }
   
    if((Email == '')){
        alert('Enter your gmail');
        document.getElementById('email').focus();
        return ;
    }
    
    if((Password == '')){
        alert('Enter your password');
        document.getElementById('pswd').focus();
        return ;
    }
    
    if((Password != CPassword)){
        alert('Your password does not Match! Retry');
        document.getElementById('cpswd').focus();
        return ;

    }
    else {
        var numbers = /^[-+]?[0-9]+$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        
        if(!Phone.match(numbers))
        {
            alert('Enter in Valid Number format');
            document.getElementById('phone').focus();
            return ;
        }
        if(!Email.match(mailformat))
        {
            alert('Enter your mail id in the correct format');
            document.getElementById('email').focus();
            return ;
        }
        if((!Password.match(passw))){
            alert('Enter your password in the required Format : min of 8 characters, 1 Upper case, 1 Lower case, 1 special character, 1 number');
            document.getElementById('pswd').focus();
            return ;
        }
        let pastData = JSON.parse(localStorage.getItem("User") || '[]');
        
        console.log(UID);
        console.log(pastData)
        let tempObj = {"uid":UID,"name": Name,"phone": Phone,"email": Email,"password": Password,"gender": Gender};
        pastData.push(tempObj)
        localStorage.setItem("User",JSON.stringify(pastData));
        alert("Registration Successfull return to Log In Page");
    }
}


function login(){
    let email = $('#email').val();
    let password = $('#pswd').val();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if((email == '')){
        alert('Enter your gmail');
        document.getElementById('email').focus();
        return ;
    }
    if(!email.match(mailformat))
    {
        alert('Enter your mail id in the correct format');
        document.getElementById('email').focus();
        return ;
    }
    if((!password.match(passw))){
        alert('Enter your password in the required Format : min of 8 characters, 1 Upper case, 1 Lower case, 1 special character, 1 number');
        document.getElementById('pswd').focus();
        return ;
    }  

    let data =JSON.parse(localStorage.getItem("User")) ;
    if(data !== null){

        if(email !== undefined && email !== 'undefined' && email.length !== 0 && email !== ''&& password !== undefined && password !== 'undefined' && password.length !== 0 && password !== ''){
                for (let i = 0; i < data.length; i++) {
                if((email == data[i].email)&&(password == data[i].password)){
                    let sessData = [{"id":data[i].uid,"name": data[i].name}]
                    sessionStorage.setItem("currentUser",JSON.stringify(sessData));
                    alert(`Successfully logged in`);
                    window.location = "/home"
                }
                else {
                    continue;
                }
                }
            }
            else{
            alert("Invalid Data")
            }
    }
    else{
        alert("User Doesn't exist! Please Register and Try again!");
    }
    
}
// global variable
let gOTP ;
// global variable
function otp(){
    $("#messageBox").html("OTP has been Successfully sent to your Node Console")
    $.post("/otp",{},(data,status)=>{
        gOTP = data; 
    });
}

function otpVerification(){
    let email = $('#email').val();
    let otp = $('#otp').val();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var otpformat  = /^[0-9]{1,6}$/ ;
    if((email == '')){
        alert('Enter your gmail');
        document.getElementById('email').focus();
        return ;
    }
    if((otp == '')){
        alert('Enter your OTP');
        document.getElementById('otp').focus();
        return ;
    }
    if(!email.match(mailformat))
    {
        alert('Enter your mail id in the correct format');
        document.getElementById('email').focus();
        return ;
    }
    if(!otp.match(otpformat))
    {
        alert('Enter your 6 Digit OTP');
        document.getElementById('otp').focus();
        return ;
    }
    let uData =JSON.parse(localStorage.getItem("User")) ;
    if(uData !== null){
        if(email !== undefined && email !== 'undefined' && email.length !== 0 && email !== ''&& otp !== undefined && otp !== 'undefined' && otp.length !== 0 && otp !== ''){
                for (let i = 0; i < uData.length; i++) {
                  if(email == uData[i].email){
                    if(gOTP == otp){
                        let sessData = [{"id":uData[i].uid,"name": uData[i].name}]
                        sessionStorage.setItem("currentUser",JSON.stringify(sessData));
                        alert(`Successfully logged in`);
                        window.location = "/home"
                    }
                    else{
                        alert("Invalid OTP")
                    }
                  }
                  else {
                    continue;
                  }
                }
              }
              else{
               alert("Invalid Details")
              }
        }
        else{
            alert("User Doesn't exist! Please Register and Try again!");
        }
   
 
}



function home(){
    let sess = JSON.parse(sessionStorage.getItem("currentUser"));
    // console.log(sess.length)
    if(sess.length == 1){
        // console.log("in session")
        let data = [{"iid":"1","iname":"lap1.jpg","amount":"30000","desc":"HP Pro-Book","quantity":"1"},{"iid":"2","iname":"lap2.jpg","amount":"40000","desc":"Chrome-Book","quantity":"1"},{"iid":"3","iname":"lap3.jpg","amount":"35000","desc":"Lenovo Legion","quantity":"1"},{"iid":"4","iname":"lap4.jpg","amount":"100000","desc":"Mac-Book Pro","quantity":"1"},{"iid":"5","iname":"lap5.jpg","amount":"50000","desc":"Hp Pavillion","quantity":"1"},{"iid":"6","iname":"lap6.jpg","amount":"55000","desc":"Asus TUF Gaming","quantity":"1"},{"iid":"7","iname":"lap7.jpg","amount":"50000","desc":"Mi Note-Book","quantity":"1"},{"iid":"8","iname":"lap8.jpg","amount":"43000","desc":"Dell H5483-21G","quantity":"1"}];
        localStorage.setItem("Collections",JSON.stringify(data));

        let message = 'Welcome to Rhibhus Shopping "'+sess[0].name+'"';
        $("#messageBox").html(message);
        let cdata = JSON.parse(localStorage.getItem("Collections"));
        let cardBoxItem = '';
       
        for(i=0;i<cdata.length;i++){
            cardBoxItem += '<div class="container col-3 ps-5  mt-3"><div class="card" id="card'+cdata[i].iid+'" style="width:300px"><img class="card-img-top" src="assets/images/collections/'+cdata[i].iname+'" alt="Card image" style="width:100%"><div class="card-body"><h3 class="card-title">'+cdata[i].desc+'</h3><p class="card-text small">Rs '+cdata[i].amount+'</p><div class="input-group w-auto justify-content-end align-items-center pb-2"><label id="lbl" for="number">Select Quantity :</label><input type="number" step="1"  max="10" value="'+cdata[i].quantity+'" name="quantity" id="quantity'+cdata[i].iid+'" class="quantity-field border-0 text-center w-25"></div><button  id="cartBtn" onclick="addToCart('+cdata[i].iid+')" class="btn btn-primary float-end ">Add to Cart</button></div></div></div>'
        }
        document.getElementById("cardBox").innerHTML =  cardBoxItem;
    }
    else{
        window.location = "/"
    }
    $("#accountName").html(sess[0].name)
}


function addToCart(iid){
    let data = JSON.parse(localStorage.getItem("Collections"));
    let sess = JSON.parse(sessionStorage.getItem("currentUser"));
    let userid = sess[0].id;
    let quantity = $("#quantity"+iid).val();
    
    let item;
    for (let i = 0; i < data.length; i++) {
        if(data[i].iid==iid){
            // console.log(data[i]);
            item = data[i];
            item["username"] = userid;
            item["quantity"] = quantity;

            let pastCartInfo = JSON.parse(localStorage.getItem("Cart") || '[]');
            pastCartInfo.push(item);
            localStorage.setItem("Cart",JSON.stringify(pastCartInfo));
            alert("Item added to your cart Successfully")
        }
        else{
            continue;
        }
    }
 
}


function cart(){
    let sess = JSON.parse(sessionStorage.getItem("currentUser"));
    if(sess.length == 1){
        $("#accountName").html(sess[0].name)
        let cartData = JSON.parse(localStorage.getItem("Cart"));
        let userid = sess[0].id;
        let cardBoxItem = '';
        let total = 0;
        for (let i = 0; i < cartData.length; i++) {
            if(cartData[i].username == userid){
                cardBoxItem += '<div class="container col-3 ps-5  mt-3"><div class="card" id="card'+cartData[i].iid+'" style="width:300px"><img class="card-img-top" src="assets/images/collections/'+cartData[i].iname+'" alt="Card image" style="width:100%"><div class="card-body"><h3 class="card-title">'+cartData[i].desc+'</h3><p class="card-text small">Rs '+cartData[i].amount+'</p><div class="input-group w-auto justify-content-end align-items-center pb-2"><label id="lbl" for="number">Select Quantity :</label><input type="number" step="1" min="1"  max="10" value="'+cartData[i].quantity+'"  name="quantity"  onchange="update('+cartData[i].iid+')" id="quantity'+cartData[i].iid+'" class="quantity-field border-0 text-center w-25"></div><button  id="removeCartBtn" onclick="deleteFromCart('+cartData[i].iid+')" class="btn btn-primary float-end ">Remove from Cart</button></div></div></div>';
                
                if(cartData[i].quantity>1){
                    for (let j = 0; j < cartData[i].quantity; j++) {
                        total += parseInt(cartData[i].amount);   
                    }
                }
                else{
                    total += parseInt(cartData[i].amount);
                }
            }
            else{
                continue;
            }
        }
        if(cardBoxItem.length == 0){
            document.getElementById("cardBox").innerHTML = '<center>    <h1>Your Cart is Empty</h1>    </center>'
        }
        else{
            document.getElementById("cardBox").innerHTML = cardBoxItem;
            document.getElementById("total").value = total;
        }
        
        
    }
    else{
        alert("Denied Access")
    }
}

function update(iid){
    let cartData = JSON.parse(localStorage.getItem("Cart"));
    let sess = JSON.parse(sessionStorage.getItem("currentUser"));

    for (let i = 0; i < cartData.length; i++) {
        if(cartData[i].iid == iid && sess[0].id == cartData[i].username){
            cartData[i].quantity = $("#quantity"+iid).val();
            localStorage.setItem("Cart",JSON.stringify(cartData));
            cart();
        }
        else{
            continue;
        }
        
    }
}




function deleteFromCart(iid){
    let data = JSON.parse(localStorage.getItem("Cart"));
    let sess = JSON.parse(sessionStorage.getItem("currentUser"));
    let userid = sess[0].id;
    console.log(data)
    console.log(userid)
    for (let i = 0; i < data.length; i++) {
        if (data[i].username == userid && data[i].iid == iid) {
            data.splice(i,1);
        }
        else{
            continue;
        }
    }
    localStorage.setItem("Cart",JSON.stringify(data));
    window.location.reload();

}



function logout(){
    sessionStorage.clear();
    window.location = "/"
}






























































