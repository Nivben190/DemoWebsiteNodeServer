import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import  db  from './DataAccess/mongo';

const app = express();
const port = 3000;

app.use(cors()); 
app.use(morgan('dev')); 

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    const mongo = db;
    console.log(`Server is running on port ${port}`);
});