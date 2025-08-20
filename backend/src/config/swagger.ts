import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerPath = path.resolve('src/docs/swagger.yaml');

const swaggerSpec = YAML.load(swaggerPath);

function swaggerDocs(app: Express) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`📝 Swagger docs available at http://localhost:3000/docs`);
}

export default swaggerDocs;
