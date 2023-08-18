import defineWebp from './modules/defineWebp.js'
import defineModals from './modules/defineModals.js'
import createTaskList from './modules/createTaskList.js'

defineWebp()
defineModals()

await createTaskList('tasks')
