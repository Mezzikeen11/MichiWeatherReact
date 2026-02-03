import CatGallery from "../../components/catGallery/CatGallery";
import "../../components/catGallery/CatGallery.scss";

export default function SelectCat() {
  return (
    <div className="cat-gallery-page">
      <h1 className="title">Escoge tu mascota preferida</h1>
      <p className="description">
        Cada una de ellas tiene una personalidad diferente y te recibirá con el
        detalle del clima de una forma única.
      </p>

      <CatGallery />
    </div>
  );
}
