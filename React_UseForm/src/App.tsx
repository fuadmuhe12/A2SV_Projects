import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

export default function App() {
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setSubmitData(data);
    reset({ name: "", email: "", message: "" });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [submitData, setSubmitData] = useState({} as IFormInput);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label> Name </label>
        <input
          placeholder="name"
          type="text"
          {...register("name", { required: "This Field is required" })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <label>Email</label>
        <input
          placeholder="email"
          type="text"
          {...register("email", {
            required: "This Field is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Entered value does not match email format",
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <textarea
          placeholder="message"
          {...register("message", { required: "This Field is required" })}
        ></textarea>
        {errors.message && (
          <span className="error">{errors.message.message}</span>
        )}

        <input type="submit" />
      </form>
      {submitData.email != null && (
        <div className="output">
          <h2>Last Submitted Data</h2>
          <p> Name : {submitData.name} </p>
          <p> Email : {submitData.email} </p>
          <p> Message : {submitData.message} </p>
        </div>
      )}
    </>
  );
}
