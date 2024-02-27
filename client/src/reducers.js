
import { SEND_MOCK_DATA_TO_TASK_DRAFT } from './actions'; 

const initialState = {
    mockData: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MOCK_DATA_TO_TASK_DRAFT:
            return {
                ...state,
                mockData: action.mockData
            };
        default:
            return state;
    }
};

export default reducer;
