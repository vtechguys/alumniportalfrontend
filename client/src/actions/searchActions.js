import axios from 'axios'
import config from '../config/index'
import {
    SEARCH_KEYWORD,
    SEARCH_LOADING,
    SEARCH_ERROR,
    EMPTY_SEARCH_RESULT
} from '../actions/types'
const {BASE_URL} = config

export const searchKeyword = (searchData)=> dispatch =>{
    dispatch({type: SEARCH_LOADING})
    axios
        .post(`${BASE_URL}/api/widgets/search`, searchData)
        .then(res =>{
           
            dispatch({
                type : SEARCH_KEYWORD,
                payload : res.data.data,
                // timestamp: res.data.timestamp
            })
        }
        )
        .catch(err => 
            dispatch({
                type : SEARCH_ERROR,
                payload : err.res.data
            }))
}

export const emptySearchResult = ()=>{
    return (dispatch)=>{
        dispatch({
            type : EMPTY_SEARCH_RESULT,
            payload : {}
        })
    }
}