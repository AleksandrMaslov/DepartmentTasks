import defineWebp from './modules/common/defineWebp.js'
import createTaskList from './modules/tasks/createTaskList.js'
import defineModal from './modules/modal/defineModal.js'

defineWebp()
await createTaskList('tasks')
defineModal()
