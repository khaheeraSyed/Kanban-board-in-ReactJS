import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveTask, addTask } from '../redux/actions';

const KanbanBoard = () => {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDragEnd = (result) => {
        if (!result.destination) return; // Dropped outside the list
        const { source, destination } = result;

        // Move the task to the new column
        dispatch(moveTask(result.draggableId, destination.droppableId));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanban-board">
                <SearchBar setSearchTerm={setSearchTerm} />
                <div className="columns">
                    {['To Do', 'In Progress', 'Peer Review', 'Done'].map(stage => (
                        <Droppable key={stage} droppableId={stage}>
                            {(provided) => (
                                <div 
                                    className="column" 
                                    ref={provided.innerRef} 
                                    {...provided.droppableProps}
                                >
                                    <h2>{stage}</h2>
                                    {filteredTasks.filter(task => task.stage === stage).map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskCard task={task} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    {stage === 'To Do' && <TaskForm addTask={(task) => dispatch(addTask(task))} />}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
