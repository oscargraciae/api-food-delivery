"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  type Suscription {\n    id: Int!\n    name: String!\n    price: Float!\n    idConekta: Int!\n  }\n\n  type Query {\n    suscriptions: [Suscription!]\n    suscription(id: Int!): Suscription!\n  }\n";