// GOOGLE
function onSignIn(googleUser) {

    const idtoken = googleUser.getAuthResponse().id_token;

    const res = axios.post("/auth/google", {
        idtoken: idtoken,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })

    if (res) {
        Swal.fire({
            type: "success",
            text: "Effettuato login con successo!",
            icon: 'success'
        })
    } else {
        Swal.fire({
            type: "error",
            text: "Ci è stato un problema con il login!",
            icon: 'error'
        })
    }


    const profile = googleUser.getBasicProfile();
    console.log('IDasdasdas: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $("#contentGoogle > .id").text(profile.getId());
    $("#contentGoogle > .name").text(profile.getName());
    $("#contentGoogle > .url").text(profile.getImageUrl());
    $("#contentGoogle > .email").text(profile.getEmail());
}






// FACEBOOK
function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
    console.log("statusChangeCallback: ", response); // The current login status of the person.
    if (response.status === 'connected') { // Logged into your webpage and Facebook.
        testAPI();
    } else { // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}

function checkLoginState() { // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) { // See the onlogin handler
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '236249524903916',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: 'v10.0' // Use this Graph API version for this call.
    });

    FB.getLoginStatus(function(response) { // Called after the JS SDK has been initialized.
        statusChangeCallback(response); // Returns the login status.
    });
};

function testAPI() { // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + Object.keys(response));

        const res = axios.post('/auth/facebook', {
            data: {
                socialID: response.id,
                name: response.name,
                social: 'facebook'
            },
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (res) {
            Swal.fire({
                type: "success",
                text: "Effettuato login con successo!",
                icon: 'success'
            })
        } else {
            Swal.fire({
                type: "error",
                text: "Ci è stato un problema con il login!",
                icon: 'error'
            })
        }


        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}