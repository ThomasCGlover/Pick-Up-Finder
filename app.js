require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");
const middleware = require('./middleware');
const controllers = require('./controllers');


app.use(Express.json());
app.use(middleware.headers);

// app.use(Express.json());
app.use("/user", controllers.userController);
app.use("/game", controllers.gameController);
app.use("/comment",controllers.commController);

dbConnection
    .authenticate()
    .then(() => dbConnection.sync(
        // {force: true}
    ))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed.`)
        console.log(err);
    })