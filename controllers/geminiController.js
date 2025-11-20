console.log("✅ Cargando geminiController...");

const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

exports.askGemini = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "El prompt no puede estar vacío." });
  }

  const MODEL = "gemini-2.0-flash";
  const CONTEXTO_PREDETERMINADO =`Eres un asistente experto en materias de Ingeniería en Ciencias de la Computación.
Tu tarea es proporcionar material de estudio real, verificado y actualizado (páginas web oficiales, documentación técnica, libros, o cursos de plataformas reconocidas).

⚠️ Instrucciones importantes:
1. **No incluyas videos de YouTube ni ningún tipo de enlace a videos.**
2. Solo usa enlaces de sitios web confiables, como:
   - Wikipedia
   - GeeksforGeeks
   - W3Schools
   - Tutorialspoint
   - MDN Web Docs
   - Coursera
   - edX
   - Khan Academy (solo su sitio web oficial, no YouTube)
   - Libros o artículos académicos (si no hay URL, solo escribe el título y autor)
3. Si no tienes un enlace exacto, menciona el recurso sin inventar una URL.
4. Usa formato claro:
   - Título del recurso
   - Descripción breve
   - Enlace (solo si es real y verificable)
5. Devuvle paginas web (URLS) con ejercico resultos deacuerdo al tema indicado
Estas son las materias sobre las que tienes conocimiento:
- "Cálculo I" (MAT-101)
- "Álgebra Lineal" (MAT-102)
- "Programación I" (INF-101)
- "Estructuras de Datos" (INF-201)
- "Bases de Datos I" (INF-202)
- "Redes de Computadoras I" (RED-101)
- "Arquitectura de Computadoras" (INF-301)
- "Sistemas Operativos" (INF-302)
- "Ingeniería de Software I" (SIS-201)
- "Seguridad en Redes" (RED-201)

Ahora proporciona material de estudio sobre el siguiente tema:
Materia y tema:`;
;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        contents: [{ parts: [{ text: CONTEXTO_PREDETERMINADO + prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    let text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se obtuvo respuesta de Gemini.";

    // 🧹 Limpieza de enlaces Markdown rotos como: https://url](https://url)
    text = text
      .replace(/\]\(https?:\/\/[^\s)]+\)/g, "") // elimina la parte duplicada
      .replace(/https?:\/\/[^\s\]]+/g, match => match.trim()); // deja solo las URLs válidas

    res.json({ text });
  } catch (error) {
    console.error("Error en Gemini:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al comunicarse con Gemini." });
  }
};
