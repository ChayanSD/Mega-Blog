import './App.css'
import {useState , useEffect } from "react";
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth.js";
import {login,logout} from "./store/authSlice.js";
import {Footer, Header} from "./components/index.js";
import {Outlet} from "react-router-dom";

function App() {
    const [loading , setLoading ] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentAccount(false)
            .then((userData)=>{
                if (userData){
                    dispatch(login(userData))
                }else {
                    dispatch(logout()) //It will update our state
                }
            })
            .finally(()=>setLoading(false))
    }, []);

    return !loading ?(
        <div className={'min-h-screen flex flex-wrap content-between bg-gray-400'}>
           <div className={'w-full block'}>
               <Header/>
               <main>
                 TODO<Outlet/>
               </main>
               <Footer/>
           </div>
        </div>
    ) : null

}

export default App
