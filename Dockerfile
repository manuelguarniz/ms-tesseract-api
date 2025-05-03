# Stage Build
FROM node:22-alpine as builder
RUN echo "Starting build..." 
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
# COPY prisma ./prisma
COPY src ./src

RUN npm ci
# RUN npx prisma generate
RUN npm run build

# Stage production
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3000

# Instalar Tesseract-OCR y sus dependencias
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-spa

EXPOSE 3000

CMD ["node", "./dist/index.js"]