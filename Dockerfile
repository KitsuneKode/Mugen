FROM node:22-alpine


ARG DATABASE_URL
ARG UPSTASH_REDIS_REST_URL
ARG UPSTASH_REDIS_REST_TOKEN
ARG UPSTASH_VECTOR_REST_URL
ARG UPSTASH_VECTOR_REST_TOKEN

ENV DATABASE_URL=${DATABASE_URL}
ENV UPSTASH_REDIS_REST_URL=${UPSTASH_REDIS_REST_URL}
ENV UPSTASH_REDIS_REST_TOKEN=${UPSTASH_REDIS_REST_TOKEN}
ENV UPSTASH_VECTOR_REST_URL=${UPSTASH_VECTOR_REST_URL}
ENV UPSTASH_VECTOR_REST_TOKEN=${UPSTASH_VECTOR_REST_TOKEN}
ENV NODE_ENV=production



WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY . .

RUN pnpm install \
  && pnpm build


EXPOSE 3000

CMD ["pnpm", "start"]

