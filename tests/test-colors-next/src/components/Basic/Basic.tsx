import { type themes } from '@/libs/themes'
import { useBasicStyles } from './styles/loader'
import cn from 'classnames'
import { startsCapitalized } from '@cssfn/cssfn'


export interface BasicProps {
    theme    : typeof themes[number]
    mild     : boolean
    outlined : boolean
}
export default function Basic(props: BasicProps) {
    const {
        theme,
        mild,
        outlined,
    } = props;
    const variant = (
        outlined
        ? 'outlined'
        : (
            mild
            ? 'mild'
            : 'base'
        )
    );
    
    
    
    const styles = useBasicStyles();
    return (
        <div className={cn(styles.main, theme, variant)}>
            <span>
                Background: <code>{theme}{startsCapitalized(variant)}</code>
            </span>
            <span>
                Foreground: <code>{theme}{startsCapitalized((() => {
                    switch (variant) {
                        case 'base'     : return 'flip';
                        case 'mild'     : return 'text';
                        case 'outlined' : return 'edge';
                        default         : return '';
                    } //
                })())}</code>
            </span>
            <span>
                Border: <code>{theme}{startsCapitalized((() => {
                    switch (variant) {
                        case 'base'     : return 'bold';
                        case 'mild'     : return 'thin';
                        case 'outlined' : return 'edge';
                        default         : return '';
                    } //
                })())}</code>
            </span>
            <span>
                Ring: <code>{theme}Soft</code>
            </span>
        </div>
    )
}
