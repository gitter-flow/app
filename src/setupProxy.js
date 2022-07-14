const { createProxyMiddleware } = require('http-proxy-middleware');

const SOCIAL_API_HOST  = process.env.SOCIAL_API_HOST || 'http://localhost:3000';

module.exports = function(app) {
  app.use('/demo', createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true
  }));
};
