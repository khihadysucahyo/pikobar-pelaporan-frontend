<template>
  <div>
    <v-stepper v-model="step" :alt-labels="true">
      <v-stepper-header>
        <v-stepper-step class="left-margin-form-pemohon" :complete="step > 1" step="1">
          <center>{{ $t('label.step_title_1') }}</center>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="step > 2" step="2">
          <center>{{ $t('label.step_title_2') }}</center>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="step > 3" step="3">
          <center>{{ $t('label.step_title_3') }}</center>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="step > 4" step="4">
          <center>{{ $t('label.step_title_4') }}</center>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="step > 5" class="right-margin-form-pemohon" step="5">
          <center>{{ $t('label.step_title_5') }}</center>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <identitas-instansi-pemohon
            :form-applicant="formApplicant"
          />
        </v-stepper-content>
        <v-stepper-content step="2">
          <identitas-pemohon
            :form-identity-applicant="formIdentityApplicant"
            :instance-type="formApplicant.instanceType"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <kebutuhan-logistik
            :logistic-needs="logisticNeeds"
          />
        </v-stepper-content>
        <v-stepper-content step="4">
          <surat-permohonan />
        </v-stepper-content>
        <v-stepper-content step="5">
          <tahap-konfirmasi
            :form-applicant="formApplicant"
            :form-identity-applicant="formIdentityApplicant"
            :logistic-needs="logisticNeeds"
            :applicant-letter="applicantLetter"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'FormPermohonanLogistik',
  data() {
    return {
      step: 1,
      formApplicant: {},
      formIdentityApplicant: {},
      logisticNeeds: [],
      applicantLetter: null,
      isConfirm: false
    }
  },
  created() {
    EventBus.$on('nextStep', (value) => {
      this.step = value + 1
    })
    EventBus.$on('prevStep', (value) => {
      this.isConfirm = false
      this.step = value - 1
    })
    EventBus.$on('confirmStep', (value) => {
      // this.applicantLetter = value
      this.isConfirm = true
      this.step = 5
    })
  }
}
</script>
<style>
  .title-page-form-pemohon {
    padding: 5px 20px;
    font-size: 22px;
    color: white;
    line-height: 29px;
  }
  .left-margin-form-pemohon {
    margin-left: 200px;
  }
  .right-margin-form-pemohon {
    margin-right: 200px;
  }
  .tutorial-class-form-pemohon {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
  }
  .btn-margin-positive {
    margin: 10px;
    float: right;
  }
  .btn-desktop {
    display:block;
  }
  .btn-mobile {
    display: none;
  }
  .margin-10 {
    margin: 10px;
  }

  @media (max-width: 588px) and (min-width: 320px) {
    .main-card-form-pemohon {
      margin: 150px 0px -30px 0px;
    }
    .left-margin-form-pemohon {
      margin-left: 0px;
    }
    .right-margin-form-pemohon {
      margin-right: 0px;
    }
    .stepper-margin-form-pemohon {
      margin: -200px -10px 0px -10px;
    }
    .btn-desktop {
      display: none;
    }
    .btn-mobile {
      display: block;
    }
    .left-margin {
      margin-left: 0px;
    }
    .right-margin {
      margin-right: 0px;
    }
    .stepper-margin {
      margin: -200px -10px 0px -10px;
    }
  }
</style>
