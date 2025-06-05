
# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy remaining app files
COPY . .

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start script
CMD ["npm", "start"]
