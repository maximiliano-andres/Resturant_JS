const error404 = (req,res, next)=>{
    res.status(404).render("error404");
};

const error500 = ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error500");
});

export default {
    error404,
    error500
}