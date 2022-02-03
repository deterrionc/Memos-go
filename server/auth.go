package server

import (
	"fmt"
	"memos/api"
	"memos/common"
	"net/http"

	"github.com/google/jsonapi"
	"github.com/labstack/echo/v4"
)

func (s *Server) registerAuthRoutes(g *echo.Group) {
	g.POST("/auth/login", func(c echo.Context) error {
		login := &api.Login{}
		if err := jsonapi.UnmarshalPayload(c.Request().Body, login); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "Malformatted login request").SetInternal(err)
		}

		userFind := &api.UserFind{
			Name: &login.Name,
		}
		user, err := s.UserService.FindUser(userFind)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to authenticate user").SetInternal(err)
		}
		if user == nil {
			return echo.NewHTTPError(http.StatusUnauthorized, fmt.Sprintf("User not found: %s", login.Name))
		}

		// Compare the stored hashed password, with the hashed version of the password that was received.
		if login.Password != user.Password {
			// If the two passwords don't match, return a 401 status.
			return echo.NewHTTPError(http.StatusUnauthorized, "Incorrect password").SetInternal(err)
		}

		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		if err := jsonapi.MarshalPayload(c.Response().Writer, user); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to marshal create user response").SetInternal(err)
		}

		setUserSession(c, user)

		return nil
	})
	g.POST("/auth/logout", func(c echo.Context) error {
		removeUserSession(c)

		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		c.Response().WriteHeader(http.StatusOK)
		return nil
	})
	g.POST("/auth/signup", func(c echo.Context) error {
		signup := &api.Signup{}
		if err := jsonapi.UnmarshalPayload(c.Request().Body, signup); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "Malformatted login request").SetInternal(err)
		}

		userFind := &api.UserFind{
			Name: &signup.Name,
		}
		user, err := s.UserService.FindUser(userFind)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to authenticate user").SetInternal(err)
		}
		if user != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, fmt.Sprintf("Exist user found: %s", signup.Name))
		}

		userCreate := &api.UserCreate{
			Name:     signup.Name,
			Password: signup.Password,
			OpenId:   common.GenUUID(),
		}
		user, err = s.UserService.CreateUser(userCreate)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create user").SetInternal(err)
		}

		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		if err := jsonapi.MarshalPayload(c.Response().Writer, user); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to marshal create user response").SetInternal(err)
		}

		setUserSession(c, user)
		return nil
	})
}
