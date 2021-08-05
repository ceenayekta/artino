
// import { useEffect, useState } from 'react'
// import axios from 'axios'
import { SwiperSlide } from "swiper/react"
import staticData from '../staticData.json'
import { Slider, CarouselCard, CarouselImage } from '../components/Carousel'

export const homePage = () => {
  // const [data, setData] = useState([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   axios.get('url')
  //   .then(res => {
  //     console.log(res)
  //     setData(res)
  //     setLoading(false)
  //   })
  //   .catch(err => console.log(err))
  // })
  const sliders = staticData.slider.map(item => {
    return (
      <SwiperSlide key={item.title}>
        <CarouselImage title={item.title} imgSrc={item.image}/>
      </SwiperSlide>
    )
  })

  const products = staticData.products.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <CarouselCard title={item.title} price={item.price} imgSrc={item.image}/>
      </SwiperSlide>
    )
  })
  
  return (
    <div>
      <main style={{padding: "2rem"}}>

        <div style={{height: "60vh"}}>
          <Slider 
            // data={staticData.slider}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={true} 
          navigation={true}>
            {sliders}
          </Slider>
        </div>
        
        <div>
          <h2>لیست محصولات</h2>
          <Slider 
            // data={staticData.products}
            slidesPerView={4}
            spaceBetween={30}
            pagination={false} 
          navigation={true}>
            {products}
          </Slider>
        </div>

      </main>
    </div>
  );
}
