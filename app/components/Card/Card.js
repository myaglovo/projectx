"use client";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ImageComponent from "../ImageComponent/ImageComponent";
import Ratio from "react-bootstrap/Ratio";

function CardComponent({
  date,
  group,
  image,
  title,
  id,
  setShowModal,
  setDataLoader,
  setModalEvent,
  fetchEventInfo,
}) {
  const [imageURL, setImageURL] = useState(null);

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("ru-RU", options);
  }

  let translatedGroup;
  switch (group) {
    case "culture":
      translatedGroup = "Культура";
      break;
    case "education":
      translatedGroup = "Образование";
      break;
    case "sport":
      translatedGroup = "Спорт";
      break;
    default:
      translatedGroup = "Новая категория";
  }

  const handleCardClick = (id) => {
    setShowModal(true);
    setDataLoader(true);
    setModalEvent("showEventModal");
    fetchEventInfo(id);
  };

  useEffect(() => {
    if (image) {
      const uint8Array = new Uint8Array(image.data);
      const blob = new Blob([uint8Array], { type: "image/jpg" });
      const url = URL.createObjectURL(blob);
      setImageURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  return (
    <Card
      className="col-lg-4 col-md-6 col-sm-12 m-2 flex-shrink-1 overflow-hidden"
      style={{ padding: "0px", maxWidth: "400px" }}
    >
      {imageURL ? (
        <div>
          <ImageComponent imageURL={imageURL} aspectRatio="16x9" />
        </div>
      ) : (
        <Ratio key="16x9" aspectRatio="16x9">
          <div
            src="holder.js/100px250"
            className="ratio"
            fluid
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(161deg,rgba(183,45,253,0),rgba(255,92,177,.97) 77.6%,#ff5cb1),linear-gradient(20deg,#2f1ad4,rgba(51,27,213,.97) 19.22%,rgba(183,45,253,0)),linear-gradient(0deg,#b62dfd,#b62dfd),#c4c4c4",
            }}
          />
        </Ratio>
      )}
      <Card.Body>
        <Card.Text className="badge text-bg-warning">
          {translatedGroup}
        </Card.Text>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{formatDate(date)}</Card.Text>
        <Button onClick={() => handleCardClick(id)} variant="primary">
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
