import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import env from "env-var";

config()

//REGISTROS DE USUARIO,  INICIO DE SESION Y CIERRE DE SESION

//registro
const Registrar_Usuario = async (req, res) => {
    try {
        //requisitos para el registro
        let { usuario, email, password1, password2 } = req.body;

        // ----------------Sanitización de datos---------------
        // Eliminar espacios en blanco al principio y al final
        usuario = usuario.trim();
        email = email.trim();
        password1 = password1.trim();
        password2 = password2.trim();

        //COmparacion de Contraseñas para continuar con el registro
        if (password1 === password2) {

            //--------------------VALIDACIONES--------------------------------

            //EXPRESSIONES REQUERIDAS PARA  VALIDAR UN EMAIL
            const SignoRequeridosEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validación de nombre de usuario
            if (!usuario || usuario.length < 3) {
                console.log("------NOMBRE DE USUARIO NO VALIDO---------");
                
                const error = 'El nombre de usuario debe tener al menos 3 caracteres'
                return res.status(200).redirect("/registrar_usuario?error=" + encodeURIComponent(error));
            }

            //VALIDACION DE EMAIL
            if (!SignoRequeridosEmail.test(email)) {
                console.log("------EMAIL NO ES VALIDO---------");
                const error = 'El email proporcionado no es válido';
                return res.status(200).redirect("/registrar_usuario?error=" + encodeURIComponent(error));
            }

            // Validación de contraseña
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
            if (!passwordRegex.test(password1)) {
                console.log("------CONTRASEÑA NO ES VALIDA---------");
                const error = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial'
                return res.status(200).redirect("/registrar_usuario?error=" + encodeURIComponent(error));
                
            }
            //------------------------Encriptacion----------------------------------

            //ENCRIPTAR CONTRASEÑA
            const hashedPassword = await bcrypt.hash(password1, 10);

            //-----------------------INGRESO DE DATOS A DB-----------------------------------------

            //INSERCION A LA TABLA USUARIOS
            const [result] = await pool.query('INSERT INTO usuarios (usuario, email, password) VALUES (?, ?, ?)', [usuario, email, hashedPassword]);

            // Obtener el usuario recién creado 
            const user = { id: result.insertId, usuario, email };

            // Generar token UNICOS y DESECHABLES PARA INICIAR sesión COMO USUARIO VALIDO, entregando la informacion en jwt.sing() CON DURACION DE 5 Horas
            const token = jwt.sign({ id: user.id, usuario: user.usuario, email: user.email }, env.get("maximiliano").required().asString(), { expiresIn: '5h' });

            // Establecer la cookie con el token
            res.cookie("token", token, {
                httpOnly: true, // La cookie solo es accesible por el servidor
                secure: true,   // Solo se envía la cookie a través de HTTPS
                sameSite: 'Strict' // La cookie no se envía en solicitudes de origen cruzado
            });

            // Redireccionar al usuario a la página de inicio
            res.redirect("/perfil/formulario", 201, { user: user.usuario });

            //----------------------PRUEBAS de CONSOLAS---------------------------------------

            console.log("----------Registro de la Operacion--------");
            console.log(req.body);
        }
        else {
            console.log("-----------Contraseñas NO Coinciden-------------");
            return res.redirect('/registrar_usuario?error=Las%20contraseñas%20NO%20coinciden!!!');
        }

    } catch (error) {
        console.error(error);
        return res.redirect('/registrar_usuario?error=AL%20registrar%20el%20Usuario');
    }
};

//inicio sesion
const Login = async (req, res) => {
    try {
        let { email, password1 } = req.body;

        // Sanitización de datos
        // Eliminar espacios en blanco al principio y al final
        email = email.trim();
        password1 = password1.trim();


        // Buscar usuario en la base de datos por email
        const [users] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = users[0];

        //---------------------------VERIFICACION DE DATOS--------------------------------

        // Verificar si el usuario existe
        if (!user) {
            const error = 'Email o contraseña incorrectos'
            return res.status(200).redirect("/login?error=" + encodeURIComponent(error));
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password1, user.password);
        if (!isPasswordValid) {
            const error = 'Email o contraseña invalidos'
            return res.status(200).redirect("/login?error=" + encodeURIComponent(error));

        }

        //-------------------------TOKEN-----------------------------------------

        // Generar token UNICOS y DESECHABLES PARA INICIAR sesión COMO USUARIO VALIDO, entregando la informacion en jwt.sing() CON DURACION DE 5 Horas... "maximiliano HACER REFERENCIA A SECRET"
        const token = jwt.sign({ id: user.id, usuario: user.usuario, email: user.email }, env.get("maximiliano").required().asString(), { expiresIn: '5h' });

        // Establecer la cookie con el token
        res.cookie("token", token, {
            httpOnly: true, // La cookie solo es accesible por el servidor
            secure: true,   // Solo se envía la cookie a través de HTTPS
            sameSite: 'Strict' // La cookie no se envía en solicitudes de origen cruzado
        });

        const USUARIO = user.usuario;
        //console.log("-----------------nombre del usuario-----------------> "+ USUARIO )
        //console.log("--------------TOKEN----------> " + token)
        res.redirect("/home", 302, { user: USUARIO });

        //------------------------PRUEBAS de CONSOLAS-----------------------------

        //console.log("----------Inicio de Sesión de la Operacion--------")
        //console.log(req.body)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

//Cerrar sesion
const Logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0)
        })

        res.redirect(302, "/home");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}



//FORMULARIO PERFIL-----------------

//pagina de perfil usuario
const perfil = async (req, res) => {
    const user = req.user;
    console.log(user)
    const [cl_nombre] = await pool.query("SELECT nombre from cliente WHERE id_usuario = ?", [user.id]) 
    const [cl_telefono] = await pool.query("SELECT telefono from cliente WHERE id_usuario = ?", [user.id])
    const [cl_direccion] = await pool.query("SELECT direccion from cliente WHERE id_usuario = ?", [user.id])

    const nombre = cl_nombre[0].nombre;
    const telefono = cl_telefono[0].telefono;
    const direccion = cl_direccion[0].direccion;
    //console.log("--------------TOKEN----------> " + token)
    res.render("perfiluser", { user, nombre, telefono, direccion });
};

//pagina del formulario
const perfilform_pag = (req, res) => {
    const user = req.user;
    // obtinene el ID ded la URL
    const peticion_ID = req.params.id;
    const error = req.query.error;

    console.log("PETICION ID ------------> " + peticion_ID);
    console.log("PAGINA FORMULARIO------------> " + user.id);
    console.log("PAGINA FORMULARIO------------> " + user.email);
    console.log(req.params.id);

    // Si hay una ID en la petición, renderiza 'perfilformsupdate'
    if (peticion_ID) {
        const { method } = req; 
        console.log(method)
        return res.render("perfilformsupdate", { error, user });
    }

    // Si no hay una ID en la petición, renderiza 'perfilform'
    return res.render("perfilform", { error, user });
};


//actualizacion de datos del perfil(no necesita id)
const perfilFormsPOST = async (req, res) => { 
    try {
        
            console.log("METHODO POST")

            let { nombre, telefono, direccion } = req.body;

            nombre = nombre.trim();
            telefono = telefono.trim();
            direccion = direccion.trim();

            const user = req.user;

            //INSERCION A LA TABLA USUARIOS
            const [cliente] = await pool.query('INSERT INTO cliente (id_usuario, nombre, telefono, direccion) VALUES (?,?, ?, ?)', [user.id, nombre, telefono, direccion]);

            // obtener  ID te la tabla clientes
            const IDcliente = cliente.insertId;
            
            
            console.log("ID CLIENTE "+IDcliente)
            
            res.redirect("/perfil", 201, { user });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al procesar el formulario");
    }
};

// actualizar perfil(requiere id)
const perfilFormsPUT = async (req, res) => {
    try {
        console.log("-------------METHODO PUT--------------");
        const { method } = req; 
        console.log("METODO: " + method)

        let { nombre, telefono, direccion } = req.body;

        nombre = nombre.trim();
        telefono = telefono;
        direccion = direccion.trim();

        const user = req.user;
        console.log(user)

        if (!user || !user.id) {
            console.log("usuario no autenticado")
            return res.status(400).send("Usuario no autenticado");
        }

        const id_usuario = req.params.id
        // ACTUALIZACIÓN EN LA TABLA CLIENTE
        const [result] = await pool.query('UPDATE cliente SET nombre = ?, telefono = ?, direccion = ? WHERE id_usuario = ?', [nombre, telefono, direccion, id_usuario]);

        if (result.affectedRows === 0) {
            return res.status(404).send("Cliente no encontrado");
        }

        console.log("Cliente actualizado");

        res.redirect("/perfil");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al procesar el formulario");
    }
};


export default {

    Registrar_Usuario,
    Login,
    Logout,
    perfil,
    perfilform_pag,
    perfilFormsPOST,
    perfilFormsPUT
};