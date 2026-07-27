import { useState } from "react";
import DynamicForm from "./DynamicForm";
import WizardSteps from "./WizardSteps";
import Loading from "../feedback/Loading";

function WizardForm({
  schema,
  values,
  errors,
  onChange,
  onSubmit,
  loading = false,
}) {
  const steps = schema.steps ?? [];
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const next = () => {
    if (isLast) {
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const previous = () => {
    if (isFirst) {
      return;
    }

    setCurrentStep((prev) => prev - 1);
  };

  const submit = () => {
    onSubmit?.(values);
  };

  if (!step) {
    return null;
  }

  return (
    <div className="wizard-form">
      <WizardSteps steps={steps} current={currentStep} />

      <div className="mt-3">
        {/* <h6 className="fw-semibold mb-3">{step.title}</h6> */}

        <DynamicForm
          schema={step.fields}
          errors={errors}
          values={values}
          onChange={onChange}
        />
      </div>

      <div
        className="
        d-flex
        justify-content-between
        align-items-center
        mt-4
        pt-3
        border-top
      "
      >
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={isFirst || loading}
          onClick={previous}
        >
          Quay lại
        </button>

        {isLast ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled={loading}
            onClick={submit}
          >
            {loading ? <Loading /> : "Lưu lại"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            disabled={loading}
            onClick={next}
          >
            Tiếp tục
          </button>
        )}
      </div>
    </div>
  );
}

export default WizardForm;
