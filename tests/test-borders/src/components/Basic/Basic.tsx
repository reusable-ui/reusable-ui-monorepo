import { sizes } from '@/libs/sizes'
import { useBasicStyles } from './styles/loader'
import cn from 'classnames'


export interface BasicProps {
    size : typeof sizes[number]
}
export default function Basic(props: BasicProps) {
    const {
        size,
    } = props;
    
    
    
    const styles = useBasicStyles();
    return (
        <div className={cn(styles.main, size)}>
            <span>
                Border: <code>{size}</code>
            </span>
        </div>
    )
}
