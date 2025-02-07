import bcryptjs from "bcryptjs";

(async () => {
  const password = "12345"; // Mot de passe brut
  const hashedPassword = await bcryptjs.hash(password, 10); // Hachage

  console.log("Mot de passe haché :", hashedPassword);

  // Comparaison
  const isValid = await bcryptjs.compare(password, hashedPassword);
  console.log("Validation réussie :", isValid);
})();
