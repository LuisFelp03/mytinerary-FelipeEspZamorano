import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, setSearchText, selectCity } from '../redux/slices/citySlice';
import { useNavigate } from 'react-router-dom';

const CitiesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filteredCities, searchText, status, error } = useSelector(state => state.city);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCities());
        }
    }, [status, dispatch]);

    const handleSearchChange = (e) => {
        dispatch(setSearchText(e.target.value));
    };

    const handleCityClick = (city) => {
        dispatch(selectCity(city)); // Seleccionar la ciudad antes de redirigir
        navigate(`/city/${city._id}`);
    };

    if (status === 'loading') return <p>Loading cities...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    // Verifica el tipo de filteredCities
    console.log("filteredCities:", filteredCities); // Depuración

    return (
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10">Popular Mytineraries</h2>
            <input
                type="text"
                placeholder="Search cities..."
                value={searchText}
                onChange={handleSearchChange}
                className="w-full mb-6 p-2 border border-gray-300 rounded-md"
            />
            {Array.isArray(filteredCities) && filteredCities.length === 0 ? (
                <p className="text-center text-gray-600">No cities match your search.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {Array.isArray(filteredCities) && filteredCities.map((city) => (
                        <div key={city._id} className="shadow-lg rounded-lg overflow-hidden bg-white border-4 border-blue-500 hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
                            <img src={city.photo} alt={city.name} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                                <p className="text-gray-700">{city.description}</p>
                                <button
                                    onClick={() => handleCityClick(city)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CitiesPage;
