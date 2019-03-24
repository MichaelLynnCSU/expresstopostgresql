const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config()

const products_controller = require('./products_controller');

const app = express();
app.use( bodyParser.json() );

massive( process.env.CONNECTION_STRING ).then( dbInstance => {
  app.set('db', dbInstance)
}).catch( err => console.log("failed here agian! ", err) );

// The url for this api should be /api/messages
const dbUrl = "/api/product";

// Create a post, get, put, and delete endpoint 
// that use the corressponding axios method on the messages controller

// The url for this api should be /api/products
const dbUrl1 = "/api/products";
app.get( `${dbUrl1}`, products_controller.getAll );


// The url for this api should be /api/product
const dbUrl2 = "/api/product";

// add on a url parameter of id for the methods that are using it.
app.get(`${dbUrl2}/:id`, products_controller.getOne );
// post is used when no "id" is required
app.post( `${dbUrl2}`, products_controller.create );
// put is used when no "id" is required
app.put( `${dbUrl2}/:id`, products_controller.update );
app.delete( `${dbUrl2}/:id`, products_controller.deleted );

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
