<template>
  <div class="StatusReferral">
    <v-chip
      v-if="status === 'approved'"
      class="ma-2"
      color="#2F80ED"
      outlined
    >
      {{ $t('label.received') }}
    </v-chip>
    <v-chip
      v-else-if="status === 'declined'"
      class="ma-2"
      color="#EB5757"
      outlined
    >
      {{ $t('label.rejected') }}
    </v-chip>
    <v-chip
      v-else-if="status === 'pending'"
      class="ma-2"
      color="#F5F5F5"
      outlined
    >
      {{ $t('label.waiting') }}
    </v-chip>
    <v-chip
      v-else
      class="ma-2"
      color="rgba(0, 0, 0, 0.87)"
      outlined
    >
      {{ status }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'StatusReferral',
  props: {
    status: {
      type: String,
      default: ''
    }
  }
}
</script>
