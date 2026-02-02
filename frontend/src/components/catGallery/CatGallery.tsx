import { useNavigate } from "react-router-dom";
import amber from "../../assets/GallerySelectMichi/Amber.png";
import kuro from "../../assets/GallerySelectMichi/Kuro.png";
import mandarina from "../../assets/GallerySelectMichi/Mandarina.png";
import "./CatGallery.scss";

type Cat = {
  id: string;
  name: string;
  image: string;
};

const cats: Cat[] = [
  { id: "Amber", name: "Amber", image: amber },
  { id: "Kuro", name: "Kuro", image: kuro },
  { id: "Mandarina", name: "Mandarina", image: mandarina },
];

export default function CatGallery() {
  const navigate = useNavigate();

  const handleSelectCat = (catId: string) => {
    localStorage.setItem("michi", catId);
    navigate("/");
  };

  return (
    <div className="container">
      {cats.map((cat) => (
        <div
          className="card"
          key={cat.id}
          onClick={() => handleSelectCat(cat.id)}
        >
          <img src={cat.image} alt={cat.name} />
          <div className="card__head">{cat.name}</div>
        </div>
      ))}
    </div>
  );
}
