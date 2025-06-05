'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { useTestTypoStyles } from './styles/loader'
import {
    mountTypography,
    mountSecondaries,
    
    mountParagraphs,
    mountLeads,
    mountHeadings,
    mountDisplays,
    
    mountBlockquotes,
    
    mountPlainLists,
    
    mountHorzSeparators,
    
    mountMarks,
    mountKbds,
    mountCodes,
    
    mountEmphases,
    
    mountMany,
} from '@reusable-ui/typos'



export default function Home() {
    const typoStyles = useTestTypoStyles();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _mainClass = typoStyles.main;
    
    const [enableStyling, setEnableStyling] = useState(true);
    useEffect(() => {
        if (!enableStyling) return;
        const mountedTypos = mountMany(
            mountTypography,
            mountSecondaries,
            mountParagraphs,
            mountLeads,
            mountHeadings,
            mountDisplays,
            mountBlockquotes,
            mountPlainLists,
            mountHorzSeparators,
            mountMarks,
            mountKbds,
            mountCodes,
            mountEmphases,
        );
        
        return () => {
            mountedTypos.unmount();
        };
    }, [enableStyling]);
    
    return (
        <div>
            <main className={styles.main}>
                <section className={styles.section}>
                    <label>
                        <input
                            type="checkbox"
                            checked={enableStyling}
                            onChange={() => setEnableStyling(!enableStyling)}
                        />
                        Enable typography styling.
                    </label>
                </section>
                <section className={styles.sectionText}>
                    <p>
                        Hello world!
                    </p>
                    <p className='secondary'>
                        Secondary text!
                    </p>
                </section>
                <section className={styles.sectionText}>
                    <p>paragraph one-one</p>
                    <p>paragraph one-two</p>
                    <p>paragraph one-three</p>
                    <p>paragraph one-four</p>
                    <p>paragraph one-five</p>
                    <p>paragraph one-six</p>
                    <hr />
                    <p>paragraph two-one</p>
                    <p>paragraph two-two</p>
                    <p>paragraph two-three</p>
                    <p>paragraph two-four</p>
                    <p>paragraph two-five</p>
                    <p>paragraph two-six</p>
                    <hr />
                </section>
                <section className={styles.sectionText}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <div className='p'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                    <div className='lead'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                    <div className='lead'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </section>
                <section className={styles.sectionText}>
                    <h1>Heading One</h1>
                    <p>blah</p>
                    <h2>Heading Two</h2>
                    <p>blah</p>
                    <h3>Heading Three</h3>
                    <p>blah</p>
                    <h4>Heading Four</h4>
                    <p>blah</p>
                    <h5>Heading Five</h5>
                    <p>blah</p>
                    <h6>Heading Six</h6>
                    <p>blah</p>
                    <hr />
                    <h1 className='h1'>Pseudo Heading One</h1>
                    <p>blah</p>
                    <h2 className='h2'>Pseudo Heading Two</h2>
                    <p>blah</p>
                    <h3 className='h3'>Pseudo Heading Three</h3>
                    <p>blah</p>
                    <h4 className='h4'>Pseudo Heading Four</h4>
                    <p>blah</p>
                    <h5 className='h5'>Pseudo Heading Five</h5>
                    <p>blah</p>
                    <h6 className='h6'>Pseudo Heading Six</h6>
                    <p>blah</p>
                    <hr />
                    <h1>Main Heading</h1>
                    <h2>Subheading</h2>
                    <h3>Sub-subheading</h3>
                    <p>blah</p>
                    <hr />
                    <h1 className='h1'>Main Pseudo Heading</h1>
                    <h2 className='h2'>Sub Pseudo Heading</h2>
                    <h3 className='h3'>Sub-sub Pseudo Heading</h3>
                    <p>blah</p>
                    <hr />
                    <h1 className='h1'>Main Pseudo Heading</h1>
                    <h2 className='display-2'>Sub Pseudo Heading</h2>
                    <h3 className='h3'>Sub-sub Pseudo Heading</h3>
                    <p>blah</p>
                    <hr />
                    <div className='h1'>Main Pseudo Heading</div>
                    <div className='display-2'>Sub Pseudo Heading</div>
                    <div className='h3'>Sub-sub Pseudo Heading</div>
                    <p>blah</p>
                </section>
                <section className={styles.sectionText}>
                    <h1 className='display-1'>Display One</h1>
                    <p>blah</p>
                    <h2 className='display-2'>Display Two</h2>
                    <p>blah</p>
                    <h3 className='display-3'>Display Three</h3>
                    <p>blah</p>
                    <h4 className='display-4'>Display Four</h4>
                    <p>blah</p>
                    <h5 className='display-5'>Display Five</h5>
                    <p>blah</p>
                    <h6 className='display-6'>Display Six</h6>
                    <p>blah</p>
                    <hr />
                    <h1 className='display-1'>Main Display</h1>
                    <h2 className='display-2'>Subdisplay</h2>
                    <h3 className='display-3'>Sub-Subdisplay</h3>
                    <p>blah</p>
                    <hr />
                    <h1 className='display-1'>Main Display</h1>
                    <h2 className='h2'>Subdisplay</h2>
                    <h3 className='display-3'>Sub-Subdisplay</h3>
                    <p>blah</p>
                    <hr />
                    <div className='display-1'>Main Display</div>
                    <div className='h2'>Subdisplay</div>
                    <div className='display-3'>Sub-Subdisplay</div>
                    <p>blah</p>
                </section>
                <section className={styles.sectionText}>
                    <blockquote>
                        Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn&apos;t really do it, they just saw something. It seemed obvious to them after a while. That&apos;s because they were able to connect experiences they&apos;ve had and synthesize new things.
                    </blockquote>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ipsum a sit quos reiciendis molestias quidem eius nam ad repellendus.
                    </p>
                    <blockquote>
                        Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn&apos;t really do it, they just saw something. It seemed obvious to them after a while. That&apos;s because they were able to connect experiences they&apos;ve had and synthesize new things.
                    </blockquote>
                    <h1>
                        Just A Title
                    </h1>
                    <blockquote>
                        Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn&apos;t really do it, they just saw something. It seemed obvious to them after a while. That&apos;s because they were able to connect experiences they&apos;ve had and synthesize new things.
                    </blockquote>
                    <blockquote>
                        Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn&apos;t really do it, they just saw something. It seemed obvious to them after a while. That&apos;s because they were able to connect experiences they&apos;ve had and synthesize new things.
                    </blockquote>
                </section>
                <section className={styles.sectionText}>
                    <p>
                        Lorem ipsum dolor <mark>hello</mark><mark>world</mark> sit <mark>test</mark> amet consectetur <kbd>Ctrl</kbd><kbd>Alt</kbd> and <kbd>Delete</kbd> adipisicing elit. Eligendi consequatur, aspernatur <code>getElementById()</code> quisquam <code>window</code> <code>document</code> ipsam,
                        placeat minima ipsum reprehenderit <mark>hello</mark><kbd>Ctrl</kbd><code>getElementById()</code><mark>world</mark><kbd>Alt</kbd><code>window</code> amet sapiente distinctio sunt tempore, quia reiciendis maxime? Animi incidunt velit sequi accusamus!
                    </p>
                    <pre>
                        <code>
{`const element = document.getElementById('myElement');
if (element) {
    element.style.color = 'red';
}`}
                        </code>
                    </pre>
                </section>
                <section className={styles.sectionText}>
                    <ol className='plainList'>
                        <li>One</li>
                        <li>Two</li>
                        <li>Three</li>
                    </ol>
                    <ul className='plainList'>
                        <li>One</li>
                        <li>Two</li>
                        <li>Three</li>
                    </ul>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat cupiditate corporis dolore quas repellendus ipsa amet error ipsam voluptate? Excepturi ea, aspernatur facere dignissimos impedit doloremque nemo rem! Similique, quidem?
                    </p>
                    <ol className='plainList'>
                        <li>One</li>
                        <li>Two</li>
                        <li>Three</li>
                    </ol>
                </section>
                <section className={styles.sectionText}>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat cupiditate corporis dolore quas repellendus ipsa amet error ipsam voluptate? Excepturi ea, aspernatur facere dignissimos impedit doloremque nemo rem! Similique, quidem?
                    </p>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat cupiditate corporis dolore quas repellendus ipsa amet error ipsam voluptate? Excepturi ea, aspernatur facere dignissimos impedit doloremque nemo rem! Similique, quidem?
                    </p>
                    <hr />
                </section>
                <section className={styles.sectionText}>
                    <h3>
                        Test emphases.
                    </h3>
                    <p>
                        Lorem ipsum <del>dolor</del> sit <ins>amet</ins> consectetur <small>adipisicing</small> elit. <strong>Ut</strong> ipsum a <em>sit quos</em> reiciendis <sub>molestias</sub> quidem <sup>eius nam</sup> ad repellendus.
                    </p>
                    <p>
                        Lorem ipsum <span className='delete'>dolor</span> sit <span className='insert'>amet</span> consectetur <span className='small'>adipisicing</span> elit. <span className='strong'>Ut</span> ipsum a <span className='emphasis'>sit quos</span> reiciendis <span className='subscript'>molestias</span> quidem <span className='superscript'>eius nam</span> ad repellendus.
                    </p>
                </section>
            </main>
        </div>
    );
}
