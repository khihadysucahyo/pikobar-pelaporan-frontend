<template>
  <div class="Status">
    <v-chip
      v-if="status === 'ODP'"
      class="ma-2"
      color="rgb(82, 143, 196)"
      outlined
    >
      {{ status }}
    </v-chip>
    <v-chip
      v-else-if="status === 'POSITIF'"
      class="ma-2"
      color="#EB5757"
      outlined
    >
      {{ status }}
    </v-chip>
    <v-chip
      v-else-if="status === 'PDP'"
      class="ma-2"
      color="rgb(255, 206, 79)"
      outlined
    >
      {{ status }}
    </v-chip>
    <v-chip
      v-else-if="status === 'CLOSECONTACT'"
      class="ma-2"
      color="rgb(82, 143, 196)"
      outlined
    >
      {{ $t('route.tight_contact') }}
    </v-chip>
    <v-chip
      v-else-if="status === 'SUSPECT'"
      class="ma-2"
      color="#0f7d33"
      outlined
    >
      {{ $t('label.suspect') }}
    </v-chip>
    <v-chip
      v-else-if="status === 'PROBABLE'"
      class="ma-2"
      color="rgb(255, 206, 79)"
      outlined
    >
      {{ $t('label.probable') }}
    </v-chip>
    <v-chip
      v-else-if="status === 'CONFIRMATION'"
      class="ma-2"
      color="#EB5757"
      outlined
    >
      {{ $t('label.confirmation') }}
    </v-chip>
    <v-chip
      v-else-if="status === 'DISCARDED'"
      class="ma-2"
      color="rgb(172, 96, 11)"
      outlined
    >
      {{ $t('label.discarded') }}
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
  name: 'Status',
  props: {
    status: {
      type: String,
      default: ''
    }
  }
}
</script>
