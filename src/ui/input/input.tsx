import type { QRL } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { component$, type PropsOf } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";

type InputProps = PropsOf<"input"> & {
  errors: string[];
  onValue$: QRL<(value: any) => void>;
  value: any;
};

export const Input = component$<InputProps>(
  ({ name, errors, id, value, onValue$, ...props }) => {
    const inputId = id || name;

    return (
      <>
        <input
          {...props}
          aria-errormessage={`${inputId}-error`}
          aria-invaid={!!errors.length}
          // workaround to support two way data-binding on the Input component (https://github.com/QwikDev/qwik/issues/3926)
          value={value}
          preventdefault:submit
          onInput$={$((_, el) => onValue$(el.value))}
          class={cn(
            "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            props.class,
          )}
          id={inputId}
          name={name}
        />
        {errors.length ? (
          <div id={`${inputId}-error`} class="text-destructive mt-1 text-sm">
            {errors[0]}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  },
);
