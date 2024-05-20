import pool from "../db.js"
//---------- funciones------------------
function listar_mesas(consulta) {
    let mesas_encontradas = [];
    for (const mesa of consulta[0]) {
        mesas_encontradas.push(mesa);
    }
    return mesas_encontradas;
}
//-------------------SERVICIOS----------------------
const mesas_disponibles = async(req,res)=>{
    try{
        let diponibilidad = 'NO disponible';

        //let elegir_mesa = await pool.query("UPDATE mesa set disponible = 'disponible' WHERE = 'disponible'")

        let mesas = await pool.query("SELECT numero_mesa, capacidad, disponible FROM mesa" );

        //let elegir_mesa = await pool.query("UPDATE mesa set disponible = 'NO disponible' WHERE ")
        

        //let mesas_2 = await pool.query("SELECT numero_mesa, capacidad, disponible FROM mesa WHERE disponible = ?",[diponibilidad] );
        
        //mesas = listar_mesas(mesas)

        //console.log("holas", mesas_2)

        const titulo_pag = "Mesas Disponibles"
       
        const USUARIO = req.user;
        //console.log(USUARIO.usuario)

        res.render("orden_menu", { mesas, titulo: titulo_pag, user:USUARIO});

        
    }
    catch(error){
        console.log(error)
    }
};

const Seleccion_mesa = async (req, res) => {
    try {
        // Requisitos para el registro
        let { capacidad  } = req.body;

        //funcion para listar la consultas SQL
        
        
        // Obtener las mesas disponibles
        let total_mesas = await pool.query("SELECT numero_mesa, capacidad FROM mesa WHERE disponible = 1");
        //listar las mesas disponisbles if (mi_mesa[0].length > 0) {
        const total = listar_mesas(total_mesas);
        
        let mi_mesa = await pool.query(`SELECT numero_mesa, capacidad FROM mesa WHERE COALESCE(capacidad, 0) = ${capacidad} AND disponible = 1`);
        

        const mesas_actuales = listar_mesas(mi_mesa)

        console.log(total)
        console.log(mesas_actuales)


        res.render("orden_menu",{ mesas_actuales, total});
    } catch (error) {
        console.error(error);
        return res.redirect('/menu_orden?error=AL%20registrar%20el%20Usuario');
    }
};


export default {
    Seleccion_mesa,
    mesas_disponibles
}