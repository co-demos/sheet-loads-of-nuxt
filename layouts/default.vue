<template>
  <v-app>

    <!-- NAVABR -->
    <Navbar>
    </Navbar>


    <!-- DRAWER RIGHT -->

    <!-- DRAWER LEFT -->


    <!-- CONNTENTS -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>


    <!-- FOOTER -->




  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Navbar from '~/components/UX-components/navbar.vue'

export default {

  name: "DefaultLayout",

  components: {
    Navbar,
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-default / beforeMount....")
  //   this.$vuetify.theme.primary = '#1b5632';
  //   this.$vuetify.theme.secondary = '#6AAB84';
  },

  data() {

    return {
      
    }

  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
    }),

    ...mapGetters({
    }),
  },

  methods: {
  },

}
</script>
