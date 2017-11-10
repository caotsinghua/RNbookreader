import React,{Component} from 'react'
import {List,ListItem} from 'react-native-elements'
// {
  // book.author,
  // book.title,
  // book.id,
  // book.updateTime
// }
export default (props)=>(
  <List containerStyle={{marginTop:10}}>
  {
    props.books.map((book,index)=>{
      return <ListItem key={index} title={book.title} subtitle={book.author}
      rightTitle={book.updateTime}
      onPress={()=>{
        props.navigation.navigate('Detail',{book});
      }}
      underlayColor="#eee"
      containerStyle={{}}
      />
    })
  }
</List>
)

