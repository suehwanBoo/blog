FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY apps/blog/.next/standalone ./
COPY apps/blog/.next/static ./apps/blog/.next/static
COPY apps/blog/public ./apps/blog/public

WORKDIR /app/apps/blog

EXPOSE 3000

CMD ["node", "server.js"]