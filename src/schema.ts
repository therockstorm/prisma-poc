import { nexusPrismaPlugin } from "nexus-prisma"
import { intArg, makeSchema, objectType, stringArg } from "@nexus/schema"

const Account = objectType({
  name: "Account",
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.posts({ pagination: false })
    t.model.profile()
  }
})

const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.content()
    t.model.published()
    t.model.created()
    t.model.account()
  }
})

const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.model.id()
    t.model.bio()
    t.model.account()
  }
})

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.post()

    t.list.field("feed", {
      type: "Post",
      resolve: (_root, _args, ctx) =>
        ctx.prisma.post.findMany({ where: { published: true } })
    })

    t.list.field("filterPosts", {
      type: "Post",
      args: { searchString: stringArg({ nullable: true }) },
      resolve: (_root, { searchString }, ctx) =>
        ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } }
            ]
          }
        })
    })
  }
})

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.createOneAccount({ alias: "signupAccount" })
    t.crud.deleteOnePost()

    t.field("createDraft", {
      type: "Post",
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        email: stringArg()
      },
      resolve: (_root, { title, content, email }, ctx) =>
        ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            account: { connect: { email: email } }
          }
        })
    })

    t.field("publish", {
      type: "Post",
      nullable: true,
      args: {
        id: intArg()
      },
      resolve: (_root, { id }, ctx) =>
        ctx.prisma.post.update({
          where: { id: Number(id) },
          data: { published: true }
        })
    })
  }
})

export const schema = makeSchema({
  types: [Query, Mutation, Post, Account, Profile],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts"
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma"
      },
      {
        source: require.resolve("./context"),
        alias: "Context"
      }
    ]
  }
})
