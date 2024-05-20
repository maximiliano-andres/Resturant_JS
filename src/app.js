import express from "express";
import debug from 'debug';
import { config } from "dotenv";
import env from "env-var";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import methodOverride from 'method-override';
import { fileURLToPath } from "url";
import error from "./middlewares/manejo_errores.js";
import router from "./v1/routes/rutas.js";
import authRoutes from "./v1/routes/auth.routes.js";

// mensaje en cualquier consola del servido
const DEBUG = debug('app:Servidor');

const __dirname = fileURLToPath(new URL(".", import.meta.url));
//console.log("URL: " +  __dirname);

config();
const app = express();
const PORT = env.get("puerto").required().asIntPositive();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Middleware para method-override con registro de depuración
app.use(methodOverride((req, res) => {
    console.log('Original Method:', req.method);
    const method = req.body._method;
    console.log('Overriden Method:', method);
    return method;
}));

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));
//console.log(path.join(__dirname, "../public"))
app.use(express.json());
app.use(cookieParser());



//RUTAS --------------

//GET 
//principal (acceder a....)
app.get("/home",router)
app.get("/menu",router)
app.get("/about",router)
app.get("/todo",router);
app.get("/login",router)
app.get("/registrar_usuario",router)

//paginas de la carta (/todo)
app.get("/bebidas",router);
app.get("/acompanamientos", router);
app.get("/plato_principal",router);
app.get("/entradas",router);
app.get("/postres", router);

//opciones usuarios
app.get("/perfil", authRoutes);
//app.get("/perfil/formulario", authRoutes);
app.get("/perfil/formulario", authRoutes);

app.get("/mesa_orden", router);

//cerrar sesion
app.get("/cerrar_sesion", authRoutes);

app.get("/perfil/:id/formulario", authRoutes);
//POST

//registrar usuario
app.post("/registrar_usuario" , authRoutes);
//iniciar sesion
app.post("/login", authRoutes);

//opciones usuarios
app.post("/perfil/formulario", authRoutes)
app.post("/mesa_orden", router);

app.put('/perfil/:id/formulario', authRoutes)




//MANEJO DE ERRORES
app.use(error.error500);
app.use(error.error404);

//servidor activo
app.listen(PORT, () => {DEBUG("Servidor Activo en el puerto => " + PORT);
});