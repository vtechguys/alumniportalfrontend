const express = require('express');
const path = require('path');
const app = express();
const pathToBuild = path.join(__dirname, 'client', 'build');
console.log(pathToBuild);
app.use(express.static(pathToBuild));
app.get('/*', function (req, res) {
    res.sendFile(path.join(pathToBuild, 'index.html'));
  });
app.listen(process.env.PORT || 4500, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('server start');
    }
});