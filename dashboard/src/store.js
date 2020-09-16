import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import dashboardService from "./services/dashboard.sevice";


export default new Vuex.Store({
  // the vuex state variable
  state: {
    sideMenuIndex: localStorage.getItem("side-menu-index")
      ? localStorage.getItem("side-menu-index")
      : 0,
    isShowSideMenu: false,
    isLoading: false,

    dashboard: {},
  },
  // the vuex mutations
  mutations: {
    SET_SIDE_MENU_INDEX(state, payload) {
      state.sideMenuIndex = payload;
    },
    SET_IS_SHOW_SIDE_MENU(state, payload) {
      state.isShowSideMenu = payload;
    },
    SET_IS_LOADING(state, payload) {
      state.isLoading = payload;
    },

    SET_DASHBOARD(state, payload) {
      state.dashboard = payload
    }
  },
  // the vuex actions (setters)
  actions: {
    setSideMenuIndex({ commit }, payload) {
      localStorage.setItem("side-menu-index", payload);
      commit("SET_SIDE_MENU_INDEX", payload);
    },
    setIsShowSideMenu({ commit }, payload) {
      commit("SET_IS_SHOW_SIDE_MENU", payload);
    },
    setIsLoading({ commit }, payload) {
      commit("SET_IS_LOADING", payload);
    },

    //set dashboard values
    setDadhboard({ commit }) {

      var payload = {
        max: 100,
        last: 0
      }

      var allData = []
      getData()

      function getData() {
        dashboardService
          .getDashboardData(payload)
          .then((response) => {

            if (response.data.code == 200) {
              var data = response.data.content

              if (data.slice(-1)[0]) {
                getData()

                payload.last = data.slice(-1)[0].__rowid__

                allData = allData.concat(data)
              }
              else {

                allData = allData.filter((e, index, self) =>
                  index === self.findIndex((t) => (
                    t.AssetID === e.AssetID
                  ))
                )

                var dashboardValue = {
                  lastIndex: 0,
                  //first chart
                  operational: 0,
                  nonOperational: 0,
                  chartValue: [],

                  //second chart
                  barChart: [],
                  barChartOptions: {
                    chart: {
                      height: 350,
                      type: "bar",
                    },
                    plotOptions: {
                      bar: {
                        dataLabels: {
                          position: "top",
                        },
                      },
                    },
                    dataLabels: {
                      enabled: true,
                      offsetY: -20,
                      style: {
                        fontSize: "12px",
                        colors: ["#304758"],
                      },
                    },

                    xaxis: {
                      categories: [],
                      position: "bottom",
                      axisBorder: {
                        show: false,
                      },
                      axisTicks: {
                        show: false,
                      },
                      crosshairs: {
                        fill: {
                          type: "gradient",
                          gradient: {
                            colorFrom: "#D8E3F0",
                            colorTo: "#BED1E6",
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                          },
                        },
                      },
                      tooltip: {
                        enabled: true,
                      },
                    },
                    yaxis: {
                      axisBorder: {
                        show: false,
                      },
                      axisTicks: {
                        show: false,
                      },
                      labels: {
                        show: false,
                      },
                    },
                  }
                }

                //get operational data
                var operationalData = allData.filter(function (val) {
                  return val.OperationalStatus == 'Operational'
                });

                //get non-operational data
                var nonOperationalData = allData.filter(function (val) {
                  return val.OperationalStatus == 'Non-Operational'
                });

                //sort AssetCategoryID wice
                var AssetCategorySorted = Object.values(allData.reduce((allData, x) => {
                  allData[x.AssetCategoryID] = [...(allData[x.AssetCategoryID] || []), x];
                  return allData;
                }, {}));

                var barChartData = []
                var barChartXaxis = []


                //calculate values for each category
                AssetCategorySorted.map(obj => {
                  barChartData.push(obj.length)
                  barChartXaxis.push(obj[0].AssetCategoryID)

                })

                //set values
                dashboardValue.operational = operationalData.length
                dashboardValue.nonOperational = nonOperationalData.length
                dashboardValue.chartValue = [operationalData.length, nonOperationalData.length]
                dashboardValue.barChart = [
                  {
                    name: "value",
                    data: barChartData
                  }
                ]
                dashboardValue.barChartOptions.xaxis.categories = barChartXaxis
                commit("SET_DASHBOARD", dashboardValue);
              }

            }
          })
      }

    }

  },
  // the vuex getters
  getters: {
    getSideMenuIndex: (state) => state.sideMenuIndex,
    getIsShowSideMenu: (state) => state.isShowSideMenu,
    getIsloading: (state) => state.isLoading,

    //dashboard getters
    getDashboard: (state) => state.dashboard
  },
});
