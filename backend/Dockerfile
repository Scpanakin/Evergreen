# Use the official Node.js 20 image as the base
FROM node:20

# Update the system
RUN apt-get update && apt-get upgrade -y

# Set the working directory
WORKDIR /app

# Copy the application files
COPY backend /app/backend

# Set the working directory to the backend
WORKDIR /app/backend

# Install Node.js dependencies
RUN npm install -g npm npx
RUN npm cache clean --force && npm install --verbose

# Ensure Prisma is generated before the app starts
RUN npx prisma generate 

# Expose port 3000
EXPOSE 3000

# Set default environment variables
ENV BACKEND_PORT=3000

# Run the application
CMD ["npm", "start"]
