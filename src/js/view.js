export default {
  render(templateName, model) {
    templateName = templateName + "Template";
    const source = document.getElementById(templateName).textContent;
    let template = Handlebars.compile(source);

    return template(model);
  },
};
