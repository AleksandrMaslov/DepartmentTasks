import defineWebp from './modules/defineWebp.js'
import defineModals from './modules/defineModals.js'
import defineAuthorization from './modules/defineAuthorization.js'
import loadAppData from './modules/loadAppData.js'

defineWebp()
defineModals()
defineAuthorization()

await loadAppData()
