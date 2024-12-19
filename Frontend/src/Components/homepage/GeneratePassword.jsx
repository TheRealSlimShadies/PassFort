import React, { useState } from 'react';
import './GeneratePassword.css';

const GeneratePassword = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [strength, setStrength] = useState('');

  const generatePassword = () => {
    let charset = '';
    let generatedPassword = '';

    // Add character sets based on user selection
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';

    // Prevent password generation if no options are selected
    if (!charset) {
      alert('Please select at least one option to generate a password.');
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    evaluateStrength(generatedPassword);
  };

  const evaluateStrength = (pwd) => {
    if (pwd.length < 8) setStrength('Weak');
    else if (pwd.length < 12) setStrength('Medium');
    else setStrength('Strong');
  };

  return (
    <div className="container">
      <h2 className="heading">Password Generator</h2>
      <div className="flex">
        <label>Length: {length}</label>
        <input
          type="range"
          min="8"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="flex">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase
        </label>
      </div>
      <div className="flex">
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Include Lowercase
        </label>
      </div>
      <div className="flex">
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
      </div>
      <div className="flex">
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include Symbols
        </label>
      </div>
      <button className="submitButton" onClick={generatePassword}>
        Generate Password
      </button>
      {password && (
        <div className="generated-pass">
          <p>{password}</p>
          <p className={`strength ${strength.toLowerCase()}`}>
            {strength} Password
          </p>
        </div>
      )}
    </div>
  );
};

export default GeneratePassword;
