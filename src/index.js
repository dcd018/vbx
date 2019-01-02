import server from './server';

export default (function jetpack() {
  server.start(() => console.log('server is listening: http://localhost:4000'));
  return server;
})();