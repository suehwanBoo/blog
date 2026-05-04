"use client";

import { Button, Input } from "@boo/ui";
import { subscribeFormStyles as styles } from "./SubscribeForm.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeSchema, type SubscribeSchema } from "../schema";

export default function SubscribeForm() {
  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(subscribeSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<SubscribeSchema> = (d) => {
    // later added some api logic
    console.log(d);
  };

  const hint = "You can unsubscribe anytime";
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper}>
        <Input
          placeholder="Enter your email"
          aria-label="email"
          className={styles.input}
          {...register("email")}
        />
        <Button
          type="submit"
          ariaLabel="email submit"
          size="large"
          state={!formState.errors.email ? "active" : "disabled"}
        >
          Submit
        </Button>
      </div>
      <p className={styles.hint({ error: !!formState.errors.email })}>
        * {formState.errors.email ? formState.errors.email.message : hint}
      </p>
    </form>
  );
}
