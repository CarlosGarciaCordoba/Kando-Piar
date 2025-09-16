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
    const tieneDiagnosticoRadios = document.querySelectorAll('input[name="tieneDiagnostico"]');
    const consumeMedicamentosRadios = document.querySelectorAll('input[name="consumeMedicamentos"]');
    const perteneceGrupoEtnicoRadios = document.querySelectorAll('input[name="perteneceGrupoEtnico"]');
    const ingresoSistemaEducativoRadios = document.querySelectorAll('input[name="ingresoSistemaEducativo"]');
    const perteneceGrupoEtnicoMadreRadios = document.querySelectorAll('input[name="perteneceGrupoEtnicoMadre"]');
    const perteneceGrupoEtnicoPadreRadios = document.querySelectorAll('input[name="perteneceGrupoEtnicoPadre"]');
    
    // Grupos condicionales
    const epsGroup = document.getElementById('epsGroup');
    const rehabilitacionDetails = document.getElementById('rehabilitacionDetails');
    const diagnosticoGroup = document.getElementById('diagnosticoGroup');
    const medicamentosDetails = document.getElementById('medicamentosDetails');
    const grupoEtnicoGroup = document.getElementById('grupoEtnicoGroup');
    const historialEducativoDetails = document.getElementById('historialEducativoDetails');
    const historialEducativoDetails2 = document.getElementById('historialEducativoDetails2');
    const grupoEtnicoMadreGroup = document.getElementById('grupoEtnicoMadreGroup');
    const grupoEtnicoPadreGroup = document.getElementById('grupoEtnicoPadreGroup');
    
    // Campos de validación numérica adicionales
    const numeroDocumentoMadreInput = document.getElementById('numeroDocumentoMadre');
    const telefonoMadreInput = document.getElementById('telefonoMadre');
    const telefonoEmpresaMadreInput = document.getElementById('telefonoEmpresaMadre');
    const numeroDocumentoPadreInput = document.getElementById('numeroDocumentoPadre');
    const telefonoPadreInput = document.getElementById('telefonoPadre');
    const telefonoEmpresaPadreInput = document.getElementById('telefonoEmpresaPadre');
    
    // Selects de departamento y municipio para padres
    const departamentoMadreSelect = document.getElementById('departamentoMadre');
    const municipioMadreSelect = document.getElementById('municipioMadre');
    const departamentoPadreSelect = document.getElementById('departamentoPadre');
    const municipioPadreSelect = document.getElementById('municipioPadre');
    
    // Contadores para campos dinámicos
    let compositionCounter = 1;
    let supportCounter = 1;
    const maxCompositions = 3; // 1 principal + 2 adicionales
    const maxSupports = 3; // 1 principal + 2 adicionales
    
    // Nuevos radio buttons para las secciones añadidas
    const padresVivenJuntosRadios = document.querySelectorAll('input[name="padresVivenJuntos"]');
    const enfermedadPrimerAnoRadios = document.querySelectorAll('input[name="enfermedadPrimerAno"]');
    
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

    function _handleTieneDiagnosticoChange() {
        const selectedValue = document.querySelector('input[name="tieneDiagnostico"]:checked')?.value;
        
        if (selectedValue === 'si') {
            diagnosticoGroup.style.display = 'block';
            document.getElementById('diagnostico').required = true;
        } else {
            diagnosticoGroup.style.display = 'none';
            document.getElementById('diagnostico').required = false;
            document.getElementById('diagnostico').value = '';
        }
    }

    function _handleConsumeMedicamentosChange() {
        const selectedValue = document.querySelector('input[name="consumeMedicamentos"]:checked')?.value;
        
        if (selectedValue === 'si') {
            medicamentosDetails.style.display = 'flex';
            document.getElementById('frecuenciaMedicamentos').required = true;
            document.getElementById('horarioMedicamentos').required = true;
        } else {
            medicamentosDetails.style.display = 'none';
            document.getElementById('frecuenciaMedicamentos').required = false;
            document.getElementById('horarioMedicamentos').required = false;
            document.getElementById('frecuenciaMedicamentos').value = '';
            document.getElementById('horarioMedicamentos').value = '';
        }
    }

    function _handlePerteneceGrupoEtnicoChange() {
        const selectedValue = document.querySelector('input[name="perteneceGrupoEtnico"]:checked')?.value;
        
        if (selectedValue === 'si') {
            grupoEtnicoGroup.style.display = 'block';
            document.getElementById('grupoEtnico').required = true;
        } else {
            grupoEtnicoGroup.style.display = 'none';
            document.getElementById('grupoEtnico').required = false;
            document.getElementById('grupoEtnico').value = '';
        }
    }

    function _handleIngresoSistemaEducativoChange() {
        const selectedValue = document.querySelector('input[name="ingresoSistemaEducativo"]:checked')?.value;
        
        if (selectedValue === 'si') {
            historialEducativoDetails.style.display = 'flex';
            historialEducativoDetails2.style.display = 'flex';
            document.getElementById('ultimoGradoCursado').required = true;
            document.getElementById('establecimientoEducativo').required = true;
            document.getElementById('gradoAspirante').required = true;
        } else {
            historialEducativoDetails.style.display = 'none';
            historialEducativoDetails2.style.display = 'none';
            document.getElementById('ultimoGradoCursado').required = false;
            document.getElementById('establecimientoEducativo').required = false;
            document.getElementById('gradoAspirante').required = false;
            document.getElementById('ultimoGradoCursado').value = '';
            document.getElementById('establecimientoEducativo').value = '';
            document.getElementById('motivoRetiro').value = '';
            document.getElementById('gradoAspirante').value = '';
        }
    }

    function _handlePerteneceGrupoEtnicoMadreChange() {
        const selectedValue = document.querySelector('input[name="perteneceGrupoEtnicoMadre"]:checked')?.value;
        
        if (selectedValue === 'si') {
            grupoEtnicoMadreGroup.style.display = 'block';
        } else {
            grupoEtnicoMadreGroup.style.display = 'none';
            document.getElementById('grupoEtnicoMadre').value = '';
        }
    }

    function _handlePerteneceGrupoEtnicoPadreChange() {
        const selectedValue = document.querySelector('input[name="perteneceGrupoEtnicoPadre"]:checked')?.value;
        
        if (selectedValue === 'si') {
            grupoEtnicoPadreGroup.style.display = 'block';
        } else {
            grupoEtnicoPadreGroup.style.display = 'none';
            document.getElementById('grupoEtnicoPadre').value = '';
        }
    }

    function _handleDepartamentoMadreChange() {
        const departamentoId = departamentoMadreSelect.value;
        
        if (!departamentoId) {
            municipioMadreSelect.innerHTML = '<option value="">Seleccione departamento primero...</option>';
            return;
        }
        
        // Datos dummy de municipios
        const municipiosSantander = [
            { id: 1, nombre: 'Bucaramanga' },
            { id: 2, nombre: 'Floridablanca' },
            { id: 3, nombre: 'Girón' },
            { id: 4, nombre: 'Piedecuesta' }
        ];
        
        municipioMadreSelect.innerHTML = '<option value="">Seleccione...</option>';
        municipiosSantander.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.id;
            option.textContent = municipio.nombre;
            municipioMadreSelect.appendChild(option);
        });
    }

    function _handleDepartamentoPadreChange() {
        const departamentoId = departamentoPadreSelect.value;
        
        if (!departamentoId) {
            municipioPadreSelect.innerHTML = '<option value="">Seleccione departamento primero...</option>';
            return;
        }
        
        // Datos dummy de municipios
        const municipiosSantander = [
            { id: 1, nombre: 'Bucaramanga' },
            { id: 2, nombre: 'Floridablanca' },
            { id: 3, nombre: 'Girón' },
            { id: 4, nombre: 'Piedecuesta' }
        ];
        
        municipioPadreSelect.innerHTML = '<option value="">Seleccione...</option>';
        municipiosSantander.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.id;
            option.textContent = municipio.nombre;
            municipioPadreSelect.appendChild(option);
        });
    }

    // Funciones para campos dinámicos
    function addCompositionInfo() {
        if (compositionCounter >= maxCompositions) {
            alert('Solo se pueden agregar máximo 2 personas adicionales');
            return;
        }
        
        compositionCounter++;
        const container = document.getElementById('additionalCompositions');
        
        const newComposition = document.createElement('div');
        newComposition.className = 'composition-group';
        newComposition.id = `compositionGroup${compositionCounter}`;
        
        newComposition.innerHTML = `
            <div style="margin: 20px 0; padding: 15px; background: rgba(79, 134, 247, 0.05); border-radius: 8px;">
                <h4 style="margin: 0 0 15px 0; color: var(--primary-color);">Persona ${compositionCounter}</h4>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="conQuienVive${compositionCounter}">¿Con quién vive el estudiante?</label>
                        <select id="conQuienVive${compositionCounter}" name="conQuienVive${compositionCounter}">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="nombrePersona${compositionCounter}">Nombre completo:</label>
                        <input type="text" id="nombrePersona${compositionCounter}" name="nombrePersona${compositionCounter}" maxlength="150">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="relacionEstudiante${compositionCounter}">Relación con el estudiante:</label>
                        <select id="relacionEstudiante${compositionCounter}" name="relacionEstudiante${compositionCounter}">
                            <option value="">Seleccione...</option>
                            <option value="madre">Madre</option>
                            <option value="padre">Padre</option>
                            <option value="abuelo">Abuelo/a</option>
                            <option value="hermano">Hermano/a</option>
                            <option value="tio">Tío/a</option>
                            <option value="primo">Primo/a</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="generoPersona${compositionCounter}">Género:</label>
                        <select id="generoPersona${compositionCounter}" name="generoPersona${compositionCounter}">
                            <option value="">Seleccione...</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="edadPersona${compositionCounter}">Edad:</label>
                        <select id="edadPersona${compositionCounter}" name="edadPersona${compositionCounter}">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ocupacionPersona${compositionCounter}">Ocupación:</label>
                        <select id="ocupacionPersona${compositionCounter}" name="ocupacionPersona${compositionCounter}">
                            <option value="">Seleccione...</option>
                            <option value="empleado">Empleado</option>
                            <option value="independiente">Trabajador Independiente</option>
                            <option value="desempleado">Desempleado</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="pensionado">Pensionado</option>
                            <option value="hogar">Labores del hogar</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>
                
                <button type="button" class="btn-secondary" onclick="removeComposition(${compositionCounter})" 
                        style="margin-top: 10px; background: #f56565; color: white;">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        
        container.appendChild(newComposition);
        
        // Generar opciones de edad para el nuevo select
        const selectEdad = document.getElementById(`edadPersona${compositionCounter}`);
        for (let i = 1; i <= 120; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' años';
            selectEdad.appendChild(option);
        }
        
        // Ocultar botón si se alcanza el máximo
        if (compositionCounter >= maxCompositions) {
            document.getElementById('addCompositionBtn').style.display = 'none';
        }
    }

    function removeComposition(id) {
        const element = document.getElementById(`compositionGroup${id}`);
        if (element) {
            element.remove();
            compositionCounter--;
            // Mostrar botón nuevamente
            document.getElementById('addCompositionBtn').style.display = 'inline-flex';
        }
    }

    function addSupportInfo() {
        if (supportCounter >= maxSupports) {
            alert('Solo se pueden agregar máximo 2 personas adicionales');
            return;
        }
        
        supportCounter++;
        const container = document.getElementById('additionalSupports');
        
        const newSupport = document.createElement('div');
        newSupport.className = 'support-group';
        newSupport.id = `supportGroup${supportCounter}`;
        
        newSupport.innerHTML = `
            <div style="margin: 20px 0; padding: 15px; background: rgba(79, 134, 247, 0.05); border-radius: 8px;">
                <h4 style="margin: 0 0 15px 0; color: var(--primary-color);">Persona de apoyo ${supportCounter}</h4>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="nombreApoyo${supportCounter}">Nombre completo:</label>
                        <input type="text" id="nombreApoyo${supportCounter}" name="nombreApoyo${supportCounter}" maxlength="150">
                    </div>
                    <div class="form-group">
                        <label for="relacionApoyo${supportCounter}">Relación con el estudiante:</label>
                        <select id="relacionApoyo${supportCounter}" name="relacionApoyo${supportCounter}">
                            <option value="">Seleccione...</option>
                            <option value="madre">Madre</option>
                            <option value="padre">Padre</option>
                            <option value="abuelo">Abuelo/a</option>
                            <option value="hermano">Hermano/a</option>
                            <option value="tio">Tío/a</option>
                            <option value="primo">Primo/a</option>
                            <option value="amigo">Amigo/a de la familia</option>
                            <option value="vecino">Vecino/a</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="generoApoyo${supportCounter}">Género:</label>
                        <select id="generoApoyo${supportCounter}" name="generoApoyo${supportCounter}">
                            <option value="">Seleccione...</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="edadApoyo${supportCounter}">Edad:</label>
                        <select id="edadApoyo${supportCounter}" name="edadApoyo${supportCounter}">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="ocupacionApoyo${supportCounter}">Ocupación:</label>
                        <select id="ocupacionApoyo${supportCounter}" name="ocupacionApoyo${supportCounter}">
                            <option value="">Seleccione...</option>
                            <option value="empleado">Empleado</option>
                            <option value="independiente">Trabajador Independiente</option>
                            <option value="desempleado">Desempleado</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="pensionado">Pensionado</option>
                            <option value="hogar">Labores del hogar</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>
                
                <button type="button" class="btn-secondary" onclick="removeSupportInfo(${supportCounter})" 
                        style="margin-top: 10px; background: #f56565; color: white;">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        
        container.appendChild(newSupport);
        
        // Generar opciones de edad para el nuevo select
        const selectEdad = document.getElementById(`edadApoyo${supportCounter}`);
        for (let i = 1; i <= 120; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' años';
            selectEdad.appendChild(option);
        }
        
        // Ocultar botón si se alcanza el máximo
        if (supportCounter >= maxSupports) {
            document.getElementById('addSupportBtn').style.display = 'none';
        }
    }

    function removeSupportInfo(id) {
        const element = document.getElementById(`supportGroup${id}`);
        if (element) {
            element.remove();
            supportCounter--;
            // Mostrar botón nuevamente
            document.getElementById('addSupportBtn').style.display = 'inline-flex';
        }
    }

    // Funciones para campos condicionales adicionales
    function _handlePadresVivenJuntosChange() {
        const selectedValue = document.querySelector('input[name="padresVivenJuntos"]:checked')?.value;
        const tipoUnionGroup = document.getElementById('tipoUnionGroup');
        const tiempoSeparacionGroup = document.getElementById('tiempoSeparacionGroup');
        
        if (selectedValue === 'si') {
            tipoUnionGroup.style.display = 'block';
            tiempoSeparacionGroup.style.display = 'none';
            document.getElementById('tiempoSeparacion').value = '';
        } else if (selectedValue === 'no') {
            tipoUnionGroup.style.display = 'none';
            tiempoSeparacionGroup.style.display = 'block';
            document.getElementById('tipoUnion').value = '';
        } else {
            tipoUnionGroup.style.display = 'none';
            tiempoSeparacionGroup.style.display = 'none';
        }
    }

    function _handleEnfermedadPrimerAnoChange() {
        const selectedValue = document.querySelector('input[name="enfermedadPrimerAno"]:checked')?.value;
        const cualEnfermedadGroup = document.getElementById('cualEnfermedadGroup');
        
        if (selectedValue === 'si') {
            cualEnfermedadGroup.style.display = 'block';
        } else {
            cualEnfermedadGroup.style.display = 'none';
            document.getElementById('cualEnfermedad').value = '';
        }
    }

    // Funciones para manejar campos con "Otro" opcional
    function _handleSelectWithOther(selectId, groupId) {
        const select = document.getElementById(selectId);
        const group = document.getElementById(groupId);
        
        if (select && group) {
            if (select.value === 'otro' || select.value === 'otros') {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
                const input = group.querySelector('input');
                if (input) input.value = '';
            }
        }
    }

    function _handleAlimentacionChange() {
        const selectedValue = document.getElementById('alimentacionPrimerAno').value;
        const mesesLactanciaGroup = document.getElementById('mesesLactanciaGroup');
        
        if (selectedValue === 'lactancia_exclusiva') {
            mesesLactanciaGroup.style.display = 'block';
        } else {
            mesesLactanciaGroup.style.display = 'none';
            document.getElementById('mesesLactancia').value = '';
        }
    }

    function _handleDificultadesMotorChange() {
        const checkboxes = document.querySelectorAll('input[name="dificultadesMotor"]');
        const etapaGroup = document.getElementById('etapaMotorGroup');
        let siSelected = false;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.value === 'si') {
                siSelected = true;
            }
        });
        
        if (siSelected) {
            etapaGroup.style.display = 'block';
        } else {
            etapaGroup.style.display = 'none';
            document.getElementById('etapaMotor').value = '';
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
            ],
            diagnosticos: [
                { id: 1, nombre: 'TDAH' },
                { id: 2, nombre: 'Autismo' },
                { id: 3, nombre: 'Discapacidad Intelectual' },
                { id: 4, nombre: 'Discapacidad Física' }
            ],
            frecuenciasMedicamentos: [
                { id: 1, nombre: 'Una vez al día' },
                { id: 2, nombre: 'Dos veces al día' },
                { id: 3, nombre: 'Tres veces al día' },
                { id: 4, nombre: 'Cada 8 horas' }
            ],
            horariosMedicamentos: [
                { id: 1, nombre: 'Mañana' },
                { id: 2, nombre: 'Tarde' },
                { id: 3, nombre: 'Noche' },
                { id: 4, nombre: 'Mañana y Noche' }
            ],
            gruposEtnicos: [
                { id: 1, nombre: 'Indígena' },
                { id: 2, nombre: 'Afrodescendiente' },
                { id: 3, nombre: 'ROM (Gitano)' },
                { id: 4, nombre: 'Raizal' }
            ],
            establecimientos: [
                { id: 1, nombre: 'IE San José' },
                { id: 2, nombre: 'IE La Presentación' },
                { id: 3, nombre: 'IE Técnico Industrial' }
            ],
            nivelesEducativos: [
                { id: 1, nombre: 'Sin educación formal' },
                { id: 2, nombre: 'Primaria incompleta' },
                { id: 3, nombre: 'Primaria completa' },
                { id: 4, nombre: 'Secundaria incompleta' },
                { id: 5, nombre: 'Secundaria completa' },
                { id: 6, nombre: 'Técnico' },
                { id: 7, nombre: 'Tecnológico' },
                { id: 8, nombre: 'Universitario' },
                { id: 9, nombre: 'Especialización' },
                { id: 10, nombre: 'Maestría' },
                { id: 11, nombre: 'Doctorado' }
            ],
            ingresos: [
                { id: 1, nombre: 'Menos de 1 SMMLV' },
                { id: 2, nombre: '1 SMMLV' },
                { id: 3, nombre: '2 SMMLV' },
                { id: 4, nombre: '3 SMMLV' },
                { id: 5, nombre: 'Más de 3 SMMLV' }
            ],
            ciudades: [
                { id: 1, nombre: 'Bucaramanga' },
                { id: 2, nombre: 'Floridablanca' },
                { id: 3, nombre: 'Girón' },
                { id: 4, nombre: 'Piedecuesta' }
            ]
        };
        
        // Cargar datos básicos del estudiante
        _populateSelect('tipoDocumento', dummyData.tiposDocumento);
        _populateSelect('genero', dummyData.generos);
        _populateSelect('barrio', dummyData.barrios);
        _populateSelect('eps', dummyData.eps);
        _populateSelect('institucionRehabilitacion', dummyData.instituciones);
        _populateSelect('frecuenciaRehabilitacion', dummyData.frecuencias);
        _populateSelect('departamento', dummyData.departamentos);
        
        // Cargar nuevos datos del estudiante
        _populateSelect('diagnostico', dummyData.diagnosticos);
        _populateSelect('frecuenciaMedicamentos', dummyData.frecuenciasMedicamentos);
        _populateSelect('horarioMedicamentos', dummyData.horariosMedicamentos);
        _populateSelect('grupoEtnico', dummyData.gruposEtnicos);
        _populateSelect('establecimientoEducativo', dummyData.establecimientos);
        
        // Cargar datos de la madre
        _populateSelect('tipoDocumentoMadre', dummyData.tiposDocumento);
        _populateSelect('grupoEtnicoMadre', dummyData.gruposEtnicos);
        _populateSelect('nivelEducativoMadre', dummyData.nivelesEducativos);
        _populateSelect('ingresosMadre', dummyData.ingresos);
        _populateSelect('departamentoMadre', dummyData.departamentos);
        _populateSelect('ciudadMadre', dummyData.ciudades);
        
        // Cargar datos del padre
        _populateSelect('tipoDocumentoPadre', dummyData.tiposDocumento);
        _populateSelect('grupoEtnicoPadre', dummyData.gruposEtnicos);
        _populateSelect('nivelEducativoPadre', dummyData.nivelesEducativos);
        _populateSelect('ingresosPadre', dummyData.ingresos);
        _populateSelect('departamentoPadre', dummyData.departamentos);
        _populateSelect('ciudadPadre', dummyData.ciudades);
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
            
            // Ocultar todos los grupos condicionales
            epsGroup.style.display = 'none';
            rehabilitacionDetails.style.display = 'none';
            diagnosticoGroup.style.display = 'none';
            medicamentosDetails.style.display = 'none';
            grupoEtnicoGroup.style.display = 'none';
            historialEducativoDetails.style.display = 'none';
            historialEducativoDetails2.style.display = 'none';
            grupoEtnicoMadreGroup.style.display = 'none';
            grupoEtnicoPadreGroup.style.display = 'none';
            
            // Limpiar mensajes de error
            const errorMessages = studentForm.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.classList.remove('show'));
            
            const formGroups = studentForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));
            
            // Limpiar edad
            edadInput.value = '';
            
            // Resetear selects de municipios
            municipioSelect.innerHTML = '<option value="">Seleccione departamento primero...</option>';
            municipioMadreSelect.innerHTML = '<option value="">Seleccione departamento primero...</option>';
            municipioPadreSelect.innerHTML = '<option value="">Seleccione departamento primero...</option>';
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
        
        // Validación numérica para campos del estudiante
        numeroDocumentoInput.addEventListener('input', () => _validateNumericInput(numeroDocumentoInput));
        telefonoInput.addEventListener('input', () => _validateNumericInput(telefonoInput));
        
        // Validación numérica para campos de la madre
        if (numeroDocumentoMadreInput) {
            numeroDocumentoMadreInput.addEventListener('input', () => _validateNumericInput(numeroDocumentoMadreInput));
        }
        if (telefonoMadreInput) {
            telefonoMadreInput.addEventListener('input', () => _validateNumericInput(telefonoMadreInput));
        }
        if (telefonoEmpresaMadreInput) {
            telefonoEmpresaMadreInput.addEventListener('input', () => _validateNumericInput(telefonoEmpresaMadreInput));
        }
        
        // Validación numérica para campos del padre
        if (numeroDocumentoPadreInput) {
            numeroDocumentoPadreInput.addEventListener('input', () => _validateNumericInput(numeroDocumentoPadreInput));
        }
        if (telefonoPadreInput) {
            telefonoPadreInput.addEventListener('input', () => _validateNumericInput(telefonoPadreInput));
        }
        if (telefonoEmpresaPadreInput) {
            telefonoEmpresaPadreInput.addEventListener('input', () => _validateNumericInput(telefonoEmpresaPadreInput));
        }
        
        // Radio buttons condicionales del estudiante
        afiliadoSaludRadios.forEach(radio => {
            radio.addEventListener('change', _handleAfiliadoSaludChange);
        });
        
        asisteRehabilitacionRadios.forEach(radio => {
            radio.addEventListener('change', _handleAsisteRehabilitacionChange);
        });
        
        tieneDiagnosticoRadios.forEach(radio => {
            radio.addEventListener('change', _handleTieneDiagnosticoChange);
        });
        
        consumeMedicamentosRadios.forEach(radio => {
            radio.addEventListener('change', _handleConsumeMedicamentosChange);
        });
        
        perteneceGrupoEtnicoRadios.forEach(radio => {
            radio.addEventListener('change', _handlePerteneceGrupoEtnicoChange);
        });
        
        ingresoSistemaEducativoRadios.forEach(radio => {
            radio.addEventListener('change', _handleIngresoSistemaEducativoChange);
        });
        
        // Radio buttons condicionales de los padres
        perteneceGrupoEtnicoMadreRadios.forEach(radio => {
            radio.addEventListener('change', _handlePerteneceGrupoEtnicoMadreChange);
        });
        
        perteneceGrupoEtnicoPadreRadios.forEach(radio => {
            radio.addEventListener('change', _handlePerteneceGrupoEtnicoPadreChange);
        });
        
        // Departamento change para estudiante y padres
        departamentoSelect.addEventListener('change', _handleDepartamentoChange);
        
        if (departamentoMadreSelect) {
            departamentoMadreSelect.addEventListener('change', _handleDepartamentoMadreChange);
        }
        
        if (departamentoPadreSelect) {
            departamentoPadreSelect.addEventListener('change', _handleDepartamentoPadreChange);
        }
        
        // Radio buttons para nuevas secciones
        padresVivenJuntosRadios.forEach(radio => {
            radio.addEventListener('change', _handlePadresVivenJuntosChange);
        });
        
        enfermedadPrimerAnoRadios.forEach(radio => {
            radio.addEventListener('change', _handleEnfermedadPrimerAnoChange);
        });
        
        // Event listeners para campos con "Otro" opcional
        const conQuienViviaPrimerosMeses = document.getElementById('conQuienViviaPrimerosMeses');
        if (conQuienViviaPrimerosMeses) {
            conQuienViviaPrimerosMeses.addEventListener('change', () => 
                _handleSelectWithOther('conQuienViviaPrimerosMeses', 'otrosConQuienViviaGroup'));
        }
        
        const dondeDormia = document.getElementById('dondeDormia');
        if (dondeDormia) {
            dondeDormia.addEventListener('change', () => 
                _handleSelectWithOther('dondeDormia', 'otroDondeDormiaGroup'));
        }
        
        const comoSeCalmaba = document.getElementById('comoSeCalmaba');
        if (comoSeCalmaba) {
            comoSeCalmaba.addEventListener('change', () => 
                _handleSelectWithOther('comoSeCalmaba', 'otroComoSeCalmabaGroup'));
        }
        
        const comoRegulabaSueno = document.getElementById('comoRegulabaSueno');
        if (comoRegulabaSueno) {
            comoRegulabaSueno.addEventListener('change', () => 
                _handleSelectWithOther('comoRegulabaSueno', 'otroComoRegulabaSuenoGroup'));
        }
        
        const desarrolloSocial = document.getElementById('desarrolloSocial');
        if (desarrolloSocial) {
            desarrolloSocial.addEventListener('change', () => 
                _handleSelectWithOther('desarrolloSocial', 'otroDesarrolloSocialGroup'));
        }
        
        const actividadesFamiliares = document.getElementById('actividadesFamiliares');
        if (actividadesFamiliares) {
            actividadesFamiliares.addEventListener('change', () => 
                _handleSelectWithOther('actividadesFamiliares', 'otroActividadesFamiliaresGroup'));
        }
        
        const nivelInicioEscolaridad = document.getElementById('nivelInicioEscolaridad');
        if (nivelInicioEscolaridad) {
            nivelInicioEscolaridad.addEventListener('change', () => 
                _handleSelectWithOther('nivelInicioEscolaridad', 'otroNivelInicioGroup'));
        }
        
        // Event listener para alimentación
        const alimentacionPrimerAno = document.getElementById('alimentacionPrimerAno');
        if (alimentacionPrimerAno) {
            alimentacionPrimerAno.addEventListener('change', _handleAlimentacionChange);
        }
        
        // Event listeners para checkboxes de dificultades motor
        const dificultadesMotorCheckboxes = document.querySelectorAll('input[name="dificultadesMotor"]');
        dificultadesMotorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', _handleDificultadesMotorChange);
        });
        
        // Funciones globales para botones dinámicos
        window.addCompositionInfo = addCompositionInfo;
        window.removeComposition = removeComposition;
        window.addSupportInfo = addSupportInfo;
        window.removeSupportInfo = removeSupportInfo;
        
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
