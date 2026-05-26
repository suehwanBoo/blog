import { Button, Modal } from "@boo/ui";
import type { PostMetaProps } from "../type";
import { Select, useToast } from "@boo/ui/client";
import { TAGS } from "../constant";
import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import type { ArticleType } from "../schema/article";
import { PostTagStyles as styles } from "./PostTag.css";

const OPTION_TAGS = TAGS.map((d) => ({ value: d, label: d }));

export default function PostTag({ close, onSuccess }: PostMetaProps) {
  const { formState, control, handleSubmit } = useFormContext<ArticleType>();
  const { apply } = useToast();

  const onSubmit: SubmitHandler<ArticleType> = (d) => {
    console.log(d);
    onSuccess();
  };

  const onError: SubmitErrorHandler<ArticleType> = (error) => {
    const messages = Object.values(error)
      .map((e) => e.message)
      .filter((e) => e !== undefined);

    messages.forEach((m) => apply({ description: m, variant: "danger" }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Modal ariaLabel="태그 선택">
        <Modal.Header title="태그 선택" closeHandler={close} />
        <Modal.Body>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => <TagInputs {...field} />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            ariaLabel="완료"
            size="large"
            state={formState.errors.tags ? "disabled" : "active"}
          >
            완료
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
}

function TagInputs({ value }: ControllerRenderProps<ArticleType, "tags">) {
  const { getValues, setValue } = useFormContext<ArticleType>();
  const selectedTags = getValues("tags");

  return (
    <div>
      <Select
        ariaLabel="tag-select"
        onChange={(select) => {
          const nextValue = [...value, select.value];

          setValue("tags", nextValue, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
        options={OPTION_TAGS.map((tags) => ({
          ...tags,
          visible: !value.includes(tags.value),
        }))}
        render={(s) => s.label}
      />
      <div className={styles.tagWrapper}>
        {selectedTags.map((tag) => (
          <div key={tag} className={styles.tags}>
            <span>#{tag}</span>
            <button
              aria-label="cancel-tag"
              className={styles.cancel}
              type="button"
              onClick={() => {
                setValue(
                  "tags",
                  value.filter((s) => s !== tag),
                );
              }}
            >
              <CancelIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CancelIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5891 4.41083C15.9145 4.73626 15.9145 5.2639 15.5891 5.58934L5.58909 15.5893C5.26366 15.9148 4.73602 15.9148 4.41058 15.5893C4.08514 15.2639 4.08514 14.7363 4.41058 14.4108L14.4106 4.41083C14.736 4.08539 15.2637 4.08539 15.5891 4.41083Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.41058 4.41083C4.73602 4.08539 5.26366 4.08539 5.58909 4.41083L15.5891 14.4108C15.9145 14.7363 15.9145 15.2639 15.5891 15.5893C15.2637 15.9148 14.736 15.9148 14.4106 15.5893L4.41058 5.58934C4.08514 5.2639 4.08514 4.73626 4.41058 4.41083Z"
        fill="currentColor"
      />
    </svg>
  );
}
