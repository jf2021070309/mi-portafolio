// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Counter animation for statistics
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.classList.contains('stat-number') && target === 100 ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.classList.contains('stat-number') && target === 100 ? '' : '+');
        }
    }, 20);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-container');
let statsAnimated = false;

const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsAnimated = true;
        }
    });
}, observerOptions);

if (statsSection) {
    statsObserver.observe(statsSection);
}


// Typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after page load
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add reveal animation class to elements
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Cursor trail effect (optional, for premium feel)
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add cursor trail styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: absolute;
        width: 5px;
        height: 5px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: cursorFade 1s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes cursorFade {
        to {
            opacity: 0;
            transform: scale(3);
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';

console.log('Portfolio loaded successfully! 🚀');

// ========== PROJECT MODAL FUNCTIONALITY ==========

// Project data
const projectsData = {
    softvet: {
        title: "Sistema Administrativo SoftVet",
        subtitle: "Sistema de escritorio en C# (.NET Framework) con SQL Server",
        award: "🏆 1er Puesto en el XXIII Concurso de Proyectos EPIS 2023-II",
        description: "SoftVet es un sistema administrativo integral para clínicas veterinarias, desarrollado como una aplicación de escritorio utilizando C# con .NET Framework en Visual Studio, y respaldado por una base de datos SQL Server.",
        details: "El proyecto implementa módulos completos de gestión que cubren los procesos esenciales de una veterinaria, integrando desde el registro de pacientes hasta reportes administrativos avanzados. El repositorio evidencia una arquitectura organizada por capas (Clases, Modelos, DataSet, Reportes, Resources), además de múltiples formularios Windows Forms que componen la interfaz del sistema. También se observa la integración de reportes, control de agenda, administración de citas, y manejo de historial clínico, indicando un desarrollo sólido y funcional.",
        features: [
            "Gestión de Usuarios y Seguridad - Registro de usuarios y empleados, módulo de inicio de sesión (FormLogin) con perfiles administrativos",
            "Administración de Clientes, Pacientes y Personal - Registro y actualización de clientes, registro de mascotas/pacientes con historial médico asociado, gestión de personal veterinario y administrativo",
            "Agenda y Citas - Programación, edición y control de citas, visualización de citas programadas, gestión de horarios del personal",
            "Módulos Clínicos - Registro de vacunación, registro de desparasitación, historial clínico detallado del paciente, emisión de recetas (FrmRecetario)",
            "Abastecimiento y Control Interno - Módulo de abastecimiento para insumos y productos, administración desde panel central (FormAdmin y MDIPrincipal)",
            "Reportes Profesionales - Generados con DataSet y SqlServerTypes, incluye: reporte de historial clínico, reportes de pacientes por cliente/DNI, estadísticas de pacientes, reporte de citas y horarios del personal, reporte de vacunas y procedimientos"
        ],
        technologies: ["C#", ".NET Framework", "Windows Forms", "SQL Server", "Visual Studio", "DataSets", "Reportes Gráficos"],
        images: ["img/softvet1.png", "img/softvet2.png", "img/softvet3.png", "img/softvet4.png"]
    },
    america: {
        title: "Gestión de Pedidos con IA – SoftPrint",
        subtitle: "Plataforma web con generación de imágenes por IA para Imprenta América",
        award: "🏆 2do Puesto – XXV Concurso EPIS 2024-II",
        description: "SoftPrint es una plataforma web completa para la gestión de pedidos en línea, desarrollada en PHP con MySQL, diseñada para optimizar el flujo de trabajo de una imprenta profesional. El sistema permite a los clientes realizar, personalizar y hacer seguimiento a sus pedidos, integrando herramientas avanzadas como IA generativa para crear bocetos y prediseños que agilizan el proceso creativo.",
        details: "El proyecto incluye tanto el panel de clientes como un panel administrativo, desde donde el personal puede gestionar pedidos, asignarlos a diseñadores, controlar inventarios, revisar pagos y mantener comunicación directa con los usuarios. Su arquitectura está compuesta por múltiples módulos PHP (login.php, pedidos.php, generarimagen.php, historial_pedidos.php, productos.php, reportes.php, etc.), reflejando una solución robusta, modular y orientada a procesos.",
        features: [
            "Módulo de Gestión de Usuarios - Registro de nuevos usuarios y validación con reCAPTCHA, autenticación de acceso y control de sesiones, edición de perfil y roles del sistema",
            "Módulo de Gestión de Pedidos - Creación y gestión completa de pedidos por parte de clientes, asignación de pedidos a diseñadores desde el panel administrativo, revisión de pedidos asignados y actualización de su estado, seguimiento de pedidos por parte del cliente, historial detallado de todos los pedidos realizados, procesamiento de pagos multicanal (incluyendo Culqi), generación de reportes de ventas y actividad",
            "Módulo de Productos - Navegación por catálogo completo, filtros, categorías y búsqueda, cálculo automático de precios según características del producto",
            "Módulo de Bocetos y Generación con IA - Creación de bocetos iniciales para pedidos personalizados, generación de imágenes mediante IA, permitiendo al cliente obtener propuestas visuales instantáneas (generarimagen.php)",
            "Módulo de Control de Inventario - Registro de ingresos y salidas de insumos, gestión de proveedores, visualización del stock actual",
            "Módulo de Alertas y Notificaciones - Alertas de bajo stock, notificaciones de recordatorio para citas programadas",
            "Módulo de Citas Automatizadas - Registro, administración y seguimiento de citas",
            "Módulo de Contacto y Comunicación - Envío de consultas desde la web (procesar_contacto.php), mapa de ubicación integrado (mapa.php)"
        ],
        technologies: ["PHP", "MySQL", "Visual Studio Code", "IA Generativa", "Culqi", "Google reCAPTCHA", "HTML5", "CSS", "JavaScript"],
        images: ["img/america1.png", "img/america2.png", "img/america3.png", "img/america4.png", "img/america5.png"]
    },
    bomberos: {
        title: "Sistema Web con RPA para Gestión de Admisiones – CGBVP",
        subtitle: "Plataforma web con automatización robótica de procesos (RPA) para el Cuerpo General de Bomberos Voluntarios del Perú",
        award: "🏆 2do Puesto – XXVII Concurso EPIS 2025-II",
        description: "Este proyecto consiste en el desarrollo de un sistema web integral, diseñado para optimizar la gestión de admisiones del Cuerpo General de Bomberos Voluntarios del Perú (CGBVP) mediante la integración de automatización robótica de procesos (RPA).",
        details: "El sistema moderniza y centraliza el proceso de inscripción de postulantes a nivel nacional, permitiendo que todas las etapas —registro, validación documental, evaluaciones, reportes, resoluciones y seguimiento— se gestionen de manera digital, eficiente y trazable. La plataforma combina PHP + MySQL para el backend, Vue.js para interacciones dinámicas en los formularios y paneles, y RPA con Power Automate para automatizar tareas repetitivas como validación de documentos, generación de resoluciones y procesamiento de informes. El repositorio muestra múltiples vistas y módulos (más de 70 archivos PHP/JS), incluyendo dashboards por rol, automatización de exámenes, carga de expedientes, administración de procesos, generación de certificados dinámicos y seguimiento por etapas.",
        features: [
            "Digitalización y Automatización de Admisiones - Registro en línea de nuevos postulantes con validación automática, automatización RPA para validar documentos, generar resoluciones, consolidar informes y mover expedientes entre etapas, centralización de datos a nivel nacional",
            "Módulos y Dashboards por Rol - Postulante: inscripción, carga de documentos, revisión de resultados, seguimiento de etapas. Encargado: evaluación de expedientes, asignación a pruebas, registro de resultados. Administrador: creación de procesos, gestión de usuarios, control total del sistema. Central Nacional: panel de control, revisión masiva de documentos y emisión de resoluciones",
            "Módulo de Evaluaciones - Examen de conocimientos, físico, médico, psicológico y de entallamiento. Ingreso de notas y resultados automatizados. Rutas específicas para manejo de archivos y evidencias",
            "Módulo de Gestión de Procesos - Definición de procesos de admisión y etapas, junta calificadora y responsables asignados, listado de procesos abiertos, activos y finalizados",
            "Módulo de Certificados y Resoluciones - Generación automática de certificados dinámicos (RPA), generación de resoluciones finales mediante bots de Power Automate",
            "Carga y Validación de Documentos - Subida de archivos con validación RPA (Frm_CargaDocumentos), evaluación del expediente y calificación automática",
            "Módulo de Notificaciones y Seguimiento - Seguimiento en tiempo real del estado del postulante, alertas y recordatorios automatizados"
        ],
        objectives: {
            general: "Desarrollar e implementar un sistema web integrado con RPA para modernizar, automatizar y asegurar la gestión de admisiones en el CGBVP, mejorando la eficiencia operativa y la transparencia institucional.",
            specific: [
                "Digitalizar y centralizar el manejo de expedientes de postulantes",
                "Automatizar las etapas clave del proceso de admisión con RPA (inscripción, validación, evaluaciones, resoluciones y reportes)",
                "Facilitar el seguimiento y la comunicación entre postulantes y responsables",
                "Garantizar seguridad, integridad y confidencialidad de datos personales"
            ]
        },
        technologies: ["PHP", "MySQL", "Vue.js", "Power Automate (RPA)", "Visual Studio Code", "HTML5", "CSS", "JavaScript"],
        images: ["img/bomberos1.png", "img/bomberos2.png", "img/bomberos3.jpg", "img/bomberos4.png", "img/bomberos5.jpg"]
    }
};

let currentSlide = 0;
let currentProject = null;

// Open project modal
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    currentProject = project;
    currentSlide = 0;

    const modal = document.getElementById('projectModal');
    const carouselImages = document.getElementById('carouselImages');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const modalProjectInfo = document.getElementById('modalProjectInfo');

    // Clear previous content
    carouselImages.innerHTML = '';
    carouselIndicators.innerHTML = '';
    modalProjectInfo.innerHTML = '';

    // Load carousel images
    project.images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${img}" alt="${project.title} - Imagen ${index + 1}">`;
        carouselImages.appendChild(slide);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToSlide(index);
        carouselIndicators.appendChild(indicator);
    });

    // Load project info
    let objectivesHTML = '';
    if (project.objectives) {
        objectivesHTML = `
            <h3>Objetivo General</h3>
            <p>${project.objectives.general}</p>
            
            <h3>Objetivos Específicos</h3>
            <ul>
                ${project.objectives.specific.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
        `;
    }

    modalProjectInfo.innerHTML = `
        <h2>${project.title}</h2>
        <p class="project-subtitle">${project.subtitle}</p>
        <div class="project-award">
            <i class="fas fa-trophy"></i>${project.award}
        </div>
        
        <h3>Descripción del Proyecto</h3>
        <p>${project.description}</p>
        <p>${project.details}</p>
        
        <h3>Funciones principales realizadas en el proyecto</h3>
        <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        ${objectivesHTML}
        
        <h3>Tecnologías y Herramientas Utilizadas</h3>
        <div class="tech-stack">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
    `;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentSlide = 0;
}

// Change slide
function changeSlide(direction) {
    if (!currentProject) return;

    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Go to specific slide
function goToSlide(index) {
    if (!currentProject) return;

    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (!currentProject) return;

    if (e.key === 'Escape') {
        closeProjectModal();
    } else if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});
