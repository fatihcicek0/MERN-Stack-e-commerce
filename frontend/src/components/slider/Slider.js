import { useEffect, useState } from "react"
import './slider.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function Slider() {

    const slides = [
        { url: "https://i.ytimg.com/vi/fb6ccYMp8BQ/maxresdefault.jpg" },
        { url: "https://www.notebookcheck.com/fileadmin/Notebooks/News/_nc3/2020_04_17_18.jpg" },
        { url: "https://images.macrumors.com/article-new/2022/06/m2-macbook-air.jpg" },
        { url: "https://images.macrumors.com/t/q-5kInZZC0CU3HsHL3HyBIHYWKQ=/1600x0/article-new/2022/06/M2-MacBook-Air-2022-Feature0012.jpg" }
    ]
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        const lastSlide = currentIndex === slides.length - 1;
        const newIndex = lastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }
    
    const goToBack = () => {
        const firstSlide = currentIndex === 0;
        const newIndex = firstSlide ? slides.length -1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    
     useEffect(()=>{
        let interval = setInterval(goToNext,2000);
        return ()=>{
            clearInterval(interval);
        }
     },[currentIndex])
      
    return (
        <div className="slider">
            <img src={slides[currentIndex].url}></img>
            <div className="back" onClick={goToBack}><ArrowBackIosNewIcon /></div>
            <div className="next" onClick={goToNext}><ArrowForwardIosIcon /></div>
        </div>
    )
}