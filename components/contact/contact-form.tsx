"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, STAGES, type ContactInput } from "@/lib/contact-schema";
import { services } from "@/data/services";
import { Button } from "@/components/primitives";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "t-body w-full rounded-sharp border border-line bg-paper px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal";
const labelCls = "t-mono text-xs text-ink/70";
const errCls = "t-mono text-xs text-spec-red";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { interests: [] },
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setServerError(j.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      track("contact_submit", { stage: data.stage });
      setStatus("success");
      reset();
    } catch {
      setServerError("Network error. Please try again.");
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="rounded-card border border-line bg-paper-2 p-8">
        <p className="t-h3 text-pine">Thank you — message received.</p>
        <p className="t-body mt-2 text-ink/70">
          We reply fast, usually within a business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot — visually hidden, off the tab order. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("website")}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-err" className={errCls}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={field}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-err" className={errCls}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={labelCls}>
            Company (optional)
          </label>
          <input id="company" className={field} {...register("company")} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="stage" className={labelCls}>
            Stage
          </label>
          <select
            id="stage"
            className={field}
            defaultValue=""
            aria-invalid={!!errors.stage}
            aria-describedby={errors.stage ? "stage-err" : undefined}
            {...register("stage")}
          >
            <option value="" disabled>
              Select…
            </option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.stage && (
            <p id="stage-err" className={errCls}>
              Please choose a stage.
            </p>
          )}
        </div>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className={labelCls}>What can we help with?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <label
              key={s.slug}
              className="t-body flex items-center gap-2 text-ink/80"
            >
              <input
                type="checkbox"
                value={s.name}
                className="accent-pine"
                {...register("interests")}
              />
              {s.name}
            </label>
          ))}
        </div>
        {errors.interests && (
          <p className={errCls}>{errors.interests.message}</p>
        )}
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={field}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "msg-err" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="msg-err" className={errCls}>
            {errors.message.message}
          </p>
        )}
      </div>

      {serverError && <p className={errCls}>{serverError}</p>}

      <div>
        <Button
          type="submit"
          variant="primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
