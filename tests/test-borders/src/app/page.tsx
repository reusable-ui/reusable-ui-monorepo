'use client'

import Basic from '@/components/Basic/Basic';
import { sizes } from '@/libs/sizes'
import styles from './page.module.css'



export default function Home() {
    return (
        <div>
            <main className={styles.main}>
                <section className={styles.section}>
                    <h2>Size</h2>
                    {sizes.map((sizeName) =>
                        <Basic key={sizeName} size={sizeName} />
                    )}
                </section>
            </main>
        </div>
    );
}
