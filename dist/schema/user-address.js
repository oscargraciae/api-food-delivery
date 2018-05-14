"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  type UserAddress {\n    id: Int!\n    street: String!\n    area: String!\n    zipcode: String!\n    city: String!\n    state: String!\n    addressMap: String,\n    lat: Float\n    lng: Float\n    isActive: Boolean\n    userId: Int!\n    user: User\n  }\n\n  type Query {\n    getAllAddress: [UserAddress!]\n    getAddressByUser(userId: Int!): [UserAddress!]\n  }\n\n  type Mutation {\n    createAddress(\n      street: String!\n      area: String!\n      zipcode: String!\n      city: String!\n      state: String!\n      addressMap: String,\n      lat: Float!\n      lng: Float!\n      userId: Int!\n    ): UserAddress!\n  }\n\n";