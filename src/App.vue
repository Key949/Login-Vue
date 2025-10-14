<template>
  <div class="flex flex-col items-center justify-center h-screen space-y-4">
    <template v-if="!loggedIn">
      <h1 class="text-2xl font-bold">Login</h1>
      <input
        v-model="username"
        placeholder="Username"
        class="border p-2 rounded w-64"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 rounded w-64"
      />
      <button
        @click="login"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
      <p class="text-red-500">{{ message }}</p>
      <p>ArryWahyusetiawan 22108020058</p>
      <p>Laverda Shafa 221080200007</p>
    </template>

    <template v-else>
      <h1 class="text-2xl font-bold">Welcome, {{ name }}!</h1>
      <button
        @click="logout"
        class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const name = ref("");
const message = ref("");
const loggedIn = ref(false);

async function login() {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    // If backend returns non-200, catch that too
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Login failed");
    }

    const data = await res.json();

    if (data.success) {
      loggedIn.value = true;
      name.value = data.name; // <-- use the backend name here
      message.value = "";
    } else {
      message.value = data.message || "Invalid credentials";
    }
  } catch (err) {
    message.value = "Server error: " + err.message;
  }
}

function logout() {
  loggedIn.value = false;
  password.value = "";
  name.value = "";
}
</script>
