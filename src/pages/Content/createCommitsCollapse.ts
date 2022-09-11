export default function createCommitsCollapse(
  commitElements: HTMLElement[],
  className: string
): HTMLDetailsElement {
  const detailsElement = document.createElement("details");
  detailsElement.classList.add(className);
  const summaryElement = document.createElement("summary");
  summaryElement.textContent = "Commits";

  detailsElement.append(summaryElement);

  commitElements.forEach((commitElement) => {
    detailsElement.append(commitElement);
  });

  return detailsElement;
}
