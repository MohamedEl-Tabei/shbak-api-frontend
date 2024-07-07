import {BrowserRouter, Routes,Route} from "react-router-dom"
import Pages from "../pages"
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages.Home/>}></Route>
        <Route path='/signup' element={<Pages.Signup/>}></Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
