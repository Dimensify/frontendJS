


var spanGoogleText = document.getElementsByClassName('nsm7Bb-HzV7m-LgbsSe-BPrWId');


window.addEventListener('load',(event)=>{
    spanGoogleText[0].innerText = 'Continue with Google';

})

function onSignIn(googleUser) {
    console.log("printing the information returned");
    console.log(googleUser);
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }