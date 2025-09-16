// src/pages/api/generate-svg.js
import { OpenAI } from 'openai';

// Récupération du token d'accès à partir des variables d'environnement
const HF_TOKEN = import.meta.env.HF_TOKEN;
const NOM_MODEL = import.meta.env.NOM_MODEL;

// Fonction exportée pour gérer les requêtes POST
export const POST = async ({ request }) => {
    try {
        console.log('🚀 Nouvelle requête reçue sur /api/generateSVG');
        console.log('📝 URL:', request.url);
        console.log('🔧 Method:', request.method);
        
        // Extraction du prompt du corps de la requête
        const { prompt } = await request.json();
        console.log('💬 Prompt reçu:', prompt);
    // Initialisation du client OpenAI avec l'URL de base et le token d'API
    const client = new OpenAI({
      baseURL: import.meta.env.HF_URL,
      apiKey: HF_TOKEN,
    });
    
    // ................
    const chatCompletion = await client.chat.completions.create({
    model: NOM_MODEL,
    messages: [
      {
          role: "system", 
          content: "You are an SVG code generator. Generate SVG code for the following prompt." 
      },
        {
            role: "user",
            content: prompt,    
        },
    ],
  });
    // ...............

    // Récupération du message généré par l'API
    const message = chatCompletion.choices[0].message.content || "";
    console.log('🤖 Réponse de l\'IA:', message);
    
    // Recherche d'un élément SVG dans le message généré
    const svgMatch = message.match(/<svg[\s\S]*?<\/svg>/i);
    
    if (svgMatch) {
        console.log('✅ SVG trouvé et extrait avec succès');
    } else {
        console.log('❌ Aucun SVG trouvé dans la réponse');
    }
    
    // Retourne une réponse JSON contenant le SVG ou une chaîne vide si aucun SVG n'est trouvé
    console.log('📤 Envoi de la réponse au client');
    return new Response(JSON.stringify({ svg: svgMatch ? svgMatch[0] : "" }), {
      headers: { "Content-Type": "application/json" },
    });
    
    } catch (error) {
        console.error('❌ Erreur dans l\'API generateSVG:', error);
        return new Response(JSON.stringify({ 
            error: 'Erreur lors de la génération du SVG',
            details: error.message 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};