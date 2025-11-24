import React from 'react';

const StepCard = ({
                      title,
                      description,
                      image,
                      imageAlt,
                      direction = 'left',
                      color = 'blue'
                  }) => {
    const colorClasses = {
        blue: { bg: 'bg-blue-50' },
        green: { bg: 'bg-green-50' },
        yellow: { bg: 'bg-yellow-50' },
        purple: { bg: 'bg-purple-50' }
    };

    const { bg } = colorClasses[color];
    const isRightDirection = direction === 'right';

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 group p-6 sm:p-8">
            <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${isRightDirection ? 'lg:flex-row-reverse' : ''}`}>

                {/* Section Image */}
                <div className="lg:w-2/5 flex justify-center">
                    <div className={`w-48 h-48 sm:w-56 sm:h-56 ${bg} rounded-xl flex items-center justify-center p-4 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                        <img
                            src={image}
                            alt={imageAlt}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Section Texte */}
                <div className="lg:w-3/5">
                    <div className={`text-center lg:text-left ${isRightDirection ? 'lg:text-right' : ''}`}>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                            {title}
                        </h2>
                        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StepCard;