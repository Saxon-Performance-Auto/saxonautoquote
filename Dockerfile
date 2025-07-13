# Use Node.js LTS image
FROM node:18

# Set environment
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy only necessary files first
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy the rest of the app
COPY . .

# Generate Prisma client inside container
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Expose port for Fly
EXPOSE 3000

# Start app
CMD ["npx", "next", "start"]
