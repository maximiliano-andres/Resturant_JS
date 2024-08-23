/*import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import env from "env-var";

config();

// ESTOS VERIFICA QUE CADA USUARIO CONTENGA UN TOKEN VALIDO PARA PODER ACCEDER A FUNCIONALIDADES ESPECIFICAS 
const authTOKEN = (req, res, next) => {

    try {
        const { token } = req.cookies;

        // ESTA CONDICIONAL VERIFICA EL TOKE Y SI NO EXISTE REDIRIGE A LA PAGINA LOGIN CON UN MENSAJE DE EEROR 
        if (!token) {
            return res.redirect('/login?error=Inicia%20sesión%20para%20acceder%20a%20las%20funcionalidades');
        }

        // Si el token existe, verifica su validez
        const decoded = jwt.verify(token, env.get("maximiliano").required().asString());

        // Si el token es válido, agrega la información del usuario decodificado a req.user y permite que la solicitud continúe.
        req.user = decoded;

        next();

    } catch (error) {
        console.error(error);

        // Si hay un error en la verificación del token, redirige al usuario a la página de inicio de sesión con un mensaje de error.
        return res.redirect('/login?error=Sesion%20cerrada%20por%20seguridad');
    }
};


// Middleware para autenticación JWT Esto verrifica que si existe un usaurio verificado que NO le apararezcan intervaces de usuarios no verificados
const authJWT = (req, res, next) => {
    const token = req.cookies.token; // Asumiendo que el token está en una cookie llamada 'token'
    //console.log(token)
    // Si no hay token, establece res.locals.user como null y permite que la solicitud continúe.
    if (!token) {
        res.locals.user = null;
        return next();
    }

    // Si el token existe, verifica su validez
    jwt.verify(token, env.get("maximiliano").required().asString(), (err, decodedToken) => {
        // Si hay un error en la verificación del token, establece res.locals.user como null y permite que la solicitud continúe.
        if (err) {
            res.locals.user = null;
            return next();
        }

        // Si el token es válido, agrega la información del usuario decodificado a res.locals.user y permite que la solicitud continúe.
        req.user = decodedToken;
        console.log("Usuario autenticado: ", req.user)
        next();
    });
};

const authorizeUser = (req, res, next) => {
    const user = req.user; // usuario autenticado
    const verificarID = user.id; // id del usuario del perfil solicitado
    const verificarEMAIL = user.email; //email par comprobar mas datos aún


    console.log("ID -----TOKEN---- " + verificarID)
    console.log("EMAIL ------TOKEN--- " + verificarEMAIL)
    // Verificar si el usuario autenticado coincide con el usuario del perfil solicitado
    if (user.id === verificarID && user.email === verificarEMAIL) {
        // Si coincide, continuar con la solicitud
        next();
    } else {
        // Si no coincide, devolver un error de acceso denegado
        res.status(403).send("Acceso denegado");
    }
};




export default {
    authTOKEN,
    authJWT,
    authorizeUser
};
*/
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import env from "env-var";



config();

// TOKEN QUE VERIFICA QUE EL USUARIO TENGA UN TOKEN VALIDO
const validadorTOKEN = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        //mensaje(token)

        if (!token) {
            res.locals.user = null;
            console.log("NO HAY UN TOKEN VALIDO")
            return next();
        }

        const secretKey = env.get("maximiliano").required().asString();
        //console.log(secretKey)

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.locals.user = null;
                res.cookie("token", "", {
                    expires: new Date(0),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });
                return res.redirect('/login');
                
            }

            req.userId = decoded.id;
            req.user = decoded;
            res.locals.user = decoded;
            
            next();
        });
    } catch (error) {
        console.error(`Error en el middleware de autorización: ${error}`);
        return res.redirect('/login?error=Sesion%20cerrada%20por%20seguridad');
    }
};






export default {
    validadorTOKEN
}





