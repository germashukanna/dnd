import {TaskModel} from "../utils/models";
import React from "react";
import {Box, IconButton} from "@chakra-ui/react";
import {DeleteIcon} from '@chakra-ui/icons';
import {AutoResizeTextarea} from "./AutoResizeTextArea";
import {useTaskDragAndDrop} from "../hooks/useTaskDragAndDrop";


type TaskProps = {
    index: number;
    task: TaskModel;
    onDelete: (id: TaskModel['id']) => void
    onUpdate: (id: TaskModel['id'], onUpdate: TaskModel) => void
    onDropHover: (i: number, j: number) => void
}

export const Task: React.FC<TaskProps> =
    ({
         index, task,
         onDelete: handleDelete, onUpdate: handleUpdate, onDropHover: handleDropHover
     }) => {
        const {ref, isDragging} = useTaskDragAndDrop<HTMLDivElement>({
            task, index
        }, handleDropHover)
        const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const netTitle = e.target.value;
            handleUpdate(task.id, {...task, title: netTitle})
        }
        const handleDeleteClick = () => {
            handleDelete(task.id)
        }
        return (
            <Box
                ref={ref}
                as={'div'}
                role={'group'}
                position={'relative'}
                rounded={'lg'}
                w={200}
                pl={3}
                pr={7}
                pt={3}
                pb={1}
                boxShadow={'xl'}
                cursor={'grab'}
                bgColor={task.color}
                opacity={isDragging ? 0.5 : 1}
            >
                <IconButton
                    position={'absolute'}
                    top={0}
                    right={0}
                    zIndex={100}
                    aria-label={'delete-task'}
                    size={'md'}
                    colorScheme={'solid'}
                    color={'gray.700'}
                    opacity={0}
                    _groupHover={{
                        opacity: 1,
                    }}
                    icon={<DeleteIcon/>}
                    onClick={handleDeleteClick}
                />
                <AutoResizeTextarea
                    value={task.title}
                    fontWeight={'semibold'}
                    cursor={'inherit'}
                    border={'none'}
                    p={0}
                    resize={'none'}
                    minH={70}
                    maxH={200}
                    focusBorderColor={'none'}
                    color={'gray.700'}
                    onChange={handleTitleChange}
                />
            </Box>
        )
    }