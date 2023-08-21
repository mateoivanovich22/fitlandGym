import  express  from "express";
import { engine } from 'express-handlebars';
import config from "./config/config.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import homeLanding from "./routes/homeLanding.router.js"
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = config.server.port;

const app = express();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.static(__dirname + "/public"));
app.engine('handlebars', engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use("/", homeLanding);
export default app;