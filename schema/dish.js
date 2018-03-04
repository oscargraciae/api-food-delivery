export default `
  type Dish {
    id: Int!
    name: String!
    description: String!
    ingredients: String!
    price: Float!
  }

  type CreateResponse {
    ok: Boolean!
    dish: Dish
    errors: [Error!]
  }

  type Query {
    dishes: [Dish!]!
  }

  type Mutation {
    createDish(name: String!, description: String!, ingredients: String!, price: Float!, availableOn: String!): CreateResponse!
  }
  
`;
