import _ from 'lodash';

export default {
  Query: {
    message: (parent, args, ctx, info) => 
      ctx.db.query.message({ where: { id: args.id } }, info),

    messages: (parent, args, ctx, info) =>
      ctx.db.query.messages(info)
  },
  Message: {
    from: async ({ id }, args, ctx, info) => 
      (await ctx.db.query.entities({ where: { message_some: { id } } }, info)).pop(),
    
    media: async ({ id }, args, ctx, info) => 
      await ctx.db.query.medias({ where: { message: { id } } }, info)
  },
  Mutation: {
    createMessage: async (parent, data, ctx, info) => {
      const { from, media } = data, { phone } = from;
      const entity = await ctx.db.query.entity({ where: { phone } }, info);
      data = {
        ...(_.omit(data, [ 'from', 'media' ])),
        from: {
          ...((entity && entity.id)
            ? { connect: _.pick(entity, [ 'id', 'phone' ]) }
            : { create: from })
        },
        ...(media && media.length && { media: { create: media} })
      }
      return ctx.db.mutation.createMessage({ data }, info);
    }
  }
}