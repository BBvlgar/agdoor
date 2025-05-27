import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";

// Basic Amplify configuration for development
const isLocalhost = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';

const localEnvConfig = {
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_xxxxxxxxx',
  aws_user_pools_web_client_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  oauth: {},
  aws_appsync_graphqlEndpoint: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-xxxxxxxxxxxxxxxxxxxxxxxxxx',
};

const amplifyConfig = {
  ...localEnvConfig,
  Auth: {
    region: localEnvConfig.aws_project_region,
    userPoolId: localEnvConfig.aws_user_pools_id,
    userPoolWebClientId: localEnvConfig.aws_user_pools_web_client_id,
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: isLocalhost ? 'http://localhost:20005' : 'https://api.yourdomain.com',
        region: localEnvConfig.aws_project_region,
      },
    ],
  },
};

// Only configure Amplify if we're not in test environment
if (process.env.NODE_ENV !== 'test') {
  Amplify.configure(amplifyConfig);
}

createApp(App).mount("#app");
