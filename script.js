// Function to copy code to clipboard
function copyCode(button) {
    const codeBlock = button.closest('.code-section').querySelector('code');
    const code = codeBlock.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        button.textContent = 'Failed to copy';
        setTimeout(() => {
            button.textContent = 'Copy Code';
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const projectsContainer = document.getElementById('projects-container');
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentYear = document.querySelector('.current-year');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    // Initialize mobile menu
    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Set active navigation link based on current page
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const isActive = (currentPage === '' && linkHref === 'index.html') || 
                           (linkHref === currentPage);
            
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : null);
        });
    }

    // Handle internal navigation with smooth scroll
    function handleNavigation(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's an external link or anchor link
        if (href.startsWith('http') || href.startsWith('#')) {
            return;
        }
        
        // Handle internal page navigation
        e.preventDefault();
        window.location.href = href;
    }

    // Set up navigation event listeners
    navLinks.forEach(link => {
        // Remove any existing click handlers to prevent duplicates
        link.removeEventListener('click', handleNavigation);
        link.addEventListener('click', handleNavigation);
    });

    // Initialize page
    setActiveNav();
    
    // Close mobile menu on window resize if it becomes desktop view
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });

    // Sample project data with more details
    const projects = [
        {
            title: 'E-commerce Platform',
            description: 'A full-featured e-commerce platform with product catalog, shopping cart, and secure checkout process.',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            demoUrl: '#',
            codeUrl: '#',
            image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates and team collaboration features.',
            tags: ['Vue.js', 'Firebase', 'Vuex', 'Vuetify'],
            demoUrl: '#',
            codeUrl: '#',
            image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
            title: 'Weather Dashboard',
            description: 'A weather application that displays current weather and forecast using a weather API with location detection.',
            tags: ['JavaScript', 'API', 'CSS3', 'HTML5'],
            demoUrl: '#',
            codeUrl: '#',
            image: 'https://images.unsplash.com/photo-1601134467661-3d775b99c7b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80'
        },
        {
            title: 'Portfolio Website',
            description: 'A responsive portfolio website built with modern web technologies to showcase projects and skills.',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            demoUrl: '#',
            codeUrl: '#',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
        },
        {
            title: 'Recipe Finder App',
            description: 'Discover and save your favorite recipes with a clean and intuitive user interface.',
            tags: ['React', 'Redux', 'Spoonacular API', 'Material-UI'],
            demoUrl: '#',
            codeUrl: '#',
            image: 'https://images.unsplash.com/photo-1473093295043-cd81233590ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
            title: 'Fitness Tracker',
            description: 'Track your workouts and fitness progress with detailed analytics and progress charts.',
            tags: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
            demoUrl: '#',
            codeUrl: '#',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        }
    ];

    // Rocket League Bot Training Projects
    const trainingPacks = [
        {
            title: "Aerial Training Pack",
            description: "Master aerial control and ball prediction with this comprehensive aerial training pack. Perfect for both beginners and advanced bot training.",
            image: "https://images.unsplash.com/photo-1598137203980-945997109a2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            tags: ["Aerials", "Beginner", "Advanced"],
            code: "https://github.com/RLBot/RLBot/wiki/Useful-Training-Packs"
        },
        {
            title: "Dribble Challenge 2.5",
            description: "Improve your bot's ball control and dribbling skills with this popular training pack featuring progressively challenging levels.",
            image: "https://i.ytimg.com/vi/9sV9kfX1ZQY/maxresdefault.jpg",
            tags: ["Dribbling", "Ball Control", "Intermediate"],
            code: "https://steamcommunity.com/sharedfiles/filedetails/?id=2537502956"
        },
        {
            title: "Wall Play Mastery",
            description: "Train your bot to master wall hits, reads, and passes with this specialized training pack.",
            image: "https://i.ytimg.com/vi/3KZ9QjEGEKQ/maxresdefault.jpg",
            tags: ["Wall Shots", "Defense", "Advanced"],
            code: "https://www.reddit.com/r/RocketLeague/comments/8j0y4a/complete_list_of_all_training_packs/"
        }
    ];

    // Bot Development Tools
    const botTools = [
        {
            title: "RLBot Framework",
            description: "The official framework for creating Rocket League bots. Includes everything you need to get started with bot development.",
            image: "https://avatars.githubusercontent.com/u/36465262?s=48&v=4",
            tags: ["Framework", "Python", "C++"],
            demo: "https://youtu.be/eWzAsWZqnf8",
            code: "https://github.com/RLBot/RLBot"
        },
        {
            title: "RLGym",
            description: "A reinforcement learning library for creating and training AI agents to play Rocket League.",
            image: "https://rlgym.org/img/logo.png",
            tags: ["Machine Learning", "Python", "Reinforcement Learning"],
            code: "https://github.com/lucas-emery/rocket-league-gym"
        },
        {
            title: "BakkesMod",
            description: "A powerful mod for Rocket League that includes training tools, replay analysis, and bot integration features.",
            image: "https://bakkesmod.com/static/img/logo.png",
            tags: ["Mod", "Training", "Plugins"],
            demo: "https://youtu.be/8Z2Hj2eIaLk",
            code: "https://bakkesmod.com/"
        }
    ];

    // Tutorials & Guides
    const tutorials = [
        {
            title: "Getting Started with RLBot",
            description: "A beginner's guide to setting up the RLBot framework and creating your first bot.",
            image: "https://i.ytimg.com/vi/eWzAsWZqnf8/maxresdefault.jpg",
            tags: ["Tutorial", "Beginner", "Setup"],
            url: "https://youtu.be/eWzAsWZqnf8"
        },
        {
            title: "Advanced Bot Strategies",
            description: "Learn advanced techniques for creating competitive Rocket League bots, including rotation and positioning.",
            image: "https://i.ytimg.com/vi/3KZ9QjEGEKQ/maxresdefault.jpg",
            tags: ["Advanced", "Strategy", "AI"],
            url: "https://youtu.be/3KZ9QjEGEKQ"
        },
        {
            title: "Machine Learning in Rocket League",
            description: "Introduction to training AI agents using reinforcement learning for Rocket League.",
            image: "https://miro.medium.com/max/1400/1*1t0Fv2yS4YqBz3pY2j0ZJQ.png",
            tags: ["Machine Learning", "AI", "Python"],
            url: "https://towardsdatascience.com/reinforcement-learning-in-rocket-league-7bcaa4c3c03"
        }
    ];

    // Function to create project cards
    function createProjectCard(item, type = 'project') {
        const isTutorial = type === 'tutorial';
        const isTool = type === 'tool';
        
        return `
            <div class="project-card">
                <div class="project-img" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
                    ${isTutorial ? '<div class="tutorial-overlay"><i class="fas fa-play-circle"></i></div>' : ''}
                </div>
                <div class="project-content">
                    <h3 class="project-title">${item.title}</h3>
                    <p class="project-description">${item.description}</p>
                    <div class="project-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${item.demo ? `<a href="${item.demo}" class="btn btn-outline" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                        ${item.code ? `<a href="${item.code}" class="btn btn-${isTutorial ? 'primary' : 'outline'}" target="_blank">
                            ${isTutorial ? '<i class="fas fa-play"></i> Watch' : isTool ? 'View Tool' : 'View Code'}
                        </a>` : ''}
                        ${item.url ? `<a href="${item.url}" class="btn btn-primary" target="_blank"><i class="fas fa-play"></i> Watch Tutorial</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Render projects
    function renderProjects() {
        projectsContainer.innerHTML = ''; // Clear existing content
        projects.forEach(project => {
            projectsContainer.innerHTML += createProjectCard(project, 'project');
        });
    }

    // Render training packs
    function renderTrainingPacks() {
        const trainingPacksContainer = document.getElementById('training-packs-container');
        if (trainingPacksContainer) {
            trainingPacksContainer.innerHTML = ''; // Clear existing content
            trainingPacks.forEach(project => {
                trainingPacksContainer.innerHTML += createProjectCard(project, 'project');
            });
        }
    }

    // Render bot tools
    function renderBotTools() {
        const botToolsContainer = document.getElementById('bot-tools-container');
        if (botToolsContainer) {
            botToolsContainer.innerHTML = ''; // Clear existing content
            botTools.forEach(tool => {
                botToolsContainer.innerHTML += createProjectCard(tool, 'tool');
            });
        }
    }

    // Render tutorials
    function renderTutorials() {
        const tutorialsContainer = document.getElementById('tutorials-container');
        if (tutorialsContainer) {
            tutorialsContainer.innerHTML = ''; // Clear existing content
            tutorials.forEach(tutorial => {
                tutorialsContainer.innerHTML += createProjectCard(tutorial, 'tutorial');
            });
        }
    }

    // Initialize the page
    function init() {
        renderProjects();
        renderTrainingPacks();
        renderBotTools();
        renderTutorials();
        
        // Add scroll event for header shadow
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.main-header');
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
        
        // Set initial active nav link based on scroll position
        window.addEventListener('scroll', setActiveNavLink);
        setActiveNavLink();
    }
    
    // Set active navigation link based on scroll position
    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initialize the application
    init();
});
