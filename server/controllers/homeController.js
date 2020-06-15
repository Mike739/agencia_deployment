const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomepage = async (req ,res) => {
    const viajes = await Viaje.findAll({ limit: 3 });
    const testimoniales = await Testimonial.findAll({ limit: 3 });

    //pasar el promise y ejecutarlo
    res.render('index', {
        pagina: 'Próximos Viajes',
        clase: 'home',
        viajes,
        testimoniales
    })
    //console.log(req);
}