FROM rust:1.94-slim-bookworm AS builder

WORKDIR /app

COPY Cargo.toml .

# Build with empty src to cache dependencies
RUN mkdir -p src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

COPY src src

# Force rebuild to include the actual source code
RUN touch src/main.rs && cargo build --release

FROM gcr.io/distroless/cc-debian12

WORKDIR /app

COPY --from=builder /app/target/release/wo-api /app/wo-api

ENV ADDRESS=0.0.0.0
ENV PORT=3000
ENV RUST_LOG=debug

EXPOSE 3000

CMD ["/app/wo-api"]
