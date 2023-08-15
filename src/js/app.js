import defineWebp from './modules/webp/defineWebp.js'
import createTaskList from './modules/tasks/createTaskList.js'
import defineCloseModals from './modules/modal/defineCloseModals.js'
import defineValidation from './modules/modal/defineValidation.js'

defineWebp()
defineCloseModals()
defineValidation()

await createTaskList('tasks')
