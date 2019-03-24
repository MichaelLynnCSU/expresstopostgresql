module.exports.create = create
module.exports.getOne = getOne
module.exports.getAll = getAll
module.exports.update = update
module.exports.create = create
module.exports.deleted = deleted

   // get axios response from index and tie it to the correct method
   async function create ( req, res, next ) {
      try{

      const dbInstance = await req.app.get('db');
      const { name, description, price, imageurl } = req.body;

      // the query to be sent with the following varibles
      // [ name, description, price, imageurl ] represents $1, $2, $3, $4
         dbInstance.create_product([ name, description, price, imageurl ])
         res.sendStatus(200) 
      }
      catch( err ) {
        res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
          console.log(err)
        }
    }
  
    // without async we get <pending> as a return
    async function getOne ( req, res, next )  {
      try{
      const dbInstance = await req.app.get('db');
      const { params } = req;
  
      let product = await dbInstance.read_product([ params.id ])
      res.status(200).send( product )
      }catch( err ) {
          res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
          console.log(err)
        } 
    }

    // without async we get <pending> as a return
    async function getAll ( req, res, next ) {
      try{
      const dbInstance = await req.app.get('db');
  
      let products = await dbInstance.read_all_products()
      console.log("read all my products", products)
      res.status(200).send( products ) 
      }catch( err ) {
          res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
          console.log(err)
        }
    }

      async function update ( req, res, next ) {

      try {
      const dbInstance = await req.app.get('db');
      const { params, query } = req;
  
      dbInstance.update_product([ params.id, query.desc ])
       res.sendStatus(200)
    }catch( err ){
          res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
          console.log(err)
      } 
    }
    async function deleted ( req, res, next ) {

      try {
      const dbInstance = await req.app.get('db');
      const { params } = req;
  
      dbInstance.delete_product([ params.id ])
      res.sendStatus(200) 
      }catch( err ){
          res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
          console.log(err)
        } 
    }
 