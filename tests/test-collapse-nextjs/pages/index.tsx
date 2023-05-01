import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"
// import styles from "@/styles/Home.module.css"
import { Collapse } from "@reusable-ui/collapse"
import '@cssfn/cssfn-dom'

const inter = Inter({ subsets: ["latin"] });



export default function Home() {
    const [showCollapse, setShowCollapse] = useState<boolean>(false);
    
    
    
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${inter.className}`}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <button onClick={() => setShowCollapse(!showCollapse)}>
                    I'm here
                </button>
                <Collapse expanded={showCollapse}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quibusdam totam tempore suscipit, molestiae libero eum nulla debitis, quos quam pariatur voluptas laudantium autem iusto maiores! Et consequuntur ratione delectus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quibusdam totam tempore suscipit, molestiae libero eum nulla debitis, quos quam pariatur voluptas laudantium autem iusto maiores! Et consequuntur ratione delectus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quibusdam totam tempore suscipit, molestiae libero eum nulla debitis, quos quam pariatur voluptas laudantium autem iusto maiores! Et consequuntur ratione delectus.</p>
                </Collapse>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </main>
        </>
    );
}
