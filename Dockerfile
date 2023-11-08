# Use the official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or pnpm's lockfile)
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN pnpm run build

# Set the command to run your application
CMD ["pnpm", "start"]
