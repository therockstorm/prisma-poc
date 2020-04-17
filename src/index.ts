import { ApolloServer } from "apollo-server"
import { schema } from "./schema"
import { createContext } from "./context"

new ApolloServer({ schema, context: createContext }).listen(
  { port: 4000 },
  () => console.log(`🚀 Server ready at: http://localhost:4000`)
)

// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// async function main() {
// Create account, post, and profile
// await prisma.account.create({
//   data: {
//     name: "Bob",
//     email: "x@example.com",
//     posts: { create: { title: "Hello World" } },
//     profile: { create: { bio: "I like ice cream." } }
//   }
// })
// console.dir(
//   await prisma.account.findMany({
//     include: { posts: true, profile: true }
//   }),
//   { depth: null }
// )
//
// Update post to publish it
// console.log(
//   await prisma.post.update({
//     where: { postId: 1 },
//     data: { published: true }
//   })
// )
// }

// main()
//   .catch(e => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.disconnect()
//   })
