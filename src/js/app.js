import * as functions from './modules/functions.js'
import createTaskList from './modules/createTaskList.js'
import defineModal from './modules/defineModal.js'

functions.defineWebpClass()
await createTaskList('tasks')
defineModal()
