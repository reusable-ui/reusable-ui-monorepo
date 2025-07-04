import { default as React } from 'react'
import styles from './page.module.css'
import { Button } from '@/components/Button'
// import Link from 'next/link'
import { Link } from '@reusable-ui/next-link-compat'



export default function Home() {
    return (
        <div>
            <main className={styles.main}>
                <h1>Home</h1>
                {/* <section>
                    <Button>
                        Click Me
                    </Button>
                </section> */}
                <section>
                    <Link href='/about' anchorless>
                        <Button>
                            About
                        </Button>
                    </Link>
                    <br />
                    <Link href='/about' anchorless passHref>
                        <Button>
                            About
                        </Button>
                    </Link>
                </section>
                <section>
                    <Link href='/profile' anchorless>
                        <Button>
                            Profile
                        </Button>
                    </Link>
                    <br />
                    <Link href='/profile' anchorless passHref>
                        <Button>
                            Profile
                        </Button>
                    </Link>
                </section>
            </main>
        </div>
    );
}
