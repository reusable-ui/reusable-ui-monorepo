import { default as React } from 'react'
import styles from './page.module.css'
import { Button } from '@/components/Button'
// import Link from 'next/link'
import { Link } from '@reusable-ui/next-link-compat'



export default function About() {
    return (
        <div>
            <main className={styles.main}>
                <h1>About</h1>
                <section>
                    <Link href='/' anchorless>
                        <Button>
                            Back to Home
                        </Button>
                    </Link>
                </section>
            </main>
        </div>
    );
}
