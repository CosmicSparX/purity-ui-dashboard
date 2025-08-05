const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/users",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL_USER_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/api/users": "",
      },
    })
  );
  app.use(
    "/api/issues",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL_ISSUE_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/api/issues": "",
      },
    })
  );
  app.use(
    "/api/user/auth",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL_USER_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/api/user/auth": "/auth",
      },
    })
  );
};
