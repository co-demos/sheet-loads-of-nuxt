<template>

  <v-card>

    <!-- TEST BASIC TABLE<br><br>
    <p>
      dsType : <code> {{ dsType }} </code><br>
      dsId : <code> {{ dsId }} </code><br>
      applyCorrespondance : <code> {{ applyCorrespondance }} </code><br>
    </p>
    <br> -->
    
    <v-card-title>
      {{ $t('data.dsId') }} : &nbsp; <strong>{{ dsId }}</strong>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        :label="$t('datatable.search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>


    <v-data-table
      :headers="headers"
      :items="dataItems"
      :search="search"
      :rows-per-page-items="options.rowPerPageItems"
      :rows-per-page-text="$t('datatable.rowsperpage')"
      >
      <!-- class="elevation-1" -->

      <template v-slot:items="props">

        <td 
          v-for="(valueItem, keyItem) in props.item" 
          :key="keyItem"
          >
          {{ props.item[ keyItem ] }}
        </td>

      </template>

    </v-data-table>





  </v-card>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import BasicTable from '~/components/DATA-components/basic-table'

export default {

  name: "BasicTable",

  components: {
  },

  middleware : [
  ],

  props: [
    'dsType',
    'dsId',
    'applyCorrespondance',
    'tableOptions'
  ],

  beforeMount : function(){

    console.log("C-basicTable / beforeMount....")

    console.log("C-basicTable / this.dsType : ", this.dsType )
    console.log("C-basicTable / this.dsId : ", this.dsId )
    console.log("C-basicTable / this.applyCorrespondance : ", this.applyCorrespondance )
    console.log("C-basicTable / this.tableOptions : ", this.tableOptions )

    const dataset = this.getDataset( this.dsType, this.dsId)
    console.log("C-basicTable / dataset : ", dataset )

    this.headers = dataset.dataHeaders
    this.dataItems = dataset.dataRows

  },

  data() {
    return {

      search: '',
      headers: [
        // {
        //   text: 'Dessert (100g serving)',
        //   align: 'left',
        //   sortable: false,
        //   value: 'name'
        // },
        // { text: 'Calories', value: 'calories' },
        // { text: 'Fat (g)', value: 'fat' },
        // { text: 'Carbs (g)', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        // { text: 'Iron (%)', value: 'iron' }
      ],

      dataItems: [
        // {
        //   name: 'Frozen Yogurt',
        //   calories: 159,
        //   fat: 6.0,
        //   carbs: 24,
        //   protein: 4.0,
        //   iron: '1%'
        // },
      ],

      options: {
        rowPerPageItems: [3,5,10,25,50]
      }

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
      getDataset: 'data/getOneDataset' 
    }),
  },

  methods: {
  },

}
</script>