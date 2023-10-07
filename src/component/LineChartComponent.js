import { Button } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { BsChevronCompactRight } from "react-icons/bs";
import { BsChevronCompactLeft } from "react-icons/bs";
const ChartBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  .scroll_box {
    width: 100%;
    max-width: 90%;
    overflow: auto;

    &::-webkit-scrollbar {
      height: 8px; /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
      background: #ddd; /* 스크롤바의 색상 */
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
    }
  }
  .scroll_btn {
    position: absolute;
    width: 40px;
    height: 80px;
    padding: 0;
    top: 50%;
    z-index: 100;
    transform: translateY(-50%);
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
  text {
    background: red;
  }
`;

export function CustomizedLabel(props) {
  const { x, y, stroke, value } = props;
  return (
    <>
      <text
        className="rate_text"
        x={x}
        y={y}
        dy={-12}
        fill="#0f64d1"
        fontWeight="600"
        fontSize={13}
        textAnchor="middle"
      >
        {value}
      </text>
    </>
  );
}

export default function LineChartComponent({ data }) {
  const [rateList, setRateList] = useState();
  const scrollRef = useRef();
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollLeft += scrollRef.current.scrollWidth;
  }, [rateList]);

  useEffect(() => {
    const arr = data.map((el) => {
      el.rateNum = 1 * el.rate.substr(0, el.rate.length - 1);
      const str = String(el.rateNum);
      if (str.split(".").length == 2 && str.split(".")[1].length > 2) {
        el.rateNum = el.rateNum.toFixed(2);
      }
      return el;
    });
    setRateList(arr);
  }, []);

  const onPrevScroll = () => {
    scrollRef.current.scrollLeft -= 150;
  };
  const onNextScroll = () => {
    scrollRef.current.scrollLeft += 150;
  };

  return (
    <>
      {rateList && (
        <>
          <ChartBox>
            <Button className="scroll_btn left" onClick={onPrevScroll}>
              <BsChevronCompactLeft />
            </Button>
            <Button className="scroll_btn right" onClick={onNextScroll}>
              <BsChevronCompactRight />
            </Button>
            <div className="scroll_box" ref={scrollRef}>
              <ResponsiveContainer width={rateList.length * 50} height={300}>
                <LineChart
                  width={"100%"}
                  height={"100%"}
                  data={data}
                  margin={{
                    top: 35,
                    right: 20,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="num" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    name="시청률"
                    dataKey="rateNum"
                    stroke="#8884d8"
                    activeDot={{ r: 6 }}
                    label={<CustomizedLabel />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>
        </>
      )}
    </>
  );
}
