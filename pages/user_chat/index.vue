<template>
    <NuxtLayout name="admin">
        <div class="chat-container">
      <h2>Real-Time Chat</h2>
      <div class="chat-window">
        <ul>
          <li v-for="(msg, index) in messages" :key="index">
            <strong>{{ msg.username }}:</strong> {{ msg.text }}
          </li>
        </ul>
      </div>
      <div class="input-area">
        <input v-model="message" placeholder="Type a message..." @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
    </NuxtLayout>
  </template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import { UserService } from '~/models/User'; // Assuming UserService manages user state

// Reactive data
const messages = ref([]);
const message = ref('');
const user = UserService.first_name;
const username = ref(user?.username || 'Guest'); // Default to 'Guest' if no user found

onMounted(() => {
  const ably = useNuxtApp().$ably;
  const channel = ably.channels.get('chat-room');

  // Subscribe to messages in 'chat-room' channel
  channel.subscribe('message', (msg) => {
    messages.value.push({ username: msg.data.name, text: msg.data.text });
  });
});

onUnmounted(() => {
  const ably = useNuxtApp().$ably;
  ably.channels.get('chat-room').unsubscribe();
});

const sendMessage = () => {
  if (message.value.trim() !== '') {
    const ably = useNuxtApp().$ably;
    const channel = ably.channels.get('chat-room');
    console.log("Sending message from: ", username.value);
    channel.publish('message', { text: message.value, name: UserService.last_name });
    message.value = ''; // Clear input field after sending
  }
};
</script>


  <style scoped>
  .chat-container {
    max-width: 500px;
    margin: auto;
  }
  .chat-window {
    border: 1px solid #ccc;
    height: 300px;
    overflow-y: auto;
    padding: 10px;
    margin-bottom: 10px;
  }
  .input-area {
    display: flex;
  }
  input {
    flex: 1;
    padding: 8px;
  }
  button {
    padding: 8px 16px;
  }
  </style>
