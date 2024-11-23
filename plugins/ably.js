// plugins/ably.js
import { Realtime } from 'ably';

export default defineNuxtPlugin((nuxtApp) => {
  const ably = new Realtime("ajDpdw.gBMhUQ:N27hoSQW3qMzY324wGZofY-t-NiPyLUId1CxMh5Xlzg" // Store your API key securely
  );

  // Provide Ably instance to Nuxt globally
  nuxtApp.provide('ably', ably);
});
