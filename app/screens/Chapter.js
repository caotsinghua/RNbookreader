import React,{Component} from 'react';
import {ToolbarAndroid,View,Text,ViewPagerAndroid,StyleSheet,TouchableWithoutFeedback,TouchableHighlight
,TouchableNativeFeedback} from 'react-native'
import {Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import apis from '../config/apis'
import Page from '../components/ChapterPage.js'
export default class Chapter extends Component{
  constructor(props){
    super(props)
    this.state={
      showBar:false,
      content:'尚未加载'
    }
  }
  getChapter(){
    let {bookId,chapterId}=this.props.navigation.state.params;
    console.log(bookId,chapterId)
    apis.getBookChapter(bookId,chapterId).then(res=>{
      this.setState({
        content:res.content
      })
    }).catch(e=>{
      console.log(e)
    })
  }
  componentWillMount = () => {
    console.log(this.props.navigation.state.params)
    this.getChapter();
  }
  
  handleActionSelected(index){
    if(index==0){
      //share
      console.log(index)
    }else{
      console.log('no such index')
    }
  }
  back(){
    //返回上一页 
    const backAction=NavigationActions.back()
    this.props.navigation.dispatch(backAction)    
  }
  render(){
    return (
      <View style={styles.container}>
        {
          this.state.showBar?
            <ToolbarAndroid
              style={styles.topBar}
              subtitle="阿斯顿阿斯顿"
              subtitleColor="#c4c4c4"
            
              navIcon={require('../resources/icons/ic_arrow_back_white_36dp.png')}
              actions={[{
                title:'分享',
                icon:require('../resources/icons/more_vert.png'),
                show:'always'
              }]}
              onActionSelected={this.handleActionSelected.bind(this)}
              onIconClicked={this.back.bind(this)}
            />:null
        }
        <TouchableWithoutFeedback
          style={{flex:1}}
          onPress={()=>{
            this.setState({
              showBar:!this.state.showBar
            })
          }}
        >
          {/* 内容部分 */}
        <Page content={this.state.content}/>
        </TouchableWithoutFeedback>
        {
          this.state.showBar?
          <View style={styles.footerBar}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#333',false)} style={styles.tabItem}
             onPress={()=>{console.log('夜间')}}
            >
              <View style={styles.tabItem}>
                <Icon size={20}  color="#c4c4c4" name="brightness-3"/>
                <Text style={styles.tabText}>夜间</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#333',false)}  style={styles.tabItem}
            onPress={()=>{console.log('夜间')}}
            >
              <View style={styles.tabItem}>
                <Icon size={20}  color="#c4c4c4" name="error-outline"/>
                <Text style={styles.tabText}>反馈</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#333',false)}  style={styles.tabItem}
            onPress={()=>{console.log('夜间')}}
            >
              <View style={styles.tabItem}>
                <Icon size={20}  color="#c4c4c4" name="font-download"/>
                <Text style={styles.tabText}>设置</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#333',false)}  style={styles.tabItem}
            onPress={()=>{console.log('夜间')}}
            >
              <View style={styles.tabItem}>
                <Icon size={20}  color="#c4c4c4" name="file-download"/>
                <Text style={styles.tabText}>缓存</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#333',false)}  style={styles.tabItem}
            onPress={()=>{console.log('夜间')}}
            >
              <View style={styles.tabItem}>
                <Icon size={20}  color="#c4c4c4" name="list"/>
                <Text style={styles.tabText}>目录</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        :null
        }
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    position:'relative'
  },
  viewpage:{
    flex:1,
    backgroundColor:'#e6dfdd'
  },
  page:{
    backgroundColor:'#e6dfdd',
    padding:20,
    overflow:'scroll'
  },
  footerBar:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    height:55,
    backgroundColor:'#111',
    flexDirection:'row'
  },
  topBar:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    height:55,
    backgroundColor:'#111',
    zIndex:100,//不设置无法显示
  },
  tabItem:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  tabText:{
    color:'#c4c4c4',
    fontSize:12
  },
  contentFont:{
    fontSize:16,
    lineHeight:25,
    color:'#000'
  }
})