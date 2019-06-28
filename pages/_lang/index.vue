<template>

  <v-layout
    column
    justify-center
    align-center
    class="skip-navbar"
  >
    <v-flex
      xs12
      sm8
      md6
    >


      <v-card>

        <v-card-title class="headline">
          {{ $t('home.title') }}
        </v-card-title>
        
        <v-card-text>

          <p>
            {{ $t('hello') }}
          <p>

          <p>
            locale : <code> {{ locale }} </code><br><br>
            locales : <br><code> {{ locales }} </code><br><br>
            defaultLocale : <br><code> {{ defaultLocale }} </code><br><br>
          </p>

          <p>
            {{ $t('home.introduction') }}
          </p>

        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/inspire"
          >
          {{ $t('basicDict.continue') }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "MainIndex",


  components: {
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
  },

  data() {
    return {
    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      locales : state => state.locales,
      defaultLocale : state => state.defaultLocale,
    }),

    ...mapGetters({
    }),
  },

  methods: {
  },

}
</script>
