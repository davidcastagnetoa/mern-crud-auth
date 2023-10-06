import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Elevation, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";

import { Colors } from "@blueprintjs/core";
import { useTheme } from "../context/ThemeContext";
import dayjs from "dayjs";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const password = watch("password");

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useTheme();

  // FECHA
  const [dateValue, setDateValue] = useState(null);

  const dateFnsFormat = "YYYY-MM-DD";

  const beautyDate = useCallback((date) => {
    const myDate = dayjs(date).format("DD/MM/YYYY");
    console.log("Fecha a mostrar:", myDate);
    return myDate;
  }, []);

  const formatDate = useCallback((date) => {
    const formattedDate = dayjs(date).toDate();
    console.log("Fecha formateada:", formattedDate);
    return formattedDate;
  }, []);

  const parseDate = useCallback((str) => dayjs(str, dateFnsFormat).toDate(), []);

  const handleChange = useCallback(
    (date) => {
      if (date) {
        console.log("Fecha seleccionada:", date);
        setDateValue(date);
        const formattedDate = formatDate(date);
        setValue("birthDate", formattedDate);
      } else {
        console.log("Fecha borrada");
        setDateValue(null);
        setValue("birthDate", null);
      }
    },
    [setValue, beautyDate]
  );

  // const handleChange = useCallback(
  //   (date) => {
  //     if (date) {
  //       console.log("Fecha seleccionada:", date);
  //       setDateValue(date);
  //       const formattedDate = formatDate(date); // asumir que formatDate devuelve la fecha en el formato que necesitas
  //       setValue("birthDate", formattedDate);
  //     } else {
  //       setDateValue(null);
  //       setValue("birthDate", null);
  //     }
  //   },
  //   [setValue]
  // );

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    console.log("Idioma seleccionado:", values.language);
    signup(values);
  });

  const languages = [
    { flag: "🇬🇧", name: "english" },
    { flag: "🇪🇸", name: "spanish" },
    { flag: "🇫🇷", name: "french" },
    { flag: "🇮🇹", name: "italian" },
    { flag: "🇷🇺", name: "russian" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("Select language");
  const handleLanguageChange = (language) => {
    const { flag, name } = language;
    setSelectedLanguage(`${flag} - ${name}`);
    setValue("language", name);
  };

  const languageMenu = (
    <Menu
      style={
        isDarkMode
          ? { background: Colors.DARK_GRAY1, color: Colors.WHITE }
          : { background: Colors.LIGHT_GRAY4, color: Colors.DARK_GRAY1 }
      }
    >
      {languages.map((language) => (
        <MenuItem
          key={language.name}
          text={`${language.flag} - ${language.name}`}
          onClick={() => handleLanguageChange(language)}
        />
      ))}
    </Menu>
  );

  return (
    <div
      className="flex items-center justify-center h-[calc(100vh)]"
      style={isDarkMode ? { background: Colors.DARK_GRAY1 } : { background: Colors.LIGHT_GRAY3 }}
    >
      <Card
        interactive={false}
        elevation={Elevation.TWO}
        className="max-w-md w-full p-10 rounded-md space-y-2"
      >
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 my-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-thin pb-4">Register</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* FirstName */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-person" />
            <input
              type="text"
              {...register("firstName", { required: true })}
              placeholder="Firstname"
              className="bp5-input bp5-fill"
            />
            {errors.firstName && <p className="text-red-500">Firstname is required</p>}
          </div>

          {/* LastName */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-person" />
            <input
              type="text"
              {...register("lastName", { required: true })}
              placeholder="LastName"
              className="bp5-input bp5-fill"
            />
            {errors.lastName && <p className="text-red-500">LastName is required</p>}
          </div>

          {/* BirthDate */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-calendar" />
            <DateInput
              formatDate={beautyDate} // muestra la fecha seleccionada en un formato a elegir
              onChange={handleChange}
              parseDate={parseDate}
              placeholder={dateFnsFormat}
              value={dateValue} // Fecha formateada a enviar a backend
              showActionsBar={true}
              canClearSelection={true}
              fill={true}
              clearButtonText="Clear"
              className="w-full"
              minDate={new Date("1900-01-01")} // fecha mínima que puedes seleccionar
              maxDate={new Date()}
            />
            {errors.birthDate && <p className="text-red-500">BirthDate is required</p>}
          </div>

          {/* Language */}
          <div className="bp5-large">
            <Popover
              className="bp5-fill"
              content={languageMenu}
              fill={true}
              placement="bottom"
              modifiers={{ arrow: { enabled: false } }}
            >
              <Button
                alignText="left"
                icon="applications"
                rightIcon="caret-down"
                text={selectedLanguage}
                className="bp5-button bp5-dark outline-none"
              />
            </Popover>
            {(errors.language || selectedLanguage === "Select language") && (
              <p className="text-red-500">Language is required</p>
            )}
          </div>

          {/* City */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-path-search" />
            <input
              type="text"
              {...register("city", { required: true })}
              placeholder="City"
              className="bp5-input bp5-fill"
            />
            {errors.city && <p className="text-red-500">City is required</p>}
          </div>

          {/* Country */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-globe" />
            <input
              type="text"
              {...register("country", { required: true })}
              placeholder="Country"
              className="bp5-input bp5-fill"
            />
            {errors.country && <p className="text-red-500">Country is required</p>}
          </div>

          {/* Username */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-person" />
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Username"
              className="bp5-input bp5-fill"
            />
            {errors.username && <p className="text-red-500">Username is required</p>}
          </div>

          {/* Email */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-at" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="bp5-input bp5-fill w-full"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          {/* Password */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-key" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
              className="bp5-input bp5-fill w-full"
            />
            <Button
              icon={showPassword ? "unlock" : "lock"}
              className="bp5-button bp5-minimal bp5-intent-warning"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          </div>
          {errors.password && <p className="text-red-500">Password is required</p>}

          {/* Confirm Password */}
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-key" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password,
              })}
              placeholder="Confirm Password"
              className="bp5-input bp5-fill w-full"
            />
            <Button
              icon={showPassword ? "unlock" : "lock"}
              className="bp5-button bp5-minimal bp5-intent-warning"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            ></Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">New Password is different of Password</p>
          )}

          <Button icon="user" intent="success" type="submit">
            Register
          </Button>
        </form>
        <p className="flex gap-x-2 items-center justify-between">
          Already have an account?
          <Link to="/login" className="bp5-button bp5-intent-primary bp5-icon-log-in">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterPage;
