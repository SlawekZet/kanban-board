import { Board } from './Board';
import { DragDropContext } from 'react-beautiful-dnd';
import { useKanbanTaskManagerContext } from '@/app/lib/contexts/KanbanTaskManagerContext';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  title: string;
  isCompleted: boolean;
}

interface TaskList {
  id: string;
  name: string;
  tasks: Task[];
}

interface Board {
  id: string;
  name: string;
  columns: TaskList[];
}

export const BoardsCard = () => {
  const { boardToRender, setBoardToRender } = useKanbanTaskManagerContext();

  const handleDragDrop = (results) => {
    // console.log(results);
    const { source, destination } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (boardToRender) {
      if (results.type !== 'board') {
        const columns = boardToRender.columns;
        const columnSourceIndex = columns.findIndex(
          (column: TaskList) => column.id === source.droppableId
        );
        const columnDestinationIndex = columns.findIndex(
          (column: TaskList) => column.id === destination.droppableId
        );

        const newSourceTasks = [...columns[columnSourceIndex].tasks];
        const newDestinationTasks =
          source.droppableId !== destination.droppableId
            ? [...columns[columnDestinationIndex].tasks]
            : newSourceTasks;

        const [taskToMove] = newSourceTasks.splice(source.index, 1);
        newDestinationTasks.splice(destination.index, 0, taskToMove);

        const newColumns = [...columns];
        newColumns[columnSourceIndex] = {
          ...columns[columnSourceIndex],
          tasks: newSourceTasks,
        };
        newColumns[columnDestinationIndex] = {
          ...columns[columnDestinationIndex],
          tasks: newDestinationTasks,
        };

        setBoardToRender({
          ...boardToRender,
          columns: newColumns,
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray1 dark:bg-gray6">
      <DragDropContext onDragEnd={handleDragDrop}>
        <Board />
      </DragDropContext>
    </div>
  );
};
