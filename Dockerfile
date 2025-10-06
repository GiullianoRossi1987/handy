FROM oven/bun:latest as builder

COPY . /app
WORKDIR /app

RUN ["bun", "install"]
COPY . .
