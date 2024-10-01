import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define validation schema with zod
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "You must be at least 18"),
});

// Infer the form data type from the schema
type FormData = z.infer<typeof schema>;

const Form: React.FC = () => {
  // Initialize the useForm hook with zodResolver for validation
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name field */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="form-control"
          defaultValue={"Jhon Doe"}
        />
        {errors.name && <span className="text-danger">{errors.name.message}</span>}
      </div>

      {/* Age field */}
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })} // Convert input to number
          type="number"
          id="age"
          className="form-control"
          defaultValue={18}
        />
        {errors.age && <span className="text-danger">{errors.age.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
