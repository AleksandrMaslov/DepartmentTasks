import defineWebp from './modules/webp/defineWebp.js'
import createTaskList from './modules/tasks/createTaskList.js'
import defineModals from './modules/modal/defineModals.js'

defineWebp()
await createTaskList('tasks')
defineModals()
