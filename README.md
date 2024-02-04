# Calculadora de Préstamos en JavaScript

## Descripción
Esta aplicación web, desarrollada por Pablo Miguel Sanchez, es una Calculadora de Préstamos que permite a los usuarios calcular cuotas mensuales y visualizar un historial de resultados. Además, se ha implementado un sistema de interés adicional para monedas distintas al dólar. La aplicación utiliza tecnologías como JavaScript, SweetAlert, Toastify, Luxon y Bootstrap para ofrecer una experiencia atractiva y funcional.

## Funcionalidades Implementadas

### Calculadora de Cuotas
1. **Ingreso de Datos:**
    - Monto del préstamo.
    - Tasa de interés.
    - Plazo en meses.
    - Tipo de moneda (Dólar estadounidense, Peso Uruguayo, Euro, Libra esterlina, u otros cargados dinámicamente).

2. **Cálculo de Cuota:**
    - La aplicación realiza el cálculo de la cuota mensual y el total del préstamo en base a los datos ingresados.

### Historial de Resultados
1. **Visualización del Historial:**
    - Se presenta un historial de resultados que incluye detalles como monto, tasa de interés, plazo, cuota mensual, total del préstamo y la fecha de cálculo.

2. **Filtrado por Moneda:**
    - Los usuarios pueden filtrar los resultados por tipo de moneda, lo que facilita la revisión de préstamos específicos.

### Funcionalidad Extra
1. **Interés Adicional:**
    - Se ha implementado un sistema de interés adicional para monedas distintas al dólar. Este interés extra se refleja en la tasa de interés utilizada en el cálculo.

### Interfaz de Usuario Mejorada
1. **Diseño Atractivo:**
    - Se ha utilizado el framework Bootstrap para mejorar la presentación de los resultados, empleando cards para una visualización más atractiva.

2. **Filtrado Interactivo:**
    - La interfaz proporciona un menú desplegable que permite a los usuarios filtrar los resultados según el tipo de moneda.

## Autor
- **Nombre:** Pablo Miguel Sanchez

## Acceso al Repositorio
Para acceder al código fuente y el repositorio de este proyecto, visite el [Repositorio en GitHub](https://github.com/sanchezmiguel/CoderJavaScript).

## Tecnologías Utilizadas
1. **JavaScript:**
    - Uso de JavaScript para la lógica del cálculo de préstamos y manipulación del DOM.

2. **SweetAlert y Toastify:**
    - Integración de las bibliotecas SweetAlert y Toastify para mostrar mensajes y alertas de manera atractiva.

3. **Luxon:**
    - Integración de Luxon para el manejo de fechas y horas.

4. **Bootstrap:**
    - Utilización del framework Bootstrap para mejorar la interfaz de usuario.

## Fetch para Obtener Tasas de Cambio
La aplicación realiza una solicitud Fetch para obtener las tasas de cambio de monedas desde la API pública 'https://open.er-api.com/v6/latest'. Este proceso se lleva a cabo en la función `cargarTiposMoneda()` al cargar la página.

## Instrucciones de Uso
1. Abra el archivo `index.html` en un navegador web para acceder a la aplicación.
2. Complete los campos del formulario con los datos del préstamo.
3. Haga clic en "Calcular Cuota" para obtener los resultados.
4. Explore el historial de resultados y utilice el menú desplegable para filtrar por tipo de moneda.

## Licencia
Este proyecto se encuentra bajo la licencia [MIT](LICENSE).

**¡Gracias por utilizar la Calculadora de Préstamos en JavaScript!**
