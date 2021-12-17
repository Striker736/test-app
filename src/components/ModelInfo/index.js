import { Row, Col, Select, Radio } from "antd";
import { useContext } from "react";
import styled from "styled-components";
import { OptionContext } from "contexts/OptionContext";

const { Option } = Select;

const ModelInfoComponent = styled.div`
  .text-modelname {
    font-size: 26px;
  }
  .text-normal {
    font-size: 14px;
  }
  .flex-filter {
    display: flex;
    flex-direction: row;
    .text-sortby {
      margin: auto 1rem auto 0;
    }
    justify-content: center;
  }
  .flex-sizegroup {
    box-shadow: 0 3px 2px 1px rgb(0 0 0 / 10%);
    padding: 15px;
    display: flex;
    flex-direction: row;
    width: fit-content;
    margin-left: auto;
    .text-size {
      margin: auto 1rem auto 0;
    }
  }
`;

const ModelInfo = (props) => {
  const { Name, Surname, Images } = props.data;

  const { sizeOption, updateOption } = useContext(OptionContext);

  const handleFilterChange = (value) => {
    updateOption("ON_FILTEROPTION_CHANGE", value);
  };

  const handleSizeChange = (e) => {
    updateOption("ON_SIZEOPTION_CHANGE", e.target.value);
  };

  const renderFilterDropdown = () => {
    return (
      <div className="flex-filter">
        <div className="text-sortby">Sort by</div>
        <Select
          defaultValue="date"
          style={{ width: 120 }}
          onChange={handleFilterChange}
        >
          <Option value="date">date</Option>
          <Option value="rate">rating</Option>
        </Select>
      </div>
    );
  };

  const renderSizeGroup = () => {
    return (
      <div className="flex-sizegroup">
        <div className="text-size">Size</div>
        <Radio.Group value={sizeOption} onChange={handleSizeChange}>
          <Radio.Button
            value="small"
            style={{
              background: sizeOption === "small" ? "#3BB3EA" : "#fff",
              color: sizeOption === "small" ? "#fff" : "#000",
            }}
          >
            S
          </Radio.Button>
          <Radio.Button
            value="medium"
            style={{
              background: sizeOption === "medium" ? "#3BB3EA" : "#fff",
              color: sizeOption === "medium" ? "#fff" : "#000",
            }}
          >
            M
          </Radio.Button>
          <Radio.Button
            value="large"
            style={{
              background: sizeOption === "large" ? "#3BB3EA" : "#fff",
              color: sizeOption === "large" ? "#fff" : "#000",
            }}
          >
            L
          </Radio.Button>
        </Radio.Group>
      </div>
    );
  };

  return (
    <ModelInfoComponent>
      <Row>
        <Col span={8}>
          <div className="text-modelname">
            {Name} {Surname}
          </div>
          <div>{Images.length} images listed</div>
        </Col>
        <Col span={8}>{renderFilterDropdown()}</Col>
        <Col span={8}>{renderSizeGroup()}</Col>
      </Row>
    </ModelInfoComponent>
  );
};

export default ModelInfo;
