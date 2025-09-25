// Patrón Module para la gestión de paramétricas
const GestionParametricas = (function() {
    
    // Variables privadas
    let userData = null;
    
    // Elementos del DOM
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const content = document.getElementById('content');
    
    // Campos de información del usuario
    const userNameElement = document.getElementById('userName');
    const userCodeElement = document.getElementById('userCode');
    const userEmailElement = document.getElementById('userEmail');
    
    // Elementos de pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Funciones privadas
    function initializeEventListeners() {
        // Toggle sidebar en móviles
        if (toggleSidebarBtn) {
            toggleSidebarBtn.addEventListener('click', toggleSidebar);
        }
        
        // Cerrar sidebar al hacer click en overlay
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }
        
        // Responsive - cerrar sidebar al redimensionar
        window.addEventListener('resize', handleResize);
        
        // Configurar navegación por pestañas
        setupTabNavigation();
        
        // Cargar datos del usuario al inicializar
        loadUserData();
        
        console.log('Gestión de Paramétricas inicializada correctamente');
    }
    
    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
        }
    }
    
    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    }
    
    function handleResize() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    }
    
    function setupTabNavigation() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });
    }
    
    function switchTab(tabName) {
        // Remover clase active de todos los botones y contenidos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Activar el botón y contenido seleccionado
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-tab`);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }
    
    function loadUserData() {
        // Simular carga de datos del usuario (reemplazar con llamada API real)
        const mockUserData = {
            nombre: 'Usuario Sistema',
            codigo: 'USR001',
            email: 'usuario@kando.edu.co'
        };
        
        updateUserInfo(mockUserData);
    }
    
    function updateUserInfo(userData) {
        if (userNameElement) {
            userNameElement.textContent = userData.nombre || 'Usuario';
        }
        if (userCodeElement) {
            userCodeElement.textContent = userData.codigo || 'N/A';
        }
        if (userEmailElement) {
            userEmailElement.textContent = userData.email || 'No disponible';
        }
    }
    
    function showNotification(message, type = 'info') {
        // Función para mostrar notificaciones al usuario
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-ocultar después de 3 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    function validateForm(formData) {
        // Función para validar formularios de paramétricas
        const errors = [];
        
        // Validaciones específicas según sea necesario
        if (!formData.nombre || formData.nombre.trim() === '') {
            errors.push('El nombre es requerido');
        }
        
        return errors;
    }
    
    function sanitizeInput(input) {
        // Función para sanitizar entradas del usuario
        return input.replace(/[<>]/g, '');
    }
    
    // Funciones para manejo de datos (preparadas para futuras implementaciones)
    function loadParametricas() {
        // Cargar datos de paramétricas desde el servidor
        console.log('Cargando datos de paramétricas...');
        // Implementar llamada API aquí
    }
    
    function saveParametrica(data) {
        // Guardar datos de paramétrica
        console.log('Guardando paramétrica:', data);
        // Implementar llamada API aquí
        showNotification('Paramétrica guardada correctamente', 'success');
    }
    
    function deleteParametrica(id) {
        // Eliminar paramétrica
        console.log('Eliminando paramétrica:', id);
        // Implementar llamada API aquí
        showNotification('Paramétrica eliminada correctamente', 'success');
    }
    
    // API pública del módulo
    return {
        init: initializeEventListeners,
        loadParametricas: loadParametricas,
        saveParametrica: saveParametrica,
        deleteParametrica: deleteParametrica,
        showNotification: showNotification,
        validateForm: validateForm,
        sanitizeInput: sanitizeInput,
        switchTab: switchTab
    };
    
})();

// Función global de logout (mantenida para compatibilidad)
function logout() {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
        // Limpiar datos locales
        localStorage.removeItem('userData');
        sessionStorage.clear();
        
        // Redirigir al login
        window.location.href = './login.html';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    GestionParametricas.init();
});

// Manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error en Gestión de Paramétricas:', e);
    GestionParametricas.showNotification('Ha ocurrido un error inesperado', 'error');
});

// Exportar para uso global si es necesario
window.GestionParametricas = GestionParametricas;

// Funciones globales para botones de acción
// === FUNCIONES PARA USUARIOS ===
function openUserModal() {
    GestionParametricas.showNotification('Abriendo modal de usuario...', 'info');
    // Implementar modal de usuario
}

function editUser(userId) {
    GestionParametricas.showNotification(`Editando usuario: ${userId}`, 'info');
    // Implementar edición de usuario
}

function deleteUser(userId) {
    if (confirm(`¿Está seguro de eliminar el usuario ${userId}?`)) {
        GestionParametricas.showNotification(`Usuario ${userId} eliminado`, 'success');
        // Implementar eliminación de usuario
    }
}

function refreshUsers() {
    GestionParametricas.showNotification('Actualizando usuarios...', 'info');
    // Implementar refresh de usuarios
}

function exportUsers() {
    GestionParametricas.showNotification('Exportando usuarios...', 'info');
    // Implementar exportación de usuarios
}

// === FUNCIONES PARA PERFILES ===
function openProfileModal() {
    GestionParametricas.showNotification('Abriendo modal de perfil...', 'info');
    // Implementar modal de perfil
}

function editProfile(profileId) {
    GestionParametricas.showNotification(`Editando perfil: ${profileId}`, 'info');
    // Implementar edición de perfil
}

function deleteProfile(profileId) {
    if (confirm(`¿Está seguro de eliminar el perfil ${profileId}?`)) {
        GestionParametricas.showNotification(`Perfil ${profileId} eliminado`, 'success');
        // Implementar eliminación de perfil
    }
}

function refreshProfiles() {
    GestionParametricas.showNotification('Actualizando perfiles...', 'info');
    // Implementar refresh de perfiles
}

// === FUNCIONES PARA CONTROL DE ACCESO ===
function savePermissions() {
    const selectedProfile = document.getElementById('profile-selector').value;
    if (!selectedProfile) {
        GestionParametricas.showNotification('Seleccione un perfil primero', 'error');
        return;
    }
    
    const permissions = [];
    document.querySelectorAll('input[name="permission"]:checked').forEach(checkbox => {
        permissions.push(checkbox.value);
    });
    
    GestionParametricas.showNotification(`Permisos guardados para perfil ${selectedProfile}`, 'success');
    // Implementar guardado de permisos
}

// === FUNCIONES PARA PARÁMETROS ===
function openParameterModal() {
    GestionParametricas.showNotification('Abriendo modal de parámetro...', 'info');
    // Implementar modal de parámetro
}

function editParameter(paramId) {
    GestionParametricas.showNotification(`Editando parámetro: ${paramId}`, 'info');
    // Implementar edición de parámetro
}

function deleteParameter(paramId) {
    if (confirm(`¿Está seguro de eliminar el parámetro ${paramId}?`)) {
        GestionParametricas.showNotification(`Parámetro ${paramId} eliminado`, 'success');
        // Implementar eliminación de parámetro
    }
}