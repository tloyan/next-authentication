import {
  AddTodo,
  AddUser,
  CategoriesEnum,
  Post,
  Product,
  RoleEnum,
  Session,
  Todo,
  User,
} from '@/lib/type'
import storage from './unstorage-store'

type BddDataType = {
  posts?: Post[]
  products?: Product[]
  todos?: Todo[]
  users?: User[]
  sessions?: Session[]
}

const logDatabase = false

const defaultData: BddDataType = {
  posts: [{id: '1', title: 'Default post'}],
  products: [
    {
      id: '1',
      title: 'Default product',
      price: 199,
      quantity: 19,
      category: CategoriesEnum.lighting,
      createdAt: '2024-04-24T05:56:06.593Z',
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'IPhone',
      price: 1490,
      quantity: 4,
      category: CategoriesEnum.furniture,
      createdAt: '2024-04-25T05:56:06.593Z',
      updatedAt: new Date().toISOString(),
    },
  ],
  todos: [
    {
      id: 1,
      title: 'Apprendre React',
      isCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Apprendre Next',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  users: [
    {
      id: '1',
      email: 'a@a.fr',
      password: '$2a$10$9Wbm/TKd9UwnfIrGTC/eseV/jhtTQbzv61lUOjmpbVqlkZRVbCsd', //pass = Azerty123 bcryptjs
      name: 'John',
      role: RoleEnum.USER,
    },
    {
      id: '1',
      email: 'admin@mikecodeur.com',
      //password: '$2b$10$jkcVnOhylT2UUgte8ap0F.zCmcQ9VGj/.bl9qbb2IwwKStdBTDUHS',
      password: '$2a$10$9Wbm/TKd9UwnfIrGTC/eseV/jhtTQbzv61lUOjmpbVqlkZRVbCsd.', //pass = Azerty123 bcryptjs
      name: 'John Doe',
      role: RoleEnum.SUPER_ADMIN,
    },
  ],
  sessions: [
    {sessionId: '1', userId: '1', expiresAt: new Date().toISOString()},
  ],
}

// Fonction pour convertir les données JSON stockées en chaîne de caractères en objets JavaScript
async function getData(): Promise<BddDataType> {
  const dataString: BddDataType = (await storage.getItem('data')) as BddDataType
  if (logDatabase) {
    console.log(
      'uncache DB ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      dataString.users
    )
  }

  return dataString as BddDataType //? JSON.parse(dataString as string) : defaultData
}

// Fonction pour sauvegarder les données
async function setData(data: BddDataType) {
  //console.log('setData DB ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data)
  await storage.setItem('data', JSON.stringify(data))
}

// Initialisation des données par défaut
async function initDb() {
  const data: BddDataType = (await storage.getItem('data')) || defaultData
  if (data.posts?.length === 1) {
    data.posts.push({id: '2', title: 'Un post'})
    await setData(data)
  }
}

// Initialiser la base de données
// eslint-disable-next-line unicorn/prefer-top-level-await
initDb()

export async function getTodos(): Promise<Todo[]> {
  const data = await getData()
  return data.todos ?? []
}

export async function addTodo(todo: AddTodo): Promise<void> {
  const data = await getData()
  data.todos?.push({
    id: todo.id ?? data.todos.length + 1,
    title: todo.title,
    isCompleted: todo.isCompleted,
    createdAt: todo.createdAt ?? new Date().toISOString(),
    updatedAt: todo.updatedAt ?? new Date().toISOString(),
  })
  await setData(data)
}

export async function updateTodo(todo: Todo): Promise<void> {
  todo.updatedAt = new Date().toISOString()
  const data = await getData()
  updateById(data.todos ?? [], todo)
  await setData(data)
}

export async function getProducts(): Promise<Product[]> {
  const data = await getData()
  return sortByDate(data.products, 'asc')
}

export async function addProduct(product: Product): Promise<void> {
  const data = await getData()
  data.products?.push({
    id: `${data.products.length + 1}`,
    title: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
    category: product.category,
    quantity: product.quantity,
    createdAt: product.createdAt ?? new Date().toISOString(),
    updatedAt: product.updatedAt ?? new Date().toISOString(),
  })
  await setData(data)
}

export async function updateProduct(product: Product): Promise<void> {
  product.updatedAt = new Date().toISOString()
  const data = await getData()
  updateById(data.products ?? [], product)
  await setData(data)
}

export async function deleteProduct(id: string): Promise<void> {
  const data = await getData()
  deleteById(data.products ?? [], id)
  await setData(data)
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const data = await getData()
  return data.products?.find((product) => product.id === id)
}

export async function getProductByName(
  name: string
): Promise<Product | undefined> {
  const data = await getData()
  const lowerCaseName = name.toLowerCase()
  return data.products?.find(
    (product) => product.title.toLowerCase() === lowerCaseName
  )
}

export async function getPosts(): Promise<Post[]> {
  const externalData = false
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const postsApi: Post[] = await response.json()
  const data = await getData()
  const posts = externalData ? (postsApi ?? []) : (data.posts ?? [])
  return posts
}

export async function addPost(post: Post): Promise<void> {
  const data = await getData()
  data.posts?.push({
    id: `${data.posts.length + 1}`,
    title: post.title,
  })
  await setData(data)
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const data = await getData()
  return data.posts?.find((post) => post.id === id)
}

export async function addUser(user: AddUser): Promise<User> {
  const data = await getData()
  user.id = user.id ?? `${data.users?.length ?? 0 + 1}`
  const newUser: User = {
    id: `${data.users?.length ?? 0 + 1}`,
    email: user.email,
    password: user.password,
    name: user.name,
    role: user.role,
  }
  data.users?.push(newUser)
  await setData(data)
  return newUser
}

export async function updateUser(user: User): Promise<void> {
  const data = await getData()
  updateById(data.users ?? [], user)
  await setData(data)
}

export async function updateUserRole(
  email: string,
  role: RoleEnum
): Promise<void> {
  const user = await getUserByEmail(email)
  if (!user) {
    throw new Error('User not found')
  }
  user.role = role
  await updateUser(user)
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const data = await getData()
  // eslint-disable-next-line unicorn/no-null
  return data.users?.find((u) => u.email === email) ?? null
}

export async function getUserById(id: string): Promise<User | undefined> {
  const data = await getData()
  return data.users?.find((user) => user.id === id)
}

export async function addSession(session: Session): Promise<void> {
  const data = await getData()
  data.sessions?.push({
    sessionId: session.sessionId,
    userId: session.userId,
    expiresAt: session.expiresAt,
  })
  await setData(data)
}

export async function updateSession(session: Session): Promise<void> {
  const data = await getData()
  const index =
    data.sessions?.findIndex((item) => item.sessionId === session.sessionId) ??
    -1
  if (index === -1) {
    throw new Error(`Item with id ${session.sessionId} not found`)
  } else {
    data.sessions ? (data.sessions[index] = session) : undefined
  }
  //updateById(data.sessions ?? [], session)
  await setData(data)
}

export async function findSession(sessionId: string): Promise<Session | null> {
  const data = await getData()
  // eslint-disable-next-line unicorn/no-null
  return data.sessions?.find((u) => u.sessionId === sessionId) ?? null
}

// Fonction générique pour mettre à jour un élément dans un tableau
function updateById<T extends {id: number | string}>(
  items: T[],
  updatedItem: T
): void {
  const index = items.findIndex((item) => item.id === updatedItem.id)
  if (index === -1) {
    throw new Error(`Item with id ${updatedItem.id} not found`)
  } else {
    items[index] = updatedItem
  }
}

// Fonction générique pour supprimer un élément dans un tableau
function deleteById<T extends {id: number | string}>(
  items: T[],
  itemId: number | string
): void {
  const index = items.findIndex((item) => item.id === itemId)
  if (index === -1) {
    throw new Error(`Item with id ${itemId} not found`)
  } else {
    items.splice(index, 1)
  }
}

function sortByDate<T extends {createdAt?: string}>(
  items?: T[],
  sortOrder: 'asc' | 'desc' = 'asc'
): T[] {
  if (!items) {
    return []
  }
  return items.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date()
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date()
    const result = dateA.getTime() - dateB.getTime()
    return sortOrder === 'asc' ? result : -result
  })
}
