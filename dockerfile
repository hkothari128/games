# Use an official Node.js runtime as a parent image
FROM node:14.17.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Set the environment variable for the Node.js server
ENV PORT=3000

# Expose the port used by the Node.js server
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]