export default `
  type User {
    id: Int
    email: String!
    firstName: String!
    lastName: String!
    phone: String
    suscription: Suscription
    userAddress: [UserAddress]
  }

  type Query {
    getUser(id: Int!): User!
    getAllUsers: [User!]
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!, phone: String): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;
