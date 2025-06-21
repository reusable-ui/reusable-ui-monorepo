import { default as React } from 'react'
import styles from './page.module.css'
import { AccessibilityProvider } from '@reusable-ui/accessibilities'
import { Control } from '@/components/Control'



export default function Home() {
    return (
        <div>
            <main className={styles.main}>
                <section>
                    <AccessibilityProvider enabled={false}>
                        <Control>
                            Control-1
                        </Control>
                    </AccessibilityProvider>
                </section>
                <section>
                    <AccessibilityProvider active={true}>
                        <Control cascadeActive={true}>
                            Control-2
                        </Control>
                    </AccessibilityProvider>
                </section>
                <section>
                    <Control enabled={false}>
                        <Control>
                            Control-1
                        </Control>
                    </Control>
                </section>
                <section>
                    <Control active={true}>
                        <Control cascadeActive={true}>
                            Control-2
                        </Control>
                    </Control>
                </section>
                <section>
                    <Control>
                        Control-3
                    </Control>
                </section>
            </main>
        </div>
    );
}
