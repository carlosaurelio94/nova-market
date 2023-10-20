
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes') ;

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3060;


app.use(express.json());

const whitelist = ['http://localhost:3060/*', 'https://paginaQueQuieroTengaAcceso.ok'];
const options = {
  origin: (origin, callback) => {
    console.log("ORIGEN : ", origin)
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'))
    }
  }
};

app.get('/api', (req, res) => {
  res.send('Bienvenidos a Nova Market');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);
app.use(cors(options));

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' + port);
});
