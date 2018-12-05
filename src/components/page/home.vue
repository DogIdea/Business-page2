<template>
  <div>
    <homeheader :isicon="isicon"></homeheader>
    <homebody></homebody>
    <homebottom></homebottom>
  </div>
</template>

<script>
import homeheader from '../page-module/header';
import homebody from '../page-module/homebody';
import homebottom from '../page-module/bottom';

export default {
  name:'Home',
  data () {
    return {
     isicon:"home"
    }
  },
  components: {
    homeheader,
    homebody,
    homebottom
  },
  created() {
    
  },
}
</script>

<style scoped lang="scss" type="text/css">

</style>
