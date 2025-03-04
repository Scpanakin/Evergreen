# Use the official Node.js 14 image as the base
FROM node:20

# Update the system
RUN apt-get update && apt-get upgrade -y

# Set the working directory
WORKDIR /app

# Copy the application files
COPY frontend /app/frontend

# Set the working directory to the backend
WORKDIR /app/frontend

# Install Node.js dependencies
RUN npm cache clean --force && npm install --verbose

RUN npm run build

ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]