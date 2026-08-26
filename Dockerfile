# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy frontend files
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY frontend ./frontend
RUN cd frontend && npm run build

# Copy backend files
COPY package*.json ./
COPY server ./server

# Runtime stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY server ./server
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "server/server.js"]
