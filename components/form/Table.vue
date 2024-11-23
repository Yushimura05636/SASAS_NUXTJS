<template>
    <div class="overflow-hidden rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Table Header -->
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <!-- If headers prop is provided, use it; otherwise, generate from row keys -->
            <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider dark:text-gray-300">
              #
            </th>
            <th v-for="header in effectiveHeaders" :key="header" class="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider dark:text-gray-300">
              {{ header }}
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(row, index) in rows" :key="index" :class="{'bg-gray-50 dark:bg-gray-800': index % 2 === 0}">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
              {{ index + 1 }}
            </td>
            <td v-for="header in effectiveHeaders" :key="header" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
              {{ row[header] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script setup lang="ts">
  import { defineProps, computed } from 'vue';

  const props = defineProps({
    headers: {
      type: Array as () => string[],
      required: false,
    },
    rows: {
      type: Array as () => Array<Record<string, any>>,
      required: true,
    },
  });

  // Compute headers dynamically if not provided
  const effectiveHeaders = computed(() => {
    if (props.headers && props.headers.length > 0) {
      return props.headers;
    }
    // Generate headers from keys of the first row, if any rows exist
    return props.rows.length > 0 ? Object.keys(props.rows[0]) : [];
  });
  </script>

  <style scoped>
  table {
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid transparent;
  }

  th:hover {
    background-color: #f1f5f9;
    color: #374151;
  }
  </style>
