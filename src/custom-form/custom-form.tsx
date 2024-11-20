import type { JSXOutput } from "@builder.io/qwik";
import { $, type PropsOf, type QRL } from "@builder.io/qwik";
import type { ActionStore } from "@builder.io/qwik-city";
import { getNestedValue, setNestedValue } from "~/custom-form/path";
import { validateKey } from "~/custom-form/validate.by.key";
import type { BaseSchema } from "valibot";
import { safeParseAsync } from "valibot";

type InputProps = PropsOf<"form"> & {
  store: any;
  formStore: any;
  action?: ActionStore<any, any, any>;
  schema: QRL<BaseSchema<any, any, any>>;
};

export function Form({
  store,
  formStore,
  action,
  children,
  schema,
  ...formProps
}: InputProps): JSXOutput {
  // Destructure form props

  return (
    <form
      class={"flex flex-col"}
      noValidate
      {...formProps}
      method="post"
      action={action?.actionPath}
      preventdefault:submit={true}
      // ref={(element: Element) => {
      //   form.element = element as HTMLFormElement;
      // }}
      onSubmit$={async (event: SubmitEvent, element) => {
        try {
          console.log(`submitted`, { event, element });
          console.log(`todo: validate`);
          // submit store
          console.log({ store, formStore, schema });

          const resolvedSchema = await schema.resolve();
          const result = await safeParseAsync(resolvedSchema, store, {
            abortEarly: false,
            abortPipeEarly: false,
          });
          console.log({ action, result });
          if (result.success) {
            console.log({ action });
            await action?.submit(result.output); // new FormData(result.output)
          } else {
            //set errors
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {children}
    </form>
  );
}

export function useForm(options: InputProps) {
  return {
    Form: (props: any) =>
      Form({
        store: options.store,
        action: options.action,
        ...props,
        formStore: options.formStore,
        schema: options.schema,
      }),
    inputProps: (label: string) => {
      return {
        onValue$: $(async (v: any) => {
          const resolvedSchema = await options.schema.resolve();

          const result = await validateKey(
            resolvedSchema as unknown as any,
            label,
            v,
          );

          if (result.success) {
            setNestedValue(options.store, label, result.output);
            setNestedValue(options.formStore, `errors.${label}`, undefined);
          } else {
            setNestedValue(
              options.formStore,
              `errors.${label}`,
              result.issues.map((i) => i.message),
            );
          }
        }),
        name: `${label}`,
        value: getNestedValue(options.store, label),
        errors:
          (getNestedValue(options.formStore, `errors.${label}`) as string[]) ??
          [],
      };
    },
  };
}
