export const ADD_TASK = 'ADD_TASK';
export const MOVE_TASK = 'MOVE_TASK';

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const moveTask = (taskId, newStage) => ({
    type: MOVE_TASK,
    payload: { taskId, newStage },
});
