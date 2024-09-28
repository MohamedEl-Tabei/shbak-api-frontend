import Components from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  const Pages = [
    { name: "Signup", color: "danger",},
    { name: "Login & Log out", color: "danger" },
    { name: "Movie", color: "danger" },
    { name: "Tables", color: "danger" },
    { name: "Payment", color: "danger" },
    { name: "hidden", color: "hidden" },
    { name: "hidden", color: "hidden" },
    { name: "hidden", color: "hidden" },
    { name: "hidden", color: "hidden" },
    { name: "hidden", color: "hidden" },
  ];
  let stopClass="w-100 bg-white h-25 bg-cinema opacity-75 stop  border-0  ";
  let moveClass="w-100 bg-white h-25 bg-cinema opacity-75 move  border-0 ";
  return (
    <div className="bg-black h-100vh overflow-hidden opcity0-1">
      <nav
        className="navbar bg-dark  border-body d-flex justify-content-center align-items-center bg-cinema p-0 stop "
        data-bs-theme="dark"
        style={{backgroundImage:"url(https://i.ibb.co/z2BwYVm/26689100-sl-121019-25870-69.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"contain"}}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center w-100 h-100"
          style={{
            filter: "invert(1)",
            backgroundColor: "rgb(253 255 255 / 84%)",
          }}
        >
          <Components.Logo />
          <p className=" opacity-50">SHBAK-API is an api to reserve cinema ticket.</p>
        </div>
      </nav>
      <div className="d-flex flex-wrap justify-content-center align-items-center overflow-auto h-50 ">
        {Pages.map((page, i) => (
          <Link
            to={`/${i===1?"login":page.name}`}
            key={i}
            className={`page-btn btn btn-${page.color} d-flex flex-column justify-content-between border-0  text-dark hover-light shadow opacity-50 shadow`}
            onMouseOver={(e)=>{
              let link=e.currentTarget;
              let children=link.childNodes
              children[0].className=moveClass
              children[1].style.color="black"
              children[2].className=moveClass
            }}
            onMouseLeave={(e)=>{
              let link=e.currentTarget;
              let children=link.childNodes
              children[0].className=stopClass
              children[1].style.color="black"
              children[2].className=stopClass
            }}
          >
            <div className={stopClass} />
            <div
              className={` w-100 btn opacity-97  btn-outline-${page.color} bg-light border-0   rounded-0 p-3 hover-light fw-bold text-dark`}
            >
              {page.name}
            </div>
            <div className={stopClass} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;
