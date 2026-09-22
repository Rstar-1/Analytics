import React, { useState } from 'react';
import Container from '../../../components/common/Container';

const SpecifySection = ({
    title = "About Garage",
    contentParagraphs = [
        "From classic wood and metal to contemporary acrylic and glass, each material brings unique advantages to furniture design. Wood offers timeless strength and natural warmth, while metal adds resilience and industrial charm. Acrylic and glass, on the other hand, bring a modern touch, providing sleek, versatile options for contemporary spaces. The choice of material is not just about appearance; it defines durability and functionality, ensuring each piece serves its purpose beautifully.",
        "When selecting furniture, it's important to think beyond aesthetics. The right pieces create a cohesive atmosphere that balances beauty, practicality, and longevity. Minimalist designs, with their clean lines and simplicity, appeal to those who value modern elegance. However, traditional styles like Victorian, Art Deco, or Mid-Century Modern continue to inspire with their intricate details and timeless craftsmanship, offering a sense of history and character that enriches any living space."
    ]
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Container version="v2">
            <div className="w-full pb-60">
                <div
                    className='bg-forth p-40 sm-p-18 rounded-10'
                >
                    <h3 className='title-text text-dark font-600'
                    >
                        {title}
                    </h3>

                    <p className={`${isExpanded ? '' : 'line-clamp4'} text-gray small-text font-400 mt-5`}
                    >
                        {contentParagraphs[0]}
                    </p>

                    <p
                        onClick={() => setIsExpanded(!isExpanded)}
                        className='text-dark small-text font-600 underline mt-10'
                    >
                        {isExpanded ? 'View Less' : 'View More'}
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default SpecifySection;