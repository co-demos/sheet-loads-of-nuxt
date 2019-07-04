<template>

  <div> 

    <v-layout
      row
      justify-center
      class="skip-navbar"
      >
      <!-- align-center -->

      <v-flex
        xs4
        sm2
        md2
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


      <v-flex xs4 sm3 md4>
        <v-card>
          <v-card-title class="headline">
              GSheet / datasets
          </v-card-title>
          <v-card-text>
            <code> {{ datasets }} </code><br><br>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4 sm3 md3>
        <v-card>
          <v-card-title class="headline">
              GSheet / correspondanceDicts
          </v-card-title>
          <v-card-text>
            <code> {{ correspondanceDicts }} </code><br><br>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4 sm3 md3>
        <v-card>
          <v-card-title class="headline">
              GSheet / dataTypes
          </v-card-title>
          <v-card-text>
            <code> {{ dataTypes }} </code><br><br>
          </v-card-text>
        </v-card>
      </v-flex>

      
    </v-layout>


    <BasicTable>

    </BasicTable>

  </div>


</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import BasicTable from '~/components/DATA-components/basic-table'

export default {

  name: "MainIndex",

  components: {
    BasicTable,
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-index / beforeMount....")
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

      datasets : state => state.data.datasets,
      correspondanceDicts : state => state.data.correspondanceDicts,
      dataTypes : state => state.data.dataTypes,

    }),

    ...mapGetters({

    }),
  },

  methods: {
  },

}
</script>
