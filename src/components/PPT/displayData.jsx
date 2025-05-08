
import { useState } from 'react';
import './displayData.css';

export const DisplayData = ({pptData}) => {
      const [currentIndex, setCurrentIndex] = useState(0);
      const nextSlide = () => {
        if (currentIndex < slideData.length - 1) setCurrentIndex(currentIndex + 1);
      };
    
      const prevSlide = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
      };
      const slideData = pptData.slides || [];
      const slide = slideData[currentIndex];
    
   //   const jsonData = JSON.stringify(data, null, 2);

    return (
        <>
            <h2 style={{ fontSize: '28px' }}>{slide.title}</h2>
            <p style={{ fontSize: '18px', marginTop: '20px' }}>{slide.text}</p>
            <div style={{ marginTop: '40px' }}>
                <button onClick={prevSlide} disabled={currentIndex === 0} style={{ marginRight: '10px' }}>
                    Previous
                </button>
                <button onClick={nextSlide} disabled={currentIndex === slideData.length - 1}>
                    Next
                </button>
            </div>
        </>
    );
}