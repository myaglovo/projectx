"use client";
import React from "react";
import Ratio from "react-bootstrap/Ratio";
import Image from "next/image";

const ImageComponent = ({ imageURL, aspectRatio }) => {
  return (
    <Ratio key={aspectRatio} aspectRatio={aspectRatio} className="">
      <Image
        src={imageURL}
        alt="Изображение мероприятия"
        loading="lazy"
        className="object-fit-cover"
        width={300}
        height={200}
        quality={20}
        rounded
        fluid
      />
    </Ratio>
  );
};

export default ImageComponent;
