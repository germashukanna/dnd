import {useLocalStorage} from 'usehooks-ts';

import {ColumnType} from '../utils/enums';
import {TaskModel} from '../utils/models';


function useTaskCollection() {
    return useLocalStorage<{
        [key in ColumnType]: TaskModel[];
    }>('tasks', {
        Todo: [
            {
                id: Date.now().toString(),
                column: ColumnType.TO_DO,
                title: 'Task 1',
                color: 'blue.300',
            },
        ],
        'In Progress': [
            {
                id: Date.now().toString(),
                column: ColumnType.IN_PROGRESS,
                title: 'Task 2',
                color: 'yellow.300',
            },
        ],
        Blocked: [
            {
                id: Date.now().toString(),
                column: ColumnType.BLOCKED,
                title: 'Task 3',
                color: 'red.300',
            },
        ],
        Completed: [
            {
                id: Date.now().toString(),
                column: ColumnType.COMPLETED,
                title: 'Task 4',
                color: 'green.300',
            },
        ],
    });
}

export default useTaskCollection;