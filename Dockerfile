# Build stage, build an image for building the app
FROM node:16 as builder

WORKDIR /usr/src/app

COPY . .
RUN yarn install
RUN yarn build

# Build stage 2, build a lean image for deploying
FROM node:16

WORKDIR /usr/app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./

# copy the needed files from the backend
COPY --from=builder /usr/src/app/backend/package.json ./backend/
COPY --from=builder /usr/src/app/backend/schema.graphql ./backend/
COPY --from=builder /usr/src/app/backend/build/ ./backend/build/

# copy the needed files from the frontend
COPY --from=builder /usr/src/app/frontend/package.json ./frontend/
COPY --from=builder /usr/src/app/frontend/build ./frontend/build

RUN yarn install --production --frozen-lockfile

EXPOSE 4000
CMD [ "node", "backend/build/index.js" ]
