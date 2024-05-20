import pool from "../db.js";


//traspaso a html
/*const ver_todos_productos = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM producto ORDER BY categoria, precio");
        console.log(results)

        const titulo_pag = "Menú Completo"
        const descripcion_breve = `Descubre un festín de sabores en nuestro menú,
        donde cada platillo es una obra maestra culinaria que deleitará tus sentidos y te hará volver por más.
        ¡Una experiencia gastronómica que no querrás perderte!`;

        res.render("table", { results, titulo: titulo_pag, descripcion: descripcion_breve });

    } catch (error) {
        console.error(error);
        res.status(500).render("error500");
    }
};*/
const ver_todos_productos = async (req, res) => {
    
    try {
        let query = "SELECT * FROM producto";
        const params = [];
        if (req.query.categoria) {
            query += " WHERE categoria = ?";
            params.push(req.query.categoria);
        }
        query += " ORDER BY categoria, precio";
        
        const results = await pool.query(query, params);
        //console.log(results);

        const titulo_pag = "Menú Completo";
        const descripcion_breve = `Descubre un festín de sabores en nuestro menú,
        donde cada platillo es una obra maestra culinaria que deleitará tus sentidos y te hará volver por más.
        ¡Una experiencia gastronómica que no querrás perderte!`;

        const USUARIO = req.user;
        //console.log(USUARIO)

        res.render("table", { results, titulo: titulo_pag, descripcion: descripcion_breve, user:USUARIO});

    } catch (error) {
        console.error(error);
        res.status(500).render("error500");
    }
};



const ver_bebidas = async (req, res) => {
    try {
        const results = await pool.query(
            "SELECT * FROM producto WHERE categoria = 'Bebidas' ORDER BY nombre, precio"
        );
        // Manejar los resultados de la consulta
        //console.log(results);
        // Enviar la respuesta HTTP con la tabla HTML
        const titulo_pag = "Menú de Bebidas"
        const descripcion_breve = "Refrescantes y llenas de sabor, nuestras bebidas están diseñadas para complementar tu comida y satisfacer tu sed con una variedad de opciones que van desde lo clásico hasta lo innovador."

        

        const USUARIO = req.user;
        console.log(USUARIO)

        res.render("table", { results, titulo: titulo_pag, descripcion: descripcion_breve, user:USUARIO});

    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error(error);
        res.status(500).render("error500");
    }
};

const ver_acompañamientos = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM producto WHERE categoria = 'Acompañamientos' ORDER BY nombre, precio");
        console.log(results);

        const titulo_pag = "Menú de Acompañamientos"
        const descripcion_breve = "Los acompañamientos son el complemento perfecto para tu plato principal, con opciones que realzan el sabor y la presentación de tu comida de manera única y deliciosa."

        const USUARIO = req.user;
        //console.log(USUARIO)

        res.render("table", { results, titulo: titulo_pag, descripcion: descripcion_breve, user:USUARIO});
    } catch (error) {
        console.log(error);
        res.status(500).render("error500");
    }
};

const ver_plato_principal = async (req, res) => {
    try {
        const results = await pool.query(
            "SELECT * FROM producto WHERE categoria = 'Platos Principales' ORDER BY nombre, precio"
        );
        console.log(results);

        const titulo_pag = "Menú de Platos Principales"
        const descripcion_breve = "Nuestros platos principales son una experiencia culinaria en cada plato, con ingredientes frescos y sabores auténticos que te transportarán a un viaje gastronómico inolvidable."

        const USUARIO = req.user;
        //console.log(USUARIO)

        res.render("table", { results, titulo: titulo_pag, descripcion: descripcion_breve, user:USUARIO});
    } catch (error) {
        console.log(error);
        res.status(500).render("error500");
    }
};

const ver_entradas = async (req, res) => {
    try {
        const results = await pool.query(
            "SELECT * FROM producto WHERE categoria = 'Entradas' ORDER BY nombre, precio"
        );
        console.log(results);

        const titulo_pag = "Menú de Entradas"
        const descripcion_breve = "Deliciosas y tentadoras, nuestras entradas te sorprenderán con combinaciones únicas de sabores y texturas que despertarán tu paladar desde el primer bocado."

        const USUARIO = req.user;
        //console.log(USUARIO)

        res.render("table", { results, titulo: titulo_pag, descripcion: descripcion_breve, user:USUARIO});
    } catch (error) {
        console.log(error);
        res.status(500).render("error500");
    }
};

const ver_postres = async (req, res) => {
    try {
        const results = await pool.query(
            "SELECT * FROM producto WHERE categoria = 'Postres' ORDER BY nombre, precio"
        );
        console.log(results);
        /*
                let tabla_html =
                    "<table><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Categoria</th></tr>";
        
                for (const fila of pregunta[0]) {
                    tabla_html += `<tr><td>${fila.id}</td><td>${fila.nombre}</td><td>${fila.precio}</td><td>${fila.categoria}</td></tr>`;
                }
        
                tabla_html += "</table>";
                res.send(tabla_html);
        */
        const titulo_pag = "Menú de Postres"
        const descripcion_breve = "Nuestros postres son el broche de oro de tu comida, con opciones decadentes y deliciosas que te harán salivar solo de pensar en ellos."
        
        const USUARIO = req.user;
        //console.log(USUARIO)

        res.render("table", { results, titulo: titulo_pag, descripcion: descripcion_breve, user:USUARIO});
    } catch (error) {
        console.log(error);
        res.status(500).render("error500");
    }
};

export default {
    ver_bebidas,
    ver_todos_productos,
    ver_acompañamientos,
    ver_plato_principal,
    ver_entradas,
    ver_postres
};
