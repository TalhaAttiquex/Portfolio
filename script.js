document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('is-open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navigation.classList.remove('is-open');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

const navigationLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const setActiveSection = (sectionId) => {
    navigationLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
};

setActiveSection('about');

if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => {
        item.classList.add('reveal');
        revealObserver.observe(item);
    });
}

document.querySelectorAll('[data-current-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
});

const typingText = document.querySelector('#typing-text');
const typingPhrases = [
    'Digital Marketing',
    'Google Ads & Meta Ads',
    'AI Content Creator',
    'Web Developer',
    'Data Entry Specialist',
    'Beta Tester',
    'Forex & Crypto Trader'
];

if (typingText) {
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const typePhrase = () => {
        const phrase = typingPhrases[phraseIndex];
        typingText.textContent = phrase.slice(0, characterIndex);

        if (!deleting && characterIndex < phrase.length) {
            characterIndex += 1;
            window.setTimeout(typePhrase, 75);
        } else if (!deleting) {
            deleting = true;
            window.setTimeout(typePhrase, 1600);
        } else if (characterIndex > 0) {
            characterIndex -= 1;
            window.setTimeout(typePhrase, 42);
        } else {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            window.setTimeout(typePhrase, 350);
        }
    };

    typePhrase();
}
