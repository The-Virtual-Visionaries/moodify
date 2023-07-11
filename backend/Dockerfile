<<<<<<< HEAD
# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port on which your Express.js application is running (change it if necessary)
EXPOSE 9050

# Set the command to run your application
CMD ["npm", "run","dev"]
=======
# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /src

# Install build tools and dependencies
RUN apt-get update && apt-get install -y build-essential

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the port number
ENV PORT=9050

# Expose the port
EXPOSE 9050

# Start the server with ts-node-dev
CMD ["npm", "run", "dev"]

>>>>>>> origin/main
