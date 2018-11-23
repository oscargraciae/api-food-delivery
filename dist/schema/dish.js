"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  type Dish {\n    id: Int!\n    name: String!\n    description: String!\n    ingredients: String!\n    price: Float!\n  }\n\n  type CreateResponse {\n    ok: Boolean!\n    dish: Dish\n    errors: [Error!]\n  }\n\n  type Query {\n    dishes: [Dish!]!\n  }\n\n  type Mutation {\n    createDish(name: String!, description: String!, ingredients: String!, price: Float!, availableOn: String!): CreateResponse!\n  }\n  \n";