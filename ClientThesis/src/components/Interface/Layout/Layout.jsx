import Footer from "../Footer/Footer"
import Header from "../Header/Header"

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className="
            laptop:max-w-2xl laptop:m-auto
            px-4  w-full min-h-screen ">
                {children}
            </div>
            <Footer/>
        </>
    )
    

}


export default Layout
