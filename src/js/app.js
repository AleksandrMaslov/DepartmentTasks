import defineWebp from './modules/defineWebp.js'
import defineModals from './modules/defineModals.js'
import defineAuthorization from './modules/defineAuthorization.js'
import createTaskList from './modules/createTaskList.js'

defineWebp()
defineModals()
defineAuthorization()

await createTaskList('tasks')
