import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from './component/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SwitchDemo from "../screens/switchDemo/switchDemo";
import TouchableDemo from "../screens/touchableDemo/touchableDemo";
import LineDemo from "../screens/lineDemo/lineDemo";
import ModalDemo from "../screens/modalDemo/modalDemo";
import DropDownDemo from "../screens/dropdownDemo/dropdownDemo";
import ProgressDemo from "../screens/progressDemo/progressDemo";
import RecordDemo from "../screens/recordDemo/recordDemo";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    SwitchDemo:SwitchDemo,
    TouchableDemo:TouchableDemo,
    LineDemo:LineDemo,
    ModalDemo:ModalDemo,
    DropDownDemo:DropDownDemo,
    ProgressDemo:ProgressDemo,
    RecordDemo:RecordDemo,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
