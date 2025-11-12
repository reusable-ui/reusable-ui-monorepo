import { useTestComponentStyles } from './styles/loader'
import { usePressBehaviorState, type PressStateProps } from '@reusable-ui/press-state'



export interface TestComponentProps
    extends
        PressStateProps
{
}
export default function TestComponent(props: TestComponentProps) {
    const {
        pressed,
        pressPhase,
        pressClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        ref,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } = usePressBehaviorState<HTMLDivElement>(props);
    
    
    
    const styles = useTestComponentStyles();
    return (
        <div
            tabIndex={0}
            className={`${styles.main} ${pressClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            
            ref={ref}
            
            onPointerDown={(event) => {
                handlePointerDown(event);
                console.log('pressure: ', event.pressure);
            }}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onClick={() => {
                console.log('Clicked!');
            }}
        >
            Click Me
        </div>
    )
}
