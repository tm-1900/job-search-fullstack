import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "../auth/UserContext";

/**Higher Order Component for private routes
 * 
 * 
 * Checks if the current user is valid, if so then go to all the
 * exact path in Routes component. 
 * 
 * If not, will redirect them to login page.
 * 
 * This will be used instead of <Route>
 */

 function PrivateRoute({exact, path, children}){
   // get currentUser
   const currentUser = useContext(UserContext);

   console.log(
     "PrivateRoute",
     "exact=", exact,
     "path=", path,
     "currentUser=", currentUser,
   );

   //redirect if not current user
   if (!currentUser.currentUser){
     return <Redirect to="/login" />;
   }

   return (
     <Route exact={exact} path={path} >
       {children}
     </Route>
   )

 }

 export default PrivateRoute;