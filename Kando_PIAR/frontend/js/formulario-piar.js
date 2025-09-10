// Patrón Module para el formulario PIAR
const FormularioPIAR = (function() {
    
    // Variables privadas
    let userData = null;
    
    // Elementos del DOM
    const enableFormBtn = document.getElementById('enableFormBtn');
    const formSections = document.getElementById('formSections');
    const studentForm = document.getElementById('studentForm');
    
    // Campos del formulario
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const edadInput = document.getElementById('edad');
    const numeroDocumentoInput = document.getElementById('numeroDocumento');
    const telefonoInput = document.getElementById('telefono');
    const departamentoSelect = document.getElementById('departamento');
    const municipioSelect = document.getElementById('municipio');
    
    // Radio buttons
    const afiliadoSaludRadios = document.querySelectorAll('input[name="afiliadoSalud"]');
    const asisteRehabilitacionRadios = document.querySelectorAll('input[name="asisteRehabilitacion"]');
    
    // Grupos condicionales
    const epsGroup = document.getElementById('epsGroup');
    const rehabilitacionDetails = document.getElementById('rehabilitacionDetails');
    
    // Métodos privados
    function _loadUserData() {
        // Cargar datos del localStorage (del login)
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            userData = JSON.parse(storedUserData);
            _updateUserInfo();
        } else {
            // Si no hay datos, usar datos de ejemplo
            userData = {
                nombres: 'María',
                apellidos: 'González',
                codigo_usuario: 'USR-7892',
                email: 'maria.gonzalez@example.com'
            };
            _updateUserInfo();
        }
    }
    
    function _updateUserInfo() {
        // Actualizar información del usuario en la sidebar
        document.getElementById('userName').textContent = `${userData.nombres} ${userData.apellidos}`;
        document.getElementById('userCode').textContent = userData.codigo_usuario;
        document.getElementById('userEmail').textContent = userData.email;
        
        // Actualizar información de expedición
        document.getElementById('expeditionUser').textContent = `${userData.nombres} ${userData.apellidos}`;
    }
    
    function _setCurrentDate() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'America/Bogota'
        };
        const formattedDate = now.toLocaleDateString('es-CO', options);
        document.getElementById('expeditionDate').textContent = formattedDate;
    }
    
    function _enableForm() {
        formSections.style.display = 'block';
        enableFormBtn.style.display = 'none';
        
        // Scroll suave hacia el formulario
        formSections.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    function _toggleSection(sectionHeader) {
        const isCollapsed = sectionHeader.classList.contains('collapsed');
        const sectionContent = sectionHeader.nextElementSibling;
        
        if (isCollapsed) {
            sectionHeader.classList.remove('collapsed');
            sectionContent.classList.remove('collapsed');
            sectionContent.style.display = 'block';
        } else {
            sectionHeader.classList.add('collapsed');
            sectionContent.classList.add('collapsed');
            sectionContent.style.display = 'none';
        }
    }
    
    function _calculateAge() {
        const birthDate = fechaNacimientoInput.value;
        if (!birthDate) {
            edadInput.value = '';
            return;
        }
        
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        edadInput.value = age + ' años';
    }
    
    function _validateNumericInput(input) {
        input.value = input.value.replace(/[^0-9]/g, '');
    }
    
    function _handleAfiliadoSaludChange() {
        const selectedValue = document.querySelector('input[name="afiliadoSalud"]:checked')?.value;
        
        if (selectedValue === 'si') {
            epsGroup.style.display = 'block';
            document.getElementById('eps').required = true;
        } else {
            epsGroup.style.display = 'none';
            document.getElementById('eps').required = false;
            document.getElementById('eps').value = '';
        }
    }
    
    function _handleAsisteRehabilitacionChange() {
        const selectedValue = document.querySelector('input[name="asisteRehabilitacion"]:checked')?.value;
        
        if (selectedValue === 'si') {
            rehabilitacionDetails.style.display = 'flex';
            document.getElementById('institucionRehabilitacion').required = true;
            document.getElementById('frecuenciaRehabilitacion').required = true;
        } else {
            rehabilitacionDetails.style.display = 'none';
            document.getElementById('institucionRehabilitacion').required = false;
            document.getElementById('frecuenciaRehabilitacion').required = false;
            document.getElementById('institucionRehabilitacion').value = '';
            document.getElementById('frecuenciaRehabilitacion').value = '';
        }
    }
    
    async function _loadSelectData() {
        try {
            // Cargar tipos de documento
            const tiposDocumento = await _fetchParametrizacion('tipos-documento');
            _populateSelect('tipoDocumento', tiposDocumento);
            
            // Cargar géneros
            const generos = await _fetchParametrizacion('generos');
            _populateSelect('genero', generos);
            
            // Cargar barrios
            const barrios = await _fetchParametrizacion('barrios');
            _populateSelect('barrio', barrios);
            
            // Cargar EPS
            const eps = await _fetchParametrizacion('eps');
            _populateSelect('eps', eps);
            
            // Cargar instituciones de rehabilitación
            const instituciones = await _fetchParametrizacion('instituciones-rehabilitacion');
            _populateSelect('institucionRehabilitacion', instituciones);
            
            // Cargar frecuencias de rehabilitación
            const frecuencias = await _fetchParametrizacion('frecuencias-rehabilitacion');
            _populateSelect('frecuenciaRehabilitacion', frecuencias);
            
            // Cargar departamentos
            const departamentos = await _fetchParametrizacion('departamentos');
            _populateSelect('departamento', departamentos);
            
        } catch (error) {
            console.error('Error cargando datos de parametrización:', error);
            // Cargar datos dummy en caso de error
            _loadDummyData();
        }
    }
    
    function _loadDummyData() {
        // Datos dummy para cuando no hay conexión a la base de datos
        const dummyData = {
            tiposDocumento: [
                { id: 1, nombre: 'Cédula de Ciudadanía' },
                { id: 2, nombre: 'Tarjeta de Identidad' },
                { id: 3, nombre: 'Registro Civil' }
            ],
            generos: [
                { id: 1, nombre: 'Masculino' },
                { id: 2, nombre: 'Femenino' },
                { id: 3, nombre: 'Otro' }
            ],
            barrios: [
                { id: 1, nombre: 'Casco Urbano' },
                { id: 2, nombre: 'Villa del Rosario' },
                { id: 3, nombre: 'Bosques de Floridablanca' }
            ],
            eps: [
                { id: 1, nombre: 'EPS SURA' },
                { id: 2, nombre: 'Nueva EPS' },
                { id: 3, nombre: 'EPS Sanitas' }
            ],
            instituciones: [
                { id: 1, nombre: 'FOSCAL' },
                { id: 2, nombre: 'Centro de Rehabilitación Integral' }
            ],
            frecuencias: [
                { id: 1, nombre: 'Diaria' },
                { id: 2, nombre: 'Semanal' },
                { id: 3, nombre: 'Quincenal' }
            ],
            departamentos: [
                { id: 1, nombre: 'Santander' },
                { id: 2, nombre: 'Antioquia' },
                { id: 3, nombre: 'Cundinamarca' }
            ]
        };
        
        _populateSelect('tipoDocumento', dummyData.tiposDocumento);
        _populateSelect('genero', dummyData.generos);
        _populateSelect('barrio', dummyData.barrios);
        _populateSelect('eps', dummyData.eps);
        _populateSelect('institucionRehabilitacion', dummyData.instituciones);
        _populateSelect('frecuenciaRehabilitacion', dummyData.frecuencias);
        _populateSelect('departamento', dummyData.departamentos);
    }
    
    async function _fetchParametrizacion(tipo) {
        // Aquí iría la llamada real a la API
        // Por ahora retornamos datos dummy
        return [];
    }
    
    function _populateSelect(selectId, data) {
        const select = document.getElementById(selectId);
        
        // Limpiar opciones existentes (excepto la primera)
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }
        
        // Agregar nuevas opciones
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.nombre;
            select.appendChild(option);
        });
    }
    
    function _handleDepartamentoChange() {
        const departamentoId = departamentoSelect.value;
        
        if (!departamentoId) {
            municipioSelect.innerHTML = '<option value="">Seleccione departamento primero...</option>';
            return;
        }
        
        // Aquí iría la llamada para cargar municipios del departamento seleccionado
        // Por ahora, datos dummy de Santander
        const municipiosSantander = [
            { id: 1, nombre: 'Bucaramanga' },
            { id: 2, nombre: 'Floridablanca' },
            { id: 3, nombre: 'Girón' },
            { id: 4, nombre: 'Piedecuesta' }
        ];
        
        municipioSelect.innerHTML = '<option value="">Seleccione...</option>';
        _populateSelect('municipio', municipiosSantander);
    }
    
    function _validateForm() {
        let isValid = true;
        const requiredFields = studentForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const errorElement = document.getElementById(field.name + 'Error');
            
            if (!field.value.trim()) {
                _showFieldError(field, 'Este campo es obligatorio');
                isValid = false;
            } else {
                _hideFieldError(field);
            }
        });
        
        // Validaciones específicas
        const email = document.getElementById('email');
        if (email.value && !_isValidEmail(email.value)) {
            _showFieldError(email, 'Ingrese un correo electrónico válido');
            isValid = false;
        }
        
        return isValid;
    }
    
    function _isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function _showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    function _hideFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    function _handleFormSubmit(e) {
        e.preventDefault();
        
        if (_validateForm()) {
            const formData = new FormData(studentForm);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Datos del formulario:', data);
            
            // Aquí iría la llamada a la API para guardar los datos
            alert('Formulario guardado exitosamente (simulado)');
        }
    }
    
    function _clearForm() {
        if (confirm('¿Está seguro de que desea limpiar todo el formulario?')) {
            studentForm.reset();
            
            // Ocultar grupos condicionales
            epsGroup.style.display = 'none';
            rehabilitacionDetails.style.display = 'none';
            
            // Limpiar mensajes de error
            const errorMessages = studentForm.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.classList.remove('show'));
            
            const formGroups = studentForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));
            
            // Limpiar edad
            edadInput.value = '';
        }
    }
    
    function _initEventListeners() {
        // Botón para habilitar formulario
        enableFormBtn.addEventListener('click', _enableForm);
        
        // Headers de sección para colapsar/expandir
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', () => _toggleSection(header));
        });
        
        // Fecha de nacimiento para calcular edad
        fechaNacimientoInput.addEventListener('change', _calculateAge);
        
        // Validación numérica
        numeroDocumentoInput.addEventListener('input', () => _validateNumericInput(numeroDocumentoInput));
        telefonoInput.addEventListener('input', () => _validateNumericInput(telefonoInput));
        
        // Radio buttons condicionales
        afiliadoSaludRadios.forEach(radio => {
            radio.addEventListener('change', _handleAfiliadoSaludChange);
        });
        
        asisteRehabilitacionRadios.forEach(radio => {
            radio.addEventListener('change', _handleAsisteRehabilitacionChange);
        });
        
        // Departamento change
        departamentoSelect.addEventListener('change', _handleDepartamentoChange);
        
        // Submit del formulario
        studentForm.addEventListener('submit', _handleFormSubmit);
        
        // Limpiar formulario
        window.clearForm = _clearForm;
        
        // Logout
        window.logout = function() {
            if (confirm('¿Está seguro de que desea cerrar sesión?')) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = './login.html';
            }
        };
    }
    
    // Método público para inicializar
    function init() {
        _loadUserData();
        _setCurrentDate();
        _loadSelectData();
        _initEventListeners();
        
        console.log('Formulario PIAR inicializado');
    }
    
    // API pública
    return {
        init: init
    };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', FormularioPIAR.init);
