import movimientosModel from "../models/movimientos.js";

const postMovimientos = async (req, res) => {
    try {
        const {
            tipo,
            numeroFactura,
            fecha,
            articulos: [{ id, cantidad, precio }],
            valor,
            iva,
            total,
            estado,
        } = req.body;
        const movimiento = new movimientosModel({
            tipo,
            numeroFactura,
            fecha,
            articulos: [{ id, cantidad, precio }],
            valor,
            iva,
            total,
            estado
        })
        await movimiento.save()
        res.json({ movimiento })
    } catch (error) {
        res.status(400).json({ error: "fallo tras registrar un nuevo movimiento" })
        console.log(error);
    }
};

const putMovimientos = async (req, res) => {
    try {
        const { ide } = req.params
        const { tipo,
            numeroFactura,
            fecha,
            articulos: [{ id, cantidad, precio }],
            valor,
            iva,
            total,
            estado, } = req.body
        const movimiento = await movimientosModel.findByIdAndUpdate(ide, {
            tipo,
            numeroFactura,
            fecha,
            articulos: [{ id, cantidad, precio }],
            valor,
            iva,
            total,
            estado
        }, { new: true })
        res.json({ movimiento })
    } catch (error) {
        res.status(400).json({ error: "ocurrio un error mientras se editaba el movimiento" })
        console.log(error);
    }
}

const getMovimientos = async (req, res) => {
    try {
        const movimientos = await movimientosModel.find()
        res.json({ movimientos })
    } catch (error) {
        res.status(400).json({ error: "ocurrio un error mientras se obtenian todos los movimientos" })
        console.log(error);
    }
}

const getMovimiento = async (req, res) => {
    try {
        const { id } = req.params
        const movimiento = await movimientosModel.findById(id)
        res.json({ movimiento })
    } catch (error) {
        res.status(400).json({ error: "ocurrio un error tras buscar el movimiento" })
    }
}

const getActivosinactivos = async (req, res) => {
    try {
        const { accion } = req.params
        if (accion == "activos") {
            const activos = await movimientosModel.find({ estado: 1 })
            res.json({ activos })
        }
        else if (accion == "inactivos") {
            const inactivos = await movimientosModel.find({ estado: 0 })
            res.json({ inactivos })
        }
    } catch (error) {

    }
}

const putActivarInactivar = async (req, res) => {
    try {
        const { accion } = req.params
        const { id } = req.params
        if (accion == "activar") {
            const movimiento = await movimientosModel.findByIdAndUpdate(id, { estado: 1 }, { new: true })
            res.json({ movimiento })
        }
        else if (accion == "inactivar") {
            const movimiento = await movimientosModel.findByIdAndUpdate(id, { estado: 0 }, { new: true })
            res.json({ movimiento })
        }
    } catch (error) {
        res.status(400).json({ error: "ocurrio un error tras hacer la operacion" })
        console.log(error);
    }
}

const getMovimientoTipo = async (req, res) => {
    try {
        const { tipo } = req.params
        if (tipo == "entradas" || tipo == 1) {
            const entradas = await movimientosModel.find({ tipo: 1 })
            res.json({ entradas })
        }
        else if (tipo == "salidas" || tipo == 2) {
            const salidas = await movimientosModel.find({ tipo: 2 })
            res.json({ salidas })
        }
        else if (tipo == "devolucion Entrada" || tipo == 3) {
            const devolucionesEntrada = await movimientosModel.find({ tipo: 3 })
            res.json({ devolucionesEntrada })
        }
        else if (tipo == "devolucion salida" || tipo == 4) {
            const devolucionesSalida = await movimientosModel.find({ tipo: 4 })
            res.json({ devolucionesSalida })
        }
    } catch (error) {
        res.status(400).json({ error: "ocurrio un error tras realizar la operacion" })
        console.log(error);
    }
}

const getMovimientosFechas = async (req, res)=>{
    try {
        const  {fechaInicio, fechaFin}  = req.params
        const  movimientos = await movimientosModel.find({
            fecha:{
                $gte:new Date(fechaInicio),
                $lte:new Date(fechaFin)
            }
        })
        res.json({movimientos})
    } catch (error) {
        res.status(400).json({error:"error tras realizar la operacion"})
        console.log(error);
    }
}

export {
    postMovimientos,
    putMovimientos,
    getMovimientos,
    getMovimiento,
    getActivosinactivos,
    putActivarInactivar,
    getMovimientoTipo,
    getMovimientosFechas
};
