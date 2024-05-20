import { Router } from "express";
import ctr_user from "../../controllers/auth.controller.js";
import token from "../../middlewares/validarToken.js";

const router = Router();

//GET

//cerrar sesion
router.get("/cerrar_sesion",ctr_user.Logout);


//METHOD POST

//sesion
router.post("/login", ctr_user.Login);

//registro
router.post("/registrar_usuario", ctr_user.Registrar_Usuario);

//perfil
router.get("/perfil",token.authTOKEN, token.authorizeUser, ctr_user.perfil);
router.get("/perfil/formulario",token.authJWT, ctr_user.perfilform_pag)
router.post("/perfil/formulario",token.authJWT, ctr_user.perfilFormsPOST);

//perfil id
router.get("/perfil/:id/formulario",token.authJWT, ctr_user.perfilform_pag)

router.put('/perfil/:id/formulario',token.authJWT, ctr_user.perfilFormsPUT);

export default router;