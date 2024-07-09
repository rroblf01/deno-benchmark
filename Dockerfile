FROM denoland/deno:ubuntu-1.44.4

WORKDIR /code
COPY . /code

RUN deno cache ./main.ts

CMD ["deno", "task", "start"]