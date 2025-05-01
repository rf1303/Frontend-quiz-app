document.addEventListener('DOMContentLoaded', function () {
    console.log('Inicio');

    const themesOptions = document.querySelector('.themes__options');

    themesOptions.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            themesOptions.click();
        }
    });
});
