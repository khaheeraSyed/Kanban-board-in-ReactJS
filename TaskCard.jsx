import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task }) => {
    return (
        <Draggable draggableId={task.id} index={task.index}>
            {(provided) => (
                <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
