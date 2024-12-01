import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductForm({  product, userId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // État pour l'image
  const [categorie, setCategorie] = useState(""); // État pour la catégorie
  const categories = ["Parfum Homme", "Parfum Femme", "Parfum Enfant"]; // Options de catégories

  const uploadImageToCloudinary = async (file) => {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64Image = reader.result;
            const response = await axios.post(
              "http://localhost:3001/api/uploadimg",
              { file: base64Image }
            );

            if (response.status === 201) {
              resolve(response.data.url); // Retourne l'URL de l'image
            } else {
              reject("Échec de l'upload de l'image.");
            }
          } catch (error) {
            reject(error.message);
          }
        };

        reader.onerror = () => {
          reject("Erreur lors de la conversion de l'image en base64.");
        };

        reader.readAsDataURL(file); // Convertir l'image en base64
      });
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image :", error);
      throw new Error("Échec de l'upload de l'image.");
    }
  };

  const addNewProduct = async () => {
    try {
      if (image && description && price && categorie && name) {
        // Téléchargement de l'image
        const imageUrl = await uploadImageToCloudinary(image);

        // Enregistrement du produit
        const response = await axios.post("http://localhost:3001/api/products", {
          categorie,
          description,
          id_user: userId,
          image: imageUrl,
          prix: price,
          titre: name,
        });

        if (response.status === 201) {
          alert("Produit ajouté avec succès");
          console.log(response.data._path.segments[1]);
          const id=response.data._path.segments[1]
          return id
        }
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      alert("Une erreur s'est produite lors de l'ajout du produit.");
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setImage(product.image || null);
      setCategorie(product.categorie || "");
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      setCategorie("");
    }
  }, [product]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Stocker le fichier sélectionné
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id=await addNewProduct(); // Appeler la fonction pour enregistrer le produit
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
      <h3>{product ? "Modifier le produit" : "Ajouter un nouveau produit"}</h3>

      {/* Nom */}
      <div className="form-group mb-3">
        <label>Nom du produit</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>

      {/* Description */}
      <div className="form-group mb-3">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
        />
      </div>

      {/* Prix */}
      <div className="form-group mb-3">
        <label>Prix</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="form-control"
        />
      </div>

      {/* Catégorie */}
      <div className="form-group mb-3">
        <label>Catégorie</label>
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          required
          className="form-control"
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Image */}
      <div className="form-group mb-3">
        <label>Photo du produit</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
        />
      </div>

      {/* Bouton */}
      <button type="submit" className="btn btn-primary w-100">
        {product ? "Mettre à jour" : "Ajouter"}
      </button>
    </form>
  );
}

export default ProductForm;
