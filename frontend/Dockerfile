# Use the official Node.js image as a base
FROM node:18

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port the application runs on
EXPOSE 3000

# Command to start the development server

CMD ["npm", "run", "host", "0.0.0.0"]
