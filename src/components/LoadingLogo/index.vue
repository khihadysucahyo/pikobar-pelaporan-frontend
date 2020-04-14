<template>
  <v-overlay :value="loading">
    <div class="loader" />
  </v-overlay>
</template>

<script>
export default {
  name: 'LoadingLottie',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.loader {
  display: flex;
  align-self: center;
  width: 100px;
  height: 100px;
  background: url('../../static/loader.svg') center center no-repeat;
  background-size: 80px;
  animation: animLoader 1.45s ease-in-out infinite;
  opacity: 0;
  transform: scale(1);
}

@keyframes animLoader{
  0% {
    opacity:0;
    transform:scale(.85);
  }
  50% {
    opacity:1;
    transform:scale(1);
  }
  100% {
    opacity:0;
    transform:scale(.85);
  }
}
</style>
