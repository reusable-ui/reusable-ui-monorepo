'use client'

import styles from './page.module.css'
import cn from 'classnames'
import { useResponsiveStyles } from './styles/loader'



export default function Home() {
    const responsives = useResponsiveStyles();
    return (
        <div>
            <main className={styles.main}>
                <section className={cn(styles.section, styles.testResponsive, responsives.main)}>
                    <div>at least xs</div>
                    <div>at least sm</div>
                    <div>at least md</div>
                    <div>at least lg</div>
                    
                    <div>smaller than xs</div>
                    <div>smaller than sm</div>
                    <div>smaller than md</div>
                    <div>smaller than lg</div>
                    
                    <div>between xs-md</div>
                    <div>between xs-xs</div>
                    <div>between sm-md</div>
                    <div>between sm-lg</div>
                    
                    <div>at xs</div>
                    <div>at sm</div>
                    <div>at md</div>
                    <div>at lg</div>
                </section>
            </main>
        </div>
    );
}
