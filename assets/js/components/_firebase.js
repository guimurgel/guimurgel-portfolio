/*
|--------------------------------------------------------------------------
| FireBase
|--------------------------------------------------------------------------
*/
const fb = {
    config : {},
    app : {},
    auth : {},
    db : {},
    collection : {},
    storage : {},
    user : {},
}
APP.component.FireBase = {

    init : function () {

        this.setup();
        this.firebase();

    },

	setup : function () {

        //Config
        fb.config = {
            apiKey: "AIzaSyBxeP28IHUbjyqmibxSEHlQUg4tuKg9kOo",
            authDomain: "guimurgel-cdbe8.firebaseapp.com",
            databaseURL: "https://guimurgel-cdbe8.firebaseio.com",
            projectId: "guimurgel-cdbe8",
            storageBucket: "",
            messagingSenderId: "345756873906",
            appId: "1:345756873906:web:4ca0118e514e1d51"
        };

	},

	firebase : function () {

        APP.component.FireBase.initFB();
        APP.component.FireBase.database();
        APP.component.FireBase.authChange();

    },

    initFB : function () {

        fb.app = firebase.initializeApp(fb.config);
        fb.auth = firebase.auth();
        fb.db = firebase.firestore();

    },


    verifyUser : function () {

        var user = firebase.auth().currentUser;

        if (user) {
            return true;
        } else {
            return false;
        }

    },

    authChange : function () {

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                fb.user = {
                    displayName : user.displayName,
                    email : user.email,
                    emailVerified : user.emailVerified,
                    photoURL : user.photoURL,
                    isAnonymous : user.isAnonymous,
                    uid : user.uid,
                    providerData : user.providerData,

                }
                APP.controller.Login.successLogin();
            } else {
              // User is signed out.
              APP.component.FireBase.delDependencies();
              APP.controller.Login.successLogout();
            }
            

        });

    },

    //Create
    createUser : function (form,id) {
        fb.auth.createUserWithEmailAndPassword(form.email, form.password).then((cred) => {

            APP.controller.Signup.success(cred, id);

        }).catch((error) => {

            var errorCode = error.code;
            var errorMessage = error.message;
            APP.component.Alert.customAlert('Error', errorMessage, 'close', 'OK');

        })
    },

    //Login
    loginUser : function (form) {
        firebase.auth().signInWithEmailAndPassword(form.email, form.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    },

    //Logout
    logoutUser : function () {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    },

    //Del
    delDependencies : function () {

        fb.user = {};

    },

    //DB
    database : function () {

        //Store
        const elements = [];
        fb.db.collection('users').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                elements.push(doc.data());
            });
            fb.collection = elements;
        })


    },

};