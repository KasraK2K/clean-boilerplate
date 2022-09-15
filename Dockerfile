# ---------------------------------------------------------------------------- #
#                                  Development                                 #
# ---------------------------------------------------------------------------- #
FROM node:lts-gallium as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .
COPY yarn.lock .
RUN yarn

COPY . .
COPY prisma ./prisma

RUN npx prisma generate

RUN yarn build

# ---------------------------------------------------------------------------- #
#                                  Production                                  #
# ---------------------------------------------------------------------------- #
FROM node:lts-gallium as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --only=production

COPY --from=development /usr/src/app/build ./build

CMD [ "node", "build/server.js" ]