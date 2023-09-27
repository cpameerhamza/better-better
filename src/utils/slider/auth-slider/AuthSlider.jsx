import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import './authslider.css'



const AuthSlider = () => {
    return (
        <>
            <div className="auth__slider">
                <Swiper 
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper"
                >

                    <SwiperSlide>
                        <div className="auth__slide-item">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/slide-1.png`} alt="img"/>
                            <p>
                                Connect, learn, explore, share, care and help. Be Automatically matched with a student penpal.
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="auth__slide-item">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/slide-1.png`} alt="img"/>
                            <p>
                                Connect, learn, explore, share, care and help. Be Automatically matched with a student penpal.
                            </p>
                        </div>
                    </SwiperSlide>
                    
                </Swiper>
            </div>
        </>
    )
}

export default AuthSlider