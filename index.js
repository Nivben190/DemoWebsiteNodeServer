const express = require('express');

const app = express();
const port = 3000;
app.use(cors()); 
app.use(morgan('dev')); 

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});