// Patrón Module para organizar el código JavaScript del Dashboard
const DashboardModule = (function() {
    
    // Variables privadas
    let isMobile = false;
    
    // Elementos del DOM
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const content = document.getElementById('content');
    
    // Métodos privados
    function _checkIfMobile() {
        return window.matchMedia('(max-width: 992px)').matches;
    }
    
    function _openMobileMenu() {
        sidebar.classList.add('mobile-open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
    
    function _closeMobileMenu() {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
    
    function _toggleMobileMenu(event) {
        event.stopPropagation();
        
        if (sidebar.classList.contains('mobile-open')) {
            _closeMobileMenu();
        } else {
            _openMobileMenu();
        }
    }
    
    function _handleOverlayClick() {
        _closeMobileMenu();
    }
    
    function _handleDocumentClick(event) {
        if (sidebar.classList.contains('mobile-open') && 
            !sidebar.contains(event.target) && 
            !toggleSidebar.contains(event.target)) {
            _closeMobileMenu();
        }
    }
    
    function _handleSidebarClick(event) {
        event.stopPropagation();
    }
    
    function _handleWindowResize() {
        const currentIsMobile = _checkIfMobile();
        
        // Recargar cuando cambie entre modo móvil y escritorio
        // para simplificar el manejo de estados
        if (currentIsMobile !== isMobile) {
            window.location.reload();
        }
    }
    
    function _initMobileMenu() {
        if (isMobile) {
            // Agregar event listeners para móvil
            toggleSidebar.addEventListener('click', _toggleMobileMenu);
            sidebarOverlay.addEventListener('click', _handleOverlayClick);
            document.addEventListener('click', _handleDocumentClick);
            sidebar.addEventListener('click', _handleSidebarClick);
        } else {
            // En desktop, asegurarse de que el menú esté siempre visible
            sidebar.style.transform = 'translateX(0)';
        }
    }
    
    function _initEventListeners() {
        // Manejar redimensionamiento de ventana
        window.addEventListener('resize', _handleWindowResize);
    }
    
    // Método público para inicializar el módulo
    function init() {
        // Verificar si estamos en modo móvil
        isMobile = _checkIfMobile();
        
        // Inicializar funcionalidad del menú
        _initMobileMenu();
        
        // Inicializar otros event listeners
        _initEventListeners();
        
        console.log('Dashboard module initialized');
        console.log('Mobile mode:', isMobile);
    }
    
    // API pública
    return {
        init: init
    };
})();

// Inicializar el módulo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', DashboardModule.init);
