import {createStorage} from 'unstorage'
import memoryDriver from 'unstorage/drivers/memory' // Utilisation d'un driver en mémoire pour l'exemple
//import fsDriver from 'unstorage/drivers/fs'
const storage = createStorage({
  driver: memoryDriver(),
  //driver: fsDriver({base: './tmp'}),
})

export default storage
