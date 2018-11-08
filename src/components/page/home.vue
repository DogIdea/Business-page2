<template>
  <div>
    <homeheader :isicon="isicon"></homeheader>
    <homebody></homebody>
    <homebottom></homebottom>
  </div>
</template>

<script>
import homeheader from '../page-module/homeheader';
import homebody from '../page-module/homebody';
import homebottom from '../page-module/bottom';
export default {
  name:'Home',
  data () {
    return {
     isicon:true
    }
  },
  components: {
    homeheader,
    homebody,
    homebottom
  }
}
</script>

<style scoped lang="scss" type="text/css">

</style>
