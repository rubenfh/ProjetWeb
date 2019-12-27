const express = require("express");
const Router = express.Router();
const User = require('./user');

const f_welcome = () => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Welcome !</title>
        </head>
        <body>
          <h1>Welcome !</h1>
          <p>you can try going to <a href="/hello?name=anonymous" >this page</a> to be welcomed. </br>
          Or you can enter url to <a href="/hello?name=anonymous" >127.0.0.1:8080/hello?name=name</a> replacing name with your name </p>
        </body>
      </html>
    `;
};

const f_404 = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Page not found</title>
      </head>
      <body>
        <h1>Error 404 : Page not found</h1>
      </body>
    </html>
  `;
};




Router.get("/", (req: any, res: any) => {
  res
    .type("html")
    .status(200)
    .render("homepage.ejs")
});

Router.get("/signIn", (req: any, res: any) => {
  res
    .type("html")
    .status(200)
    .render("signIn.ejs")
});

Router.get("/signUp", (req: any, res: any) => {
  res
    .type("html")
    .status(200)
    .render("signUp.ejs")
});

// Router.get("/hello", (req: any, res: any) => {
//  res
//    .type("html")
//    .status(200)
//    .render("hello.ejs")
//});

Router.get('/read', (req:any, res:any) => {
  User.find({}).then((result: any) => {
    res.status(200).json(result);
  }).catch((err:any) => {
    res.status(400).send(err.message);
  });
});

Router.get('/write', (req:any, res:any) => {
  User.create({
    email: req.body.name,
    password: req.body.password,
    firstName: 'hello',
    lastName: 'world'
  }).then((result:any) => {
    res.status(200).send("User saved !");
  }).catch((err:any) => {
    res.status(400).send(err.message);
  });
});

//Router.get("/hello:id", async (request: any, response: any, next: any) => {
//  var userId = request.params.id
  /*try {
    if (request.query.search) {
      const searchquery = request.query.search;
      const dataUser = await User.find({ id: userId })
      
      response.render('hello.ejs'), {
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        email: dataUser.email
      };
    }
  } catch(err){
throw new Error(err);
  }*/
//  User.find({id: userId}).then((result: any) => {
//    response.status(200).json(result);
//  }).catch((err: any) => {
//    response.status(400).send(err.message);
//  });
//  });





module.exports = Router;
