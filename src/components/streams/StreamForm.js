import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// YUP Object Schema Validation
// Should probably live in another file and be imported.
const schema = yup.object().shape({
  title: yup
    .string("Your title must be a string.")
    .required("Please enter a title."),
  description: yup
    .string("Your description must be a string.")
    .required("Please enter a descrption."),
});

// ### StreamCreate COMPONENT ###
//
const StreamForm = (props) => {
  // Form Submit Function
  const submitForm = (formData) => {
    props.onFormSubmit(formData);
  };

  // Conditional Default Values

  // useForm Hook - initializing React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onTouched",
  });

  // Dynamic Error message on failed form validation
  const renderError = (inputName) => {
    if (errors[inputName]?.message) {
      return (
        <div className="ui error message">
          <div className="header">{errors[inputName]?.message}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  // Dynamically highlights input field on failed form validation.
  const classNameTitle = `ui field ${errors.title ? "error" : ""}`;
  const classNameDescription = `ui field ${errors.description ? "error" : ""}`;

  // RENDER
  return (
    <form className="ui form error" onSubmit={handleSubmit(submitForm)}>
      <div className={classNameTitle}>
        <label htmlFor="title">Title:</label>
        <input type="text" {...register("title")} autoComplete="off" />

        {renderError("title")}
      </div>
      <div className={classNameDescription}>
        <label htmlFor="description">Description:</label>
        <input type="text" {...register("description")} autoComplete="off" />
        {renderError("description")}
        {/* <input
          className="ui button primary"
          type="submit"
          value="Submit"
          id="submit"
        /> */}
        <button style={{ marginTop: 20 }} className="ui button primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default StreamForm;
