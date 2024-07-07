import Components from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  const Pages = [
    { name: "Signup", color: "primary" },
    { name: "Login", color: "secondary" },
  
  ];
  return (
    <div>
      <nav className="navbar bg-dark border-bottom border-body d-flex justify-content-center align-items-center bg-cinema p-0" data-bs-theme="dark">
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100" style={{filter:"invert(1)",backgroundColor:"rgb(253 255 255 / 84%)"}}>
          <Components.Logo/>
          <p>SHBAK-API is an api to reserve cinema ticket.</p>
        </div>
      </nav>
      <div className="d-flex flex-wrap  ">
        {Pages.map((page, i) => (
          <Link
            to={`/${page.name}`}
            key={i}
            className={`page-btn btn btn-${page.color}`}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;
