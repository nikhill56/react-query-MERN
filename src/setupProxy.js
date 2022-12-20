const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://workoutbuddy-gesw.onrender.com",
      changeOrigin: true,
      secure: false,
    })
  );
};
