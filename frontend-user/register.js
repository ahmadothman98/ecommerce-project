document.querySelector("#register").addEventListener('click',function(){
    var name = document.querySelector('#user_name').value;
    var email = document.querySelector('#email').value;
    var phone = document.querySelector('#phone_number').value;
    var password = document.querySelector('#password').value;
    var password_confirm = document.querySelector('#password_confirm').value;
    if(password === password_confirm){
        var data = new FormData;
        data.append('name', name);
        data.append('email' , email);
        data.append('password', password);
        data.append('phone_number',phone);
        data.append('password_confirmation',password_confirm);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/register',
            data : data
        })
        .then(function(response){
            window.location.href="./login.html";
    
        }).catch(function(e){
            throwError(e);
    
        })
    }
    else{
        alert("Password doesnt match confirmation")
    }

})
function throwError(e){
    if(e.response['status'] === 400){
        alert("incorrect format");
        window.blur();

    }
    else{
        alert("something went wrong")
    }
}
document.querySelector('#email').addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.querySelector("#login").click();
    }
  }); 
  document.querySelector('#password').addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.querySelector("#login").click();
    }
  }); 