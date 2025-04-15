# Use the official Node.js 14 image as the base
FROM node:20

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
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

# Expose port 3000
EXPOSE 3000

# Set default environment variables
ENV BACKEND_PORT=3001


# Run the application
CMD ["sh", "-c", "npm run build && npm start -- -p 3001"]
