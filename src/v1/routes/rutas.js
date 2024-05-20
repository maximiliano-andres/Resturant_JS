import { Router } from "express";
import ctr from "../../controllers/ctr_productos.js";
import principal from "../../controllers/main_paginaweb.js";
import token from "../../middlewares/validarToken.js";
import restaurant from "../../services/ordenarpedido.js"

//usar el metodo de rutas(get, put, delete, push, etc...)
const router = Router();

//rutas atraves de controladores

//BASE DE DATOS
router.get("/todo",token.authJWT,ctr.ver_todos_productos);
router.get("/bebidas",token.authJWT,ctr.ver_bebidas);
router.get("/acompanamientos",token.authJWT,ctr.ver_acompañamientos);
router.get("/plato_principal",token.authJWT,ctr.ver_plato_principal)
router.get("/entradas",token.authJWT, ctr.ver_entradas);
router.get("/postres",token.authJWT,ctr.ver_postres);

//PAGINA WEB
router.get("/home",token.authJWT, principal.home);
router.get("/menu",token.authTOKEN,principal.menu);
router.get("/login", principal.login);
router.get("/registrar_usuario",principal.registrarme);
router.get("/about",token.authJWT, principal.about);


//RESTAURANT
router.get("/mesa_orden", token.authJWT,restaurant.mesas_disponibles)
router.post("/mesa_orden", restaurant.Seleccion_mesa);


export default router;