import { useContext } from "react";
import { Image } from "antd";
import styled from "styled-components";
import { OptionContext } from "contexts/OptionContext";
import { MDBRow } from "mdbreact";

const ModelPhotosComponent = styled.div`
  background: #e0e0e0;
  padding: 3px;
  margin-top: 40px;
  .masonry-with-columns-2 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .image-card {
    background: #000;
    height: ${(props) => props.height};
    color: white;
    margin: 0.5rem;
    -webkit-box-flex: 1;
    -webkit-flex: 1 0 auto;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    position: relative;
  }
  .image-detail {
    background: #3bb3ea;
    color: #fff;
    position: absolute;
    top: 0;
    z-index: 1;
  }
  .ant-image {
    margin: 0 auto;
    display: flex;
  }
`;

const ModelPhotos = (props) => {
  const { images } = props;
  const { sizeOption, filterOption } = useContext(OptionContext);

  const getImageUrl = (image) => {
    if (image.PrivateGuid)
      return (
        "https://96f87b6181760dbb772e-78b99eb4ed553a663b0d14383681b63a.ssl.cf3.rackcdn.com/" +
        image.Guid +
        "__" +
        image.PrivateGuid +
        ".jpg"
      );
    return (
      "https://96f87b6181760dbb772e-78b99eb4ed553a663b0d14383681b63a.ssl.cf3.rackcdn.com/" +
      image.Guid +
      ".jpg"
    );
  };

  const getHeight = () => {
    switch (sizeOption) {
      case "small":
        return "10rem";
      case "medium":
        return "15rem";
      default:
        return "20rem";
    }
  };

  const getWidth = (image) => {
    switch (sizeOption) {
      case "small":
        return (image.Width * 10) / image.Height + "rem";
      case "medium":
        return (image.Width * 15) / image.Height + "rem";
      default:
        return (image.Width * 20) / image.Height + "rem";
    }
  };

  return (
    <ModelPhotosComponent height={getHeight()}>
      <div className="masonry-with-columns-2" id="masonry-with-columns-2">
        {images.map((image, index) => {
          return (
            <div key={index} className="image-card">
              <div className="image-detail">
                {filterOption === "date"
                  ? image.DateCreated
                  : "Rating: " + image.Rating.averageRating}
              </div>
              <Image
                src={getImageUrl(image)}
                height={getHeight()}
                width={getWidth(image)}
              />
            </div>
          );
        })}
      </div>
    </ModelPhotosComponent>
  );
};

export default ModelPhotos;
