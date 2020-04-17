# prisma-poc

Playing around with [Prisma](https://www.prisma.io/), [Apollo](https://www.apollographql.com/), [Nexus](https://www.nexusjs.org/#/), and [tsdx](https://github.com/jaredpalmer/tsdx).

## Initialize database

1. Start Postgres, `docker-compose -f ./docker-compose.yml up`
1. Copy schema into container, `docker cp prisma/schema.sql prisma-poc_postgres_1:/tmp`
1. Exec bash in container, `dcp -f ./docker-compose.yml exec postgres bash`
1. From inside container, `psql -h localhost -d prisma-poc -U user -f /tmp/schema.sql`

## Local Development

1. Build, `npm run build`
1. Run, `node run dev`

## GraphQL API Examples

```graphql
query publishedPostsAndAccounts {
  feed {
    id
    title
    content
    published
    account {
      id
      name
      email
      profile {
        bio
      }
    }
  }
}

query postById {
  post(where: { id: 1 }) {
    id
    title
    content
    published
  }
}

query filterPosts {
  filterPosts(searchString: "Hello") {
    id
    title
    content
    published
  }
}

mutation singupAccount {
  signupAccount(data: { name: "Bob", email: "x@example.com" }) {
    id
  }
}

mutation createDraft {
  createDraft(title: "Yo", content: "Hello.", email: "x@example.com") {
    id
  }
}

# Must replace _ID_ with valid ID
mutation publish {
  publish(id: _ID_) {
    id
  }
}

# Must replace _ID_ with valid ID
mutation deleteOnePost {
  deleteOnePost(where: { id: _ID_ }) {
    id
  }
}
```
