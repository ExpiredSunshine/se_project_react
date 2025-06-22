import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useId } from "react";

export default function EditProfileModal({
  handleCloseClick,
  isOpen,
  onSubmit,
  currentUser,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const idPrefix = useId();

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.data.name || "");
      setAvatar(currentUser.data.avatar || "");
    }
  }, [isOpen, currentUser]);

  const isFormValid =
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setName("");
      setAvatar("");
    } catch (err) {
      console.error(err);
    }
    onSubmit({
      name: name.trim(),
      avatar: avatar.trim() || undefined,
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor={`${idPrefix}-red-name`} className="modal__label">
        Name{" "}
        <input
          type="text"
          id={`${idPrefix}-red-name`}
          className="modal__input"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label htmlFor={`${idPrefix}-red-avatar`} className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          id={`${idPrefix}-red-avatar`}
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
