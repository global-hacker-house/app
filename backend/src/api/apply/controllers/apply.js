"use strict"

/**
 * apply controller
 */

const { createCoreController } = require("@strapi/strapi").factories

module.exports = createCoreController("api::apply.apply",({ strapi }) => ({
    async create(ctx) {
      const requestData = ctx.request.body.data
      const { email, name } = requestData
      try {
        await strapi.plugins["email"].services.email.send({
          from: 'Amagi <amagi.dev@hackerhouse.tools>',
          to: email,
          subject: "Thanks for applying our hacker house event",
          html: `Hi ${name}! Thanks you for applying our hacker house event. Great to have you here.
          <br/>
          Here is the interview schedule link: ..., please book a time slot that works for you.
          <br/>
          <br/>
          Best regards,
          <br/>
          Hacker House Team`,
        })
        // TODO: Create mail event in strapi
      } catch (err) {
        console.log("Sending email error", err)
      }
      const entity = await super.create(ctx)
      return this.transformResponse(entity)
    },
  }),
)
