const express = require('express');
const { seeders } = require('./database/seeders');
const cors = require('cors');
const app = express();

app.set('puerto', process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



app.listen(app.get('puerto'), () => console.log('Server on port http://localhost:' + app.get('puerto')))