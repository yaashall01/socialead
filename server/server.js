import express from "express";
import bodyParser from "body-parser"; //midlware to extract data form forms and json files 
import mongoose, {
    Mongoose
} from "mongoose"; // connection with a mongoDB database
import cors from "cors";
import dotenv from "dotenv"; //setup envirenement
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path"; //native package path manipulation
import {
    fileURLToPath
} from "url"; //native package : function converts a file URL to a file path
import {
    register,
    login
} from "./controllers/auth.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';


// Configuration and middlware setup

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
//console.log("file name",__filename)
//console.log("__dirname ",__dirname )

dotenv.config(); // load .env 

const app = express();

app.use(express.json());
app.use(bodyParser.json({
    limit: "30mb",
    extended: true
})); // limit the size of the files
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));
const assetsPath = path.join(__dirname, 'public/assets');
app.use("/assets", express.static(assetsPath));

if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode.');
} else {
    console.log('Running in development mode.');
}

// File Storage : defining the configuration object
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
//multer object instance  
const upload = multer({
    storage
});


app.get('/', (req, res) => {
    console.log('[GET request received]');

    res.send('<h1>Welcome SOCIALEAD ❤</h1>');
});

/*
app.get('/', (req, res) => {

    console.log('[GET request received]');

    const indexPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexPath);
});

*/
// Routes
app.post("/auth/register", upload.single("picture"), register);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);



// Connection to the database (mongoDB)

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
}).then(() => { //promes
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(`Error : ${error}`));