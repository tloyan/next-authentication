/* eslint-disable no-restricted-imports */

// 🐶 Importe le type `SessionType`
// 🤖 import {SessionType} from './type'

// 🐶 Importe les fonctions de session database
// 🤖
// import {
//   createSession as createSessionDb,
//   deleteSession as deleteSessionDb,
//   verifySession as verifySessionDb,
//   updateSession as updateSessionDb,
// } from './session-database'
import {
  createSession as createSessionStateLess,
  deleteSession as deleteSessionStateLess,
  updateSession as updateSessionStateLess,
  verifySession as verifySessionStateless,
} from './session-stateless'

// 🐶 Récupère le type de session définie en variable d'environnement
// 🤖 const SESSION_TYPE: SessionType = process.env.SESSION_TYPE as SessionType

// 🐶 Implémente le `Strategy Pattern`
export async function createSession(userId: string) {
  // 🐶 Crée une session en fonction du type de session définie
  // Tu peux utiliser un `switch case` pour appeler la bonne fonction
  // 🤖 switch (SESSION_TYPE) {
  return await createSessionStateLess(userId)
  // 🐶 Lève une erreur en cas de type invalide
  // 🤖 throw new Error('Invalid session type')
}

// 🐶 Implémente le `Strategy Pattern`
export async function verifySession() {
  return await verifySessionStateless()
}

// 🐶 Implémente le `Strategy Pattern`
export async function updateSession() {
  return await updateSessionStateLess()
}

// 🐶 Implémente le `Strategy Pattern`
export function deleteSession() {
  return deleteSessionStateLess()
}
