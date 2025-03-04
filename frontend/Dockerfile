# Use the official Node.js 20 image as the base
FROM node:20

# Update the system
RUN apt-get update && apt-get upgrade -y

WORKDIR /app

# Copy the frontend application files into the container
COPY ./frontend /app/frontend

# Set the working directory to the frontend folder
WORKDIR /app/frontend

# Install Node.js dependencies
RUN npm install --verbose

# Build the React app
RUN npm run build

# Set environment variable for the port (if needed)
ENV PORT=3001

# Expose port 3001 (or another port if you prefer)
EXPOSE 3001

# Run the application
CMD ["npm", "start"]
