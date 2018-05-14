"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  type User {\n    id: Int\n    email: String!\n    firstName: String!\n    lastName: String!\n    phone: String\n    suscription: Suscription\n    userAddress: [UserAddress]\n  }\n\n  type Query {\n    getUser(id: Int!): User!\n    getAllUsers: [User!]\n  }\n\n  type RegisterResponse {\n    ok: Boolean!\n    user: User\n    errors: [Error!]\n  }\n\n  type LoginResponse {\n    ok: Boolean!\n    token: String\n    refreshToken: String\n    errors: [Error!]\n  }\n\n  type Mutation {\n    createUser(firstName: String!, lastName: String!, email: String!, password: String!, phone: String): RegisterResponse!\n    login(email: String!, password: String!): LoginResponse!\n  }\n";