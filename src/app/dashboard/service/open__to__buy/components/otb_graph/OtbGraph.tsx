import React, { PureComponent, useContext, useState } from "react";
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { OtbContext } from "../OtbController";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/shared/select";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function OtbGraph() {
  const { transformedData } = useContext(OtbContext);
  const [graph, setGraph] = useState({});
  const xAxisContent = [
    "Channel",
    "Family",
    "subFamily",
    "Supplier",
    "CategoryName",
    "SubCategory",
    "StoreId",
  ];
  const yAxisContent = ["Budget%", "BudgetAmount"];
  const [xAxisData, setXAxisData] = useState<any>("Channel");
  const [yAxisData, setYAxisData] = useState<any>("Budget%");
  console.log({ transformedData });

  return (
    <div className=" w-full">
      <div className=" flex gap-2 ">
        X:
        <Select
          value={`${xAxisData}`}
          onValueChange={(value) => {
            setXAxisData(value);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={xAxisData} />
          </SelectTrigger>
          <SelectContent side="top">
            {xAxisContent.map((content) => (
              <SelectItem key={content} value={`${content}`}>
                {content}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        Y:
        <Select
          value={`${yAxisData}`}
          onValueChange={(value) => {
            setYAxisData(value);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={xAxisData} />
          </SelectTrigger>
          <SelectContent side="top">
            {yAxisContent.map((content) => (
              <SelectItem key={content} value={`${content}`}>
                {content}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="90%" height="80%">
        <BarChart
          width={500}
          height={300}
          data={transformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="Channel" /> */}
          <XAxis dataKey={xAxisData} />
          <YAxis dataKey={yAxisData} />
          <Tooltip />
          <Legend />
          {/* <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      /> */}
          <Bar dataKey={yAxisData} fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
          {/* <Line type="monotone" dataKey={yAxisData} stroke="#82ca9d" /> */}
          {/* <Line type="monotone" dataKey="Budget%" stroke="#FF00FF" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
