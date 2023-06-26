#!/usr/bin/env bash -e
# echo current working directory
SET_VERSION_CODE=""

# Parse command-line options
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
  --version-code)
    SET_VERSION_CODE="$2"
    shift
    shift
    ;;
  *)
    shift
    shift
    ;;
  esac
done

# Update the version code in package.json
if [ $SET_VERSION_CODE -gt 0 ]; then
  sed -i '' -e "s/\"versionCode\": \".*\"/\"versionCode\": \"$SET_VERSION_CODE\"/" ../package.json

  # Output the updated package.json
  cat ../package.json
fi
####################
echo "Current working directory: $(pwd)"
PROJECT_DIR="../ios"
####
INFOPLIST_FILE="ProjectName/Info.plist"
INFOPLIST_DIR="${PROJECT_DIR}/${INFOPLIST_FILE}"
#### Staging
#### Production

PACKAGE_VERSION=$(cat ../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
PACKAGE_VERSION_CODE=$(cat ../package.json | grep versionCode | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

# BUILD_NUMBER=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${INFOPLIST_DIR}")
# BUILD_NUMBER=$(($BUILD_NUMBER + 1))

# Update plist with new values
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${PACKAGE_VERSION#*v}" "${INFOPLIST_DIR}"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $PACKAGE_VERSION_CODE" "${INFOPLIST_DIR}"

git add "${INFOPLIST_DIR}"
