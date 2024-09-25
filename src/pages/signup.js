import API from "../api";
import { useEffect, useRef, useState } from "react";
import Data from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import Components from "../components";
const Signup = () => {
  let ref = useRef(null);
  let [fName, setFName] = useState("");
  let [lName, setLName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [dateOfBirth, setDateOfBirth] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [code, setCode] = useState("");
  let [step, setStep] = useState(1);
  let [loading, setLoading] = useState(false);
  let [token, setToken] = useState("");
  let [error, setError] = useState([
    "Server errors is displayed in this section.",
  ]);
  let [rememberMe, setRememberMe] = useState(false);
  const done = true;
  let labels = Data.RegisterLabels;
  useEffect(() => ref.current.scrollIntoView(), [step]);
  const copyTextToClipboard = (event) => {
    const value = event.currentTarget.title;
    navigator.clipboard.writeText(value);
  };
  const getValue = (labelName) => {
    switch (labelName) {
      case "fName":
        return fName;
      case "lName":
        return lName;
      case "email":
        return email;
      case "password":
        return password;
      case "dateOfBirth":
        return dateOfBirth;
      case "phoneNumber":
        return phoneNumber;
      case "code":
        return code;
      default:
        return "";
    }
  };
  const dataValidation = async () => {
    setLoading(true);
    try {
      await API.request.post("user/dataValidation", {
        fName,
        lName,
        email,
        password,
        dateOfBirth,
        phoneNumber,
        rememberMe,
      });
      setError([]);
    } catch (error) {
      setError(error.response.data);
    }
    setLoading(false);
  };
  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);

      if (step === 1 && token) {
        await API.request.delete("user/deleteUser", {
          headers: { "x-auth-token": token },
        });
        setToken("");
      } else if (step === 1) {
        await API.request.post("user/sendCode", { email });
        setStep(2);
      } else {
        let response = await API.request.post("user/signup", {
          fName,
          lName,
          email,
          password,
          dateOfBirth,
          phoneNumber,
          code,
          rememberMe,
        });
        setToken(response.data.token);
        setStep(1);
      }
      setLoading(false);
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };
  const onChangeHandler = async (event) => {
    try {
      let current = event.currentTarget;
      switch (current.name) {
        case "fName":
          setFName(current.value);
          break;
        case "lName":
          setLName(current.value);
          break;
        case "email":
          setEmail(current.value);
          if (
            /^[a-zA-Z]+[a-zA-Z0-9_-]+@+[a-zA-Z]+[.]+[a-zA-Z]{2,5}$/.test(
              current.value
            )
          ) {
            await API.request.post("user/emailIsUnique", {
              email: current.value,
            });
          }

          break;
        case "password":
          setPassword(current.value);
          break;
        case "dateOfBirth":
          setDateOfBirth(current.value);
          break;
        case "phoneNumber":
          setPhoneNumber(current.value);
          if (/^[0-9]{11,11}$/.test(current.value)) {
            await API.request.post("user/phoneIsUnique", {
              phoneNumber: current.value,
            });
          }
          break;
        case "code":
          setCode(current.value);
          break;
        default:
          break;
      }
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div
      className="d-flex justify-content-center pb-5 flex-column align-items-center "
      onSubmit={(e) => onSubmitHandler(e)}
      ref={ref}
    >
      <Components.StatusBar status={done} />
      <div
        className={
          "w-75 d-flex alert alert-danger  d-flex justify-content-center align-items-center p-0"
        }
      >
        <div
          className="card bg-danger border-0 w-100  h-mc"
          data-bs-theme="dark"
        >
          <dl className="bg-light p-3">
            <dt className="text-dark">Data validation</dt>

            <dd>
              <pre
                className="httprequest"
                title={`post ( "${API.baseURL}user/dataValidation" , {  fName,  lName , email , password , dateOfBirth , phoneNumber } )`}
                onClick={(e) => copyTextToClipboard(e)}
              >
                <FontAwesomeIcon icon={faCopy} /> post ( "{API.baseURL}
                user/dataValidation" ,{" "}
                {"{fName,  lName, email, password, dateOfBirth, phoneNumber}"} )
              </pre>
            </dd>
          </dl>
          <h5 class="card-title text-center pt-3">Errors</h5>

          <div className="card-body p-5">
            {error?.map((m, k) => (
              <div key={k}>
                <FontAwesomeIcon className="me-2" icon={faXmarkCircle} />
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
      <form
        className="w-75 shadow p-3 row g-3 mt-3"
        style={{ minHeight: 406.4 }}
      >
        {step === 2 ? (
          <div className="mb-3 col-md-6">
            <label htmlFor="code" className="form-label">
              Code
            </label>
            <input
              className="form-control"
              id="code"
              name="code"
              placeholder="123"
              required
              value={code}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        ) : (
          labels.map((label, i) => {
            return (
              <div className="mb-3 col-md-6" key={i}>
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
                  onChange={(e) => onChangeHandler(e)}
                  value={getValue(label.name)}
                  disabled={token}
                  onBlur={async () => await dataValidation()}
                />
              </div>
            );
          })
        )}
        <div
          className={`${
            step === 2 || token ? "d-none" : ""
          } col-md-6 mb-5 form-check`}
        >
          <input
            className="form-check-input"
            type="checkbox"
            value={rememberMe}
            id="flexCheckDefault"
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <div className="mb-3 col-md-6 ms-auto d-flex justify-content-end align-items-end">
          <button
            type="button"
            className={`${
              step === 1 ? "d-none" : ""
            } btn btn-dark w-150px me-3 h-mc`}
            onClick={() => setStep(1)}
          >
            Previos
          </button>
          <button
            type="submit"
            className={`btn ${
              token ? "btn-danger" : "btn-primary"
            } w-150px h-mc`}
            disabled={loading || (error.length && step === 1)}
          >
            {loading ? (
              <div
                class="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : step === 1 && token ? (
              "Delete user from the databas"
            ) : step === 1 ? (
              "Next"
            ) : (
              "Signup"
            )}
          </button>
        </div>
      </form>
      <div className="w-100 p-5">
        <h4 className="text-center">Recommended steps</h4>
        <dl>
          <dt>Step 1</dt>
          <dd>
            Don't use the HTTP request data validation and make validation in
            client side.
          </dd>
          <dt>Step 2</dt>
          <dd>
            Use both HTTP request to check if email and phone are used before.
          </dd>

          <dd>
            <pre
              className="httprequest"
              title={`post ( "${API.baseURL} user/emailIsUnique" , {"{email}"} )`}
              onClick={(e) => copyTextToClipboard(e)}
            >
              <FontAwesomeIcon icon={faCopy} /> post ( "{API.baseURL}
              user/emailIsUnique" , {"{email}"} )
            </pre>
          </dd>
          <dd>
            <pre
              className="httprequest"
              title={`post ( "${API.baseURL} user/phoneIsUnique" , {"{phoneNumber}"} )`}
              onClick={(e) => copyTextToClipboard(e)}
            >
              <FontAwesomeIcon icon={faCopy} /> post ( "{API.baseURL}
              user/phoneIsUnique" , {"{phoneNumber}"} )
            </pre>
          </dd>
          <dt>Step 3</dt>
          <dd>
            The user sends a request to receive an email containing a code.
          </dd>
          <dd>
            <pre
              className="httprequest"
              title={`post ( "${API.baseURL} user/sendCode" , {"{email}"} )`}
              onClick={(e) => copyTextToClipboard(e)}
            >
              <FontAwesomeIcon icon={faCopy} /> post ( "{API.baseURL}
              user/sendCode" , {"{email}"} )
            </pre>
          </dd>
          <dt>Step 4</dt>
          <dd>
            The user sends a request with the code and her/his data as its
            payload.
          </dd>
          <dd>
            <pre
              className="httprequest"
              title={`post ( "${API.baseURL}user/signup" , {  fName,  lName , email , password , dateOfBirth , phoneNumber , code} )`}
              onClick={(e) => copyTextToClipboard(e)}
            >
              <FontAwesomeIcon icon={faCopy} /> post ( "{API.baseURL}
              user/signup" ,{" "}
              {
                "{fName,  lName, email, password, dateOfBirth, phoneNumber, code}"
              }{" "}
              )
            </pre>
          </dd>
          <dt>End</dt>
          <dd>
            If the code is valid, data will be saved and user get token from
            the response data. Otherwise, the user will receive an error.
          </dd>
        </dl>
      </div>
    </div>
  );
};
export default Signup;
