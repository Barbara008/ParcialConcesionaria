let operacionesArchivo = require('./funcionArchivo');




let funcionalidades = {
  autos: operacionesArchivo.leerArchivoJson(),

  listar: function() {
      // cuando se llama a este metodo se imprimen todos los autos en autos.json
      console.log(this.autos);
  },

  buscarAuto: function(patenteBuscada) {
    // cuando se llama a este metodo se imprimen todos los datos del auto con la patente inresada. Sino esta, devuelve "sin coincidencias"
    console.log(`========================\nBuscando el auto por su patente: ${patenteBuscada}\n========================`);
    autoBuscado = this.autos.filter(auto => auto.patente === patenteBuscada)[0];
    return autoBuscado != undefined ? autoBuscado : `No se ha encontrado un vehiculo que coincida con la patente ${patenteBuscada}`;

  },

  venderAuto: function(patenteBuscada) {
    // cuando se llama a este metodo se sobrescribe el objeto de autos, cambiando este auto en particular a vendido
    let autoVendido = this.buscarAuto(patenteBuscada);
    autos = this.autos.map(function(auto){
      if (auto.patente == patenteBuscada){

        if (autoVendido) {

            if (autoVendido.vendido == true) {
                console.log('El vehiculo ingresado, ya se encuentra vendido!');
                return auto;
            }else{
                console.log('Felicitaciones, auto vendido!');
                console.log('=============================');
                console.log(`La patente que ha ingresado es: ${autoVendido.patente}, perteneciente al vehiculo:\nMarca: "${autoVendido.marca}"\nModelo: "${autoVendido.modelo}"\nPrecio: "${autoVendido.precio}"\nKM: "${autoVendido.km}"\nColor: "${autoVendido.color}"\nCuotas: "${autoVendido.cuotas}"\nAño: "${autoVendido.anio}"
                `);
                auto.vendido = true;
                return auto;
            }
        }
      }else{
        return auto != undefined ? auto : null;
      }
    })
    operacionesArchivo.grabarUnJson(JSON.stringify(autos));
    if (autoVendido == null) {
        console.log('No ha ingresado una patente valida')
    }
  },

  autosParaLaVenta: function() {
    // cuando se llama a este metodo se imprimen todos los autos en autos.json que su estado vendido es false
    console.log('========================\nEstos autos estan en venta:\n========================');
    return this.autos.filter(auto => auto.vendido == false);
  },

  autosNuevos: function() {
    // cuando se llama a este metodo se imprimen todos los autos en autos.json que su estado vendido es false y sus km son cero
    console.log('========================\nEstos autos estan en venta y son 0km:\n========================');
    let filtro = this.autosParaLaVenta().filter(auto => auto.km == 0);
    return filtro;
  },

  listaDeVentas: function() {
    // cuando se llama a este metodo se imprime un array de precios de autos cuyo estado vendido es true
    let autosVendidos = this.autos.filter(auto => auto.vendido == true);
    var ventas = []
    autosVendidos.forEach(function(auto){
      ventas.push(auto.precio);
    });
    return ventas;
  },

  totalDeVentas: function() {
    // cuando se llama a este se suman los precios de todos los autos vendidos
    let ventas = this.listaDeVentas();
    if (ventas.length > 0){
      return ventas.reduce((a, b) => a + b, 0)
    } else {
      return 0;
    }
  },

  puedeComprar: function(auto, persona){
    // este metodo recibe un objeto auto y un objeto persona, no se puede llamar directamente.
    return auto.precio <= persona.capacidadDePagoTotal  && auto.precio / auto.cuotas <= persona.capacidadDePagoEnCuotas
  },

  autosQuePuedeComprar: function(persona){
    // dada una persona este metodo trae todos los autos que esa persona puede pagar
    let autosALaVenta = this.autosParaLaVenta();
    let autosComprables = autosALaVenta.filter(function(auto){
      return funcionalidades.puedeComprar(auto, persona);
    });
    return autosComprables;
  }
}

module.exports = funcionalidades;