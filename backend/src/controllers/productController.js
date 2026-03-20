const pool = require('../config/db');

const validate = (data, isUpdate = false) => {
  const fields = ['campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6'];
  for (const f of fields) {
    if (!isUpdate && data[f] === undefined) return `${f} es requerido`;
    if (data[f] !== undefined) {
      if (f === 'campo4' && !Number.isInteger(data[f])) return 'campo4 debe ser entero';
      if (f === 'campo5' && typeof data[f] !== 'number') return 'campo5 debe ser decimal';
      if (f === 'campo6' && typeof data[f] !== 'boolean') return 'campo6 debe ser booleano';
    }
  }
  return null;
};

exports.getAll = async (req, res) => {
  const r = await pool.query('SELECT * FROM products ORDER BY id ASC');
  res.json(r.rows);
};

exports.getOne = async (req, res) => {
  const r = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
  r.rowCount ? res.json(r.rows[0]) : res.status(404).json({error: 'No encontrado'});
};

exports.create = async (req, res) => {
  const err = validate(req.body);
  if (err) return res.status(400).json({error: err});
  const {campo1, campo2, campo3, campo4, campo5, campo6} = req.body;
  const r = await pool.query(
    'INSERT INTO products (campo1, campo2, campo3, campo4, campo5, campo6) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [campo1, campo2, campo3, campo4, campo5, campo6]
  );
  res.status(201).json(r.rows[0]);
};

exports.update = async (req, res) => {
  const err = validate(req.body);
  if (err) return res.status(400).json({error: err});
  const {campo1, campo2, campo3, campo4, campo5, campo6} = req.body;
  const r = await pool.query(
    'UPDATE products SET campo1=$1, campo2=$2, campo3=$3, campo4=$4, campo5=$5, campo6=$6 WHERE id=$7 RETURNING *',
    [campo1, campo2, campo3, campo4, campo5, campo6, req.params.id]
  );
  r.rowCount ? res.json(r.rows[0]) : res.status(404).json({error: 'No encontrado'});
};

exports.patch = async (req, res) => {
  const err = validate(req.body, true);
  if (err) return res.status(400).json({error: err});
  const fields = Object.keys(req.body).filter(k => k.startsWith('campo'));
  const sets = fields.map((f, i) => `${f} = $${i+1}`).join(', ');
  const values = fields.map(f => req.body[f]);
  const r = await pool.query(
    `UPDATE products SET ${sets} WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, req.params.id]
  );
  r.rowCount ? res.json(r.rows[0]) : res.status(404).json({error: 'No encontrado'});
};

exports.remove = async (req, res) => {
  await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
  res.status(204).send();
};