import {
  FaBookOpen,
  FaBus,
  FaCircle,
  FaFlask,
  FaLayerGroup,
  FaSquare,
  FaThLarge,
} from "react-icons/fa";

export const layouts = [
  {
    value: "Theater",
    label: "Theater",
    icon: FaThLarge,
    description: "Tam grid düzen",
  },
  { value: "Bus", label: "Bus", icon: FaBus, description: "Ortada koridor" },
  {
    value: "UShape",
    label: "U-Shape",
    icon: FaSquare,
    description: "U şekli düzen",
  },
  {
    value: "Grid",
    label: "Grid",
    icon: FaLayerGroup,
    description: "Basit tablo",
  },
  { value: "Lab", label: "Lab", icon: FaFlask, description: "Masa grupları" },
  {
    value: "Exam",
    label: "Exam",
    icon: FaBookOpen,
    description: "Sınav düzeni",
  },
  {
    value: "Circle",
    label: "Circle",
    icon: FaCircle,
    description: "Yuvarlak düzen",
  },
];
