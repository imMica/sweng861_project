const express = require('express');
require('dotenv').config();
app = express();
app.use('/', require('./backend/routers/home'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`)
});