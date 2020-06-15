const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req ,res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });
}

exports.agregarTestimonial = async (req,res) => {
    //Validar que los campos esten llenos
    let {nombre, correo, mensaje} = req.body;

    let errores = [];
    if(!nombre){
        errores.push({'mensaje': 'Agrega tu nombre'});
    }
    if(!correo){
        errores.push({'correo': 'Agrega tu correo'});
    }
    if(!mensaje){
        errores.push({'mensaje': 'Agrega tu mensaje'});
    }

    //Revisar si hay errores
    if(errores.length > 0){
        //muestra vista de error
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje
        });
    }else{
        //almacenarlo en la BD
        Testimonial.create({
            nombre,
            correo,
            mensaje
        }).then(testimonial => res.redirect('/testimoniales'))
          .catch(error => console.log(error));
    }
}