import { useState } from "react";
import Components from "../components";
import Data from "../data";
import API from "../api";
import Util from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
const Login = () => {
  let l = Data.RegisterLabels;
  let labels = [l[0], l[1]];
  let [err, setErr] = useState("Error");
  let [email, setEmail] = useState("mohamedeltab33y@gmail.com");
  let [password, setPassword] = useState("Sh12345**");
  let [rememberMe, setRememberMe] = useState(false);
  let [user, setUser] = useState({ fName: undefined });
  let logIn = async (event) => {
    try {
      event.preventDefault();
      let response = await API.request.post("user/login", {
        email,
        password,
        rememberMe,
      });
      setUser({ ...response.data });
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <div className="d-flex  pb-5 flex-column align-items-center bg-dark text-light opcity0-1 h-100vh">
      <Components.StatusBar status={false} />
      {user.fName ? (
        "loged in success"
      ) : (
        <form
          className=" shadow p-3 row g-3 mt-3  "
          style={{ minHeight: 406.4, maxWidth: "500px" }}
          data-bs-theme="dark"
          onSubmit={(e) => logIn(e)}
        >
          {labels.map((label, i) => {
            return (
              <div className="mb-1 col-12" key={i}>
                <label htmlFor={label.data} className="form-label">
                  {label.data}
                </label>
                <input
                  className="form-control"
                  id={label.data}
                  type={label.type}
                  placeholder={label.placeholder}
                  name={label.name}
                  required
                  // onChange={(e) => onChangeHandler(e)}
                  value={i == 0 ? email : password}
                  //disabled={token}
                  // onBlur={async () => await dataValidation()}
                />
              </div>
            );
          })}
          <div className={`col-md-6 mb-3 form-check `}>
            <input
              type="checkbox"
              value={rememberMe}
              id="flexCheckDefault"
              //onChange={() => setRememberMe(!rememberMe)}
              className="me-2"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Remember me
            </label>
          </div>
          <small
            className={`text-center mb-3 text-error ${
              err == "Error" ? "invisible" : ""
            }`}
          >
            {err}
          </small>
          <div className="mb-3 col-md-6 ms-auto d-flex justify-content-end align-items-end">
            <button
              type="submit"
              className={`btn btn-primary w-150px me-3 h-mc`}
              // onClick={() => setStep(1)}
            >
              Login
            </button>
          </div>
        </form>
      )}
      <div className=" w-100 p-3 pt-5">
        <h4 className="text-center">End points</h4>
        <dl>
          <dt>Login</dt>
          <dd>
            <p
              className="httprequest mt-2"
              title={`post ( "${API.baseURL} user/emailIsUnique" , {"{email}"} )`}
              onClick={(e) => Util.copyTextToClipboard(e)}
            >
              <FontAwesomeIcon icon={faCopy} /> post ( "{API.baseURL}
              user/logIn" , {"{email,password,rememberMe}"} )
            </p>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default Login;
