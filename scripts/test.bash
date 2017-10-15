#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")" && source "./common.bash"

task="${1-}"
shift 1

case "$task" in
	':unit') mocha "$@";;
	':coverage'|':unit:coverage') nyc mocha "$@" ;;
	''|':all') nyc mocha "$@" ;;
	*) fatal "Invalid test target $1" "$EXIT_CODE_INVALID_STATE"
esac
