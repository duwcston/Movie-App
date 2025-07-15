import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie Application REST API',
            version: '1.0.0',
            description: 'API documentation for the Movie Application',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token'
                }
            }
        }
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs relative from project root
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`📝 Swagger docs available at http://localhost:3000/docs`);
}

export default swaggerDocs;
