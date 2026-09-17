export type Option = {
  text: string;
  traits: string[];
};

export type Question = {
  category: string;
  optionA: Option;
  optionB: Option;
};

export type Pick = {
  text: string;
  traits: string[];
  category: string;
  side: "A" | "B";
};

export type Summary = {
  title: string;
  read: string;
  prediction: string;
};
