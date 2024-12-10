FROM denoland/deno:alpine-2.0.0

WORKDIR /app

# Prefer not to run as root
USER deno

# Copy the Deno application code to the working directory
COPY . .

# Expose the application port
EXPOSE 80

# Cache the dependencies as a separate layer
RUN deno cache src/main.ts

CMD ["task", "start"]
