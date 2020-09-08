/* eslint-disable */
import serviceInstance from "@/services/instance.js";


const GetDashboardData = payload => {
  return serviceInstance.instance
    .post("/dashboard", payload)
    .then(function(response) {
      return response;
    })
    .catch(function() {});
};


export default {
  getDashboardData: GetDashboardData

};
