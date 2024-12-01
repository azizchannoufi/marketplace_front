import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{
        width: '100%',  // Prend toute la largeur du conteneur
        height: 'auto', // Hauteur ajustée automatiquement
        display: 'grid', // Utilisation d'une grille pour plus de contrôle
        gridTemplateColumns: 'repeat(2, 1fr)',  // 2 colonnes
        gridTemplateRows: 'repeat(2, 1fr)', // 2 lignes
        gap: '16px', // Espacement entre les images
      }}
      variant="quilted"
      cols={2}  // 2 colonnes
      rowHeight={300}  // Ajustement de la hauteur des lignes pour des images plus grandes
    >
      {itemData.slice(0, 4).map((item) => (  // Affiche seulement les 4 premières images
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 300, item.rows, item.cols)}  // Utilisation d'un plus grand size pour chaque image
            alt={item.title}
            loading="lazy"
            style={{
              objectFit: 'cover', // Couvre l'espace disponible sans déformer l'image
              width: '100%', // Prend toute la largeur de la cellule
              height: '100%', // Prend toute la hauteur de la cellule
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 1,
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
];
