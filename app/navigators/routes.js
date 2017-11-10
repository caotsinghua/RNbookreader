import React from 'react'
import {TabNavigator,StackNavigator} from 'react-navigation'
import List from '../screens/List'
import Me from '../screens/Me'
import Detail from '../screens/Detail'
import Setting from '../screens/Setting'
import Search from '../screens/Search'
import Chapter from '../screens/Chapter'
import {Icon,SearchBar} from 'react-native-elements'
import HeaderLeftComponent from '../components/HeaderLeftComponent'
import HeaderRightComponent from '../components/HeaderRightComponent'

export const BookStack=StackNavigator({
  List:{
    screen:List,
    navigationOptions:({navigation})=>(
      {
        headerTitle:'一个书架',
        headerRight:<HeaderRightComponent handleSearch={()=>{
          navigation.navigate('Search')
        }}/>,
        headerStyle:{
          paddingRight:15
        }
      }
    )
  }
  
})


export const Tabs =TabNavigator({
  List:{
    screen:BookStack,
    navigationOptions:{
      tabBarLabel:'书架',
      tabBarIcon:({tintColor})=>(
        <Icon name="library-books" size={28} color={tintColor}/>
      )
    }
  },
  Me:{
    screen:Me,
    navigationOptions:{
      tabBarLabel:'我的',
      tabBarIcon:({tintColor})=>(
        <Icon name="person" size={28} color={tintColor}/>
      )
    }
  }
},{
  tabBarPosition:'bottom',
  tabBarOptions:{
    showIcon:true,
    showLabel:false,
    pressColor:'#ccc',
    labelStyle:{
      fontSize:12
    },
    indicatorStyle:{
      backgroundColor:'deepskyblue'
    },
    style:{
      backgroundColor:'#fff',
    },
    activeTintColor:'deepskyblue',
    inactiveTintColor:'#000',
  }
})

export const Root=StackNavigator({

  Tabs:{
    screen:Tabs,
    navigationOptions:{
      header:null
    }
  },
  Search:{
    screen:Search,
    navigationOptions:{
      headerTitle:'书籍搜索'
    }
  },
  Detail:{
    screen:Detail,
    navigationOptions:({navigation})=>{
      return {
        title:`${navigation.state.params.book.title}`
      }
    }
  },
  Chapter:{
    screen:Chapter,
    navigationOptions:{
      header:null
    }
  },
},{
  mode:'modal'
})

