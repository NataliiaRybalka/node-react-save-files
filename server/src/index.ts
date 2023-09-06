import cors from 'cors';
import express from 'express';
import multer from 'multer';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});