import {
  AddTodo,
  AddUser,
  Post,
  Product,
  Todo,
  User,
  Session,
  RoleEnum,
} from '@/lib/type'
import {
  getTodos as getTodosLowdb,
  addTodo as addTodoLowdb,
  updateTodo as updateTodoLowdb,
  getProducts as getProductsLowdb,
  addProduct as addProductLowdb,
  updateProduct as updateProductLowdb,
  deleteProduct as deleteProductLowdb,
  getProductById as getProductByIdLowdb,
  getProductByName as getProductByNameLowdb,
  getPosts as getPostsLowdb,
  addPost as addPostLowdb,
  getPostById as getPostByIdLowdb,
  addUser as addUserLowdb,
  updateUser as updateUserLowdb,
  updateUserRole as updateUserRoleLowdb,
  getUserByEmail as getUserByEmailLowdb,
  getUserById as getUserByIdLowdb,
  addSession as addSessionLowdb,
  updateSession as updateSessionLowdb,
  findSession as findSessionLowdb,
} from './sgbd-lowdb'
import {
  getTodos as getTodosUnstorage,
  addTodo as addTodoUnstorage,
  updateTodo as updateTodoUnstorage,
  getProducts as getProductsUnstorage,
  addProduct as addProductUnstorage,
  updateProduct as updateProductUnstorage,
  deleteProduct as deleteProductUnstorage,
  getProductById as getProductByIdUnstorage,
  getProductByName as getProductByNameUnstorage,
  getPosts as getPostsUnstorage,
  addPost as addPostUnstorage,
  getPostById as getPostByIdUnstorage,
  addUser as addUserUnstorage,
  updateUser as updateUserUnstorage,
  updateUserRole as updateUserRoleUnstorage,
  getUserByEmail as getUserByEmailUnstorage,
  getUserById as getUserByIdUnstorage,
  addSession as addSessionUnstorage,
  updateSession as updateSessionUnstorage,
  findSession as findSessionUnstorage,
} from './sgbg-unstorage'

export enum DbType {
  LOWDB = 'LOWDB',
  UNSTORAGE = 'UNSTORAGE',
}

const DB_TYPE: DbType = process.env.DB_TYPE as DbType

export async function getTodos() {
  switch (DB_TYPE) {
    case DbType.LOWDB: {
      return await getTodosLowdb()
    }
    case DbType.UNSTORAGE: {
      return await getTodosUnstorage()
    }
    default: {
      throw new Error('Invalid DB type')
    }
  }
}

export async function addTodo(todo: AddTodo) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await addTodoLowdb(todo)
    case DbType.UNSTORAGE:
      return await addTodoUnstorage(todo)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function updateTodo(todo: Todo) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await updateTodoLowdb(todo)
    case DbType.UNSTORAGE:
      return await updateTodoUnstorage(todo)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function getProducts() {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await getProductsLowdb()
    case DbType.UNSTORAGE:
      return await getProductsUnstorage()
    default:
      throw new Error('Invalid DB type')
  }
}

export async function addProduct(product: Product) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await addProductLowdb(product)
    case DbType.UNSTORAGE:
      return await addProductUnstorage(product)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function updateProduct(product: Product) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await updateProductLowdb(product)
    case DbType.UNSTORAGE:
      return await updateProductUnstorage(product)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function deleteProduct(id: string) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await deleteProductLowdb(id)
    case DbType.UNSTORAGE:
      return await deleteProductUnstorage(id)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function getProductById(id: string) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await getProductByIdLowdb(id)
    case DbType.UNSTORAGE:
      return await getProductByIdUnstorage(id)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function getProductByName(name: string) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await getProductByNameLowdb(name)
    case DbType.UNSTORAGE:
      return await getProductByNameUnstorage(name)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function getPosts() {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await getPostsLowdb()
    case DbType.UNSTORAGE:
      return await getPostsUnstorage()
    default:
      throw new Error('Invalid DB type')
  }
}

export async function addPost(post: Post) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await addPostLowdb(post)
    case DbType.UNSTORAGE:
      return await addPostUnstorage(post)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function getPostById(id: string) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await getPostByIdLowdb(id)
    case DbType.UNSTORAGE:
      return await getPostByIdUnstorage(id)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function addUser(user: AddUser) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await addUserLowdb(user)
    case DbType.UNSTORAGE:
      return await addUserUnstorage(user)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function updateUser(user: User) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await updateUserLowdb(user)
    case DbType.UNSTORAGE:
      return await updateUserUnstorage(user)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function updateUserRole(email: string, role: RoleEnum) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await updateUserRoleLowdb(email, role)
    case DbType.UNSTORAGE:
      return await updateUserRoleUnstorage(email, role)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function getUserByEmail(email: string) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await getUserByEmailLowdb(email)
    case DbType.UNSTORAGE:
      return await getUserByEmailUnstorage(email)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function getUserById(id: string) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await getUserByIdLowdb(id)
    case DbType.UNSTORAGE:
      return await getUserByIdUnstorage(id)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function addSession(session: Session) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await addSessionLowdb(session)
    case DbType.UNSTORAGE:
      return await addSessionUnstorage(session)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function updateSession(session: Session) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await updateSessionLowdb(session)
    case DbType.UNSTORAGE:
      return await updateSessionUnstorage(session)
    default:
      throw new Error('Invalid DB type')
  }
}

export async function findSession(sessionId: string) {
  switch (DB_TYPE) {
    case DbType.LOWDB:
      return await findSessionLowdb(sessionId)
    case DbType.UNSTORAGE:
      return await findSessionUnstorage(sessionId)
    default:
      throw new Error('Invalid DB type')
  }
}
