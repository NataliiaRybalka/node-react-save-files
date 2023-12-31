import cors from 'cors';
import express from 'express';
import multer from 'multer';

const PORT = process.env.PORT || 4000;

const app = express();

const fileStorage = multer.diskStorage({
	destination: 'storage/',
	filename: (req, file, cb) => {
		req.body.file = file.originalname
		cb(null, file.originalname);
	}
});
const uploadImage = multer({
	storage: fileStorage,
	limits: {
		fileSize: 1000000
	},
});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/file', uploadImage.array('file', 100), (req, res) => {
	const body = req.files;
	res.json(body);
});
app.post('/', (req, res) => {
	const body = req.body;
	res.json(body);
});

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});