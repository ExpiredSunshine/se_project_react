import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function RegisterModal({
  handleCloseClick,
  isOpen,
  onRegister,
  onSwitchToLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    name.trim() !== "" &&
    (avatar.trim() === "" ||
      (() => {
        try {
          new URL(avatar);
          return true;
        } catch {
          return false;
        }
      })());

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRegister({ name, avatar, email, password });
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      secondaryAction={{
        text: "or Log In",
        onClick: () => {
          handleCloseClick();
          onSwitchToLogin();
        },
      }}
    >
      <label htmlFor="reg-email" className="modal__label">
        Email *{" "}
        <input
          type="email"
          id="reg-email"
          className="modal__input"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>

      <label htmlFor="reg-password" className="modal__label">
        Password *{" "}
        <input
          type="password"
          id="reg-password"
          className="modal__input"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>

      <label htmlFor="reg-name" className="modal__label">
        Name *{" "}
        <input
          type="text"
          id="reg-name"
          className="modal__input"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label htmlFor="reg-avatar" className="modal__label">
        Avatar URL *{" "}
        <input
          type="url"
          id="reg-avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
