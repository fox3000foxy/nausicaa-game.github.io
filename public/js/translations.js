// Fonction pour changer la langue
function changeLanguage(lang) {
    // Enregistrer la préférence de langue
    localStorage.setItem('preferred-language', lang);
    
    // Appliquer les traductions
    applyTranslations(lang);
}

// Fonction pour appliquer les traductions
function applyTranslations(lang) {
    // Parcourir tous les éléments avec l'attribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const missingTranslation = "[Missing translation]";
        if (translations[lang] && translations[lang][key]) {
            // Si c'est un élément input avec placeholder
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[lang][key] || missingTranslation);
            } else {
                element.innerHTML = translations[lang][key] || "<span style='color:red'>" + missingTranslation + "</span>";
            }
        }
    });
}

// Initialiser avec la langue préférée ou par défaut
document.addEventListener('DOMContentLoaded', () => {    
    // Mettre à jour le sélecteur
    document.getElementById('language-selector').value = preferredLanguage;
    
    // Appliquer les traductions
    applyTranslations(preferredLanguage);
});