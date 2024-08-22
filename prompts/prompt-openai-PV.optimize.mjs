export const prompt1_PV_optimize = {
  prompt: `{
  Propuesta de Valor para EmprendeLatam

Introducción:
Quiero que actúes como un experto en emprendimiento y marketing, con amplia experiencia en la creación de planes de negocios para emprendedores. Además, quiero que comuniques tus ideas de manera clara, sencilla y efectiva.

Estoy desarrollando un plan de negocios para mi empresa, EmprendeLatam, una incubadora de empresas que genera planes de negocios autosugestionados. Ya he generado un diagnóstico inicial del emprendimiento, el cual te proporcionaré más adelante para que lo uses como base para ajustar tus respuestas. También incluiré comentarios adicionales que deberás incorporar en tu respuesta.

Empezaremos con la Propuesta de Valor. Necesito que sea creativa, sencilla e innovadora, destacando nuestra misión de ser líderes en el desarrollo de emprendedores en toda Latinoamérica. Queremos ser un agente transformador en la consecución de los objetivos empresariales de nuestros clientes, con un fuerte enfoque en la responsabilidad social.

Contexto:

EmprendeLatam tiene previsto iniciar operaciones en Costa Rica y Bolivia simultáneamente, con el lanzamiento programado para enero de 2024.
Estamos en la fase de desarrollo del software que facilitará este lanzamiento.
Tareas:

Propuesta de Valor:

Crea una propuesta de valor que sea diferenciada y que capture la esencia de nuestra misión y visión. Enfócate en ser una empresa líder en el desarrollo de emprendedores en toda Latinoamérica, con un fuerte compromiso con la responsabilidad social.
Usa un enfoque innovador y atractivo que resuene con nuestra audiencia objetivo.
Relación Problema-Solución:

Identifica el problema principal que enfrenta nuestro público objetivo. Asegúrate de que sea un problema real y tangible.
Describe los planes y estrategias que EmprendeLatam implementará para abordar y resolver este problema.
Segmentación de Mercado:

Identifica y describe los segmentos de mercado a los que dirigiremos nuestro producto o servicio. Incluye detalles como ubicación, edad, aspiraciones y otras características relevantes.
Beneficios para el Cliente:

Enumera los beneficios específicos que cada segmento de mercado obtendrá de nuestra solución. Enfócate en los beneficios, no en las características del producto o servicio.
Acciones del Cliente:

Describe las funciones fundamentales que nuestros clientes quieren lograr con nuestro producto o servicio. Analiza las acciones prácticas, emocionales y sociales que deben realizar para obtener los beneficios deseados.
Tamaño de Mercado:

Estima el tamaño del mercado para cada segmento identificado. Proporciona un cálculo aproximado, reconociendo que no es necesario que sea preciso, pero debe estar basado en datos relevantes.
Formato:
La respuesta debe estar en formato JSON estandarizado, siguiendo esta estructura:
  "propuesta_de_valor": {
    "descripcion": "Texto descriptivo de la propuesta de valor."
  },
  "relacion_problema_solucion": {
    "problema_principal": "Descripción del problema identificado.",
    "planes_y_estrategias": "Descripción de las estrategias para solucionar el problema."
  },
  "segmentacion_de_mercado": [
    {
      "nombre_segmento": "Nombre del segmento de mercado.",
      "descripcion": "Descripción del segmento, incluyendo ubicación, edad, aspiraciones y características relevantes."
    }
  ],
  "beneficios_para_el_cliente": [
    {
      "segmento": "Nombre del segmento de mercado.",
      "beneficios": "Descripción de los beneficios que cada segmento obtiene de la solución."
    }
  ],
  "acciones_del_cliente": [
    {
      "segmento": "Nombre del segmento de mercado.",
      "acciones": {
        "practicas": "Acciones prácticas que los clientes deben realizar.",
        "emocionales": "Acciones emocionales que los clientes deben realizar.",
        "sociales": "Acciones sociales que los clientes deben realizar."
      }
    }
  ],
  "tamano_de_mercado": [
    {
      "segmento": "Nombre del segmento de mercado.",
      "estimacion_mercado": "Estimación del tamaño del mercado para el segmento."
    }
  ]
}`,
};