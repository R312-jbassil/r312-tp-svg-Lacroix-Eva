import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export async function POST({ request }) {
  try {
    const data = await request.json();
    console.log("Données reçues pour mise à jour :", data);

    // id obligatoire pour update
    if (!data.id) throw new Error("ID manquant");

    const record = await pb.collection(Collections.Svgs).update(data.id, {
      code_svg: data.code_svg,
      chat_history: data.chat_history,
    });

    console.log("SVG mis à jour avec succès :", record.id);

    return new Response(JSON.stringify({ success: true, id: record.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur updateSVG :", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}