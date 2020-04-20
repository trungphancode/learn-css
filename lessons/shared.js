function renderTemplateAsCustomElement(templateId) {
  if (document.getElementById(templateId) === null) {
    throw new Error(`Template ID ${templateId} not found`);
  }
  if (typeof customElements.get(templateId) === 'function') {
    throw new Error(`Template ID ${templateId} is either used elsewhere or not available`);
  }
  customElements.define(templateId,
    class extends HTMLElement {
      constructor() {
        super();
        const template = document.getElementById(templateId);
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
      }
    }
  );
  const element = document.createElement(templateId);
  element.style.margin = '20px 0';
  element.style.display = 'block';
  document.body.appendChild(element);
}

function resetAllSizes(button) {
  const fakeBody = button.getRootNode().querySelector('.fake-body');
  if (fakeBody) {
    fakeBody.style.height = '';
    fakeBody.style.width = '';
    for (const element of Array.from(fakeBody.querySelectorAll('div'))) {
      const style = getComputedStyle(element);
      if (style.resize !== undefined && style.resize.length > 0) {
        element.style.height = '';
        element.style.width = '';
      }
    }
  }
}

function resetSizeFor(button, selector) {
  const element = button.getRootNode().querySelector(selector);
  if (element) {
    element.style.height = '';
    element.style.width = '';
  }
}
