#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")" && source "./common.bash"

eslint .
