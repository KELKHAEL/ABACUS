import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Text as SvgText, G } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const size = screenWidth - 40;
const R = size / 3.5;
const center = size / 2;

const formatSet = (s) => {
  const arr = [...s];
  if (arr.length === 0) return "∅";
  if (arr.length > 5) return `{${arr.slice(0, 5).join(', ')}, ...}`;
  return `{${arr.join(', ')}}`;
};

const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));
const intersection = (a, b) => new Set([...a].filter(x => b.has(x)));
const union = (a, b) => new Set([...a, ...b]);

export default function VennDiagram({ setA, setB, setC }) {
  // Calculate specific regions
  const a_and_b = intersection(setA, setB);
  const a_and_c = intersection(setA, setC);
  const b_and_c = intersection(setB, setC);
  const a_b_c = intersection(a_and_b, setC); // Center (A∩B∩C)

  const ab_only = difference(a_and_b, setC); // (A∩B) - C
  const ac_only = difference(a_and_c, setB); // (A∩C) - B
  const bc_only = difference(b_and_c, setA); // (B∩C) - A

  const a_only = difference(setA, union(setB, setC)); // A - (B∪C)
  const b_only = difference(setB, union(setA, setC)); // B - (A∪C)
  const c_only = difference(setC, union(setA, setB)); // C - (A∪B)

  // Define positions
  const cA = { x: center - R / 1.5, y: center + R / 2 };
  const cB = { x: center + R / 1.5, y: center + R / 2 };
  const cC = { x: center, y: center - R / 1.2 };

  // Helper component
  const Label = ({ x, y, title, data, color = "white" }) => (
    <G>
      <SvgText x={x} y={y - 10} fill={color} fontSize="14" fontWeight="bold" textAnchor="middle">{title}</SvgText>
      <SvgText x={x} y={y + 10} fill={color} fontSize="12" textAnchor="middle">{formatSet(data)}</SvgText>
    </G>
  );

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        <Circle cx={cA.x} cy={cA.y} r={R} fill="rgba(45, 127, 249, 0.6)" stroke="#2D7FF9" strokeWidth="2" />
        <Circle cx={cB.x} cy={cB.y} r={R} fill="rgba(242, 84, 135, 0.6)" stroke="#F25487" strokeWidth="2" />
        <Circle cx={cC.x} cy={cC.y} r={R} fill="rgba(123, 97, 255, 0.6)" stroke="#7B61FF" strokeWidth="2" />

        <Label x={cA.x - R/2} y={cA.y + R/3} title="A Only" data={a_only} />
        <Label x={cB.x + R/2} y={cB.y + R/3} title="B Only" data={b_only} />
        <Label x={cC.x} y={cC.y - R/2} title="C Only" data={c_only} />

        <Label x={center} y={cA.y + R/1.5} title="A ∩ B" data={ab_only} />
        <Label x={cA.x + R/4} y={center - R/6} title="A ∩ C" data={ac_only} />
        <Label x={cB.x - R/4} y={center - R/6} title="B ∩ C" data={bc_only} />

        {/* Center Intersection of All Three */}
        <Label x={center} y={center + R/6} title="A ∩ B ∩ C" data={a_b_c} color="#fff" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
});