'use client'

import Basic from '@/components/Basic/Basic';
import { themes } from '@/libs/themes';
import styles from './page.module.css'



export default function Home() {
    return (
        <div>
            <main className={styles.main}>
                {(['Regular', 'Mild', 'Outlined'] as const).map((variant) =>
                    <section key={`${variant}`} className={styles.section}>
                        <h2>{variant}</h2>
                        {themes.map((themeName) =>
                            <Basic key={themeName} theme={themeName} mild={variant === 'Mild'} outlined={variant === 'Outlined'} />
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}
