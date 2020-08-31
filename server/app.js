const express = require("express");
const app = express();
const PORT = 3000;
const routers = require('./routers')

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(routers);

app.listen(PORT, _=> { console.log('App running on port',PORT) });