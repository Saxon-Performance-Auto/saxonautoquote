# Use Node.js LTS image
FROM node:18

# Set production environment
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy app files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Healthcheck for Fly.io
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start with next start (optimized for production)
CMD ["npx", "next", "start"]
