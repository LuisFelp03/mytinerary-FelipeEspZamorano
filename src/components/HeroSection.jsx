import { useState, useEffect } from 'react';

const HeroSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const imagesPerSlide = 4;
    const cities = [
        { name: "New York", img: "https://mbmarcobeteta.com/wp-content/uploads/2021/02/shutterstock_248799484-1024x683.jpg?text=New+York" },
        { name: "Paris", img: "https://a.storyblok.com/f/112937/568x464/954a33563a/paris-de-noche.jpg?text=Paris" },
        { name: "Tokyo", img: "https://media.nomadicmatt.com/2024/tokyothings.jpeg?text=Tokyo" },
        { name: "London", img: "https://www.vietnamairlines.com/~/media/Images/Discovery/England/London/canh%20dep/986x906/London_canhdep_986x906.jpg?text=London" },
        { name: "Sydney", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAD02FEeGrwiC9cRBO-J-zeEGM2NA1deFZQ&s?text=Sydney" },
        { name: "Rome", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfuSySmsFD9q4inQ7JFLJyqKTxHO4rCclj3Q&s?text=Rome" },
        { name: "Dubai", img: "https://www.cloud-europamundo.com/img/carousel/hd/Dubai_20210328212559.jpg?text=Dubai" },
        { name: "Berlin", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkRCIzbkXMj8M0p5_H7nqxJ3P03fdXmljc-w&s?text=Berlin" },
        { name: "Moscow", img: "https://i0.wp.com/onedayitinerary.com/wp-content/uploads/2020/10/One-day-in-Moscow-Itinerary.jpg?resize=723%2C542&ssl=1?text=Moscow" },
        { name: "Shanghai", img: "https://viajes.nationalgeographic.com.es/medio/2019/03/27/shnaghai_527bc86f_1280x720.jpg?text=Shanghai" },
        { name: "Rio de Janeiro", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6PS3o-7g_oSLYpThmXL2EaGQEiSXcbgYEA&s?text=Rio+de+Janeiro" },
        { name: "Los Angeles", img: "https://hips.hearstapps.com/hmg-prod/images/elle-los-angeles02-1559906859.jpg?text=Los+Angeles" }
    ];

    const totalSlides = Math.ceil(cities.length / imagesPerSlide); // Calcular dinámicamente cuántas slides son necesarias

    // Manejar el cambio automático de las diapositivas
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % totalSlides);
        }, 5000); // Cambia cada 5 segundos
        return () => clearInterval(interval);
    }, [totalSlides]);

    const handleNext = () => {
        setActiveSlide((prev) => (prev + 1) % totalSlides);
    };

    const handlePrev = () => {
        setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <div className="relative w-full bg-blue-200">
            {/* Banner */}
            <img
                src="./resources/banner3.jpg"
                alt="Banner"
                className="w-full h-120 object-contain mb-4"
            />

            {/* Carousel */}
            <div className="relative overflow-hidden rounded-lg" data-carousel="static">
                <div className="relative h-56 md:h-96">
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${slideIndex === activeSlide ? "block" : "hidden"}`}
                            data-carousel-item={slideIndex === activeSlide ? "active" : ""}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
                                {/* Renderizar las imágenes dinámicamente por slide */}
                                {cities
                                    .slice(slideIndex * imagesPerSlide, slideIndex * imagesPerSlide + imagesPerSlide)
                                    .map((city, index) => (
                                        <div key={index} className="text-center">
                                            <img src={city.img} alt={city.name} className="w-full h-40 sm:h-48 md:h-64 object-cover rounded-lg" />
                                            <p className="mt-2 text-lg font-semibold">{city.name}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Indicators */}
                <div className="absolute bottom-0 left-1/2 z-30 flex -translate-x-1/2 space-x-3 p-3">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === activeSlide ? "bg-white" : "bg-gray-400"}`}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setActiveSlide(index)}
                        />
                    ))}
                </div>
                {/* Controls */}
                <button className="absolute top-0 left-0 z-30 p-3" onClick={handlePrev}>
                    <span className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                        &lt;
                    </span>
                </button>
                <button className="absolute top-0 right-0 z-30 p-3" onClick={handleNext}>
                    <span className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                        &gt;
                    </span>
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
