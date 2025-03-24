function sanitizer(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function serializer(formNode) {
  const { elements } = formNode;
  const data = Array.from(elements)
    .filter(item => item.name)
    .map(element => ({
      name: sanitizer(element.name),
      value: sanitizer(element.value)
    }));
  return data;
}