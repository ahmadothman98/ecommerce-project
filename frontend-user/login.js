document.querySelector("#login").addEventListener('click',function(){
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var data = new FormData;
    data.append('email' , email);
    data.append('password', password);
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/login',
        data : data
    })
    .then(function(response){
        localStorage.setItem('access_token',response.data['access_token']);
//        console.log(localStorage.getItem('access_token'));
        window.location.href="./index.html";
    }).catch(function(e){
        throwError(e);

    })
})
function throwError(e){
    if(e.response['status'] === 422){
        console.log("incorrect format");
        window.blur();

    }
    else{if(e.response['status'] === 401){
        console.log("Wrong email or password");
        window.blur();

        
    }
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