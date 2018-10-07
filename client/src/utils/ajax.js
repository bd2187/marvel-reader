import axios from "axios";
import setAuthorization from "./setAuthorization";

/**
 *
 *  Sends request to server. Sets authorization header with token
 *  prior to sending request and later removes the header to avoid
 *  scrict no-cors rule by marvel api
 *
 *  @param String endpoint
 *  @param Object data
 *  @param Function callback function
 *
 *  @return
 */
function ajax(endpoint, data, cb) {
  var token = localStorage.getItem("token");

  setAuthorization(token);

  axios
    .post(endpoint, data)
    .then(res => {
      setAuthorization(null);

      cb(res);
    })
    .catch(err => {
      console.error(err);
      return;
    });
}

export default ajax;
