import { Comanda } from '../models/Comanda.js';

export const crear_comanda = async (req, res) => {
  const comanda = await Comanda.create({ texto: req.body.texto, mesa: req.body.mesa, personas: req.body.personas, id_usuario: req.body.id });
  res.json(comanda);
};

export const listar_comandas = async (req, res) => {
  try {
  const comandas = await Comanda.findAll({
    order: [['fecha_creacion', 'ASC']]
  });
  res.json(comandas);
} catch (e) {
  console.error(e);
  res.status(500).json({ error: 'Error al listar comandas' });  
};
};
export const marcar_lista = async (req, res) => {
  const comanda = await Comanda.findByPk(req.params.id);
  comanda.estado = 'lista';
  comanda.fecha_lista = new Date();
  await comanda.save();
  res.json(comanda);
};
