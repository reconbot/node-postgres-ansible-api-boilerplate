import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routeBuilder from 'express-routebuilder';

import endpoints from '../endpoints';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('combined'));

endpoints.forEach(endpoint => {
  server.use(routeBuilder(
    express.Router(),
    endpoint.routes,
    endpoint.location
  ));
});

server.get('/', (req, res) => {
  res.send({
    version: 'v1',
    endpoints: endpoints.map(endpoint => {
      return {
        route: endpoint.location,
        methods: Object.keys(endpoint.routes)
      }
    })
  });
});

server.use((req, res) => {
  res.status('404').end();
});

export default server;
