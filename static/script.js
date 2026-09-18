document.addEventListener("DOMContentLoaded", function () {

    /* =============================================
       READING PROGRESS BAR
       ============================================= */

    const progressBar =
        document.querySelector(".reading-progress-bar");

    function updateProgressBar() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        let scrollPercentage = 0;

        if (documentHeight > 0) {
            scrollPercentage =
                (scrollTop / documentHeight) * 100;
        }

        progressBar.style.width =
            scrollPercentage + "%";
    }

    window.addEventListener(
        "scroll",
        updateProgressBar
    );

    updateProgressBar();



    /* =============================================
       BACK TO TOP BUTTON
       ============================================= */

    const backToTopButton =
        document.querySelector(".back-to-top");

    function updateBackToTopButton() {

        if (window.scrollY > 450) {

            backToTopButton.classList.add("show");

        } else {

            backToTopButton.classList.remove("show");

        }
    }


    window.addEventListener(
        "scroll",
        updateBackToTopButton
    );


    backToTopButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =============================================
       SCROLL REVEAL
       ============================================= */

    const revealElements =
        document.querySelectorAll(
            "main section, main article"
        );


    revealElements.forEach(
        function (element) {

            element.classList.add("reveal");

        }
    );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (entry.isIntersecting) {

                                entry.target
                                    .classList
                                    .add("visible");

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.10
                }

            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add("visible");

            }
        );

    }



    /* =============================================
       AUTOMATIC SECTION NAVIGATION
       ============================================= */

    const main =
        document.querySelector("main");

    const sections =
        main.querySelectorAll("section");


    if (sections.length >= 2) {

        const sectionNavigation =
            document.createElement("nav");

        sectionNavigation.className =
            "section-jump-nav";

        sectionNavigation.setAttribute(
            "aria-label",
            "Page sections"
        );


        sections.forEach(
            function (section, index) {

                const heading =
                    section.querySelector("h2");

                if (!heading) {
                    return;
                }


                let sectionId =
                    heading.textContent
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "");


                if (!sectionId) {

                    sectionId =
                        "section-" + (index + 1);

                }


                section.id =
                    sectionId;


                const link =
                    document.createElement("a");


                link.href =
                    "#" + sectionId;


                link.textContent =
                    heading.textContent;


                sectionNavigation.appendChild(
                    link
                );

            }
        );


        if (
            sectionNavigation
                .querySelectorAll("a")
                .length > 1
        ) {

            const pageTitle =
                main.querySelector(":scope > h1");


            if (pageTitle) {

                pageTitle.insertAdjacentElement(
                    "afterend",
                    sectionNavigation
                );

            } else {

                main.prepend(
                    sectionNavigation
                );

            }

        }

    }



    /* =============================================
       ACTIVE SECTION LINK WHILE SCROLLING
       ============================================= */

    const jumpLinks =
        document.querySelectorAll(
            ".section-jump-nav a"
        );


    if (
        jumpLinks.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                jumpLinks.forEach(
                                    function (link) {

                                        link.classList
                                            .remove(
                                                "current-section"
                                            );

                                    }
                                );


                                const activeLink =
                                    document.querySelector(
                                        '.section-jump-nav a[href="#' +
                                        entry.target.id +
                                        '"]'
                                    );


                                if (activeLink) {

                                    activeLink.classList
                                        .add(
                                            "current-section"
                                        );

                                }

                            }

                        }
                    );

                },

                {
                    rootMargin:
                        "-35% 0px -50% 0px"
                }

            );


        sections.forEach(
            function (section) {

                sectionObserver.observe(
                    section
                );

            }
        );

    }



    /* =============================================
       YEAR BADGES
       ============================================= */

    const articleHeadings =
        document.querySelectorAll(
            "article h3"
        );


    articleHeadings.forEach(
        function (heading) {

            /*
               Do not change headings that
               already contain a <time> element.
            */

            if (heading.querySelector("time")) {
                return;
            }


            const originalText =
                heading.textContent;


            const yearMatch =
                originalText.match(
                    /\b(18|19|20)\d{2}\b/
                );


            if (!yearMatch) {
                return;
            }


            const year =
                yearMatch[0];


            const yearIndex =
                originalText.indexOf(year);


            const beforeYear =
                originalText.slice(
                    0,
                    yearIndex
                );


            const afterYear =
                originalText.slice(
                    yearIndex + year.length
                );


            heading.textContent =
                "";


            heading.append(
                document.createTextNode(
                    beforeYear
                )
            );


            const badge =
                document.createElement("span");


            badge.className =
                "year-badge";


            badge.textContent =
                year;


            heading.appendChild(
                badge
            );


            heading.append(
                document.createTextNode(
                    afterYear
                )
            );

        }
    );



    /* =============================================
       CURRENT ERA HIGHLIGHT
       Automatically finds the latest year
       appearing in timeline articles.
       ============================================= */

    const articles =
        Array.from(
            document.querySelectorAll(
                "main article"
            )
        );


    const articleYears =
        [];


    articles.forEach(
        function (article) {

            const matches =
                article.textContent.match(
                    /\b(?:19|20)\d{2}\b/g
                );


            if (!matches) {
                return;
            }


            const years =
                matches.map(Number);


            const largestYear =
                Math.max(...years);


            articleYears.push({
                article: article,
                year: largestYear
            });

        }
    );


    if (articleYears.length > 0) {

        const latestYear =
            Math.max(
                ...articleYears.map(
                    function (item) {

                        return item.year;

                    }
                )
            );


        articleYears.forEach(
            function (item) {

                if (
                    item.year === latestYear
                ) {

                    item.article
                        .classList
                        .add("current-era");

                }

            }
        );

    }



    /* =============================================
       TECHNICAL TERM TOOLTIPS
       ============================================= */

    const tooltipDefinitions = {

        "ARPANET":
            "An early packet-switching network that became an important predecessor of today's Internet.",

        "TCP/IP":
            "The main communication protocols used to connect devices and networks across the Internet.",

        "DNS":
            "The Domain Name System translates readable domain names into IP addresses.",

        "HTML":
            "HyperText Markup Language structures the content of web pages.",

        "HTTP":
            "Hypertext Transfer Protocol is used to transfer web resources between browsers and servers.",

        "URL":
            "A Uniform Resource Locator is the address used to locate a resource on the Web.",

        "URLs":
            "Uniform Resource Locators are addresses used to locate resources on the Web.",

        "CSS":
            "Cascading Style Sheets control the visual presentation and layout of web pages.",

        "WebAssembly":
            "A web technology that allows high-performance compiled code to run inside web browsers."

    };


    const tooltipTerms =
        Object.keys(
            tooltipDefinitions
        );


    if (main && tooltipTerms.length > 0) {

        const escapedTerms =
            tooltipTerms
                .sort(
                    function (a, b) {

                        return b.length -
                               a.length;

                    }
                )
                .map(
                    function (term) {

                        return term.replace(
                            /[.*+?^${}()|[\]\\]/g,
                            "\\$&"
                        );

                    }
                );


        const tooltipRegex =
            new RegExp(
                "\\b(" +
                escapedTerms.join("|") +
                ")\\b",
                "g"
            );


        const walker =
            document.createTreeWalker(

                main,

                NodeFilter.SHOW_TEXT,

                {
                    acceptNode:
                        function (node) {

                            const parent =
                                node.parentElement;


                            if (!parent) {

                                return NodeFilter
                                    .FILTER_REJECT;

                            }


                            if (
                                parent.closest(
                                    "a, script, style, code, pre, time, .tooltip-term, .section-jump-nav"
                                )
                            ) {

                                return NodeFilter
                                    .FILTER_REJECT;

                            }


                            if (
                                !tooltipRegex.test(
                                    node.nodeValue
                                )
                            ) {

                                tooltipRegex.lastIndex =
                                    0;

                                return NodeFilter
                                    .FILTER_REJECT;

                            }


                            tooltipRegex.lastIndex =
                                0;


                            return NodeFilter
                                .FILTER_ACCEPT;

                        }
                }

            );


        const textNodes =
            [];


        while (walker.nextNode()) {

            textNodes.push(
                walker.currentNode
            );

        }


        textNodes.forEach(
            function (textNode) {

                const text =
                    textNode.nodeValue;


                const fragment =
                    document.createDocumentFragment();


                let lastIndex =
                    0;


                text.replace(

                    tooltipRegex,

                    function (
                        matchedTerm,
                        capturedTerm,
                        offset
                    ) {

                        fragment.append(
                            document.createTextNode(
                                text.slice(
                                    lastIndex,
                                    offset
                                )
                            )
                        );


                        const tooltip =
                            document.createElement(
                                "span"
                            );


                        tooltip.className =
                            "tooltip-term";


                        tooltip.textContent =
                            matchedTerm;


                        tooltip.dataset.tooltip =
                            tooltipDefinitions[
                                matchedTerm
                            ];


                        tooltip.tabIndex =
                            0;


                        fragment.appendChild(
                            tooltip
                        );


                        lastIndex =
                            offset +
                            matchedTerm.length;


                        return matchedTerm;

                    }

                );


                fragment.append(
                    document.createTextNode(
                        text.slice(
                            lastIndex
                        )
                    )
                );


                textNode.parentNode
                    .replaceChild(
                        fragment,
                        textNode
                    );

            }
        );

    }



    /* =============================================
       LIGHT / DARK MODE
       ============================================= */

    const themeToggle =
        document.querySelector(
            ".theme-toggle"
        );


    const themeIcon =
        document.querySelector(
            ".theme-icon"
        );


    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (savedTheme === "light") {

        document.body
            .classList
            .add("light-theme");

        themeIcon.textContent =
            "☾";

    }


    themeToggle.addEventListener(
        "click",
        function () {

            document.body
                .classList
                .toggle(
                    "light-theme"
                );


            const lightMode =
                document.body
                    .classList
                    .contains(
                        "light-theme"
                    );


            if (lightMode) {

                themeIcon.textContent =
                    "☾";

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

            } else {

                themeIcon.textContent =
                    "☀";

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

            }

        }
    );

});