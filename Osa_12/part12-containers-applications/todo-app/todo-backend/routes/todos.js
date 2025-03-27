const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const savedCounter = await getAsync('counter')
  const newCounter = savedCounter ? parseInt(savedCounter) + 1 : 1;
  const task = await setAsync('counter', newCounter)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log(req.todo.id)
  const body = req.body
  console.log(body)
  
  const todo = {
    text: body.text,
    done: body.done
  }
  
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, todo, { new: true, useFindAndModify: false })
  console.log(updatedTodo)
  res.send(updatedTodo)
})

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
