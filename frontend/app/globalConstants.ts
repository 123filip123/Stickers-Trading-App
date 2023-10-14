export const BORDER_RADIUS = 15;

export const colors = {
  green: "#4CAF50",
  red: "#E57373",
  gray: "#F5F5F5",
  yellow: "#FFD700",
  white: "white",
  blue: "#007BFF",
  orange: "orange",
};

export interface IError {
  response: {
    data: {
      message: string;
    };
  };
}
