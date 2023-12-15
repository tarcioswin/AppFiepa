import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../../components/colors';


import Mapa from './Mapa';
import Programacao from './Programacao';

const Tab = createMaterialTopTabNavigator();

const Acesso = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false); // State to control dropdown menu visibility

  // Function to toggle dropdown menu
  const toggleMenu = () => {
    setMenuVisible(prevMenuVisible => !prevMenuVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTintColor: 'white',
      headerStyle: styles.headerStyle,
      headerTitleStyle: { fontWeight: 'bold' },
      headerRight: () => (
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={24} color={COLORS.white} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Dropdown Menu Component
  const DropdownMenu = () => (
    <TouchableOpacity
      style={styles.menuOverlay}
      onPress={toggleMenu}
      activeOpacity={1}>
      <View style={styles.dropdownStyle}>
        <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Login'); setMenuVisible(false); }}>
          <Ionicons name="log-out-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('EditInformation'); setMenuVisible(false); }}>
          <Ionicons name="pencil-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Editar dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('AboutScreen'); setMenuVisible(false); }}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Sobre</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          style={styles.tabBarStyle}
          screenOptions={{
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
          }}>
          <Tab.Screen name="Mapa" component={Mapa} />
          <Tab.Screen name="Programacao" component={Programacao} />
        </Tab.Navigator>
        {menuVisible && <DropdownMenu />}
      </View>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  tabBarStyle: {
    // Adjust these styles to move the tab bar
    marginTop:-40,
    paddingTop: -30, // Increase top padding to move the tab bar up
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabIndicator: {
    backgroundColor: '#006400', // Adjust tab indicator color if needed
  },
  headerStyle: {
    backgroundColor: COLORS.primary,
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 2, width: 0 },
    borderBottomWidth: 0,
    height: 60,
  },
  dropdownStyle: {
    position: 'absolute',
    top: -30,      // Adjust this to move the menu up or down
    right: 10,    // Adjust this to move the menu left or right
    // left: 10,   // Use 'left' instead of 'right' if you want to position from the left
    // bottom: 60, // Use 'bottom' to position from the bottom of the screen
    width: 150,   // Width of the dropdown menu
    // height: 100, // Height of the dropdown menu, if you want to fix it
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  menuOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  // ... add any additional styles you need
});

export default Acesso;





