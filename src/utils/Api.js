class Api {
   constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
   }

   //проверка
   #onResponse(response) {
      if (response.ok) {
         console.log(response)
         return response.json();
      }

      return Promise.reject({ message: "Ошибка" }, response);
   }

   _request(url, options) {
      return fetch(url, options).then(this.#onResponse)
   }

   //Загрузка информации о пользователе с сервера
   getUserInfo() {
      return this._request(`${this._baseUrl}/users/me`, {
         method: 'GET',
         headers: this._headers
      })

   }

   //Загрузка карточек с сервера
   getInitialCards() {
      return this._request(`${this._baseUrl}/cards`, {
         method: 'GET',
         headers: this._headers
      })

   }

   //Редактирование профиля
   patchUserInfoData(name, about) {
      return this._request(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: name,
            about: about
         })
      })

   }

   //Добавление новой карточки
   postUserCardData(name, link) {
      return this._request(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: name,
            link: link
         })
      })

   }

   //Отображение количества лайков карточки
   addLike(id) {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
         method: 'PUT',
         headers: this._headers
      })

   }

   //Удаление карточки
   deleteCard(id) {
      return this._request(`${this._baseUrl}/cards/${id}`, {
         method: 'DELETE',
         headers: this._headers
      })

   }

   //Постановка и снятие лайка
   deleteLike(id) {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
         method: 'DELETE',
         headers: this._headers
      })

   }

   changeLikeStatus(id, isLiked) {
      return isLiked ? this.deleteLike(id) : this.addLike(id);
   }

   //Обновление аватара пользователя
   patchUserAvatarData(link) {
      return this._request(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            avatar: link
         })
      })

   }
}

export default new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
   headers: {
      authorization: '5c931bad-1961-412c-8ce8-c9feec65b03a',
      'Content-Type': 'application/json'
   }
});

