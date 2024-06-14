FROM node:alpine as development 
# Set the working directory
WORKDIR /usr/src/app
# Copy package files and install dependencies
COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
RUN npm install 
# Copy only necessary source files
COPY apps/auth apps/auth
COPY libs libs
RUN npm run build auth
# Second stage: Setting up the production environment
FROM node:alpine as production 
# Set environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Set the working directory
WORKDIR /usr/src/app
# Copy package files
COPY package*.json ./
# Install only production dependencies
# This step is more efficient because it avoids installing devDependencies
# ci is faster than npm for production
RUN npm ci --only=production
# Copy the built application from the development stage
COPY --from=development /usr/src/app/dist ./dist
# Command to run the application
CMD ["node","dist/apps/auth/main"]