import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props){
    const avatarRef = useRef();

  function handleFormSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = '';
  }

    return(
<PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button={"Сохранить"}
      isOpen={props.isOpen}
    onClose={props.onClose}
      onSubmit={handleFormSubmit}>

<div className="popup__field"> 

<input 
type="url" 
id="input-avatar" 
className="popup__input popup__input_form-name popup__input_form-error" 
placeholder="Ссылка на аватар" 
ref={avatarRef}
name="link" 
required/> 

<span 
id="input-avatar-error" 
className="error"/> 

</div> 
      </PopupWithForm>
    )
}