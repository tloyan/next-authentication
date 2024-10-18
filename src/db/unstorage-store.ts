import {createStorage} from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
const storage = createStorage({
  driver: fsDriver({base: './tmp'}),
})

export default storage

// import memoryDriver from 'unstorage/drivers/memory' // Utilisation d'un driver en mémoire pour l'exemple
// const storage = createStorage({
//   driver: memoryDriver(),
// })

// export default storage
