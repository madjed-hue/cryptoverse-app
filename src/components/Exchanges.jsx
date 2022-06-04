import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetCryptoXchangeQuery } from "../services/xchangeApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;
const Exchanges = () => {
  const { data, isFetching } = useGetCryptoXchangeQuery();
  const exchangesList = data?.slice(1, 50);
  if (isFetching) return <Loader />;
  console.log(data.slice(1, 50));
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Trusted Score</Col>
        <Col span={6}>Country</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.trust_score_rank}.</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>
                      ${millify(exchange?.trade_volume_24h_btc)}
                    </Col>
                    <Col span={6}>{exchange.trust_score}</Col>
                    <Col span={6}>{exchange.country}</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
