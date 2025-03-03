import { useEffect, useState } from "react";
import s from "./style.module.css";

const InformationOverlay = ({ text, onClose, setIsComputerAttack }) => {
  const [visible, setVisible] = useState(!!text);

  useEffect(() => {
    if (text) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setIsComputerAttack(false);
        onClose?.();
      }, 3000);
    }
  }, [text, onClose]);

  if (!visible) return null;

  return (
    <div className={s.overlay}>
      <h1 className={s.text}>{text}</h1>
    </div>
  );
};

export default InformationOverlay;
