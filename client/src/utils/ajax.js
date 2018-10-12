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
function ajax(method, endpoint, data, cb) {
  var token = localStorage.getItem("token");

  setAuthorization(token);

  if (method === "post") {
    axios
      .post(endpoint, data)
      .then(res => {
        setAuthorization(null);

        cb(res);
      })
      .catch(err => {
        handleErr(err);
      });
  } else if (method === "delete") {
    axios
      .delete(endpoint)
      .then(res => {
        setAuthorization(null);
        cb(res);
      })
      .catch(err => {
        handleErr(err);
      });
  } else {
    axios
      .get(endpoint)
      .then(res => {
        setAuthorization(null);
        cb(res);
      })
      .catch(err => {
        handleErr(err);
      });
  }
}

function handleErr(err) {
  console.log("Ajax error");
  console.error(err);
  setAuthorization(null);
}

export default ajax;
