const express = require('express');
// importar los modulos
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

// CORS
// const whitelist = ['http//localhost:8080'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes()) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed'));
//     }
//   }
// }

// app.use(cors(options));
app.use(cors());

require('./utils/auth');
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running on the port ${port}...`);
});
