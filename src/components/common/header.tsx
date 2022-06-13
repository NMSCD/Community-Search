import type { Component } from 'solid-js';

export const Header: Component = () => {
    return (
        <>
            <header id="header">
                <div class="inner">
                    <a href="/" class="logo" title="logo">
                        <span class="symbol">
                            <img src="/assets/img/rocket.png" alt="" />
                        </span>
                        <span class="title">NMS Community Search</span>
                    </a>
                    <nav>
                        <ul>
                            <li><a href="#menu">Menu</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <nav id="menu">
                <h2>Menu</h2>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="generic.html">Ipsum veroeros</a></li>
                    <li><a href="generic.html">Tempus etiam</a></li>
                    <li><a href="generic.html">Consequat dolor</a></li>
                    <li><a href="elements.html">Elements</a></li>
                </ul>
            </nav>
        </>
    );
}
