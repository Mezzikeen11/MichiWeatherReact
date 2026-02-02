import amber from "../../assets/GallerySelectMichi/Amber.png";
import kuro from "../../assets/GallerySelectMichi/Kuro.png";
import mandarina from "../../assets/GallerySelectMichi/Mandarina.png";
import { useNavigate } from "react-router-dom";
import { useCat } from "../../context/CatContext";
import { type Cat } from "../../types/cat";
import "./CatGallery.scss";

const cats: Cat[] = [
  { id: "Amber", name: "Amber", image: amber },
  { id: "Kuro", name: "Kuro", image: kuro },
  { id: "Mandarina", name: "Mandarina", image: mandarina },
];

export default function CatGallery() {
  const { selectCat } = useCat();
  const navigate = useNavigate();

  const handleSelect = (cat: Cat) => {
    selectCat(cat);
    navigate("/weather"); // o a donde vaya tu clima
  };

  return (
    <div className="container">
      {cats.map((cat) => (
        <div
          className="card"
          key={cat.id}
          onClick={() => handleSelect(cat)}
        >
          <img src={cat.image} alt={cat.name} />
          <div className="card__head">{cat.name}</div>
        </div>
      ))}
    </div>
  );
}
