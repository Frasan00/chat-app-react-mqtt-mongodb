### client docker image ###

FROM node:16-alpine 
WORKDIR /app
COPY *.json .

# i'm using an older version of react-router-dom that uses Switch component (deprecated in older versions)
# so i make sure that that version is installed, otherwise it wouldn't work
RUN npm ci

COPY /public ./public
COPY /src ./src

EXPOSE 3000
CMD ["npm", "run", "start"]

