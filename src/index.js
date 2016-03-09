import config from '../config';
import webserver from './services/webserver';

console.log('Server listening on %s:%d', config.api.host, config.api.port);

webserver.listen(config.api.port);
