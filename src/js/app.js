import * as functions from './modules/functions.js'
functions.defineWebpClass()

import getTasks from './modules/getTasks.js'
import generateRows from './modules/generateTable.js'
const responseData = await getTasks()
generateRows({ blockClass: 'tasks', responseData })
