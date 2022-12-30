import { createContext, useReducer } from "react";

export const UserFoodsContext = createContext({
    UserFoods: [],
    addUserFoods: ({ 
        besinAdi,
        besinMiktari, 
        eklemeTarihi,
        kalori,
        karbonhidrat,
        protein,
        userId,
        yag
    }) => {},
    setUserFoods: (userFoodData) => {},
});


function userFoodsReducer( state , action ){

    switch(action.type){
        case 'ADD':
            return [...state,action.payload];
        default:
            return state;
    }
}

function UserFoodsContexProvider({children}){

    const [ userFoodsState , dispatch ] =  useReducer( userFoodsReducer , []);

    function addUserFoods(data){
        dispatch( {type: 'ADD' , payload: data} );
    }
    const value = {
        UserFoods: userFoodsState,
        addUserFoods: addUserFoods,  
    };
    return(
        <UserFoodsContext.Provider value={value}>{children}</UserFoodsContext.Provider>
    );
}

export default UserFoodsContexProvider;