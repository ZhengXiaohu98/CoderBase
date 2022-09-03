const express = require('express');
const app = express();

const cors = require("cors")
app.use(cors())

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api/getlcinfo', createProxyMiddleware({
    // target url
    target: 'https://leetcode.com/graphql',
    changeOrigin: true,
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Proxy server is listen at port ' + PORT);