import { FastifyInstance } from "fastify";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/discord/callback", async function (request, reply) {
    try {
      const token =
        await this.discordOAuth2.getAccessTokenFromAuthorizationCodeFlow(
          request
        );
      return reply.send(token);
    } catch (error) {
      return reply.send(error);
    }
  });

  fastify.get(
    "/external",
    {},
    (req, reply) => {
      fastify.discordOAuth2.generateAuthorizationUri(
        req,
        reply,
        (err, authorizationEndpoint) => {
          reply.redirect(authorizationEndpoint)
        }
      );
    }
  );
}
