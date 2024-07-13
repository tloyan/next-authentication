/* eslint-disable no-restricted-imports */

// 🐶 importe le type (SessionType)
// 🤖 import {SessionType} from './type'

// 🐶 importe les fonctions de session database
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

// 🐶 récupère le type de session défini en variable d'environnement
// 🤖 const SESSION_TYPE: SessionType = process.env.SESSION_TYPE as SessionType

// 🐶 Implemente le Strategy Pattern
export async function createSession(userId: string) {
  // 🐶 crée une session en fonction du type de session défini
  // tu peux utiliser un switch case pour appeler la bonne fonction
  // 🤖 switch (SESSION_TYPE) {
  return await createSessionStateLess(userId)
  // 🐶 Lève une erreur en cas de type invalide
  // 🤖 throw new Error('Invalid session type')
}

// 🐶 Implemente le Strategy Pattern
export async function verifySession() {
  return await verifySessionStateless()
}

// 🐶 Implemente le Strategy Pattern
export async function updateSession() {
  return await updateSessionStateLess()
}

// 🐶 Implemente le Strategy Pattern
export function deleteSession() {
  return deleteSessionStateLess()
}
