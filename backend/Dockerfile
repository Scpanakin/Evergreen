# Use the official Node.js 20 image as the base
FROM node:20

# Update the system
RUN apt-get update && apt-get upgrade -y

# Set the working directory
WORKDIR /app

# Copy the backend application files to the container
COPY backend /app

# Set the working directory to the backend folder
WORKDIR /app/backend

# Install Node.js dependencies
RUN npm install --verbose

# Expose port 3000 (or another port if you prefer)
EXPOSE 3000

# Set default environment variables
ENV BACKEND_PORT=3000
ENV DATABASE_URL="postgresql://username:password@postgres:5432/database_name"
ENV JWT_SECRET="your-jwt-secret-here"
ENV API_KEY="your-api-key-here"

# Run the application (make sure your start script is correct)
CMD ["npm", "run", "start"]
