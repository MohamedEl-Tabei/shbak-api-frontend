import { useState } from "react";

const UserInfo = ({ user }) => {
  let [loading, setLoading] = useState(false);
  return (
    <form
      className=" shadow p-3 row g-3 mt-3  "
      style={{ minHeight: 406.4, maxWidth: "500px" }}
      data-bs-theme="dark"
      // onSubmit={(e) => logIn(e)}
    >
      <div className="text-center fs-5 w-bold shadow py-1" style={{backgroundColor:"#e9ecef0d"}}>User's information</div>
      <div>
        <span className="text-lightYellow me-3">Name </span>
        {user.fName} {user.lName}
      </div>

      <div>
        <span className="text-lightYellow me-3">Email </span>
        {user.email}
      </div>
      <div>
        <span className="text-lightYellow me-3">Phone </span>
        {user.phoneNumber}
      </div>
      <div>
        <span className="text-lightYellow me-3">Birthday </span>
        {user.dateOfBirth.slice(0, 10)}
      </div>
      <div className="mb-3 col-md-6 ms-auto d-flex justify-content-end align-items-end flex-wrap w-100">
        <button
          type="submit"
          className={`btn btn-primary w-100 me-3 h-mc mb-3`}
          disabled={loading}
        >
          {loading ? (
            <span class="spinner-border spinner-border-sm" aria-hidden="true" />
          ) : (
            "Log out"
          )}
        </button>
        <button
          type="submit"
          className={`btn btn-warning w-100 me-3 h-mc`}
          disabled={loading}
        >
          {loading ? (
            <span class="spinner-border spinner-border-sm" aria-hidden="true" />
          ) : (
            "Log out from all devices"
          )}
        </button>
      </div>
    </form>
  );
};
export default UserInfo;
