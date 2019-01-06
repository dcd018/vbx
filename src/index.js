import server from './server';

export default (function vbx() {
  server.start(() => console.log('server is listening: http://localhost:4000'));
  return server;
})();