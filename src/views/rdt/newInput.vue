<template>
  <div>
    <v-row>
      <div>
        <v-btn
          :color="singleEntry ? 'success':''"
          style="text-transform: none;height: 46px;min-width: 100px;margin-right: 4px;"
          @click="singleEntry = true"
        >
          {{ $t('label.single_entry') }}
        </v-btn>
        <v-btn
          :color="singleEntry ? '':'success'"
          style="text-transform: none;height: 46px;min-width: 100px;"
          @click="singleEntry = false"
        >
          {{ $t('label.multiple_entry') }}
        </v-btn>
      </div>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          outlined
        >
          <v-container>
            <div
              v-if="singleEntry"
            >
              <formRapid />
            </div>
            <div
              v-else
            >
              <multiple-form-rdt />
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import formRapid from './formRapid'
export default {
  name: 'NewInput',
  components: {
    formRapid
  },
  data() {
    return {
      title: 'Input RDT',
      singleEntry: true
    }
  }
}
</script>
