export const prompt2_PEI_optimized = {
  prompt: `Plan Estratégico y de Impacto para EmprendeLatam

Introducción:
Quiero que actúes como un especialista en emprendimiento, experto en marketing, creación de negocios creativos y especialista en cafeterías y similares. Estoy desarrollando un plan de negocios para mi cliente, EmprendeLatam, para el cual ya he generado un diagnóstico inicial. Este diagnóstico te lo proporcionaré al final para que lo utilices como base para ajustar tus respuestas y añadir cualquier comentario adicional que te incluya.

Empezaremos con la creación de un Plan Estratégico y un Plan de Impacto que sean creativos, sencillos e innovadores, destacándose por ser algo diferenciador.

Plan Estratégico:

Análisis del Entorno y Competencia:
Responde a las siguientes preguntas:
¿Dónde compito?
¿Cuál es el alcance geográfico?
Análisis FODA:
Realiza un análisis de Fortalezas, Oportunidades, Debilidades y Amenazas para EmprendeLatam.
Análisis de las 5 Fuerzas de Porter:
Evalúa el poder del cliente, el poder del vendedor, los nuevos competidores entrantes, la amenaza de sustitutos y la naturaleza de la rivalidad.
Misión:
Redacta una misión inspiradora y concisa (15-20 palabras) que refleje el objetivo general a largo plazo de EmprendeLatam. Debe responder: "Si tienes éxito, ¿cómo se verá el mundo?"
Visión:
Redacta una visión orientada a la acción que defina el trabajo diario de la empresa. Debe responder: "¿Qué hacemos? ¿Qué queremos ser?"
Valores y Principios:
Redacta los valores y principios fundamentales que guiarán a EmprendeLatam.
Objetivos Estratégicos:
Define los objetivos estratégicos necesarios para desarrollar una estrategia competitiva.
Preguntas Estratégicas:
Responde a las siguientes preguntas:
¿Hacia dónde quiero ir?
¿Dónde compito?
¿Cómo compito?
¿Cómo implemento?
Plan de Impacto:

Beneficiarios Directos:
Identifica a quiénes beneficia directamente la organización.
Contribución a los ODS:
Selecciona los Objetivos de Desarrollo Sostenible (ODS) relevantes para el trabajo que está realizando (máximo 2 ODS).
Indicadores de Éxito (KPIs):
Define los indicadores clave (KPIs) que ayudarán a medir si se están logrando los resultados deseados.
Formato:
La respuesta debe estar en formato JSON estandarizado, siguiendo esta estructura:

{
  "plan_estrategico": {
    "analisis_entorno_y_competencia": {
      "donde_compito": "Descripción del lugar o mercado en el que compite la empresa.",
      "alcance_geografico": "Descripción del alcance geográfico de la empresa."
    },
    "analisis_foda": {
      "fortalezas": ["Fortaleza 1", "Fortaleza 2"],
      "oportunidades": ["Oportunidad 1", "Oportunidad 2"],
      "debilidades": ["Debilidad 1", "Debilidad 2"],
      "amenazas": ["Amenaza 1", "Amenaza 2"]
    },
    "analisis_5_fuerzas_porter": {
      "poder_cliente": "Descripción del poder del cliente.",
      "poder_vendedor": "Descripción del poder del vendedor.",
      "nuevos_competidores": "Descripción de la amenaza de nuevos competidores.",
      "amenaza_sustitutos": "Descripción de la amenaza de sustitutos.",
      "rivalidad": "Descripción de la naturaleza de la rivalidad en el mercado."
    },
    "mision": "Declaración de la misión en 15-20 palabras.",
    "vision": "Declaración orientada a la acción que define el trabajo diario de la empresa.",
    "valores_principios": ["Valor 1", "Valor 2"],
    "objetivos_estrategicos": ["Objetivo 1", "Objetivo 2"],
    "preguntas_estrategicas": {
      "hacia_donde_voy": "Respuesta a la pregunta '¿Hacia dónde quiero ir?'",
      "donde_compito": "Respuesta a la pregunta '¿Dónde compito?'",
      "como_compito": "Respuesta a la pregunta '¿Cómo compito?'",
      "como_implemento": "Respuesta a la pregunta '¿Cómo implemento?'"
    }
  },
  "plan_impacto": {
    "beneficiarios_directos": "Descripción de los beneficiarios directos de la organización.",
    "contribucion_ods": ["ODS 1", "ODS 2"],
    "indicadores_kpi": ["KPI 1", "KPI 2"]
  }
}`,
};