const initialState = {
  isLoading: false,
  error: "",
  success: false,
  file: null,
  message: ""
};

export default function uploadFileReducer(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case "UPLOAD_DOCUMENT_SUCCESS":
      return {
        ...state,
        message: action.payload.message,
        success: action.payload.success,
        isLoading: false
      };
    case "UPLOAD_DOCUMENT_FAIL":
      return {
        ...state,
        message: action.payload.message,
        success: action.payload.success,
        isLoading: false
      };
    case "UPLOAD_DOCUMENT_LOADING":
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
