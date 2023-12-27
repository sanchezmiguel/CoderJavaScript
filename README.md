# Préstamos Javascript - Proyecto CoderHouse

Este repositorio contiene un programa en Javascript diseñado para realizar cálculos relacionados con préstamos. Este proyecto fue creado como parte del curso de Javascript en CoderHouse.

## Funcionalidades Principales

1. **Calcular Nuevo Préstamo:**
   - Permite al usuario ingresar el monto del préstamo, la tasa de interés anual y el plazo en meses para calcular la mensualidad y el total a pagar.

2. **Mostrar Resultados:**
   - Muestra los resultados detallados de los préstamos calculados, incluyendo la mensualidad, el total a pagar, la tasa de interés, el interés mensual y el interés anual.

3. **Buscar y Filtrar:**
   - Ofrece opciones para realizar búsquedas y filtrados en los préstamos existentes, incluyendo búsqueda por mensualidad y filtrado por tasa de interés, monto inicial y plazo en meses.

4. **Listar Personas:**
   - Muestra un listado de personas registradas, incluyendo su nombre, teléfono y la cantidad de préstamos que tienen.

5. **Salir:**
   - Finaliza el programa.

## Autor

**Nombre:** Pablo Miguel Sanchez Serrano

## Instrucciones de Uso

1. Clona este repositorio.
2. Abre el archivo `index.html` en tu navegador web.
3. Utiliza las opciones disponibles en el programa según tus necesidades.

## Fórmula Utilizada

El cálculo mensual se realiza utilizando la fórmula:

```plaintext
Pago Mensual = Préstamo × [(Tasa de interés mensual × (1 + Tasa de interés mensual)^Número total de pagos) / ((1 + Tasa de interés mensual)^Número total de pagos - 1)]
