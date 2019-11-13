import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // endpoint to filter an image from a public url.
  app.get( "/filteredimage", async ( req, res ) => {
    let imageUrl = req.query.image_url;
    if (!imageUrl) {
      res.status(422).send("Please send the correct imageUrl as query string");
    }
    filterImageFromURL(imageUrl).then((response) => {
      res.sendFile(response);
      res.on('finish', () => {
        deleteLocalFiles([response]);
      });
    });
    
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();