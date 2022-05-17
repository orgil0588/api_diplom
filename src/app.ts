import express from 'express';
import config from "config"
import connect from "./utils/connect"
import logger from "./utils/logger"
import routes from './routes';
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
const port = config.get<number>('port')

const app = express()

app.use(express.json())


const swaggerOptions: object = {
  swaggerDefinition: {
    info: {
      title: "API DOCS",
      description: 'api docs desc',
      contact: {
        name: "Orgil"
      },
      servers: ["http://localhost:8000"]
    }
  },
  apis: ['./routes.ts']

}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, async () => {
  logger.info(`App is running : ${port}`);
  await connect();
  routes(app)
})