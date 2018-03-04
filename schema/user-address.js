export default `
  type UserAddress {
    id: Int!
    street: String!
    area: String!
    zipcode: String!
    city: String!
    state: String!
    addressMap: String,
    lat: Float
    lng: Float
    isActive: Boolean
  }

  type Query {
    getAllAddress: [UserAddress!]!
    getAddressByUser(userId: Int!): [UserAddress!]!
  }

  type Mutation {
    createAddress(
      street: String!
      area: String!
      zipcode: String!
      city: String!
      state: String!
      addressMap: String,
      lat: Float!
      lng: Float!
    ): UserAddress!
  }

`;
