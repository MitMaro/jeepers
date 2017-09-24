#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")" && source "./common.bash"

case "${1-""}" in
	':unit') mocha ;;
	':unit:coverage') nyc mocha ;;
	''|':all') nyc mocha ;;
	*) fatal "Invalid test target $1" "$EXIT_CODE_INVALID_STATE"
esac
