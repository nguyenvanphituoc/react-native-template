// https://github.com/react-native-community/cli/blob/main/docs/plugins.md
module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  // https://github.com/react-native-community/cli/blob/main/docs/projects.md#projectiosautomaticpodsinstallation
  project: {
    ios: {
      automaticPodsInstallation: false,
    }
  },
  assets: ['./src/assets/fonts/'], // stays the same
};
