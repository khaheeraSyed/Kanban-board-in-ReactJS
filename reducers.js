// reducers.js
import { ADD_TASK, MOVE_TASK } from './actions';

const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, { ...action.payload, id: Date.now().toString() }],
            };
        case MOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.taskId ? { ...task, stage: action.payload.newStage } : task
                ),
            };
        default:
            return state;
    }
};

export default taskReducer;
