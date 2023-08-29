import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Importa a biblioteca
import routes from "./routes/routes";

const app = express();

// Configurações de middleware

// Habilita o CORS para permitir requisições de diferentes origens
// Lembre-se de configurar as opções do CORS se você estiver usando cookies em domínios diferentes.
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://www.tsadministradora.dev",
  "https://www.tsadministradora.dev",
  "www.tsadministradora.dev",
  "https://tsadministradora.com.br",
  "http://tsadministradora.com.br",
  "tsadministradora.com.br"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
// Parseia o corpo das requisições JSON para objetos JavaScript
app.use(express.json());


app.use(cookieParser());

// Usa as rotas definidas no arquivo routes
app.use('/', routes);

export default app;
