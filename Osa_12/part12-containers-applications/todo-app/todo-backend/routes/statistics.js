const express = require('express');
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

/* GET statistics. */
router.get('/', async (_, res) => {
  const savedCounter = await getAsync('counter')
  const counter = savedCounter ? savedCounter : 0;
  const resp = { "added_todos": counter }
  res.send(resp);
});

module.exports = router;