import { useNavigate } from 'react-router-dom';

const offers = [
    { name: 'Paris', img: 'https://cdn2.civitatis.com/francia/paris/galeria/torre-eiffel-altura.jpg' },
    { name: 'New York', img: 'https://a.storyblok.com/f/239725/1500x1072/fd73127c21/02_us_ny_gallery_destination_studentsatbroadway.png/m/1920x1372' },
    { name: 'Tokyo', img: 'https://a.storyblok.com/f/112937/568x464/d57e6cab1d/moving_to_tokyo_hero.jpg/m/620x0/filters:quality(70)/' },
    { name: 'London', img: 'https://www.vietnamairlines.com/~/media/Images/Discovery/England/London/canh%20dep/986x906/London_canhdep_986x906.jpg' },
];

const CallToAction = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-blue-400">
            <div className="mt-10 mx-auto max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <img
                        src="https://img.freepik.com/vector-premium/linda-kawaii-chica-emocionada-trae-maleta-ilustracion-navidena-manga-chibi_342801-118.jpg"
                        alt="Travel with Us"
                        className="w-full h-48 object-contain mb-4"
                    />
                    <h3 className="text-2xl font-bold text-blue-500 mb-4">Remember to Travel with Us!</h3>
                    <p className="text-gray-700 mb-4">
                        Experience the world like never before. We are here to make your journey unforgettable.
                    </p>

                </div>
            </div>

            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10">Popular Mytineraries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {offers.map((offer, index) => (
                        <div key={index} className="shadow-lg rounded-lg overflow-hidden bg-white border-4 border-blue-500 hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
                            <img src={offer.img} alt={offer.name} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{offer.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


            <div className="flex justify-center mt-10">
                <button
                    onClick={() => navigate('/CitiesPage')} // arreglar
                    className="bg-gray-800 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition-colors"
                >
                    Explore More Destinations
                </button>
            </div>

        </section>
    );
};

export default CallToAction;
