<template>
  <b-container class="container">
    <b-row class="mx-5">
      <b-col>
        <b-card class="mx-5 mb-5" style="max-width: 100%;">
          <b-row>
            <b-col>
              <b-row class="ml-5">
                <h3 class="text-left mb-2 dark">{{dashboardValues.operational}}</h3>
              </b-row>
              <b-row class="ml-5">
                <h5 class="text-left mb-5 dark">Operational</h5>
              </b-row>
              <b-row class="ml-5">
                <h3 class="text-left mb-2 dark">{{dashboardValues.nonOperational}}</h3>
              </b-row>
              <b-row class="ml-5">
                <h5 class="text-left mb-4 dark">Non-Operational</h5>
              </b-row>
            </b-col>
            <b-col>
              <!-- <b-row class="ml-0"> -->
              <apexchart
                type="donut"
                :options="pieChartOptions"
                :series="dashboardValues.chartValue"
              ></apexchart>
              <!-- </b-row> -->
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col style="max-width: 20%;">
        <b-row class="mb-1">
          <b-col class="mb-1">Show {{startValue + 1}} to {{endValue}}</b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button @click="loadNextData()">Load Next</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="mx-5">
      <b-col>
        <b-card class="mx-5" style="max-width: 100%;">
          <b-row>
            <b-col>
              <!-- <b-row class="ml-0"> -->
              <apexchart
                type="bar"
                height="350"
                :options="dashboardValues.barChartOptions"
                :series="dashboardValues.barChart"
              ></apexchart>
              <!-- </b-row> -->
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col>Equipment Type</b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",

  data() {
    return {
      selectShowCount: 100,
      startValue: 0,
      endValue: 100,
      //pie chart meta data
      pieChartOptions: {
        labels: ["Operational", "Non-Operational"],
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.$store.dispatch("setDadhboard", {
      max: this.selectShowCount,
      last: this.startValue,
    });
  },

  computed: {
    ...mapGetters({
      dashboardValues: "getDashboard",
    }),
  },

  watch: {
    selectShowCount() {
      this.startValue = 1;
      this.endValue = this.selectShowCount;

      this.$store.dispatch("setDadhboard", {
        max: this.selectShowCount,
        last: this.startValue,
      });
    },
  },

  methods: {
    loadNextData() {
      this.endValue += this.selectShowCount;

      this.$store.dispatch("loadNextData");
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 5%;
}
</style>



