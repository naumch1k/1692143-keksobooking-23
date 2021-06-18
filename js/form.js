const disableForms = () => {
  const formElements = Array.from(document.forms);

  formElements.forEach((form) => {
    const formSelector = form.getAttribute('class');
    form.classList.add(`${formSelector}--disabled`);

    const formFieldsetElements = Array.from(form.children);
    formFieldsetElements.forEach((element) => {
      element.setAttribute('disabled', true);
    });
  });
};

const enableForms = () => {
  const formElements = Array.from(document.forms);

  formElements.forEach((form) => {
    const formModifier = form.classList[1];
    form.classList.remove(`${formModifier}`);

    const formFieldsetElements = Array.from(form.children);
    formFieldsetElements.forEach((element) => {
      element.removeAttribute('disabled', true);
    });
  });
};

enableForms();

export { disableForms };
