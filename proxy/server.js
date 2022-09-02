const express = require('express');
const app = express();

const cors = require("cors")
app.use(cors())

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/', createProxyMiddleware({
    // target url
    target: 'https://leetcode.com/graphql',
    changeOrigin: true,
}));

app.listen(3000);
console.log('Proxy server is listen at port 3000...');