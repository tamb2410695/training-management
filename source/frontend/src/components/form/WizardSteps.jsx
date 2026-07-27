function WizardSteps({ steps = [], current = 0 }) {
  return (
    <div className="mb-3">
      <div className="nav nav-pills nav-fill gap-2">
        {steps.map((step, index) => (
          <div
            key={step.key}
            className={`
              nav-link
              py-2
              rounded
              text-nowrap
              ${index === current ? "active" : "text-secondary border bg-light"}
            `}
          >
            {index + 1}. {step.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WizardSteps;
