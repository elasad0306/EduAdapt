import React from 'react';
import StepCard from './StepCard';

const PatternSteps = ({ stepsData }) => {
    return (
        <div className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-gray-50">
            <div className="text-center mb-12 sm:mb-16">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Comment ça marche
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                    Découvrez en 4 étapes simples comment utiliser notre plateforme
                </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
                {stepsData.map((step, index) => (
                    <div key={index} className="space-y-8">
                        {/* Bloc étape */}
                        <StepCard
                            title={step.title}
                            description={step.description}
                            image={step.image}
                            imageAlt={step.imageAlt}
                            direction={index % 2 === 0 ? 'left' : 'right'}
                            color={step.color}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatternSteps;