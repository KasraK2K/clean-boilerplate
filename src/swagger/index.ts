import config from "config"
import { IConfig } from "../../config/config.interface"
import general from "./domains/general"
import managerUser from "./domains/user"

const configs: IConfig = config.util.toObject()

export default {
  openapi: "3.0.n",
  info: {
    title: "Node Starter",
    description: "This is a node.js starter pack to create service easy and fast",
    version: configs.application.api_version,
  },
  servers: [
    {
      url: process.env.IS_ON_SERVER ? "https://example.com" : "http://localhost:3000/v1",
      description: "Example API",
    },
  ],

  // ────────────────────────────────────────────────────────────────────
  //   :::::: E N D P O I N T S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  paths: {
    // ─────────────────────────────────────────────────── GENERAL ─────
    "/general/shake-hand": general["/shake-hand"],
    "/login": general["/login"],
    // ────────────────────────────────────────────── MANAGER USER ─────
    "/mng-users/list": managerUser["/mng-users/list"],
    "/mng-users/upsert": managerUser["/mng-users/upsert"],
  },

  variables: {
    api_key:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb3VyY2UiOiJtbmciLCJpYXQiOjE2NDM0MDM5NjV9.TDXx-pdtzEqMxaXRGXtk6MZkmgOILvQpYplzvCCwP3k",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsImlhdCI6MTY0ODU2NzA2MSwiZXhwIjoxNjgwMTAzMDYxfQ.pTFv_4s2QSjpvPhS-vt3OtYFoATnqA37THrbNDPs2Hc",
    user: {
      id: 42,
      name: "Kasra Karami",
      email: "kasra@email.com",
      access: "11111",
      password: "12345678",
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
  },
}
