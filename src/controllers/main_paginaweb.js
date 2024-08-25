const home = (req, res) => {
    const user = req.user; // Obtener el usuario autenticado
    res.render("index", { user }); // Pasar el usuario a la plantilla
};

const menu = (req, res) => {
    const user = req.user;// Obtener el usuario autenticado
    console.log(user)
    res.render("menu", { user: user.usuario}); //envia el nombre del usuario a menu
};

const login = (req, res) => {
    const user = req.user; // Obtener el usuario autenticado
    const error = req.query.error; // Obtener el mensaje de error de la query string
    res.render("Login", { error ,  user: user });
};

const registrarme = (req,res)=> {
    const user = req.user; // Obtener el usuario autenticado
    const error = req.query.error; // Obtener el mensaje de error de la query string
    res.render("registrarse", { error ,  user: user });
}

const about = (req, res) => {
    const user = req.user; // Obtener el usuario autenticado
    res.render("about", { user: user });
};

const jocelyn = "nada"

export default {
    home,
    menu,
    login,
    about,
    registrarme,
    
}