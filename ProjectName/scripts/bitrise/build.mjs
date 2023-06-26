import https from 'https';

// Set your Bitrise API token
const BUILD_TRIGGER_TOKEN = '<ProjectName_BUILD_TRIGGER_TOKEN>';

// Set your Bitrise app slug
const APP_SLUG = '<ProjectName_APP_SLUG>';

// Personal token
const BITRISE_PERSONAL_TOKEN = '<ProjectName_BITRISE_PERSONAL_TOKEN>';

// Default values
//
let BRANCH = '';
//
let WORKFLOW = '';
// "environments":[
//  {"mapped_to":"API_TEST_ENV","value":"This is the test value","is_expand":true},
//  {"mapped_to":"HELP_ENV","value":"$HOME variable contains user's home directory path","is_expand":false},
// ]
// "[{\"mapped_to\":\"FASTLANE_PLATFORM\",\"value\":\"android\",\"is_expand\":true},{\"mapped_to\":\"FASTLANE_BUILD_LANE\",\"value\":\"delivery_apk\",\"is_expand\":true},{\"mapped_to\":\"FASTLANE_BUILD_ENVIRONMENT\",\"value\":\"vinova\",\"is_expand\":true},{\"mapped_to\":\"SLACK_WEB_HOOK\",\"value\":\"https://hooks.slack.com/services/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\",\"is_expand\":true}]"
let ENV_VARS = [];
let MESSAGE = '';

// Parse command-line options
process.argv.forEach((arg, index) => {

  if (arg === '--branch') {
    BRANCH = process.argv[index + 1];
  } else if (arg === '--workflow') {
    WORKFLOW = process.argv[index + 1];
  } else if (arg === '--env-vars') {
    const envVarsString = process.argv[index + 1];
    try {
      const envVarsObject = JSON.parse(envVarsString);
      if (typeof envVarsObject !== 'object') {
        throw new Error('Environment should be a valid JSON object.');
      }
      ENV_VARS = envVarsObject;
    } catch (error) {
      console.error('Error parsing ENV_VARS:', error.message);
      ENV_VARS = [];
    }
  } else if (arg === '--tag') {
    MESSAGE = process.argv[index + 1];
  }
});

// Build the JSON payload
const payload = {
  hook_info: {
    type: 'bitrise',
    build_trigger_token: BUILD_TRIGGER_TOKEN,
  },
  build_params: {
    branch: BRANCH,
    workflow_id: WORKFLOW,
    commit_message: MESSAGE,
  },
};

if (ENV_VARS.length > 0) {
  payload.build_params.environments = ENV_VARS;
}

// Make a POST request to trigger the build
const options = {
  hostname: 'api.bitrise.io',
  path: `/v0.1/apps/${APP_SLUG}/builds`,
  method: 'POST',
  headers: {
    Authorization: `token ${BITRISE_PERSONAL_TOKEN}`,
    'Content-Type': 'application/json',
  },
};
//
const req = https.request(options, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Build triggered successfully!');
    console.log('Response:', data);
  });
});

req.on('error', error => {
  console.error('Error triggering the build:', error);
});

req.write(JSON.stringify(payload));
req.end();
