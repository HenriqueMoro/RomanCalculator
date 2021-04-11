import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Divider } from 'react-native-elements';

 export default function App() {
  const [number, setNumber] = useState('')
  const [calc, setCalc] = useState([])
  const [show,setShow] = useState([])
  const signal =['+','-','*','/']
  const [isTrue, setIsTrue] = useState(false)
  const [lastNumber,setLastNumber] = useState([])
  
  function handleClick(num){
    
    var resultsConv = roman_to_Int(number)   
    setLastNumber([])
    
    setCalc([...calc,resultsConv,num])
    setNumber('')
  }
    
  function handleEqual(){
    var index = calc.length -1
    if (signal.includes(calc[index]) ===true && number !=='' ){
      var resultsConv = roman_to_Int(number)
      setCalc([...calc,resultsConv])
      setNumber('')
      setIsTrue(true)
    }} 
    
    useEffect(()=>{
     
      if(isTrue===true){
        
        var result = eval(calc.join(''))
        if(Number.isInteger(result)===true){
          if (result <=9000){
          setIsTrue(false)
          setLastNumber([...show,'='])
          setShow(DecIntoRoman(result))
          setNumber(DecIntoRoman(result))
          setCalc([])}

          else{
            setShow('To Many Numbers...')
            setIsTrue(false)
          }
        }
         
        
        else{
          setShow('The results must be a integer number!')
          setIsTrue(false)
        }

      }
    },[isTrue])     
    
    function handleC(){
        setShow([])
        setCalc([])
        setNumber('')
        setLastNumber([])
    }
    
    function DecIntoRoman(num){
      var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
      "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
      "","I","II","III","IV","V","VI","VII","VIII","IX"],
      
      roman_num = "",
      i = 3;
      
      while (i--)
      roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
      return Array(+digits.join("") + 1).join("M") + roman_num;
    }

    function roman_to_Int(str1) {
      if(str1 == null) return -1;
      var num = char_to_int(str1.charAt(0));
      var pre, curr;
      
      for(var i = 1; i < str1.length; i++){
      curr = char_to_int(str1.charAt(i));
      pre = char_to_int(str1.charAt(i-1));
      if(curr <= pre){
      num += curr;
      } else {
      num = num - pre*2 + curr;
      }
      }
      
      return num;
      }
      
      function char_to_int(c){
      switch (c){
      case 'I': return 1;
      case 'V': return 5;
      case 'X': return 10;
      case 'L': return 50;
      case 'C': return 100;
      case 'D': return 500;
      case 'M': return 1000;
      default: return -1;
      }
      }
   
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={{color:'white', marginRight:5,fontSize:15 }}>{lastNumber}</Text>
        <Text style={{color:'white', marginRight:5,fontSize:45 }}>{show}</Text>
      </View>
      
      <Divider style={{margin:20}}></Divider>
      
      <View style={styles.buttonBox}>
        <View style={styles.buttonRow}>
            <TouchableOpacity onPress={()=>handleC()} style={styles.buttonOperation} ><Text style={styles.text}>C</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{handleClick('+'),setShow(show+'+')}} style={styles.buttonOperation}><Text style={styles.text}>+</Text></TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
        
            <TouchableOpacity onPress={()=>{setNumber(number+'I'),setShow(show+'I')}}  style={styles.button}><Text style={styles.text}>I</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setNumber(number+'V'),setShow(show+'V')}} style={styles.button}><Text style={styles.text}>V</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{handleClick('/'),setShow(show+'/')}} style={styles.buttonOperation}><Text style={styles.text}>÷</Text></TouchableOpacity>
            
            
        </View>        
        
        <View style={styles.buttonRow}>
            <TouchableOpacity onPress={()=>{setNumber(number+'X'),setShow(show+'X')}} style={styles.button}><Text style={styles.text}>X</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setNumber(number+'L'),setShow(show+'L')}} style={styles.button}><Text style={styles.text}>L</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{handleClick('*'),setShow(show+'*')}} style={styles.buttonOperation}><Text style={styles.text}>×</Text></TouchableOpacity>
            
        </View>

        <View style={styles.buttonRow}>
            
            <TouchableOpacity onPress={()=>{setNumber(number+'C'),setShow(show+'C')}} style={styles.button}><Text style={styles.text}>C</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setNumber(number+'D'),setShow(show+'D')}} style={styles.button}><Text style={styles.text}>D</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{handleClick('-'),setShow(show+'-')}} style={styles.buttonOperation}><Text style={styles.text}>-</Text></TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
            <TouchableOpacity onPress={()=>{setNumber(number+'M'),setShow(show+'M')}} style={styles.buttonLast}><Text style={styles.text}>M</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>handleEqual()} style={styles.buttonEqual}><Text style={styles.text}>=</Text></TouchableOpacity>
             
        </View>
        
    </View>
    <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000000',
    justifyContent:'flex-end',
    flex:1
},
  
  buttonRow:{
    flexDirection:'row',
    justifyContent:'space-evenly'
   },

   buttonBox:{
     marginBottom:10,
   },


   text:{
    fontSize:30,
    fontWeight:'600',
    color:'white'
   },

button: {
  flex:1.9,  
  alignItems:"center",
    justifyContent:"center",
    width:60,
    height: 60,
    borderRadius:40,
    margin:5,
    backgroundColor: "#2a2a2a"
},

buttonLast: {
  flex:4,  
  alignItems:"center",
    justifyContent:"center",
    width:60,
    height: 60,
    borderRadius:40,
    margin:5,
    backgroundColor: "#2a2a2a"
},

buttonOperation: {
  flex:4,  
  alignItems:"center",
    justifyContent:"center",
    width:60,
    height: 60,
    borderRadius:40,
    margin:5,
    backgroundColor: "#ffa500"
},
buttonEqual: {
  flex:4,  
  alignItems:"center",
    justifyContent:"center",
    width:60,
    height: 60,
    borderRadius:40,
    margin:5,
    backgroundColor: "#505050"
},
  screen:{
     flex:1,
     alignItems:'flex-end',
     justifyContent:'flex-end'
  },
});




  
