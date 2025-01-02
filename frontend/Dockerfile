# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the static files
CMD ["serve", "-s", "dist"]