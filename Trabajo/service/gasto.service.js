import { GASTOS_DB } from "../data/gasto.data.js";
import { GastoCombustible } from "../model/GastoCombustible.js";



var gastoAnual = {
  2020 : 0,
  2019 : 0,
  2018 : 0,
  2017 : 0,
  2016 : 0,
  2015 : 0
};

function almacenarGastos(){
    GASTOS_DB.forEach(gasto => {
        localStorage.setItem(gasto.id, JSON.stringify(gasto));

        const año = gasto.date.getFullYear();

        gastoAnual[año] += gasto.precioViaje;
    });

    for (const año in gastoAnual) {
        sessionStorage.setItem(año, gastoAnual[año]);
    }
}

function procesarGasto(jsonNuevoGasto) {
    const registro = JSON.parse(jsonNuevoGasto);

    const gasto = new GastoCombustible(
        registro.id,
        registro.vehicleType,
        new Date(registro.date),
        registro.kilometers,
        registro.precioViaje
    );

    const año = gasto.date.getFullYear();

    const totalActual = Number(sessionStorage.getItem(año)) || 0;

    const nuevoTotal = totalActual + gasto.precioViaje;
    sessionStorage.setItem(año, nuevoTotal);
}

export const GastoService = {
        almacenarGastos,
        procesarGasto
};
