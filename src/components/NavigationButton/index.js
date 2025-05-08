import './styles.css'
import { useNavigate } from 'react-router-dom';

function NavigationButton({ to, children, className = '' }) {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <button
        className={`view-home-button ${className}`}
        onClick={() => navigate(to)}
      >
        {children}
      </button>
    </div>
  );
}

export default NavigationButton;