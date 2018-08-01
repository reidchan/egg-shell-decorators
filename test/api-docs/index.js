'use strict';
const express = require('express');
const app = express();
app.use('/', express.static('public'));
app.listen(3001, () => {
  console.log('[接口文档] 3001端口已开启');
});
