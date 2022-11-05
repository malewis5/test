FROM node:14-alpine
RUN rm -rf /var/cache/apk/*
RUN apk add --no-cache ca-certificates
RUN apk add ansible
WORKDIR /app
COPY . .
RUN npm install

# all arguments are passed in through the pipeline
ARG VERSION
ARG SENTRY_AUTH_TOKEN
ARG DOCKER_BUILD_KEY
# define all required variables for uploading source maps
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ENV VERSION=${VERSION}

ENV SENTRY_ORG peakactivity
ENV SENTRY_PROJECT peakactivity-site
ENV SENTRY_DSN https://f31490b4b5484176bfbe02698a85c1d9@o417197.ingest.sentry.io/6300330
ENV CACHE_ENDPOINT "https://cache.dev.peakactivity.merce.io/cache"
ENV CACHE_SERVICE_ENDPOINT "develop-cache-ms:8080/cache"
ENV CMS_API "https://strapi.dev.peakactivity.merce.io"
ENV CMS_SERVICE_ENDPOINT "develop-strapi:1337"
ENV CONFIG_ENV "dev"
ENV PAGE_TTL 1
ENV GTM_ID "GTM-PLGZSDH"
ENV GTM_ENV "env-3"
ENV GTM_AUTH "XdozWcdc9QkSXxI_39J7RA"
ENV NEXT_TELEMETRY_DISABLED 1
ENV IMAGE_TRANSFORMATION_PROXY_URL "https://image-proxy.dev.peakactivity.merce.io"


RUN npm run build


# After we build out our source maps and upload to sentry, remove them
RUN find .next -maxdepth 10 -type f -name "*.map" -delete

EXPOSE 8080
ENV PORT 8080
ENTRYPOINT ["npm", "run", "start"]
