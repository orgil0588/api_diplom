import express from 'express';
import config from "config"
import connect from "./utils/connect"
import logger from "./utils/logger"
import routes from './routes';
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import interval from './utils/interval';
import cors from "cors"
const port = config.get<number>('port')

const app = express()
app.use(cors())

app.use(express.json())


// const swaggerOptions: object = {
//   swaggerDefinition: {
//     info: {
//       title: "API DOCS",
//       description: 'api docs desc',
//       contact: {
//         name: "Orgil"
//       },
//       servers: ["http://localhost:8080"]
//     }
//   },
//   apis: ['./routes.ts']

// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, async () => {
  logger.info(`App is running : ${port}`);
  connect();
  routes(app)
  interval()
})