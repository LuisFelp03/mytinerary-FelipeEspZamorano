import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItineraries } from '../store/actions/itinerariesActions';
import { fetchCities } from '../redux/slices/citySlice';
import { HeartIcon } from '@heroicons/react/24/solid';

const CityDetail = () => {
    const { cityId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cities = useSelector((state) => state.city.cities);
    const itineraries = useSelector((state) => state.itineraries.itineraries);
    const city = cities.find((city) => city._id === cityId); // Obtiene la ciudad directamente

    const [expandedItineraries, setExpandedItineraries] = useState(new Set());
    const [likesCount, setLikesCount] = useState({});

    useEffect(() => {
        if (cityId && !city) {
            dispatch(fetchCities()); // Carga las ciudades si no están disponibles
            dispatch(fetchItineraries(cityId)); // Carga itinerarios para la ciudad
        }
    }, [dispatch, cityId, city]);

    const toggleExpand = (id) => {
        const newExpanded = new Set(expandedItineraries);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItineraries(newExpanded);
    };

    const handleLike = (id) => {
        setLikesCount((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    // Mostrar mensaje si la ciudad no se encuentra
    if (!city) return <h1>City not found</h1>;

    // Renderiza los detalles de la ciudad e itinerarios
    return (
        <div className="flex flex-col min-h-screen">
            <div
                className="bg-cover bg-center h-screen relative"
                style={{ backgroundImage: city.photo ? `url(${city.photo})` : 'none' }}
            >
                <div className="bg-black bg-opacity-30 h-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-7xl font-bold text-white">
                        {city.city || 'Unknown City'}, {city.country || 'Unknown Country'}
                    </h1>
                    <p className="text-xl text-white mt-4 px-4">{city.description || 'No description available'}</p>
                    <button
                        onClick={() => navigate('/cities')}
                        className="mt-4 bg-blue-500 hover:bg-gray-700 text-white py-3 px-5 rounded text-lg"
                    >
                        Return to Cities
                    </button>
                </div>
            </div>

            <main className="flex flex-col items-center justify-center bg-slate-200 py-8">
                <section className="space-y-10 text-neutral-500 dark:text-neutral-300 text-center">
                    <h1 className="text-5xl font-bold">ITINERARIES</h1>
                    <div className="flex flex-wrap justify-center gap-12">
                        {Array.isArray(itineraries) && itineraries.length > 0 ? (
                            itineraries.map((itinerary) => (
                                <div
                                    key={itinerary?._id}
                                    className="relative overflow-hidden w-full sm:w-[min(100%,40rem)] h-auto border bg-slate-50 dark:bg-black dark:border dark:border-slate-700 rounded-lg shadow-xl p-8 flex flex-col justify-between"
                                >
                                    <div className="flex items-center mb-6">
                                        <img
                                            src={itinerary?.userPhoto || ''}
                                            alt={itinerary?.userName || 'User Photo'}
                                            className="w-28 h-28 rounded-full border-2 border-gray-300 mr-4"
                                        />
                                        <div className="flex items-center justify-between w-full">
                                            <div className="mr-2 text-center">
                                                <p className="text-xl text-gray-500">Created by</p>
                                                <h2 className="font-bold text-3xl">{itinerary?.userName || 'Unknown User'}</h2>
                                            </div>
                                            <button
                                                onClick={() => handleLike(itinerary._id)}
                                                className="text-red-500"
                                                aria-label="Like"
                                            >
                                                <HeartIcon
                                                    className={`h-10 w-10 ${likesCount[itinerary._id] ? 'text-red-500' : 'text-gray-300'}`}
                                                />
                                            </button>
                                            <span className="text-gray-700 ml-2">
                                                {likesCount[itinerary._id] || 0}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-3xl text-gray-700">{itinerary?.price || 0}$ 💵</p>
                                    <p className="text-3xl text-gray-700">{itinerary?.duration || 0}h ⏰</p>
                                    <p className="text-3xl text-gray-700">{(itinerary?.hashtags || []).join(', ')}</p>

                                    <div className="flex justify-center mt-6">
                                        <button
                                            onClick={() => toggleExpand(itinerary._id)}
                                            className="mt-2 bg-blue-500 hover:bg-gray-700 text-white py-3 px-5 rounded text-lg"
                                        >
                                            {expandedItineraries.has(itinerary._id) ? 'Show Less' : 'View More'}
                                        </button>
                                    </div>

                                    {expandedItineraries.has(itinerary._id) && (
                                        <div className="mt-4 p-4 border-t border-gray-300">
                                            <h3 className="font-bold text-lg">Activities & Comments</h3>
                                            <p className="text-gray-500">Under construction</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-700 text-xl">No itineraries found for this city.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CityDetail;

// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItineraries } from '../store/actions/itinerariesActions';
// import { selectCity } from '../redux/slices/citySlice';

// const CityDetail = () => {
//     const { cityId } = useParams(); // `cityId` debería ser un string, no un objeto
//     const dispatch = useDispatch();

//     const itineraries = useSelector((state) => state.itineraries.itineraries);
//     const city = useSelector((state) => state.city.selectedCity);

//     useEffect(() => {
//         console.log("cityId in useParams:", cityId); // Confirmación de que `cityId` es un string
//         if (cityId) {
//             dispatch(selectCity(cityId)); // Asegúrate de pasar solo el `id` aquí
//             dispatch(fetchItineraries(cityId));
//         }
//     }, [dispatch, cityId]);

//     if (!city) return <h1>City not found</h1>;

//     return (
//         <div>
//             {/* Renderizado de detalles de la ciudad e itinerarios */}
//         </div>
//     );
// };

// export default CityDetail;