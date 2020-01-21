import axios from 'axios';
import config from './../config/index'
const {BASE_URL} = config
export function uploadSuccess(data) {
    return {
        type: 'UPLOAD_DOCUMENT_SUCCESS',
        payload: data,
    };
}

export function uploadFail(error) {
    return {
        type: 'UPLOAD_DOCUMENT_FAIL',
        payload: error,
    };
}

export function uploadLoading() {
    return {
        type: 'UPLOAD_DOCUMENT_LOADING',
    };
}

export function uploadDocumentRequest(file) {
    let data = new FormData();
    data.append('file', file);
    // data.append('name', name);

    return (dispatch) => {
        dispatch(uploadLoading())
        axios.post(`${BASE_URL}/api/users/upload-students`, data)
            .then(
                response => dispatch(uploadSuccess(response.data)))
                .catch(error => dispatch(uploadFail(error)))
    };
}

export function uploadAvatarRequest(file, userId) {
    let data = new FormData();
    data.append('file', file);
    data.append('userId', userId)
    console.log(userId)
    // data.append('name', name);

    return (dispatch) => {
        dispatch(uploadLoading())
        axios.post(`${BASE_URL}/api/users/upload-profile-pic`, data)
            .then(
                response =>{
                    
                    return dispatch(uploadSuccess(response.data))})
                .catch(error => dispatch(uploadFail(error)))
    };
}