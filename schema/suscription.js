export default `
  type Suscription {
    id: Int!
    name: String!
    price: Float!
    idConekta: Int!
  }

  type Query {
    suscriptions: [Suscription!]
    suscription(id: Int!): Suscription!
  }
`;
