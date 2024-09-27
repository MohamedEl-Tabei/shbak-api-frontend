import Components from "../components";
import Data from "../data";

const Login = () => {
  let l = Data.RegisterLabels;
  let labels = [l[0], l[1]];
  return (
    <div className="d-flex  pb-5 flex-column align-items-center bg-dark text-light opcity0-1 h-100vh">
      <Components.StatusBar status={false} />
      <form
        className=" shadow p-3 row g-3 mt-3  "
        style={{ minHeight: 406.4 ,maxWidth:"500px"}}
        data-bs-theme="dark"
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
                //value={getValue(label.name)}
                //disabled={token}
                // onBlur={async () => await dataValidation()}
              />
            </div>
          );
        })}
        <div className={`col-md-6 mb-5 form-check `}>
          <input
            type="checkbox"
            //value={rememberMe}
            id="flexCheckDefault"
            //onChange={() => setRememberMe(!rememberMe)}
            className="me-2"
          />
          <label className="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <div className="mb-3 col-md-6 ms-auto d-flex justify-content-end align-items-end">
          <button
            type="button"
            className={`btn btn-primary w-150px me-3 h-mc`}
            // onClick={() => setStep(1)}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
