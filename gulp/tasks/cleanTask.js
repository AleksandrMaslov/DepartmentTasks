import * as del from 'del'

export const cleanTask = (done) => {
  del.deleteSync(app.paths.cleanFolder)
  return done()
}
