// script.js - Premium Interactive Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- Interactive Mouse Glow Follower ---
    const mouseGlow = document.getElementById('mouse-glow');
    
    if (mouseGlow) {
        window.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for hardware-accelerated fluid movements
            window.requestAnimationFrame(() => {
                mouseGlow.style.left = `${e.clientX}px`;
                mouseGlow.style.top = `${e.clientY}px`;
            });
        });
    }

    // --- Dynamic Typewriter Effect for Subtitle ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const roles = [
            "Senior Software Consultant",
            "AI-Driven Software Architect",
            "Azure Solutions Specialist",
            "Technical Team Lead"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // faster deletion
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // standard typing speed
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at the end of the typed word
                isDeleting = true;
                typingSpeed = 2000; // Hold for 2 seconds
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // small pause before starting next word
            }

            setTimeout(type, typingSpeed);
        }

        // Start typewriter
        type();
    }

    // --- Recruiter vs Software Architect Profile Switcher ---
    const btnRecruiter = document.getElementById('btn-recruiter');
    const btnArchitect = document.getElementById('btn-architect');
    const contentRecruiter = document.getElementById('content-recruiter');
    const contentArchitect = document.getElementById('content-architect');
    const selectorBg = document.getElementById('selector-bg');

    if (btnRecruiter && btnArchitect && contentRecruiter && contentArchitect) {
        btnRecruiter.addEventListener('click', () => {
            btnRecruiter.classList.add('active');
            btnArchitect.classList.remove('active');
            contentRecruiter.classList.add('active');
            contentArchitect.classList.remove('active');
            if (selectorBg) selectorBg.style.transform = 'translateX(0%)';
        });

        btnArchitect.addEventListener('click', () => {
            btnArchitect.classList.add('active');
            btnRecruiter.classList.remove('active');
            contentArchitect.classList.add('active');
            contentRecruiter.classList.remove('active');
            if (selectorBg) selectorBg.style.transform = 'translateX(100%)';
        });
    }

    // --- Clean Architecture Interactive SVG Logic ---
    const archLayers = document.querySelectorAll('.arch-layer');
    const archLayerTag = document.getElementById('arch-layer-tag');
    const archLayerTitle = document.getElementById('arch-layer-title');
    const archLayerDesc = document.getElementById('arch-layer-desc');
    const archLayerTechs = document.getElementById('arch-layer-techs');

    const layerData = {
        presentation: {
            tag: "Capa Externa / Frontend & API",
            title: "Presentation / Web API",
            desc: "Capa de entrada al sistema. Contiene los Controladores REST, filtros de API, middleware personalizado, autenticación (Azure AD, JWT) y documentación OpenAPI. No contiene lógica de negocio; solo valida el formato HTTP y delega la ejecución de comandos y consultas directamente al mediador de la capa de aplicación.",
            techs: ["ASP.NET Core API", "Angular v19", "WPF App", "Controllers", "MediatR Trigger"],
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
        },
        infrastructure: {
            tag: "Capa Externa / Data & Services",
            title: "Infrastructure Layer",
            desc: "Contiene la implementación de los servicios de persistencia y comunicaciones externas. Implementa la conexión a bases de datos (SQL Server mediante EF Core, Cosmos DB), integraciones de pagos (Stripe, PayPal), telemetría, logging distribuidos y conexiones de red en Azure (KeyVault, Containers).",
            techs: ["Entity Framework Core", "SQL Server / T-SQL", "Azure Containers", "Azure KeyVault", "Stripe API", "Serilog"],
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`
        },
        application: {
            tag: "Capa Interna / Use Cases & CQRS",
            title: "Application (CQRS)",
            desc: "Capa que define los casos de uso del sistema. Implementa el patrón CQRS dividiendo los flujos de lectura (Queries) y escritura (Commands). Utiliza MediatR para un acoplamiento débil entre la API y la lógica. Contiene los Handlers, validaciones (FluentValidation) y mapeos de datos (AutoMapper).",
            techs: ["MediatR", "FluentValidation", "CQRS Pattern", "Use Cases", "Commands & Queries", "DTOs"],
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
        },
        domain: {
            tag: "Cúspide de la Arquitectura / Core Logic",
            title: "Domain Core",
            desc: "El núcleo puro de la aplicación, completamente independiente de frameworks, bases de datos o APIs. Define las reglas de negocio críticas, incluyendo Entidades de Dominio, Objetos de Valor (Value Objects), Eventos de Dominio, Excepciones de negocio y las interfaces de repositorio primarias.",
            techs: ["Entities", "Value Objects", "Domain Events", "Business Rules", "Repository Interfaces"],
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
        }
    };

    if (archLayers.length > 0 && archLayerTag && archLayerTitle && archLayerDesc && archLayerTechs) {
        archLayers.forEach(layer => {
            layer.addEventListener('click', () => {
                // Clear active states on SVG layers
                archLayers.forEach(l => l.classList.remove('active'));
                
                // Set active on clicked layer
                layer.classList.add('active');
                
                // Get layer data
                const layerName = layer.getAttribute('data-layer');
                const data = layerData[layerName];
                
                if (data) {
                    // Update content with fluid micro-animation
                    const descCard = document.querySelector('.architecture-desc-card');
                    descCard.style.opacity = '0';
                    descCard.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        archLayerTag.textContent = `Capa: ${data.tag}`;
                        archLayerTitle.innerHTML = `${data.icon} ${data.title}`;
                        archLayerDesc.textContent = data.desc;
                        
                        // Clear and populate tech chips
                        archLayerTechs.innerHTML = '';
                        data.techs.forEach(tech => {
                            const span = document.createElement('span');
                            span.className = 'tag chip-blue';
                            span.textContent = tech;
                            archLayerTechs.appendChild(span);
                        });
                        
                        descCard.style.opacity = '1';
                        descCard.style.transform = 'translateY(0)';
                    }, 200);
                }
            });
        });
    }

    // --- Technology Smart Filter Board ---
    const searchInput = document.getElementById('skills-search');
    const skillListItems = document.querySelectorAll('.skill-list data-item');
    const timelineItems = document.querySelectorAll('.timeline-item');

    function filterTimelineByTech(techQuery) {
        const query = techQuery.toLowerCase().trim();
        
        // Remove highligts from all skills list items first
        skillListItems.forEach(item => {
            item.classList.remove('highlight-skill');
            const dataTag = item.getAttribute('data-tag');
            // Re-highlight if matches tag exactly
            if (query && dataTag === query) {
                item.classList.add('highlight-skill');
            }
        });

        if (!query) {
            // Reset timeline to default state
            timelineItems.forEach(item => {
                item.classList.remove('highlighted');
            });
            return;
        }

        // Filter and highlight timeline items matching tech query
        timelineItems.forEach(item => {
            const itemTechs = item.getAttribute('data-tech') || '';
            if (itemTechs.includes(query)) {
                item.classList.add('highlighted');
            } else {
                item.classList.remove('highlighted');
            }
        });
    }

    // Input Typing Filter
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterTimelineByTech(e.target.value);
        });
    }

    // Clicking directly on skill list item
    skillListItems.forEach(item => {
        item.addEventListener('click', () => {
            const dataTag = item.getAttribute('data-tag');
            if (dataTag) {
                if (searchInput) {
                    // Update search box to make filter visual
                    searchInput.value = item.textContent.split(' ')[0].trim();
                }
                filterTimelineByTech(dataTag);
                
                // Auto scroll to experience timeline smoothly to see highlight
                const expSection = document.getElementById('experience');
                if (expSection) {
                    const headerOffset = 80;
                    const elementPosition = expSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Click to Copy Contact Elements ---
    window.copyContact = function(text, cardElement) {
        if (!navigator.clipboard) {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed"; 
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showTooltip(cardElement);
            } catch (err) {
                console.error('Fallback copy failure', err);
            }
            document.body.removeChild(textArea);
            return;
        }
        
        navigator.clipboard.writeText(text).then(() => {
            showTooltip(cardElement);
        }, (err) => {
            console.error('Async copy failure: ', err);
        });
    };

    function showTooltip(cardElement) {
        const tooltip = cardElement.querySelector('.copy-tooltip');
        if (tooltip) {
            tooltip.classList.add('show');
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }
    }

    // --- Mobile Menu Toggle Drawer ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close drawer when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.textContent = '☰';
            });
        });
    }

    // --- Sticky Header on Scroll ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Scroll Spying Active Nav Highlighting ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // --- Dynamic Scroll Reveal Observer ---
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // stop observing after reveal to optimize memory
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

});
