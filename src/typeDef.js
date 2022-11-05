const typeDefs = `#graphql
  type User{
    userId:ID!
    name:String!
    username:String!
    password:String!
  }

type Query{
    users:[User]
}

`
export default typeDefs