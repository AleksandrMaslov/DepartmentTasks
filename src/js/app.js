import * as functions from './modules/functions.js'

import requestTasks from './modules/requestTasks.js'
import createTaskList from './modules/createTaskList.js'

functions.defineWebpClass()
const responseData = await requestTasks()
createTaskList({ blockClass: 'tasks', responseData })
