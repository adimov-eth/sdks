#!/bin/bash

declare -a sdks=(
  "permit2-sdk"
  "sdk-core"
  "v2-sdk"
  "v3-sdk"
  "v4-sdk"
  "uniswapx-sdk"
  "router-sdk"
  "universal-router-sdk"
)

for sdk in "${sdks[@]}"; do
  echo "Processing ${sdk}..."
  rm -rf "sdks/${sdk}/node_modules"
  echo "Installing dependencies for ${sdk}..."
  yarn workspace "@uniswap/${sdk}" install
  echo "Building ${sdk}..."
  yarn workspace "@uniswap/${sdk}" build
  echo "${sdk} processed successfully."
done
