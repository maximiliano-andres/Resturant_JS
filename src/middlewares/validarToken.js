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





