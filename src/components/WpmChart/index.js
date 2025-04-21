import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WpmChart = ({ data }) => {
  if (!data.length) return null;

  return (
    <div style={{ width: '100%', height: 250, marginTop: 24 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" label={{ value: 'Tempo (s)', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'WPM', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey="wpm" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WpmChart;