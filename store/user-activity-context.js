import { createContext, useReducer } from "react";

export const UserActivityContext = createContext({
    UserActivities: [],
    addUserActivities: ({ 
        aktiviteAdi,
        aktiviteSuresi, 
        eklemeTarihi,
        userId
    }) => {},
    setUserActivities: (userActivityData) => {},
});


function userActivitiesReducer( state , action ){

    switch(action.type){
        case 'ADD':
            return [...state,action.payload];
        default:
            return state;
    }
}

function UserActivitiesContexProvider({children}){

    const [ userActivitiesState , dispatch ] =  useReducer( userActivitiesReducer , []);

    function addUserActivities(data){
        dispatch( {type: 'ADD' , payload: data} );
    }
    const value = {
        UserActivities: userActivitiesState,
        addUserActivities: addUserActivities,  
    };
    return(
        <UserActivityContext.Provider value={value}>{children}</UserActivityContext.Provider>
    );
}

export default UserActivitiesContexProvider;