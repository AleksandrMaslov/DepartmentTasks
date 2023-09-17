import defineWebp from './modules/defineWebp.js'
import defineModals from './modules/defineModals.js'
import loadAppData from './modules/loadAppData.js'
import defineAuthorization from './modules/defineAuthorization.js'
import defineContextMenu from './modules/defineContextMenu.js'

defineWebp()
defineModals()
defineContextMenu()
defineAuthorization()

await loadAppData()
