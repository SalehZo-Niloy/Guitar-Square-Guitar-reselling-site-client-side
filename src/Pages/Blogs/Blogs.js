import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import useTitle from '../../hooks/useTitle';


const Blogs = () => {
    useTitle('Blogs');
    return (
        <div className='w-10/12 mx-auto my-12 min-h-[90vh]'>
            <h1 className='text-2xl font-semibold text-primary text-center mb-6'>Blogs</h1>
            <div className='rounded-xl overflow-hidden shadow-2xl'>
                <Accordion>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What are the different ways to manage a state in a React application?                        </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>There are four main ways to properly manage state in React apps:</p>
                            <br />
                            <ol className='list-decimal ml-4'>
                                <li>Local state</li>
                                <li>Global state</li>
                                <li>Server state</li>
                                <li>URL state</li>
                            </ol>
                            <br />
                            <p>
                                <strong>Local (UI) state</strong>: Local state is data we manage in one or another component. Local state is most often managed in React using the useState hook.
                                <br />
                                <strong>Global (UI) state</strong>: Global state is data we manage across multiple components. A common example of global state is authenticated user state.
                                <br />
                                <strong>Server state</strong>: Data that comes from an external server that must be integrated with our UI state. There are tools such as SWR and TanStack Query that make managing server state much easier.
                                <br />
                                <strong>URL state</strong>: Data that exists on our URLs, including the pathname and query parameters.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                How does prototypical inheritance work?                        </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use <strong>Object.getPrototypeOf</strong> and <strong>Object.setPrototypeOf</strong>. Nowadays, in modern language, it is being set using <strong>_ _proto_ _</strong>.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What is a unit test? Why should we write unit tests?                       </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system.
                                <br /> <br />
                                The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because import useTitle from <strong>'./../hooks/useTitle';</strong> if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages. For Test-Driven Development (TDD), we write unit tests before writing any implementation. This makes your implementation details in your code shorter and easier to understand.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                React vs. Angular vs. Vue?                    </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                <strong>React</strong> <br />

                                Facebook released React.js in March 2013 as a JavaScript library. Because React just provides one view, it is not appropriate for building an MVC architecture, you must solve the model and controller yourself. Besides this, there are only advantages and lots of advantages. One of the biggest of them is that React.js uses a virtual DOM that only compares the previous HTML code differences and only loads the different parts. This significantly impacts the loading times. In a positive way, of course. <br /> <br />

                                <strong>Angular</strong> <br />

                                AngularJS was developed in 2009 by Google. The first version was Angular.JS. Angular is currently known as a JavaScript framework. Obviously, all significant Google projects have been developed with Angular. Angular.js is an MVC framework. A major disadvantage of Angular is that it uses a regular DOM, and thus, the entire tree structure of the HTML tags is updated, which massively impacts the loading time. <br /> <br />

                                <strong>Vue</strong> <br />

                                Vue.js is a JavaScript-based progressive framework for creating single-page applications. It was created with scalability and incrementality in mind, as well as ease of integration with other view layer frameworks. Vue is built from the bottom up to be progressively adaptable, unlike other monolithic frameworks. The core library focuses solely on the view layer, and it’s simple to use and connect with other libraries or applications. This framework’s fast learning angle is almost a trademark.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default Blogs;