import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  
import weatherData from './weather.json';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWeather, setFilteredWeather] = useState([]);

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    filterWeather();
  }, [searchQuery]);

  const fetchWeather = async () => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setWeather(weatherData);
      setFilteredWeather(weatherData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filterWeather = () => {
    const filtered = weather.filter((item) =>
      item.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredWeather(filtered);
  };

  const renderWeatherItem = ({ item }) => (
    <View style={styles.weatherContainer}>
      <Image
        style={styles.icon}
        source={{ uri: `https://openweathermap.org/img/wn/${item.weather.icon}@2x.png` }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.city}>{item.city}</Text>
        <Text style={styles.description}>{item.weather.description}</Text>
        <Text style={styles.temperature}>{item.weather.temperature}°C</Text>
        <Text style={styles.details}>
          Humidity: {item.weather.humidity}% | Wind: {item.weather.wind_speed} m/s
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search city..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <FlatList
        data={filteredWeather}
        renderItem={renderWeatherItem}
        keyExtractor={(item) => item.city}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
    margin:2
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  weatherContainer: {
    flexDirection: 'row',
    padding: 10,
    margin:10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
  },
});

export default App;
