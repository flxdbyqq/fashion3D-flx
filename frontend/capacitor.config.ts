import { defineConfig } from '@capacitor/cli'

export default defineConfig({
  appId: 'com.starrystudio.app',
  appName: 'StarryStudio',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
})
