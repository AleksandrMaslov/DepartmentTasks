import defineWebp from './modules/webp/defineWebp.js'
import defineModals from './modules/modal/defineModals.js'
import createTaskList from './modules/tasks/createTaskList.js'

defineWebp()
defineModals()

await createTaskList('tasks')
