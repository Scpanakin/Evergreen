# Step 1: Use the official Amazon Linux image as the base image
FROM amazonlinux:2023

# Step 2: Install necessary dependencies and update the system
RUN yum update -y && \
    yum install -y --allowerasing git curl nodejs npm


# Step 3: Set the working directory for the application
WORKDIR /app

# Step 4: Copy the application files into the container
COPY backend /app/backend
COPY frontend /app/frontend

WORKDIR /app/backend


# Step 5: Install the necessary Node.js dependencies
RUN npm cache clean --force && npm install --verbose


# Step 6: Expose the port that the app will run on
EXPOSE 3000

# Step 7: Run the application
CMD ["npm", "start"]
