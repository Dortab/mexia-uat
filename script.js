document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MEJORA 1: LÓGICA DE MENÚ MÓVIL (HAMBURGUESA) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Activa/Desactiva la visibilidad del menú
            navLinks.classList.toggle('active');
            // Anima las barras del botón para formar una "X"
            menuToggle.classList.toggle('is-active');
        });

        // Cerrar el menú automáticamente al hacer clic en un enlace (UX mejorada)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    // --- 2. SMOOTH SCROLL (Navegación suave para enlaces internos) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return; 
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) { 
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' }); 
            }
        });
    });

    // --- 3. MATRIX ANIMATION (Efecto visual de fondo) ---
    const canvas = document.getElementById('matrix-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns, drops;
        
        const chars = "MEXIA011010IAWEB"; 
        const charArray = chars.split('');
        const fontSize = 16;

        function initMatrix() {
            // Ajustar el canvas al tamaño del contenedor padre (hero)
            width = canvas.parentElement.offsetWidth;
            height = canvas.parentElement.offsetHeight;
            
            canvas.width = width;
            canvas.height = height;
            
            columns = Math.ceil(width / fontSize);
            drops = [];
            
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * (height / fontSize); 
            }
        }

        function draw() {
            // Fondo semitransparente para el efecto de rastro
            ctx.fillStyle = 'rgba(26, 16, 60, 0.1)'; 
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = '#00C9A7'; // Color verde MEXIA
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Reiniciar la gota al llegar al final
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Inicializar y manejar cambio de tamaño de ventana
        initMatrix();
        window.addEventListener('resize', initMatrix);
        
        // Ejecutar animación a 20 FPS para no sobrecargar el procesador móvil
        setInterval(draw, 50); 
    }
});