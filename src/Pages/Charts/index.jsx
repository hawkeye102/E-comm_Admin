import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'JAN',
    TotalUsers: 4000,
    TotalSales: 2400,
    amt: 2400,
  },
  {
    name: 'FEB',
    TotalUsers: 3000,
    TotalSales: 1398,
    amt: 2210,
  },
  {
    name: 'MAR',
    TotalUsers: 2000,
    TotalSales: 9800,
    amt: 2290,
  },
  {
    name: 'APR',
    TotalUsers: 2780,
    TotalSales: 5908,
    amt: 2000,
  },
  {
    name: 'MAY',
    TotalUsers: 1890,
    TotalSales: 7800,
    amt: 2181,
  },
  {
    name: 'JUNE',
    TotalUsers: 2390,
    TotalSales: 2800,
    amt: 2500,
  },
  {
    name: 'JULY',
    TotalUsers: 3490,
    TotalSales: 6300,
    amt: 2100,
  },
  {
    name: 'AUG',
    TotalUsers: 3490,
    TotalSales: 9300,
    amt: 2100,
  },
  {
    name: 'SEPT',
    TotalUsers: 3490,
    TotalSales: 4900,
    amt: 2100,
  },
  {
    name: 'OCT',
    TotalUsers: 3490,
    TotalSales: 1300,
    amt: 2100,
  },
  {
    name: 'NOV',
    TotalUsers: 3490,
    TotalSales: 8300,
    amt: 2100,
  },
  {
    name: 'DEC',
    TotalUsers: 3490,
    TotalSales: 1300,
    amt: 2100,
  },
];

const ChartsSection = () => {
 
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="name"  tick={{ fontSize: 13 }}/>
          <YAxis   tick={{ fontSize: 13 }}/>
          <Tooltip />
          <Legend/>
          <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
          <Line type="monotone" dataKey="TotalUsers" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

export default ChartsSection;