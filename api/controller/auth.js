var firebase = require('../firebase');

var auth=(function(){
	/**
	Create user session
	*/
	var createSession=function(req,res){
		// just for testing purpose send response, it need to 
		var user = firebase.auth().currentUser;
		if(user){
			const respone={
				  name : user.displayName,
				  email : user.email,
				  photoUrl : user.photoURL,
				  emailVerified : user.emailVerified,
				  uid : user.uid
			}
			res.send(respone);
		}
		else{
			res.send({})
		}
	}

	/**
	* Get User Details
	*/
	var getUserDetails=function(req,res){
		if(req.body.token){
			firebase.auth().verifyIdToken(req.body.token)
			  .then(function(decodedToken) {
			    var uid = decodedToken.uid;
			    // ...
			  }).catch(function(error) {
			    // Handle error
			  });
		firebase.auth().signInWithCustomToken(req.body.token)
		.then(function(result) {
			res.send(result);
		})
		.catch(function(error) {
		  // Handle Errors here.
		   res.send(error);
		});
		}
		else{
			res.send({});
		}
	}

	/**
	Register new user
	*/
	var register=function(req,res){
		firebase.auth().createUserWithEmailAndPassword(req.body.userName, req.body.password)
		.then(function(result) {
			res.send(result);
		})
		.catch(function(error) {
		  // Handle Errors here.
		   res.status(401).send(error);
		});
	}
	/**
	Login function for authenticate user
	*/
	var login=function(req,res){
		firebase.auth().signInWithEmailAndPassword(req.body.userName, req.body.password)
		.then(function(result) {
			console.log(result);
			res.send(result);
		})
		.catch(function(error) {
		  // Handle Errors here.
		   res.status(401).send(error);
		});
	}
	/**
	Singout current user
	*/
	var signout=function(req,res){
		firebase.auth().signOut().then(function() {
		  	res.status(200).send({status:'ok'});
		}).catch(function(error) {
		  // An error happened.
		  	res.status(400).send(error);
		});
	}
	/**
	Change Password request
	*/
	var changePassword=function(req,res){
		var user = firebase.auth().currentUser;
		
		var credential=firebase.auth.EmailAuthProvider.credential(user.email, req.body.oldPassword);

		// validate user old password
		user.reauthenticateWithCredential(credential).then(function() {
			// in case of correct old password, update password
		  	user.updatePassword(req.body.newPassword).then(function(result) {
				res.status(200).send(result);
			}, function(error) {
				// Error during password updation
				res.status(401).send(error);
			});
		}, function(error) {
		  // Wrong old password
		  	res.status(400).send(error);
		});
	}

	return {
      	login 			: login,
      	changePassword	: changePassword,
      	signout			: signout,
      	createSession 	: createSession,
      	register        : register
  	};
})();

module.exports = auth;
