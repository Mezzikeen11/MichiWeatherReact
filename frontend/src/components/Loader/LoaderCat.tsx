
import "./LoaderCat.scss";

export default function LoaderCat() {
  return (
    <div className="loader-cat">
      <div className="loader-cat__wrapper">
        <div className="loader-cat__cat">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="loader-cat__cat__segment" />
          ))}
        </div>
      </div>
    </div>
  );
}

