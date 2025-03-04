# Use the official Node.js 14 image as the base
FROM node:20

# Update the system
RUN apt-get update && apt-get upgrade -y

# Set the working directory
WORKDIR /app

# Copy the application files
COPY backend /app/backend
COPY frontend /app/frontend

# Set the working directory to the backend
WORKDIR /app/backend

# Install Node.js dependencies
RUN npm cache clean --force && npm install --verbose

# Expose port 3000
EXPOSE 3000

# Set default environment variables
ENV BACKEND_PORT=3000
ENV DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
ENV JWT_SECRET="your-jwt-secret-here"
ENV API_KEY="your-api-key-here"

# Run the application
CMD ["npm", "start"]