import React,{Component} from 'react'
import {View,Text,ViewPagerAndroid,StyleSheet,Dimensions} from 'react-native'



class Page extends Component{
  constructor(props){
    super(props);
    this.state={
      deviceHeight:500,
      contentConfig:{
        lineHeight:20,
        fontSize:15,
        bgColor:'#e6dfdd'
      },
      pages:[],
      content:''
    }
  }
  componentWillMount = () => {
    let {height, width} = Dimensions.get('window')
    this.setState({deviceHeight:height})
  }
  handlePages(){
    const content=this.props.content;
    this.setState({content})
    const contentArr=content.split("\n");
    const pages=[];
    let height=this.state.deviceHeight;
    height-=300;//减去padding
    let lineHeight=this.state.contentConfig.lineHeight;
    let line_num=Math.floor(height/lineHeight);
    let page_num=Math.ceil(contentArr.length/line_num);
    console.log('页数',page_num)
    let line_flag=0;
    for(let i=0;i<page_num;i++){
      let page=[];
      for(let j=line_flag;j<line_flag+line_num;j++){
        if(contentArr[j]){
          page.push(contentArr[j]);
        }
      }
      line_flag+=line_num;
      pages.push(page)
    }
    console.log(pages)
    this.setState({
      pages
    })
  }
  render(){
    this.handlePages();
    let contentConfig=this.state.contentConfig;
    return (
      <ViewPagerAndroid style={styles.container}>
        {
          this.state.pages.map((page,index)=>{
            return <View key={index} style={{backgroundColor:contentConfig.bgColor,flex:1,paddingHorizontal:10}}>
              {
                page.map((line,index)=>{
                  return <Text 
                  style={{fontSize:contentConfig.fontSize,lineHeight:contentConfig.lineHeight}}
                  key={index}>{line}</Text>
                })
              }
            </View>
          })
        }
      </ViewPagerAndroid>
    )
  }
} 

const styles=StyleSheet.create({
  page:{
    padding:20
  },
  container:{
    flex:1,
    position:'relative'
  }
})

export default Page;