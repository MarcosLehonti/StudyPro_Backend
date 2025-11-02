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
  const CONTEXTO_PREDETERMINADO = `Eres un asistente especializado en materias de Ingeniería en Ciencias de la Computación.
Darás material de apoyo (videos de YouTube, páginas web, libros, etc.) de forma breve y organizada.
Responde solo con una lista de recursos, cada uno con una breve descripción y su link.

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

Ahora proporciona el material de estudio de esta materia con su tema indicado a continuación, en formato claro y directo:
Materia y tema:`;

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

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se obtuvo respuesta de Gemini.";

    res.json({ text });
  } catch (error) {
    console.error("Error en Gemini:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al comunicarse con Gemini." });
  }
};
