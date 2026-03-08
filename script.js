/**
 * MEXIA Soluciones - Script de Interactividad
 * Versión: 2.1 (Corrección de Menú Colapsable)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONTROL DEL MENÚ MÓVIL (HAMBURGUESA) ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('#nav-list');

    if (menuToggle && navLinks) {
        // Evento para abrir/cerrar el menú al tocar la hamburguesa
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active'); // Para animación de la hamburguesa
        });

        // MUY IMPORTANTE: Cerrar el menú automáticamente al hacer clic en un enlace
        // Esto evita que el menú siga tapando la información después de navegar
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    // --- 2. EFECTO MATRIX (FONDO DEL HERO) ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns, drops;
        
        const fontSize = 16;
        const characters = "01MEXIAIA01"; 

        const initMatrix = () => {
            // Ajustamos al tamaño actual del contenedor Hero
            width = canvas.parentElement.offsetWidth;
            height = canvas.parentElement.offsetHeight;
            canvas.width = width;
            canvas.height = height;

            columns = Math.floor(width / fontSize);
            drops = Array(columns).fill(1);
        };

        const drawMatrix = () => {
            // Fondo semitransparente para crear el rastro
            ctx.fillStyle = 'rgba(26, 16, 60, 0.05)';
            ctx.fillRect(0, 0, width, height);

            // Estilo de la "lluvia" de letras
            ctx.fillStyle = '#00C9A7'; // Color de MEXIA
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reiniciar gota al azar después de salir de pantalla
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        initMatrix();
        window.addEventListener('resize', initMatrix);
        setInterval(drawMatrix, 50);
    }

    // --- 3. SCROLL SUAVE PARA ANCLAS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});