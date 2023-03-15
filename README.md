# Publish

npm run docker:build
npm run docker:push

# Run locally

Package.json:
  "proxy": "https://localhost:7281"

Api fetch("/api/result")