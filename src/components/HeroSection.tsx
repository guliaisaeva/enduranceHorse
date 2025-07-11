import bgImage from '../assets/images/heroBg.png';
import horseImage from '../assets/images/horse.png';
import { CiStreamOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";



function HeroSection() {
    const navigate = useNavigate();
    return (
        <div className="md:flex md:items-center md:justify-around  bg-no-repeat  bg-cover  bg-center"
            style={{ backgroundImage: `url(${bgImage})`, height: '100vh' }}>
            <div className="container">
                <div className="flex flex-col space-y-4 justify-center  text-white w-full md:w-[40%] h-screen text-center">
                    <h1 className="text-3xl md:text-4xl font-bold hidden md:block">YARIŞTAN ÖTE BİR TUTKU</h1>
                    <p className="text-lg text-white/80 hidden md:block">Güç, Dayanıklılık Ve Zarafet</p>
                    <div className="flex flex-col justify-center items-center gap-3 w-full mt-4">
                        <button onClick={() => navigate("/live")} className="bg-red-600 w-full md:w-40 hover:bg-red-700 px-5 py-2 rounded text-white  flex items-center justify-center gap-2">
                            <CiStreamOn size={24} /> Canlı İzle
                        </button>
                        <button onClick={() => navigate("/events")} className="bg-[#0e9978] w-full md:w-40 hover:bg-teal-700 px-5 py-2 rounded">Gelecek Yarışlar</button>
                        <button onClick={() => navigate("/events")} className="bg-gray-500  w-full md:w-40 hover:bg-gray-700 px-5 py-2 rounded">Geçmiş Yarışlar</button>
                    </div>
                </div>
                <div className='w-[60%] hidden md:block'>
                    <img
                        src={horseImage}
                        alt="Running Horse"
                        className="absolute hidden md:block   bottom-0 right-16 w-[40%]"
                    />
                </div>

            </div>


        </div>
    )
}

export default HeroSection