import { StyleProp, Text, TextStyle } from 'react-native';

type HighlightedTextProps = {
  text: string;
  terms: Array<string | undefined>;
  style?: StyleProp<TextStyle>;
  highlightStyle?: StyleProp<TextStyle>;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function HighlightedText({ text, terms, style, highlightStyle }: HighlightedTextProps) {
  const cleanTerms = terms.map((term) => term?.trim()).filter(Boolean) as string[];

  if (cleanTerms.length === 0) {
    return <Text style={style}>{text}</Text>;
  }

  const pattern = new RegExp(`\\b(${cleanTerms.map(escapeRegExp).join('|')})\\b`, 'gi');
  const parts = text.split(pattern);
  const termSet = new Set(cleanTerms.map((term) => term.toLowerCase()));

  return (
    <Text style={style}>
      {parts.map((part, index) => {
        const isHighlighted = termSet.has(part.toLowerCase());
        return (
          <Text key={`${part}-${index}`} style={isHighlighted ? highlightStyle : undefined}>
            {part}
          </Text>
        );
      })}
    </Text>
  );
}
