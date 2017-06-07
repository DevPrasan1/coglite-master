var express = require('express');
const path = require('path');
//Controller
var auth = require('./controller/auth');

// Create router object;
let routes = express.Router(); 
// Auth API
	routes.get('/auth/session', (req, res) =>auth.createSession(req,res));
	routes.post('/auth/register', (req, res) =>auth.register(req,res));
	routes.post('/auth/login', (req, res) =>auth.login(req,res));
	routes.post('/auth/logout', (req, res) =>auth.signout(req,res));
	routes.post('/auth/user', (req, res) =>auth.getUserDetails(req,res));
	routes.post('/auth/changePassword', (req, res) =>auth.changePassword(req,res));

module.exports = routes;