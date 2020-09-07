import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Config from "./services/config.js";

export default new Vuex.Store({
  // the vuex state variable
  state: {
    sideMenuIndex: localStorage.getItem("side-menu-index")
      ? localStorage.getItem("side-menu-index")
      : 0,
    isShowSideMenu: false,
    sideMenuIndexKey: Number(new Date()),

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
    SET_SIDE_MENU_INDEX_KEY(state, payload) {
      state.sideMenuIndexKey = payload;
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
    setSideMenuIndexKey({ commit }, payload) {
      commit("SET_SIDE_MENU_INDEX_KEY", payload);
    },

    //set dashboard values
    setDadhboard({ commit }, payload) {

      console.log(payload);


      fetch(`${Config.baseURL}&max=${payload.max}&last=${payload.last}`, {
        method: 'HEAD',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json"
        },
      }).then(function (response) {
        console.log(response);
      }).catch(function (e) {
        console.log(e);
      });

      // console.log(response);

      var data = []

      var operationalData = data.filter(function (val) {
        return val.OperationalStatus == 'Operational'
      });

      var setValue = {
        operational: operationalData.length,
        nonOperational: 10,
        chartValue: [operationalData.length, 10],
        barChart: [
          {
            name: "Value",
            data: [2.3, 3.1, 4.0, 10.1],
          }
        ],
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
            categories: ["a", "d", "fg", "gg"],
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
        },

      }

      commit("SET_DASHBOARD", setValue);
    },

    changeDadhboard({ commit }) {
      var setValue = {
        operational: 150,
        nonOperational: 10,
        chartValue: [150, 10],
        barChart: [
          {
            name: "Value",
            data: [10, 34, 4.0, 10.1],
          }
        ],
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
            categories: ["a", "d", "fg", "gg"],
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
        },

      }

      commit("SET_DASHBOARD", setValue);
    }


  },
  // the vuex getters
  getters: {
    getSideMenuIndex: (state) => state.sideMenuIndex,
    getIsShowSideMenu: (state) => state.isShowSideMenu,
    getSideMenuIndexKey: (state) => state.sideMenuIndexKey,

    //dashboard getters
    getDashboard: (state) => state.dashboard
  },
});
