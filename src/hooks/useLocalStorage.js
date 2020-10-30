import {useState, useEffect} from "react";

/** 
 * This hook is used to keep state/data token in localStorage. 
 * 
 * This hook creates item as state, the hook will look localStorage for 
 * the current value, if it's not there, the default will be 'originalValue'
 * 
 * originalValue - default is null
 * lsKey - local storage key
 */

 function useLocalStorage(lsKey, originalValue=null){
   const initialValue = localStorage.getItem(lsKey) || originalValue;

   const [item, setItem] = useState(initialValue);

   useEffect(function setKeyToLocalStorage(){
     console.log("hooks useLocalStorage useEffect", "item=", item);

     if (item === null){
       localStorage.removeItem(lsKey);
     } else{
       localStorage.setItem(lsKey, item);
     }
   }, [lsKey, item]);

   return [item, setItem];
 }

 export default useLocalStorage;