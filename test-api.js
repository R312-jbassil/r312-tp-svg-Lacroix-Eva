// Test script pour vérifier l'API
const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:4321/api/generate-svg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Un cercle rouge'
      })
    });
    
    const data = await response.json();
    console.log('Réponse de l\'API:', data);
  } catch (error) {
    console.error('Erreur:', error);
  }
};

testAPI();