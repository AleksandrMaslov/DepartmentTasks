import defineWebp from './modules/webp/defineWebp.js'
import createTaskList from './modules/tasks/createTaskList.js'
import defineCloseModals from './modules/modal/defineCloseModals.js'

defineWebp()
await createTaskList('tasks')
defineCloseModals()
