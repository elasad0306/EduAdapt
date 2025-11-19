import './App.css'
import Logo from './picture/logoEduAdapt.png'
import background_picture from './picture/home_picture.jpg'

function App() {


  return (
    <>
        <body className="overflow-hidden">
        <div className="flex flex-col items-center">
            <img className="m-0 h-100vh bg-cover relative" src={background_picture} alt="background"></img>
        <div className="absolute bottom-80">
            <img className="mx-auto" src={Logo} alt="logo"></img>
            <h1 className="mt-10 font-bold text-white text-3xl bg-white/20 p-1 rounded-2xl ">De vos cours à la réussite... en un clic.</h1>
        </div>
        </div>
        </body>
    </>
  )
}

export default App
