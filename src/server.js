import typeDefs from "./typeDef.js"
import resolvers from "./resolvers.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from "express";
import http from 'http';


const extractAccessToken = (req, res, next) => {
    if (req?.body.operationName != "IntrospectionQuery")
        req.newAccessToken = req?.headers?.authorization
    next()
}
const app = express()
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs, resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
await server.start();
app.use("/", cors(),
    bodyParser.json(), extractAccessToken, expressMiddleware(server, {
        context: async ({ req }) => ({ accessToken: req.newAccessToken }),
    }),)
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/ `);






