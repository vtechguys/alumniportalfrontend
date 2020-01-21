import {
    SEARCH_KEYWORD,
    SEARCH_LOADING,
    EMPTY_SEARCH_RESULT
} from '../actions/types'

const initialState = {
    result : {},
    loading : false,
}
function updateLatestTimestampResult(state, result){
    let prv = state.result.timestamp ? new Date(state.result.timestamp) : new Date();
    let cur= new Date(result.timestamp);
    // console.log(state.result && cur.getTime() > prv.getTime());
    if(state.result && cur.getTime() > prv.getTime()){
           
        return {
            ...state,
            result : result,
            loading : false
        }
    }
    const result1 = state.result;
    result1.timestamp = prv;
    return {
        ...state,
        result: result1,
        loading: false
    }
}
export default function(state = initialState, action){
    switch(action.type){
        case SEARCH_LOADING :
            return{
                ...state,
                loading : true
            }

        case EMPTY_SEARCH_RESULT :
            return{
                ...state,
                result : action.payload,
                loading : false
            }

        case SEARCH_KEYWORD :
            let payload = action.payload;
            // console.log("payload",payload);
            return updateLatestTimestampResult(state, payload);
            // return {
            //     ...state,
            //     result : action.payload,
            //     loading : false
            // }
        default : 
            return state
    }
}