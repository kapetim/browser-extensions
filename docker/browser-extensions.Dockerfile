# Multi-stage CI for browser-extensions — deps → unit → build
FROM node:22-slim AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

FROM deps AS unit-test

RUN npm run test:coverage

FROM deps AS build

RUN npm run build
