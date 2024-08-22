export const promtp3_PM_optimize = {
  prompt: `Plan de Marketing para EmprendeLatam

Actúa como un especialista en creación de planes de negocios para emprendedores, con un enfoque en estrategias de marketing, negocios creativos, y marketing digital. Quiero que combines estos conocimientos para desarrollar un plan de negocio efectivo para mi cliente, EmprendeLatam, utilizando la información que te proporcionaré al final de este prompt.

1. Segmentación de Mercado

Define y prioriza los segmentos de mercado que el producto o servicio de EmprendeLatam podría alcanzar, tanto a corto como a largo plazo.
Responde las siguientes preguntas para cada segmento:
¿Qué tan tangible es este segmento?
¿Este segmento está dispuesto a pagar? ¿Con qué frecuencia?
¿El producto/servicio se vende directamente a este segmento?
2. Análisis de Problemas y Beneficios

Revisa los problemas de los clientes y los beneficios identificados en la Propuesta de Valor. Selecciona los más relevantes para los clientes de EmprendeLatam.
3. Embudo de Marketing

Parte Superior del Embudo (TOFU)

¿Cómo atraerás a los clientes potenciales hacia EmprendeLatam?
Detalla las actividades que realizarás para dar a conocer el producto/servicio.
Medio del Embudo (MOFU)

¿Cómo convertirás a los visitantes en clientes potenciales interesados?
Enumera las estrategias para enganchar a los visitantes y fomentar su interés en EmprendeLatam.
Parte Inferior del Embudo (BOFU)

¿Cómo convertirás a los clientes potenciales en clientes reales?
Describe las acciones clave para cerrar ventas.
Selección de Actividades

Por cada segmento de mercado, elige hasta tres actividades por nivel del embudo y explica:
¿Por qué este modelo es el adecuado para este segmento?
Justifica tus elecciones y las proyecciones de conversión.
¿Este modelo asegura la viabilidad a corto plazo?
4. Mapa de Competidores

Características y Atributos del Producto/Servicio

Enumera las principales características y atributos que definen tu producto/servicio.
Establece una escala para evaluar estos atributos desde la perspectiva del cliente.
Competidores y Ranking

Identifica y clasifica a los competidores más relevantes en base a los atributos seleccionados.
Comparte un análisis de cómo EmprendeLatam se posiciona frente a estos competidores.
5. Mapa de Grupos de Interés

Identificación de Grupos de Interés

Enumera los proveedores, socios estratégicos, actores del ecosistema y roles del equipo necesarios para EmprendeLatam.
Intercambio de Valor

Define cómo se intercambiará valor con estos socios, y cómo esto beneficiará tanto a EmprendeLatam como a sus aliados.
Canal de Distribución

Establece y selecciona las cadenas de distribución clave para EmprendeLatam.
Mapa Final de Grupos de Interés

Resume tu estrategia, explicando la elección de socios y canales, y la razón para externalizar o realizar internamente ciertas actividades.
6. Conceptualización y Creación de Modelos de Negocio

Modelos de Negocio
Selecciona y describe brevemente los modelos de negocio más adecuados para cada segmento de mercado.
Justifica la elección de estos modelos en función de su capacidad para adaptarse a las necesidades del negocio.
7. Estrategia de Ventas

Embudo de Marketing
Calcula y detalla el embudo de marketing para cada segmento de mercado, utilizando las actividades seleccionadas en cada nivel del embudo.
8. Recomendaciones de Marketing Digital

Proporciona estrategias específicas de marketing digital para maximizar el alcance y la efectividad del plan de negocio.
Formato de Respuesta en JSON

Las respuestas deben seguir el siguiente formato JSON estandarizado:
{
  "segmentacion_mercado": [
    {
      "segmento": "Nombre del segmento",
      "tangible": "Sí/No",
      "paga": "Sí/No",
      "frecuencia_pago": "Frecuencia de pago (e.g., mensual, trimestral)",
      "venta_directa": "Sí/No"
    }
  ],
  "analisis_problemas_beneficios": [
    {
      "problema_cliente": "Descripción del problema",
      "beneficio_propuesto": "Descripción del beneficio"
    }
  ],
  "embudo_marketing": {
    "TOFU": [
      {
        "segmento": "Nombre del segmento",
        "actividades": [
          "Actividad 1",
          "Actividad 2",
          "Actividad 3"
        ]
      }
    ],
    "MOFU": [
      {
        "segmento": "Nombre del segmento",
        "actividades": [
          "Actividad 1",
          "Actividad 2",
          "Actividad 3"
        ]
      }
    ],
    "BOFU": [
      {
        "segmento": "Nombre del segmento",
        "actividades": [
          "Actividad 1",
          "Actividad 2",
          "Actividad 3"
        ]
      }
    ]
  },
  "mapa_competidores": {
    "caracteristicas": [
      "Característica 1",
      "Característica 2",
      "Característica 3"
    ],
    "atributos": [
      {
        "atributo": "Nombre del atributo",
        "escala": {
          "debil": "Descripción del nivel débil",
          "bueno": "Descripción del nivel bueno",
          "genial": "Descripción del nivel genial"
        }
      }
    ],
    "competidores_ranking": [
      {
        "competidor": "Nombre del competidor",
        "atributo_comparado": "Nombre del atributo",
        "ranking": "Posición en el ranking (e.g., 1-5)"
      }
    ]
  },
  "mapa_grupos_interes": {
    "grupos_interes": [
      {
        "tipo": "Proveedor/Socio Estratégico/Actor del Ecosistema",
        "nombre": "Nombre del grupo de interés",
        "recursos_proporcionados": [
          "Recurso 1",
          "Recurso 2"
        ]
      }
    ],
    "intercambio_valor": [
      {
        "grupo_interes": "Nombre del grupo de interés",
        "valor_proporcionado": "Descripción del valor proporcionado"
      }
    ],
    "canal_distribucion": [
      {
        "cadena": "Nombre de la cadena",
        "segmento_aplicado": "Nombre del segmento aplicado"
      }
    ],
    "seleccion_grupos_interes": {
      "proveedores": [
        "Proveedor 1",
        "Proveedor 2"
      ],
      "socios_estrategicos": [
        "Socio 1",
        "Socio 2"
      ],
      "actores_ecosistema": [
        "Actor 1",
        "Actor 2"
      ]
    }
  },
  "modelos_negocio": [
    {
      "segmento": "Nombre del segmento",
      "modelo_negocio": "Descripción del modelo de negocio",
      "justificacion": "Justificación de la elección del modelo"
    }
  ],
  "estrategia_ventas": [
    {
      "segmento": "Nombre del segmento",
      "embudo": {
        "TOFU": {
          "actividad_principal": "Actividad principal en TOFU",
          "conversion_estimada": "Porcentaje de conversión estimada"
        },
        "MOFU": {
          "actividad_principal": "Actividad principal en MOFU",
          "conversion_estimada": "Porcentaje de conversión estimada"
        },
        "BOFU": {
          "actividad_principal": "Actividad principal en BOFU",
          "conversion_estimada": "Porcentaje de conversión estimada"
        }
      }
    }
  ],
  "recomendaciones_marketing_digital": [
    "Recomendación 1",
    "Recomendación 2",
    "Recomendación 3"
  ]
}`,
};