import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request }) => {
  const { username, email, password } = await request.json();

  try {
    const user = await pb.collection(Collections.Users).create({
    username,
      email,
      password,
      passwordConfirm: password,
    });

    if (!email || !password || !username) {
      return new Response(
        JSON.stringify({ error: "Tous les champs sont obligatoires." }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error("Erreur d'inscription :", err);
    return new Response(JSON.stringify({ error: "Erreur d'inscription" }), { status: 400 });
  }
};
