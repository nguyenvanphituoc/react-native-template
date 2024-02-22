#! /usr/bin/env bash -e
PACKAGE_FILE="package.json"
REACT_DIR="../${PACKAGE_FILE}"
PACKAGE_VERSION=$(cat $REACT_DIR | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
PACKAGE_VERSION_CODE=$(cat $REACT_DIR | grep versionCode | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

echo -n "${PACKAGE_VERSION} build ${PACKAGE_VERSION_CODE}"
