<template>


  <v-toolbar 
    color="primary" 
    dark
    fixed
    >
    <v-toolbar-side-icon></v-toolbar-side-icon>


    <v-btn 
      icon
      to="/">
      <v-icon>fas fa-home</v-icon>
    </v-btn>

    <v-toolbar-title 
      class="white--text"
      to="/">
      {{ $t('basicDict.welcome')}}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>favorite</v-icon>
    </v-btn>


    <!-- LOCALES -->
    <v-menu offset-y open-on-hover nudge-bottom nudge-left>
      
      <template v-slot:activator="{ on }">
        <v-toolbar-title v-on="on">
          <span>{{ localeCode }}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
      </template>

      <v-list>

        <v-list-tile
          v-for="loc in locales"
          :key="loc.code"
          @click="changeLocale(loc)"
          >
          
          <v-list-tile-title 
            v-text="loc.name"
            >
          </v-list-tile-title>

        </v-list-tile>

      </v-list>
    </v-menu>




    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>



  </v-toolbar>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "Navbar",

  components: {
  },

  props: [
  ],

  data: () => ({

  }),

  computed: {

    ...mapState({
      log : state => state.log, 
      locales : state => state.locales,
      localeCode : state => state.locale,
    }),

    ...mapGetters({
      // localeCode : 'getCurrentLocaleCode',
    }),

  },

  methods: {

    changeLocale(loc){
      this.$i18n.locale = loc.code
      this.$store.commit('switchLocale', loc)
    },

  },


}
</script>