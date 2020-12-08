import React, { useState } from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import "./App.css";
import mainApi from "../../utils/MainApi";
import newsApi from "../../utils/NewsApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import Auth from "../Auth/Auth";
import Reg from "../Reg/Reg";
import SuccessPopup from "../SuccessPopup/SuccessPopup";

function App() {

  // данные авторизованного пользователя
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );

  // состояние авторизован / не авторизован
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === 'true');

  // переменные управления попапами
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // валидация форм
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // тексты ошибок при запросах регистрации или авторизации
  const [regErrorText, setRegErrorText] = useState("");
  const [authErrorText, setAuthErrorText] = useState("");

  // статьи - последний поиск и ключевое слово, пользовательские сохраненные
  const [searchResult, setSearchResult] = useState(
    JSON.parse(localStorage.getItem("articles")) || []
  );
  const [userArticles, setUserArticles] = useState(
    JSON.parse(localStorage.getItem("userArticles")) || []
  );
  const [keyword, setKeyword] = useState(localStorage.getItem("keyword") || "");

  // состояния при поиске статей
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [notFoundType, setNotFoundType] = useState("not-found");

  const history = useHistory();

  // методы валидации форм
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  function resetForm() {
    setValues({});
    setIsValid(false);
    setErrors({});
  }

  // регистрация и авторизация
  const registerUser = (email, password, name) => {
    return mainApi
      .register(email, password, name)
      .then((res) => {
        openSuccessModal();
        history.push("/");
      })
      .catch((err) => {
        setRegErrorText(err.message);
      });
  };

  const authUser = (email, password) => {
    return mainApi
      .auth(email, password)
      .then((res) => {
        mainApi
          .autoSign(res.token)
          .then((data) => {
            setCurrentUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsAuth(true);
            localStorage.setItem("isAuth", 'true');
            getUserArticles();
            closeAllPopups();
            history.push("/");
          })
          .catch((err) => setAuthErrorText(err.message));
      })
      .catch((err) => {
        setAuthErrorText(err.message);
      });
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userArticles");
    setIsAuth(false);
    history.push("/");
  };

  // проверка токена и загрузка данных из локального хранилища
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      setIsAuth(true);
      getUserArticles();
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      history.push("/");
    }
  };

  React.useEffect(() => {
    tokenCheck();

  }, []);

  // открытие и закрытие попапов

  React.useEffect(() => {
    function closeOnEscClick(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeOnOverlayClick(e) {
      if (e.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }

    document.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("keydown", closeOnEscClick);

    return () => {
      document.removeEventListener("keydown", closeOnOverlayClick);
      document.removeEventListener("click", closeOnEscClick);
    };
  });

  const closeAllPopups = () => {
    if (showAuthModal) {
      setShowAuthModal(false);
      resetForm();
      setRegErrorText("");
    }
    if (showRegModal) {
      setShowRegModal(false);
      resetForm();
    }
    if (showSuccessModal) {
      setShowSuccessModal(false);
    }
  };

  const openAuth = () => {
    closeAllPopups();
    setShowAuthModal(true);
  };
  const openReg = () => {
    closeAllPopups();
    setShowRegModal(true);
  };

  const openSuccessModal = () => {
    closeAllPopups();
    setShowSuccessModal(true);
  };

  // поиск статей
  const onNewsSearch = (keyword) => {
    setSearchIsLoading(true);
    setNotFound(false);
    setKeyword("");
    localStorage.removeItem("articles");
    localStorage.removeItem("keyword");
    newsApi
      .searchNews(keyword)
      .then((result) => {
        setKeyword(keyword);
        localStorage.setItem("keyword", keyword);
        localStorage.setItem("articles", JSON.stringify(result.articles));
        if (result.articles.length === 0) {
          setNotFound(true);
        } else {
          setSearchResult(result.articles);
        }
      })
      .catch((err) => {
        setNotFound(true);
        setNotFoundType("server-error");
      })
      .finally(() => setSearchIsLoading(false));
  };

  // сохранение и удаление статей

  const getUserArticles = () => {
    mainApi
      .getSavedArticles()
      .then((res) => {
        if (res) {
          setUserArticles(res.data);
          localStorage.setItem("userArticles", JSON.stringify(res.data));
        } else {
          setUserArticles([]);
          localStorage.setItem("userArticles", JSON.stringify([]));
        }
      })
      .catch((err) => console.log(err.message));
  };

  const updateSearchResultOnSave = (changedArticle) => {
    const updatedResults = searchResult.map((article) => {
      if (article.url === changedArticle.link) {
        article._id = changedArticle._id;
        return article;
      }
      return article;
    });
    setSearchResult(updatedResults);
    localStorage.setItem("articles", JSON.stringify(updatedResults));
  };

  const updateSearchResultOnDelete = (deletedArticleId) => {
    const updatedResults = searchResult.map((article) => {
      if (article._id === deletedArticleId) {
        article._id = null;
        return article;
      }
      return article;
    });
    setSearchResult(updatedResults);
    localStorage.setItem("articles", JSON.stringify(updatedResults));
  };

  const saveArticle = (article) => {
    if (isAuth) {
      return mainApi
        .saveArticle(article)
        .then((a) => {
          updateSearchResultOnSave(a);
          getUserArticles();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const deleteArticle = (articleId) => {
    if (isAuth) {
      mainApi
        .deleteArticle(articleId)
        .then(() => {
          updateSearchResultOnDelete(articleId);
          getUserArticles();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header onAuthClick={openAuth} onLogOut={logOut} isAuth={isAuth} />

        <Switch>
          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            articles={userArticles}
            isAuth={isAuth}
            deleteArticle={deleteArticle}
          />

          <Route path="/">
            <Main
              isAuth={isAuth}
              searchResult={searchResult}
              onNewsSearch={onNewsSearch}
              searchIsLoading={searchIsLoading}
              notFound={notFound}
              notFoundType={notFoundType}
              saveArticle={saveArticle}
              keyword={keyword}
              deleteArticle={deleteArticle}
              openReg={openReg}
            />
          </Route>
        </Switch>

        <Footer />

        <section className="popups">
          <Auth
            isOpen={showAuthModal}
            onClose={closeAllPopups}
            title="Вход"
            submitBtnText="Войти"
            altBtnText="Зарегистрироваться"
            altAction={openReg}
            errors={errors}
            values={values}
            isValid={isValid}
            handleChange={handleChange}
            authErrorText={authErrorText}
            onSubmit={authUser}
            deleteArticle={deleteArticle}
          />

          <Reg
            onSubmit={registerUser}
            isOpen={showRegModal}
            onClose={closeAllPopups}
            title="Регистрация"
            submitBtnText="Зарегистрироваться"
            altBtnText="Войти"
            altAction={openAuth}
            errors={errors}
            values={values}
            isValid={isValid}
            handleChange={handleChange}
            regErrorText={regErrorText}
          />

          <SuccessPopup
            isOpen={showSuccessModal}
            onClose={closeAllPopups}
            onAction={openAuth}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
