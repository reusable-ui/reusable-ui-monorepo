'use client'

import TestComponent from '@/components/TestComponent/TestComponent';
import styles from './page.module.css'



export default function Home() {
    return (
        <div>
            <main className={styles.main}>
                <section className={styles.section}>
                    <TestComponent />
                </section>
            </main>
        </div>
    );
}
