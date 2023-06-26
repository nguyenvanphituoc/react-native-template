#! /usr/bin/env bash -e
PACKAGE_FILE="package.json"
REACT_DIR="../${PACKAGE_FILE}"
PACKAGE_VERSION=$(cat $REACT_DIR | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
PACKAGE_VERSION_CODE=$(cat $REACT_DIR | grep versionCode | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

# git=$(sh /etc/profile; which git)
# git_release_version=$("$git" describe --tags --always --abbrev=0)
# number_of_commits=$("$git" rev-list "$git_release_version" --count)
# number_of_commits=$("$git" rev-list HEAD --count)

echo -n "${PACKAGE_VERSION} build ${PACKAGE_VERSION_CODE}"
# Update plist with new values
# /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${git_release_version#*v}" "${INFOPLIST_DIR}"
# /usr/libexec/PlistBuddy -c "Set :CFBundleVersion $number_of_commits" "${INFOPLIST_DIR}"
# Update version text for launch screen
# sed -i bak -e "/userLabel=\"APP_VERSION\"/s/text=\"[^\"]*\"/text=\"Version: $PACKAGE_VERSION Build: $BUILD_NUMBER\"/" $SRCROOT/Base.lproj/LaunchScreen.xib
