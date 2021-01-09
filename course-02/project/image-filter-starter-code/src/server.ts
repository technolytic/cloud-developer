import express from 'express';
import { Request, Response } from 'express';

import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

import isImageURL from 'image-url-validator';
import { nextTick } from 'process';

(async () => {


  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  
  app.get("/filteredimage", 
    async (req: Request, res: Response) => {
      try {
      // get the image_url in params
      let image_url: string = req.query.image_url;
  
      // 1. validate the image_url query
      if (!image_url) {
        return res.status(400).send({ message: 'Image URL is required' });
      }

      if (!await isImageURL(image_url)) {
        return res.status(415).send({ message: 'Image URL is malformed or unsupported' });
      }

      // 2. call filterImageFromURL(image_url) to filter the image
      let filteredImagePath: string = await filterImageFromURL(image_url);
  
      if (filteredImagePath) {
         // 3. send the resulting file in the response
        res.status(201).sendFile(filteredImagePath, null, async function (err) {
          // 4. deletes any files on the server on finish of the response
          // deleting file in any case (success or error)
          await deleteLocalFiles([filteredImagePath]);
          
          if (err) {
            //console.error(err);
            throw err;
          } 
        })
      } else {
        throw new Error('Unable to process the image');
      }
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
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