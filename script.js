document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    loadExperience();
    loadProjects();

    // Add any other initializations here if needed (e.g., simple hover effects)
});

// --- Data Loading Functions ---

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Could not fetch data from ${url}:`, error);
        return null; // Return null or appropriate error indicator
    }
}

// --- Content Rendering Functions ---

async function loadSkills() {
    const skillsData = await fetchData('skills.json');
    const container = document.querySelector('.skills-container');
    if (!skillsData || !container) {
        container.innerHTML = '<p>Error loading skills.</p>';
        return;
    }

    container.innerHTML = ''; // Clear loading message

    // Map category keys to display names and icons (customize as needed)
    const categoryDetails = {
        languages: { name: 'Languages', icon: 'fas fa-code' },
        frameworks_libraries: { name: 'Frameworks & Libraries', icon: 'fas fa-cogs' },
        iot_embedded: { name: 'IoT & Embedded', icon: 'fas fa-microchip' },
        tools_vcs: { name: 'Tools & Version Control', icon: 'fas fa-tools' },
        cloud: { name: 'Cloud Computing', icon: 'fas fa-cloud' },
        certifications: { name: 'Certifications', icon: 'fas fa-certificate' }
        // Removed 'learning' and 'other' categories
    };

    for (const categoryKey in skillsData) {
        if (skillsData.hasOwnProperty(categoryKey) && skillsData[categoryKey].length > 0) {
            const details = categoryDetails[categoryKey] || { name: categoryKey.replace(/_/g, ' '), icon: 'fas fa-question-circle' }; // Default if key not mapped

            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('skill-category');

            const categoryTitle = document.createElement('h3');
            categoryTitle.innerHTML = `<i class="${details.icon}"></i> ${details.name}`;
            categoryDiv.appendChild(categoryTitle);

            const skillList = document.createElement('ul');
            skillList.classList.add('skill-list');
            skillsData[categoryKey].forEach(skill => {
                const listItem = document.createElement('li');
                listItem.textContent = skill;
                skillList.appendChild(listItem);
            });
            categoryDiv.appendChild(skillList);
            container.appendChild(categoryDiv);
        }
    }
}


async function loadExperience() {
    const experienceData = await fetchData('experience.json');
    const container = document.querySelector('.experience-container');
    if (!experienceData || !container) {
         container.innerHTML = '<p>Error loading experience.</p>';
        return;
    }

    container.innerHTML = ''; // Clear loading message

    experienceData.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.classList.add('experience-item');

        expDiv.innerHTML = `
            <h4>${exp.title}</h4>
            <p class="experience-org-duration">
                <strong>${exp.organization}</strong> | <span>${exp.duration}</span>
            </p>
            <ul>
                ${exp.responsibilities.map(res => `<li>${res}</li>`).join('')}
            </ul>
        `;
        container.appendChild(expDiv);
    });
}


async function loadProjects() {
    const projectsData = await fetchData('projects.json');
    const container = document.querySelector('.projects-container');
     if (!projectsData || !container) {
         container.innerHTML = '<p>Error loading projects.</p>';
        return;
    }

    container.innerHTML = ''; // Clear loading message

    projectsData.forEach(proj => {
        const projDiv = document.createElement('div');
        projDiv.classList.add('project-card'); // Use this class for styling

        // Basic structure - enhance with styling later
        projDiv.innerHTML = `
            <h4>${proj.title}</h4>
            <p>${proj.description}</p>
            <div class="project-tech">
                ${proj.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join(' ')}
            </div>
            <div class="project-links">
                ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" aria-label="View source code for ${proj.title}"><i class="fab fa-github"></i> GitHub</a>` : ''}
                ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" aria-label="View live demo for ${proj.title}"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
        `;
        container.appendChild(projDiv);
    });
}

// --- Old Code Removed ---
// (Parallax and tilt effect code from the original script.js is removed)
