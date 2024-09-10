# Use the official Node.js image as a base
FROM node:18

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json to the container
COPY package.json ./

# Install all dependencies, including dev dependencies
RUN npm install --include=dev

# Copy the rest of your application code to the container
COPY . .

# Expose the port the application runs on (default for Vite is 5173)
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "host"]
