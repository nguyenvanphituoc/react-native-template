fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### watch

```sh
[bundle exec] fastlane watch
```



----


## iOS

### ios generate_app

```sh
[bundle exec] fastlane ios generate_app
```

generate app

=> fastlane generate_app --env <>

### ios sync_cert

```sh
[bundle exec] fastlane ios sync_cert
```



### ios build

```sh
[bundle exec] fastlane ios build
```



### ios deploy_appstore

```sh
[bundle exec] fastlane ios deploy_appstore
```

Deploy to TestFlight

=> fastlane deploy_appstore

### ios delivery_ipa

```sh
[bundle exec] fastlane ios delivery_ipa
```



----


## Android

### android update_config

```sh
[bundle exec] fastlane android update_config
```



### android delivery_apk

```sh
[bundle exec] fastlane android delivery_apk
```



### android build_aab

```sh
[bundle exec] fastlane android build_aab
```



### android deploy_firebase

```sh
[bundle exec] fastlane android deploy_firebase
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
