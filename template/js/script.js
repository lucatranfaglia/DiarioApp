// document.getElementById('loginbtn').addEventListener('click', loginWithFacebook, false)

// function loginWithFacebook() {
//     FB.login(async(response) => {
//         const { authResponse: { accessToken, userID } } = response

//         const res = await fetch('/login-with-facebook', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ accessToken, userID })
//         })

//         FB.api('/me', function(response) {
//             console.log('Result ' + JSON.stringify(response));

//             console.log('Successful login for: ' + response.name);
//             document.getElementById('status').innerHTML =
//                 'Thanks for logging in, ' + response.name + '!';
//         });
//         console.log('RES:', res);
//     }, { scope: 'public_profile, email' });
//     return false;
// }