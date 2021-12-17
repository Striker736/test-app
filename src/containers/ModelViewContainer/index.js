import { useEffect, useState, useContext, useMemo } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import ModelInfo from "components/ModelInfo";
import ModelPhotos from "components/ModelPhotos";
import { OptionContext } from "contexts/OptionContext";

const StyledLayout = styled(Layout)`
  background: #fff;
  width: 90%;
  margin-left: 5%;
  padding-top: 80px;
`;

const ModelViewContainer = (props) => {
  const { filterOption } = useContext(OptionContext);
  const [modelImages, setModelImages] = useState({
    imagesSortedbyDate: [],
    imagesSortedbyRate: [],
  });

  const isValidData = (data) => {
    return data.Images && data.Name && data.Surname;
  };

  useEffect(() => {
    if (isValidData(props.data)) {
      const _imagesSortedbyDate = [...props.data.Images];
      const _imagesSortedbyRate = [...props.data.Images];
      _imagesSortedbyDate.sort((a, b) =>
        a.DateCreated.localeCompare(b.DateCreated)
      );
      _imagesSortedbyRate.sort(
        (a, b) => b.Rating.averageRating - a.Rating.averageRating
      );
      setModelImages({
        imagesSortedbyDate: [..._imagesSortedbyDate],
        imagesSortedbyRate: [..._imagesSortedbyRate],
      });
    }
  }, [props]);

  const renderModelPhotos = useMemo(() => {
    return (
      <ModelPhotos
        images={
          filterOption === "date"
            ? modelImages.imagesSortedbyDate
            : modelImages.imagesSortedbyRate
        }
      />
    );
  }, [filterOption, modelImages]);

  return (
    <StyledLayout>
      {isValidData(props.data) ? <ModelInfo data={props.data} /> : null}
      {renderModelPhotos}
    </StyledLayout>
  );
};

export default ModelViewContainer;
