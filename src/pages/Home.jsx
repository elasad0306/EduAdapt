import Logo from '../assets/picture/logoEduAdapt.png'
import background_picture from '../assets/picture/home_picture.jpg'



function Home(){
    return(
        <div className="relative overflow-hidden h-screen">
            <img
                className="w-full h-screen object-cover"
                src={background_picture}
                alt="background"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img className="mx-auto -mt-20" src={Logo} alt="logo" />

                <h1 className="mt-10 font-bold text-white text-3xl bg-white/5 p-2 rounded-2xl mb-8">
                    De vos cours à la réussite... en un clic.
                </h1>

            </div>
        </div>


    )
}
export default Home