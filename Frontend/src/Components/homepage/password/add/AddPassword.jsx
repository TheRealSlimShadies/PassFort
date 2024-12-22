import React, { Component } from 'react';
import './AddPassword.css';
import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa';

class AddPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      website: '',
      username: '',
      password: '',
      passwords: [],
      alertVisible: false,
      editing: false,
      editIndex: null,
      showPassword: false,
      successMessage: '',
    };
  }

  componentDidMount() {
    // Retrieve saved passwords (will connect with API afterward)
    this.showPasswords();
  }

  // Retrieve saved passwords
  showPasswords = () => {
    this.setState({
      passwords: [], // Placeholder for demo
    });
  };

  // Generate a random password
  generatePassword = () => {
    const length = 12;
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }
    this.setState({ password: generatedPassword });
  };

  // Save password
  savePassword = () => {
    const { website, username, password, editing, editIndex, passwords } = this.state;

    if (!website || !username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (editing && editIndex !== null) {
      const updatedPasswords = [...passwords];
      updatedPasswords[editIndex] = { website, username, password };
      this.setState({
        passwords: updatedPasswords,
        editing: false,
        editIndex: null,
        website: '',
        username: '',
        password: '',
        successMessage: 'Password successfully updated!',
      });
    } else {
      const newPassword = { website, username, password };
      this.setState(
        (prevState) => ({
          passwords: [...prevState.passwords, newPassword],
          website: '',
          username: '',
          password: '',
          successMessage: 'Password successfully added!',
        }),
        () => {
          setTimeout(() => {
            this.setState({ successMessage: '' });
          }, 3000);
        }
      );
    }
  };

  // Function to copy a password to the clipboard
  copyPassword = async (pass) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = pass;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.setState({ alertVisible: true });
      setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 2000);
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };

  // Function to delete a password entry
  deletePassword = (website) => {
    const updatedPasswords = this.state.passwords.filter(
      (e) => e.website !== website
    );
    this.setState({ passwords: updatedPasswords });
    alert(`Successfully deleted ${website}'s password`);
  };

  // Function to edit a password entry
  editPassword = (index) => {
    const { passwords } = this.state;
    this.setState({
      editing: true,
      editIndex: index,
      website: passwords[index].website,
      username: passwords[index].username,
      password: passwords[index].password,
    });
  };

  // Function to toggle password visibility
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  renderPasswordList = () => {
    const { passwords, showPassword } = this.state;

    return passwords.map((item, index) => (
      <div className="passwordItem" key={index}>
        <div className="listItem">
          <div className="listLabel">Website:</div>
          <div className="listValue">{item.website}</div>
          <div className="listLabel">Username:</div>
          <div className="listValue">{item.username}</div>
          <div className="listLabel">Password:</div>
          <div className="listValue">
            <span className="passwordField">
              {showPassword ? item.password : item.password.replace(/./g, '*')}
            </span>
          </div>
          <div className="passwordButtons">
            <button
              className="showPasswordButton"
              onClick={this.togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="iconContainer">
            <div
              className="icon"
              onClick={() => this.copyPassword(item.password)}
            >
              <FaCopy size={20} color="#555" />
            </div>
            <div className="icon" onClick={() => this.editPassword(index)}>
              <FaEdit size={20} color="#555" />
            </div>
            <div
              className="icon"
              onClick={() => this.deletePassword(item.website)}
            >
              <FaTrash size={20} color="#555" />
            </div>
          </div>
        </div>
      </div>
    ));
  };

  render() {
    const { website, username, password, editing, successMessage } = this.state;

    return (
      <div className="container">
        <div className="content">
          <h1 className="heading">Add Password</h1>
          {successMessage && <p className="successMessage">{successMessage}</p>}

          <input
            className="input"
            placeholder="Website"
            value={website}
            onChange={(e) => this.setState({ website: e.target.value })}
          />
          <input
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <div className="passwordInputContainer">
            <input
              className="input"
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <button className="generateButton" onClick={this.generatePassword}>
              Generate
            </button>
          </div>
          <div className="submitButton" onClick={this.savePassword}>
            <span className="submitButtonText">
              {editing ? 'Update Password' : 'Add Password'}
            </span>
          </div>

          {this.state.passwords.length > 0 && (
            <div className="table">{this.renderPasswordList()}</div>
          )}
        </div>
      </div>
    );
  }
}

export default AddPassword;
