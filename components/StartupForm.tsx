"use client";
import React, { use, useState } from "react";
import { useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { ZodError } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: formData.get("image") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      console.log(formValues);
      // check if it get int the form
      const result = await createPitch(prevState, formData, pitch);
      setErrors({});
      if (result.status === "SUCCESS") {
        toast.success("Form submitted successfully!");
        router.push(`/startups/${result._id}`);
      }

      return result;
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Please check the form for errors");
        return { ...prevState, status: "ERROR", error: "Validation failed" };
      }
      toast.error("An unexpected error occurred. Please try again later.");
      return {
        ...prevState,
        status: "ERROR",
        error: "An unexpected error occurred. Please try again later.",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div className="flex flex-col gap-5">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="startup_form_input"
            required
            placeholder="Startup Title"
          />
          {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="startup-form_label">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            className="startup_form_description"
            required
            placeholder="Startup description"
          />
          {errors.description && (
            <p className="startup-form_error">{errors.description}</p>
          )}
        </div>

        {/* Category Input */}
        <div>
          <label htmlFor="category" className="startup-form_label">
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="startup_form_input"
            required
            placeholder="Startup category (Tech, health, education, etc)"
          />
          {errors.category && (
            <p className="startup-form_error">{errors.category}</p>
          )}
        </div>

        {/* Image Input */}
        <div>
          <label htmlFor="image" className="startup-form_label">
            Image URL
          </label>
          <Input
            id="image"
            name="image"
            className="startup_form_input"
            required
            placeholder="Startup Image URL"
          />
          {errors.image && <p className="startup-form_error">{errors.image}</p>}
        </div>

        {/* Pitch Input */}
        <div data-color-mode="light">
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value || "")}
            id="pitch"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>
      </div>

      <Button
        type="submit"
        className="startup-form_btn mt-5 text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
