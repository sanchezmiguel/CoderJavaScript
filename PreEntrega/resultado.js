// resultado.js

class Resultado {
    constructor(montoPrestamo, tasaInteres, plazoPrestamo, cuotaMensual, totalPrestamo, tipoMoneda) {
        this.montoPrestamo = montoPrestamo;
        this.tasaInteres = tasaInteres;
        this.plazoPrestamo = plazoPrestamo;
        this.cuotaMensual = cuotaMensual;
        this.totalPrestamo = totalPrestamo;
        this.tipoMoneda = tipoMoneda;
        this.fecha = new Date(); // fecha en la que se generó el resultado
    }
}

// Exportar la clase para que pueda ser importada en otros archivos
export default Resultado;
