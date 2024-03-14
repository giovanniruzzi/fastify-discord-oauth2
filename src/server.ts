import fastify from "fastify";
import { authRoutes } from "./routes/auth.routes";
import { FastifyInstance } from "fastify";
import oauthPlugin from "@fastify/oauth2";
import dotenv from "dotenv";
import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    discordOAuth2: OAuth2Namespace;
  }
}

dotenv.config();

const app: FastifyInstance = fastify({ logger: true });

app.register(authRoutes, {
  prefix: "/auth",
});

app.register(oauthPlugin, {
  name: "discordOAuth2",
  credentials: {
    client: {
      id: process.env.DISCORD_ID as string,
      secret: process.env.DISCORD_SECRET as string,
    },
    auth: oauthPlugin.DISCORD_CONFIGURATION,
  },
  scope: ["identify"],
  startRedirectPath: "/auth",
  callbackUri: "http://127.0.0.1:3100/auth/discord/callback",
  logLevel: "info",
});

app.listen(
  {
    port: 3100,
  },
  () => console.log("Server Running Sucessfully")
);