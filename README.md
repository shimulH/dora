## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Down if docker running:

```bash
docker-compose down
```

3. Build without cache:

```bash
docker-compose build --no-cache
```

4. Build your container:

```bash
docker-compose up
```

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
