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