import { default as React } from 'react'
import styles from './index.module.css'
import { Button } from '@/components/Button'
// import Link from 'next/link'
import { Link } from '@reusable-ui/next-link-compat'



export default function Profile() {
    return (
        <div>
            <main className={styles.main}>
                <h1>Profile</h1>
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
