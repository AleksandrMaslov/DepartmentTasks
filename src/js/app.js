import * as functions from './modules/functions.js'
import createTaskList from './modules/createTaskList.js'

functions.defineWebpClass()
await createTaskList('tasks')
functions.defineModal()
