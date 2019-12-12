import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default class Slider extends React.Component {
  state = {
    carouselItems: [
      [{
        city: 'Paris',
        pic: 'https://86087-590828-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2016/01/paris-fin-de-semana-1024x683.jpeg'
      },
      {
        city: 'Rome',
        pic: 'https://static2.abc.es/media/cultura/2019/06/19/coliseo2-kPJB--620x349@abc.jpg'
      },
      {
        city: 'London',
        pic: 'https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg'
      },
      {
        city: 'Buenos Aires',
        pic: 'https://www.sinmapa.net/wp-content/uploads/2019/02/Buenos-Aires-unsplash-1024x683.jpg'
      }],

      [{
        city: 'Madrid',
        pic: 'https://www.parisvatry.com/wp-content/uploads/2018/12/madrid-light.jpeg'
      },
      {
        city: 'Berlin',
        pic: 'https://cdn2.traveler.es/uploads/images/thumbs/es/trav/3/s/2018/39/berlin_siempre_9430_940x627.jpg'
      },
      {
        city: 'New York',
        pic: 'https://cdn.civitatis.com/estados-unidos/nueva-york/galeria/empire-state.jpg'
      },
      {
        city: 'Los Angeles',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Echo_Park_Lake_with_Downtown_Los_Angeles_Skyline.jpg'
      }],

      [{
        city: 'Tokyo',
        pic: 'https://static.businessinsider.sg/2019/07/07/5d26280921a86107bb51bd92.png'
      },
      {
        city: 'Sydney',
        pic: 'https://www.aussieyoutoo.com/wp-content/uploads/2018/02/Sydney_Viajar_Australia.jpg'
      },
      {
        city: 'Montevideo',
        pic: 'https://d500.epimg.net/cincodias/imagenes/2019/09/19/fortunas/1568914638_483661_1568915058_noticia_normal.jpg'
      },
      {
        city: 'Rio de Janeiro',
        pic: 'https://interestrips.com/wp-content/uploads/2019/01/Qu%C3%A9-hacer-en-R%C3%ADo-de-Janeiro.jpg'
      }]
    ]
  }

  renderItem = ({ index }) => {
    let cities = this.state.carouselItems[index]
    return (
      <View style={{
        flex: 1, flexWrap: 'wrap', flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center', height: '100%', width:'100%'
      }}>
        {cities.map(city => {
          return (
            <View key={city.city} style={{width: '45%', height: '45%', margin:5 }}>
            <ImageBackground
              source={{ uri: city.pic }}
              resizeMode='cover' 
              style={{ width: '100%', height: '100%'}}>
              <View>
                <Text style={{fontWeight:'bold', textShadowColor:'black', color: 'white', textAlign:'center', textShadowRadius:3}}>{city.city}</Text>
              </View>
            </ImageBackground>
            </View>



          )
        })}

      </View>
    )
  }
  render() {
    return (
      <View style={{flex: 2,  maxHeight: '55%' }}>
        <Carousel
          data={this.state.carouselItems}
          sliderWidth={600}
          itemWidth={480}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}