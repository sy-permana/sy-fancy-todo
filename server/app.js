require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const routers = require('./routers')

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(routers);

app.listen(PORT, _=> { console.log('App running on port',PORT) });