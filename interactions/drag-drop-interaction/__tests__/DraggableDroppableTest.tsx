import React, { ReactNode } from 'react'
import styles from './DraggableDroppableTest.module.css'



export interface DraggableDroppableTestProps {
    children ?: ReactNode
}
export const DraggableDroppableTest = ({ children }: DraggableDroppableTestProps) => {
    return (
        <div className='outer'>
            <div
                className={`${styles.container} draggable-droppable-test`}
                data-testid='draggable-droppable-test'
            >
                {children}
            </div>
        </div>
    );
};
