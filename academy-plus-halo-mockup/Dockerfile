FROM node:20-bullseye

WORKDIR /usr/src/app

# Install nodemon globally
RUN npm install -g nodemon

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app code into the container
COPY ./app ./app
COPY ./db ./db

# Expose the application port
EXPOSE 3000

# Command to run the server
CMD ["npm", "run", "dev_nodemon"]
