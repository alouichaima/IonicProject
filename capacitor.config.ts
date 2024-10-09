import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-app-base',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '836585034260-p8cqcu9fe80b3sltr9hrgnksmq9tm9i7.apps.googleusercontent.com.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
